var bcrypt = require('bcryptjs'),
    userModel = require('../../db/index.js').User;

var users = {
    get: function(req, res){
        console.log('Serving request for ', req.method, 'where url is ', req.url);
        res.send('got');
    }
};

var signup = {
    // get: function(req, res){
    //     res.render('/signup');
    // }
    post: function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        if(!username || !password) {
            req.flash('error', 'Please fill out all fields');
            // res.redirect('signup');
        }

        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(password, salt);

        var newUser = {
            username: username,
            salt: salt,
            password: hashedPassword
        }

        Model.user.create(newUser).then( () => {
            res.redirect('/');
        }). catch( (err) => {
            req.flash('error', 'Please choose a different username');
            // res.redirect('/signup');
        });
    }
}
module.exports = {
    users: users,
    signup: signup
};