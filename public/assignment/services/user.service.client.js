(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);
    function userService () {
        var users = [
            {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder'},
            {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
            {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia'},
            {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi'}
        ];

        return {
            "createUser"    : createUser,
            "findUserById"  : findUserById,
            "findUserByUsername"    : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser"    : updateUser,
            "deleteUser"    : deleteUser
        };

        function createUser (user) {
            user._id = (new Date()).getTime() + '';
            user.created = new Date();
            users.push(user);
            return user
        }

        function findUserById (id) {
            for (var u in users) {
                if (users[u]._id === id) {
                    return users[u]
                }
            }
            return null
        }

        function findUserByUsername (username) {
            for (var u in users) {
                if (users[u].username === username) {
                    return users[u]
                }
            }
            return null
        }

        function findUserByCredentials (username, password) {
            var user = findUserByUsername(username);
            if (user !== null) {
                if (user.password === password) {
                    return user
                }
            } else {
                return null
            }
        }

        function updateUser (userId, user) {
            var u = findUserById(userId);
            if (u !== null) {
                u.username = user.username;
                u.firstName = user.firstName;
                u.lastName = user.lastName;
                return u
            } else {
                return
            }
        }

        function deleteUser (userId) {
            var userIndex = users.findIndex(function (user) {
                return (userId === user._id)
            });
            if (userIndex >= 0) {
                users.splice(userIndex, 1)
            }
        }
    }
})()
