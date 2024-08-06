const jwt = require('jsonwebtoken');
const Boom = require('boom');
const bcrypt = require('bcrypt');

const CommonHelper = require('./CommonHelper');
const Database = require('../services/Database');
const Redis = require('../services/Redis');

// Get All Helmet - DB
const getAllHelmet = async () => {
  try {
    const dataFromRedis = await Redis.getKey('helmet');
    if (dataFromRedis) {
      CommonHelper.log(['Helmet Helper', 'getAllHelmet', 'INFO'], {
        message: 'Get data from redis',
        key: 'helmet'
      });
      return JSON.parse(dataFromRedis);
    }
    const data = await Database.getListHelmet();

    if (data.length > 0) {
      await Redis.setWithExpire('helmet', JSON.stringify(data), 86400);
    } else {
      return Boom.notFound('Helmet not found');
    }

    return {
      count: data.length,
      list: data
    };
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'getAllHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getTypeHelmet = async () => {
  try {
    const data = await Database.getTypeHelmet();

    if (data.length === 0) {
      return Boom.notFound('Type Helmet not found');
    }

    return {
      count: data.length,
      list: data
    };
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'getTypeHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const addHelmet = async (req) => {
  try {
    await Database.addHelmet(req.body.type, req.body.name, req.body.price, req.body.stock);
    return `Added '${req.body.name}' as '${req.body.price}' to helmet with stock ${req.body.stock}`;
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'addHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const editHelmet = async (req) => {
  try {
    const editAction = await Database.editHelmet(req.params.id, req.body.price, req.body.stock);

    if (!editAction) {
      return Boom.notFound(`Helmet with id ${req.params.id} not found `);
    }
    return `Helmet with id ${req.params.id} has been updated price to ${req.body.price} and stock to ${req.body.stock} `;
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'editHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const deleteHelmet = async (req) => {
  try {
    const deleteAction = await Database.deleteHelmet(req.params.id);

    if (!deleteAction) {
      return Boom.notFound(`Helmet with id ${req.params.id} not found `);
    }
    return `Delete id ${req.params.id} successfully`;
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'deleteHelmet', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const loginAccount = async (req) => {
  try {
    const userData = await Database.loginAccount(req.body.username.toLowerCase(), req.body.password);

    if (!userData) {
      return Boom.badData('Account not found, username or password wrong !');
    }

    const token = jwt.sign(
      { id: userData[0].id, username: userData[0].username },
      process.env.JWT_SECRET || 'oajdw99201dnds',
      {
        expiresIn: '1h'
      }
    );

    return {
      id: userData[0].id,
      username: userData[0].username,
      token_login: token
    };
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'loginAccount', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const registerAccount = async (req) => {
  try {
    const hashPasswrd = await bcrypt.hash(req.body.password, 10);
    const data = await Database.registerAccount(req.body.username.toLowerCase(), hashPasswrd);

    if (data === 'ER_DUP_ENTRY') {
      return Boom.conflict('Username already exist');
    }

    return `Register ${req.body.username.toLowerCase()} successfully`;
  } catch (error) {
    CommonHelper.log(['Helmet Helper', 'registerAccount', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

module.exports = {
  getAllHelmet,
  getTypeHelmet,
  addHelmet,
  editHelmet,
  deleteHelmet,
  loginAccount,
  registerAccount
};
