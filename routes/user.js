const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controllers/user');
// const {} = require

const router = express.Router();
// function namecheck(req,res,next) {
//     console.log("Enne tak aagelio");
//     next();
// }
//signup
router.post('/', handleUserSignup)
router.post('/login', handleUserLogin)

module.exports = router;