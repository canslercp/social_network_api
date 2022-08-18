const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that id'})
                    : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    },

    //create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id}},
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Created the thought')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //update Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      //delete thought
      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : User.findOneAndUpdate(
                  { username: req.params.username },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res
                  .status(404).json({ message: 'No user with this username!' })
              : res.json({ message: 'Thought successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },

      //create a reaction stored in a single thought's reactions array field
      createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this ID'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
      },

      //remove a reaction by the reaction's reactionId value
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionsId } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that id' } )
                : res.json({ message: 'Reaction successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
      }
}