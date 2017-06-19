var mongoose = require('mongoose');
var databaseUserSchema = require('./databaseUser.schema.server');

var databaseUserModel = mongoose.model('DatabaseUserModel', databaseUserSchema);


databaseUserModel.createUser = createUser;
databaseUserModel.findUserById = findUserById;
databaseUserModel.findUserByCredentials = findUserByCredentials;
databaseUserModel.findAllUsers = findAllUsers;
databaseUserModel.deleteUser = deleteUser;
databaseUserModel.updateUser = updateUser;

databaseUserModel.findUserByFacebookId = findUserByFacebookId;

module.exports = databaseUserModel;

function findAllUsers() {
    return databaseUserModel.find();
}


function findUserByFacebookId(facebookId) {
    return databaseUserModel.findOne({'facebook.id': facebookId});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    return databaseUserModel.update({_id: userId}, {
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function deleteUser(userId) {
    return databaseUserModel.remove({_id: userId});
}



function findUserByCredentials(username, password) {
    return databaseUserModel.findOne({username: username, password: password});
}

function findUserById(userId) {
    return databaseUserModel.findById(userId);
}

function createUser(user) {
    user.roles = ['USER'];
    return databaseUserModel.create(user);
}
