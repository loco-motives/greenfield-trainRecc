var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    userModel = require('.././db/index.js').User;

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        (username, password, done) => {
            userModel.findOne({
                where: {'username': username}}
            ).then( (user) => {
                if (user === null) {
                    console.log('Username does not exist');
                    return done(null, false, {message: 'Wrong user/password'});
                }

                var hashedPassword = bcrypt.hashSync(password, user.salt);
                if(user.password === hashedPassword){
                    console.log('logged in');
                    return done(null, user);
                }
                console.log('Password does not match');
                return done(null, false, {message: 'Wrong user/password'});
            });
        }
    ));

    passport.serializeUser( (user, done) => {
        console.log('serializeUser');
        done(null, user.id);
    });

    passport.deserializeUser( (id, done) => {
        console.log('deserializeUser');
        userModel.findOne({
            where: {
                'id': id
            }
        }).then( (user) => {
            if (user === null) {
                done(new Error('Wrong user id'))
            }
            console.log('deserializeUser .then');
            done(null, user);
        });
    });
}
