
var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


var facebookConfig = {
    clientID     : '445923495784658',
    clientSecret : '31415a8ad96e8ff18a304b2a82d30b37',
    callbackURL  : '/auth/facebook/callback'
    // callbackURL  : 'http://localhost:3000/auth/facebook/callback'
};

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var names = profile.displayName.split(" ");
                    var newFacebookUser = {
                        username: names[1] + names[0],
                        lastName:  names[1],
                        firstName: names[0],
                        email: profile.email,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    }
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));





// app.get   ('/api/assignment/user', findUserByCredentials);
// app.get   ('/api/assignment/user', isAdmin, findAllUsers);
app.get   ('/api/assignment/user', findAllUsers);
app.get   ('/api/assignment/user/:userId', findUserById);
app.post  ('/api/assignment/user', createUser);
app.put   ('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', isAdmin, deleteUser);
app.post('/api/assignment/unregister', unregister);
app.put('/api/assignment/user/:userId/friends', addFriend);
// app.get("/api/assignment/user?username=username", findUserByUsername);

app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.get    ('/api/assignment/checkLoggedIn', checkLoggedIn);
app.get    ('/api/assignment/checkAdmin', checkAdmin);
app.post    ('/api/assignment/logout', logout);
app.post    ('/api/assignment/register', register);

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/#!/login'
    }));




var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function addFriend(req, res) {
    var userId = req.body.userId;
    var friendId = req.body.friendId;

    userModel
        .addFriend(userId, friendId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            console.log(err);
        })

}

function register(req, res) {
    var user = req.body;
    // user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            })
        });
}

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    // var user = req.user;
    //
    // if(user && bcrypt.compareSync(password, user.password)) {
    //     return done(null, user);
    // } else {
    //     return done(null, false);
    // }
    var user = req.user;
    res.json(user);
}




function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });

    // var user = users.find(function (user) {
    //     return user._id === userId;
    // });
    // var index = users.indexOf(user);
    // users.splice(index, 1);
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });

    // for(var u in users) {
    //     if(userId === users[u]._id) {
    //         users[u] = user;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });

}



function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query.password;

        if(username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                });
        } else if(username) {
            userModel
                .findUserByName(username)
                .then(function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                });
        } else {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        }

    // var username = req.query['username'];
    // var password = req.query['password'];
    // if(username && password) {
    //     return findUserByCredentials(req, res);
    // }
    //
    //
    // userModel
    //     .findAllUsers()
    //     .then(function (users) {
    //         res.json(users);
    //     });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
    
}


function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

// function findUserByUsername(req, res) {
//     var username = req.query['username'];
//     userModel
//         .findUserByName(username)
//         .then(function (user) {
//             res.json(user);
//         });
// }

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}