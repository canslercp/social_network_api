const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID'})
                    : res.json(user)
                    )
                    .catch((err) => res.status(500).json(err));
    },
    //creat a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
   
    //update user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id'})
                : res.json(video)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId})
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id'})
                : res.json({ message: 'User successfully deleted!' })
                )
                .catch((err) => res.status(500).json(err));
    },

    //add a new friend to a user's friend list
    addFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body} },
            { runValidators: true, new: true }
            )
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that id'})
                : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
    },

    //remove a friend from a user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId }}},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this is'})
                : res.json(video)
        )
        .catch((err) => res.status(500).json(err));
    },
};
