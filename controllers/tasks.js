const db = require('../models');

const index = (req, res) => {
  db.Task.find({}, (err, foundGames) => {
    if (err) console.log('Error in games#index:', err);

    res.status(200).json(foundGames);
  });
};

const show = (req, res) => {
  db.Task.findById(req.params.id, (err, foundGame) => {
    if (err) console.log('Error in games#show:', err);

    res.status(200).send(foundGame);
  });
};

const create = (req, res) => {
  console.log(req.currentUser);
  // db.Task.create(req.body, (err, savedTask) => {
  //   if (err) console.log('Error in games#create:', err);

    res.status(200).json(req.currentUser);
  // });
};

const update = (req, res) => {
  db.Task.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedGame) => {
    if (err) console.log('Error in games#update:', err);

    if (!updatedGame) {
      res.status(400).json({message: `Could not find Game with id ${req.params.id}`});
    }

    res.json(updatedGame);
  });
};

const destroy = (req, res) => {
  db.Task.findByIdAndDelete(req.params.id, (err, deletedGame) => {
    if (err) console.log('Error in games#destroy:', err);

    res.status(200).json(deletedGame);
  });
};


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
