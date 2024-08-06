const router = require('express').Router();

const HelmetHelper = require('../helpers/HelmetHelper');
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const { verifyToken } = require('../services/Middleware');

const getListHelmet = async (req, res) => {
  try {
    const data = await HelmetHelper.getAllHelmet();
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Helmet', 'Get List Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });

    return res.send(CommonHelper.errorResponse(error));
  }
};

const getListTypeHelmet = async (req, res) => {
  try {
    const data = await HelmetHelper.getTypeHelmet();
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Helmet', 'Get Type Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });

    return res.send(CommonHelper.errorResponse(error));
  }
};

const addHelmet = async (req, res) => {
  try {
    // TODO : Add Validation
    ValidationHelper.helmetAddValidation(req.body);
    const data = await HelmetHelper.addHelmet(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet', 'Add Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });

    return res.send(CommonHelper.errorResponse(error));
  }
};

const editHelmet = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.helmetEditValidation(req.body);
    // get data from json
    const data = await HelmetHelper.editHelmet(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet', 'Edit Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const deleteHelmet = async (req, res) => {
  try {
    // get data from json
    const data = await HelmetHelper.deleteHelmet(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Helmet', 'Delete Helmet', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const loginAccount = async (req, res) => {
  try {
    ValidationHelper.loginValidation(req.body);
    const data = await HelmetHelper.loginAccount(req);
    return res.send(data);
  } catch (error) {
    return res.send(CommonHelper.errorResponse(error));
  }
};

const registerAccount = async (req, res) => {
  try {
    ValidationHelper.loginValidation(req.body);
    const data = await HelmetHelper.registerAccount(req);
    return res.send(data);
  } catch (error) {
    return res.send(CommonHelper.errorResponse(error));
  }
};

router.use(CommonHelper.preHandler);
router.post('/login', loginAccount);
router.post('/register', registerAccount);

// use middleware for verify token

router.get('/all', verifyToken, getListHelmet);
router.get('/type', verifyToken, getListTypeHelmet);
router.post('/add_helmet', verifyToken, addHelmet);
router.put('/edit_helmet/:id', verifyToken, editHelmet);
router.delete('/delete/:id', verifyToken, deleteHelmet);

module.exports = router;
