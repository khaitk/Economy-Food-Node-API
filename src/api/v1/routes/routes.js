//import controllers
const testController = require('../controllers/TestController');
const userController = require('../controllers/UsersController');

module.exports = function(app) {
    //khai báo router
    app.get('/', (req, res) => {
        res.send({ message: 'Khai TK - Node JS - MySQL - Docker' });
    });

    app.get('/get-test', testController.getTest);
    app.get('/get-user', userController.findOne);
    //app.get( '/get-member/:memberCode', memberController.getMember )
    //app.post( '/sign-in', validate.validateLogin(), memberController.logIn )
};
