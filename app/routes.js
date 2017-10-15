// app/routes.js

module.exports = function (app , passport) {

    // home page ( with login links )

    app.get('/' , function(req, res) {
        res.render('index.ejs') // load the index.ejs file
    });

    // login
    app.get('/login', function(req,res) {
    //render the page and pass in any flash data if exists
        res.render('login.ejs' , {message: req.flash('Bienvenue') });
    });

    //process the login form
    app.post('/login', passport.authenticate('local-login' ,{
        sucessRedirect: '/profile', //redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is and error
        failureFlash: true // allow flash messages
    }));


    // SINGUP
    // Show the signup form

    app.get('/signup', function (req,res) {
        //render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message :req.flash('Signup sucess!')});

    });

    //process the signup form
    app.post('/signup', passport.authenticate('local-signup',{
        sucessRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is and error
        failureFlash : true //allow flash messages
    }));

    // profile section
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the islogged function)

    app.get('/profile', isLoggedIn, function(req,res) {
        user : req.user // get the user out of session
    });

    //LOGOUT
    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authentificated in the session , carry on 
    if (req.isAuthenticated())
    return next();

    //if they aren't redirect them to the home page
    res.redirect('/');
}