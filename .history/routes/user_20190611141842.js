const express = require('express');

const router = express.Router();

const { body } = require('express-validator/check');

const AuthenticiateUser = require('../controllers/user');

//get /student/login
router.get('student/login');

//post /student/login
router.post('student/login',AuthenticiateUser.Login);

//get /student/signup
router.get('student/signup');

//post /student/signup
router.post('student/signup',[
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
  ],
  AuthenticiateUser.Login
);

router.get('/teacher/signup');

router.post('/teacher/signup');

router.get('/teacher/login');

router.post('/teacher/login');


module.exports  = router;