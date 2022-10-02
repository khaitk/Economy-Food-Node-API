//import controllers
const testController = require('../controllers/TestController');
const userController = require('../controllers/UsersController');
const auth = require('../middlewares/auth');

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.send({ message: 'Khai TK - Node JS - MySQL - Docker' });
    });

    app.get('/get-test', testController.getTest);
    //app.get( '/get-member/:memberCode', memberController.getMember )
    //app.post( '/sign-in', validate.validateLogin(), memberController.logIn )

    //create account
    app.post('/sign-in', userController.createAccount);
    app.post('/login-in', userController.login);
    app.get('/get-profile', auth, userController.getProfile);
};
