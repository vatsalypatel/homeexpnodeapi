/**================================================================ 
            History Of The File 
    Author          - Vatsaly Patel 
    purpose         - Writing - API all Routes are handled, with passport auth.
==================================================================== **/
var fs = require("fs");
var loginController = require("../controllers/loginController"),
    categoryController = require("../controllers/categoryController");    

module.exports = function(app, passport) {


    app.all('/*', function(req, res, next){
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'my-header,X-Requested-With,content-type,Authorization,cache-control');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    })

    // HOME PAGE (with login links)
    app.get('/', function(req, res) {
        res.send('OK');
    });

    /**User Login Related APIs **/
    // LOGIN
    app.post('/login', passport.authenticate('local-login', {session : true}), loginController.getUser);
    // SIGNUP
    app.post('/signup', passport.authenticate('local-signup', {session : true}), loginController.getUser);
    
    app.get('/logout', loginController.logoutUser);

    app.get('/category', isLoggedIn, categoryController.getCategories);
    
    // app.post('/deleteAssessment', isLoggedIn, riskAssessmentController.deleteAssessment);
    
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on     
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}