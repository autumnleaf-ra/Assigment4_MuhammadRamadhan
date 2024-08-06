const bcrypt = require('bcrypt');
const MySQL = require('mysql2/promise');
const CommonHelper = require('../helpers/CommonHelper');

const connectionPool = MySQL.createPool({
  host: process.env.MYSQL_CONFIG_HOST || 'localhost',
  user: process.env.MYSQL_CONFIG_USER || 'root',
  password: process.env.MYSQL_CONFIG_PASSWORD || 'password',
  database: process.env.MYSQL_CONFIG_DATABASE || 'helmet_store',
  port: Number(process.env.MYSQL_PORT) || 3306,
  connectionLimit: Number(process.env.MYSQL_CONN_LIMIT) || 0
});

const helmetTable = process.env.HELMET_TABLE || 'helmets';
const helmetTypeTable = process.env.HELMET_TYPE_TABLE || 'type';
const helmetUser = process.env.HELMET_USER || 'user';

// Helmet
const executeQuery = async (query, values = []) => {
  let connection = null;
  try {
    connection = await connectionPool.getConnection();
    const timeStart = process.hrtime();
    const [result] = await connection.query(query, values);
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'Operation', 'INFO'], {
      message: { query, timeTaken }
    });
    if (connection) connection.release();
    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'Operation', 'ERROR'], {
      message: `${error}`
    });
    if (connection) connection.release();
    if (error?.code === 'ER_DUP_ENTRY') {
      return 'ER_DUP_ENTRY';
    }
    throw error;
  }
};

const getListHelmet = async () => {
  const querySelect =
    'SELECT helmets.id, helmets.name, helmets.price, helmets.stock, helmets.name, type.name as type FROM helmets INNER JOIN type ON helmets.type_id=type.id';
  const rawResult = await executeQuery(querySelect);
  return Object.values(JSON.parse(JSON.stringify(rawResult)));
};

const getTypeHelmet = async () => {
  const query = `SELECT * FROM ${helmetTypeTable}`;
  const rawResult = await executeQuery(query);
  return Object.values(JSON.parse(JSON.stringify(rawResult)));
};

const addHelmet = async (type, name, price, stock) => {
  const query = `INSERT INTO ${helmetTable} (type_id, name, price, stock) VALUES (?, ?, ?, ?)`;
  await executeQuery(query, [type, name, price, stock]);
};

const editHelmet = async (id, price, stock) => {
  const query = `UPDATE ${helmetTable} SET price = ?, stock = ? WHERE id = ?`;
  const result = await executeQuery(query, [price, stock, id]);
  return result?.affectedRows > 0;
};

const loginAccount = async (username, password) => {
  const query = `SELECT * FROM ${helmetUser} WHERE username = ?`;
  const rawResult = await executeQuery(query, [username]);
  const result = Object.values(JSON.parse(JSON.stringify(rawResult)));

  if (result.length === 0) {
    return null;
  }

  const user = result[0];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  return result;
};

const registerAccount = async (username, password) => {
  const query = `INSERT INTO ${helmetUser} (username, password) VALUES (?, ?)`;
  const result = await executeQuery(query, [username, password]);

  return result;
};

const deleteHelmet = async (id) => {
  const query = `DELETE FROM ${helmetTable} WHERE id = ?`;
  const result = await executeQuery(query, [id]);
  return result?.affectedRows > 0;
};

module.exports = {
  getListHelmet,
  getTypeHelmet,
  addHelmet,
  editHelmet,
  deleteHelmet,
  loginAccount,
  registerAccount
};
