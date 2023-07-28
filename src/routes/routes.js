const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.post('/gym/personal/register', controllers.registerPersonal);
router.post('/gym/personal/login', controllers.loginPersonal);

router.post('/gym/user/register', controllers.registerUser);
router.post('/gym/user/login', controllers.loginUser);

module.exports = router;
