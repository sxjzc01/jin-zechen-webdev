var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
// var userModel = mongoose.model('UndergraduateUserModel', userSchema);

var userModel = mongoose.model('UserModel', userSchema);


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.addFriend = addFriend;
userModel.findUserByName = findUserByName;

userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;

function findAllUsers() {
    return userModel.find();
}


function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    return userModel.update({_id: userId}, {
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function addFriend(userId, friendId, $location) {
    userModel
        .findUserById(friendId)
        .then(function (friend) {
            if (!friend.followedBy) {
                return userModel.update({_id: friendId}, {$set:
                    {followedBy: [userId]}})
            } else {
                var newUid = mongoose.Types.ObjectId(userId);
                friend.followedBy.push(newUid);
                var newUsers = friend.followedBy;

                return userModel.update({_id: friendId}, {$set: {followedBy: friend.followedBy}})
                    .then(function () {
                        return userModel.findUserById(friendId);
                    })
            }
        });
    return userModel.findUserById(userId)
        .then(function (user) {
            if (!user.followList) {
                return userModel.update({_id: userId}, {$set:
                    {followList: [friendId]}})
            } else {
                var newFid = mongoose.Types.ObjectId(friendId);
                user.followList.push(newFid);
                var newFriends = user.followList;

                return userModel.update({_id: userId}, {$set: {followList: user.followList}})
                    .then(function () {
                        return userModel.findUserById(userId);
                    })
            }
        })
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByName(username) {
    return userModel.findOne({username: username});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    user.roles = ['USER'];
    return userModel.create(user);
}