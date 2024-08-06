// __tests__/phonebook.test.js
const Request = require('supertest');
const jwt = require('jsonwebtoken');
const TestHelper = require('../../../server/helpers/TestHelper');
const helmets = require('../../../server/api/helmet');
const Database = require('../../../server/services/Database');
const Redis = require('../../../server/services/Redis');

jest.mock('../../../server/services/Redis', () => ({
  getKey: jest.fn(),
  setWithExpire: jest.fn()
}));

let server;
let jwtToken;

describe('API V1 Query Database', () => {
  beforeAll(() => {
    jwtToken = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET || 'oajdw99201dnds', {
      expiresIn: '1h'
    });
    server = TestHelper.createTestServer('/api/v1/helmet', helmets);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('GET v1/helmet/all', () => {
    test('should return 200 and helmet list, when get list helmet', async () => {
      const mockHelmetList =
        '[{"id":1,"name":"Arai J","price":2000000,"stock":5,"type":"Full Face"},{"id":2,"name":"Arai B","price":2500000,"stock":100,"type":"Full Face"}]';

      Redis.getKey.mockResolvedValue(null);
      Redis.setWithExpire.mockResolvedValue(null);
      jest.spyOn(Database, 'getListHelmet').mockResolvedValue(JSON.parse(mockHelmetList));

      const response = await Request(server).get('/api/v1/helmet/all').set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(200);
    });

    test('should return 401, and helmet list, when no token', async () => {
      const mockHelmetList =
        '[{"id":1,"name":"Arai J","price":2000000,"stock":5,"type":"Full Face"},{"id":2,"name":"Arai B","price":2500000,"stock":100,"type":"Full Face"}]';

      Redis.getKey.mockResolvedValue(null);
      Redis.setWithExpire.mockResolvedValue(null);
      jest.spyOn(Database, 'getListHelmet').mockResolvedValue(JSON.parse(mockHelmetList));

      const response = await Request(server).get('/api/v1/helmet/all');
      expect(response.status).toBe(401);
    });

    it('should return 200 and get anime list from redis', async () => {
      const mockHelmetList = '{"id":1,"name":"Arai J","price":2000000,"stock":5,"type":"Full Face"}';
      Redis.getKey.mockResolvedValue(mockHelmetList);
      const response = await Request(server).get('/api/v1/helmet/all').set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(200);
    });

    test('should return 404 when helmet not found', async () => {
      jest.spyOn(Database, 'getListHelmet').mockResolvedValue([]);

      const response = await Request(server).get('/api/v1/helmet/all').set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(404);
    });

    test('should return 500 when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'getListHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/helmet/all').set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(500);
    });

    test('should return 401, when token not valid', async () => {
      const mockError = new Error('JsonWebTokenError: invalid token');
      jest.spyOn(Database, 'getListHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/helmet/all').set('Authorization', `Bearer askdkasdksad`);
      expect(response.status).toBe(401);
    });

    test('should return 401, when token expire', async () => {
      const mockError = new Error('TokenExpiredError: jwt expired');
      jest.spyOn(Database, 'getListHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server)
        .get('/api/v1/helmet/all')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ0ZXN0YWphIiwicGFzc3dvcmQiOiIkMmIkMTAkZWs4dHJiZVp4Wk5pUFhnVnVIOE1mdVdtVUo4UGZzUTZ4YTdlRVZkME5KYy8vNG90amkveWkiLCJpYXQiOjE3MjE3OTQwOTIsImV4cCI6MTcyMTc5NzY5Mn0.lflF7EdmJv24HRBq2KaRLiA6N4UlGtBkQyjzwzV01yk`
        );
      expect(response.status).toBe(401);
    });

    test('should return 500 with token authorization, when internal server error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/helmet/all').set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(500);
    });
  });

  describe('GET v1/helmet/type', () => {
    test('should return 200 and helmet type list, when get list helmet type', async () => {
      const mockHelmetList = [
        {
          id: 1,
          name: 'Full Face'
        },
        {
          id: 2,
          name: 'Half Face'
        }
      ];
      jest.spyOn(Database, 'getTypeHelmet').mockResolvedValue(mockHelmetList);

      const response = await Request(server).get('/api/v1/helmet/type').set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(200);
    });

    test('should return 404, when type helmet not found', async () => {
      jest.spyOn(Database, 'getTypeHelmet').mockResolvedValue([]);

      const response = await Request(server).get('/api/v1/helmet/type').set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(404);
    });

    // test('should return 400 when helmet not found', async () => {
    //   jest.spyOn(Database, 'getTypeHelmet').mockResolvedValue([]);

    //   const response = await Request(server).get('/api/v1/helmet/type').set('Authorization', `Bearer ${jwtToken}`);
    //   expect(response.status).toBe(404);
    // });

    test('should return 500 when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'getTypeHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/helmet/type').set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(500);
    });
  });

  describe('POST v1/helmet/add_helmet', () => {
    test('should return 200, when add new helmet', async () => {
      const mockAddHelmetList = {
        data: "Added 'Arai J' as '2000000' to helmet with stock 5"
      };

      jest.spyOn(Database, 'addHelmet').mockResolvedValue(mockAddHelmetList);
      const response = await Request(server)
        .post('/api/v1/helmet/add_helmet')
        .send({
          type: 1,
          name: 'Arai J',
          price: 2000000,
          stock: 5
        })
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(200);
    });

    test('should return 400, when input not valid', async () => {
      jest.spyOn(Database, 'addHelmet').mockResolvedValue([]);

      const response = await Request(server)
        .post('/api/v1/helmet/add_helmet')
        .send({
          type: 1
        })
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(400);
    });

    test('should return 500 when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'addHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server)
        .post('/api/v1/helmet/add_helmet')
        .send({
          type: 1,
          name: 'Arai J',
          price: 2000000,
          stock: 5
        })
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(500);
    });
  });

  describe('PUT v1/helmet/edit_helmet/:id', () => {
    test('should return 200, when edit helmet', async () => {
      const mockEditHelmetList = {
        data: 'Helmet with id 4 has been updated price to 52.55 and stock to 100 '
      };
      jest.spyOn(Database, 'editHelmet').mockResolvedValue(mockEditHelmetList);
      const response = await Request(server)
        .put('/api/v1/helmet/edit_helmet/4')
        .send({
          price: 52.55,
          stock: 100
        })
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(200);
    });
    test('should return 404, when helmet not found', async () => {
      jest.spyOn(Database, 'editHelmet').mockResolvedValue();

      const response = await Request(server)
        .put('/api/v1/helmet/edit_helmet/1')
        .send({
          price: 52.55,
          stock: 100
        })
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(404);
    });

    test('should return 500, when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'editHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server)
        .put('/api/v1/helmet/edit_helmet/4')
        .send({
          price: 52.55,
          stock: 100
        })
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(500);
    });

    test('should return 400, when input not valid', async () => {
      jest.spyOn(Database, 'editHelmet').mockResolvedValue();

      const response = await Request(server)
        .put('/api/v1/helmet/edit_helmet/1')
        .send({
          price: 52.55
        })
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE v1/helmet/delete/:id', () => {
    test('should return 200, when delete helmet', async () => {
      const mockDeleteHelmetList = {
        data: 'Delete id 6 successfully'
      };

      jest.spyOn(Database, 'deleteHelmet').mockResolvedValue(mockDeleteHelmetList);
      const response = await Request(server)
        .delete('/api/v1/helmet/delete/6')
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(200);
    });

    test('should return 404, when id helmet not found', async () => {
      jest.spyOn(Database, 'deleteHelmet').mockResolvedValue();

      const response = await Request(server)
        .delete('/api/v1/helmet/delete/0')
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(404);
    });

    test('should return 500 when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'deleteHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server)
        .delete('/api/v1/helmet/delete/6')
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.status).toBe(500);
    });
  });

  describe('POST v1/helmet/login', () => {
    it('should return 200, and show token', async () => {
      const mockLogin = [
        {
          id: 4,
          username: 'testaja',
          password: '$2b$10$ek8trbeZxZNiPXgVuH8MfuWmUJ8PfsQ6xa7eEVd0NJc//4otji/yi'
        }
      ];
      jest.spyOn(Database, 'loginAccount').mockResolvedValue(mockLogin);
      const response = await Request(server).post('/api/v1/helmet/login').send({
        username: 'testaja',
        password: 'rama123'
      });
      expect(response.status).toBe(200);
    });

    test('should return 400, when input not valid', async () => {
      jest.spyOn(Database, 'loginAccount').mockResolvedValue();

      const response = await Request(server).post('/api/v1/helmet/login').send({
        username: 'ksadksakd'
      });
      expect(response.status).toBe(400);
    });

    test('should return 422, when account not found / wrong password', async () => {
      jest.spyOn(Database, 'loginAccount').mockResolvedValue();

      const response = await Request(server).post('/api/v1/helmet/login').send({
        username: 'testaja',
        password: 'rama123asdsa'
      });
      expect(response.status).toBe(422);
    });

    test('should return 500, when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'loginAccount').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).post('/api/v1/helmet/login').send({
        username: 'testaja',
        password: 'rama123'
      });

      expect(response.status).toBe(500);
    });
  });

  describe('POST v1/helmet/register', () => {
    it('should return 200, and show token', async () => {
      const mockRegister = [
        {
          data: 'Register testaja successfully'
        }
      ];
      jest.spyOn(Database, 'registerAccount').mockResolvedValue(mockRegister);

      const response = await Request(server).post('/api/v1/helmet/register').send({
        username: 'testaja',
        password: 'rama123'
      });
      expect(response.status).toBe(200);
    });

    it('should return 409, when account already exist', async () => {
      jest.spyOn(Database, 'registerAccount').mockResolvedValue('ER_DUP_ENTRY');

      const response = await Request(server).post('/api/v1/helmet/register').send({
        username: 'testaja',
        password: 'rama123'
      });
      expect(response.status).toBe(409);
    });

    test('should return 400, when input not valid', async () => {
      jest.spyOn(Database, 'registerAccount').mockResolvedValue();

      const response = await Request(server).post('/api/v1/helmet/register').send({
        username: 'ksadksakd'
      });
      expect(response.status).toBe(400);
    });

    test('should return 500, when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'registerAccount').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).post('/api/v1/helmet/register').send({
        username: 'testaja',
        password: 'rama123'
      });

      expect(response.status).toBe(500);
    });
  });
});
