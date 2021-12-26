const db = require('../models');

const index = (req, res) => {
  db.List.find({}, (err, foundLists) => {
    if (err) console.log('Error in games#index:', err);
    console.log(foundLists)
    res.status(200).json(foundLists);
  });
};

const show = (req, res) => {
  db.List.findById(req.params.id, (err, foundList) => {
    if (err) console.log('Error in games#show:', err);

    res.status(200).send(foundList);
  });
};

const create = (req, res) => {
  console.log(req.currentUser);
  // db.List.create(req.body, (err, savedList) => {
  //   if (err) console.log('Error in games#create:', err);

    res.status(200).json(req.currentUser);
  // });
};

const update = (req, res) => {
  db.List.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedGame) => {
    if (err) console.log('Error in games#update:', err);

    if (!updatedGame) {
      res.status(400).json({message: `Could not find Game with id ${req.params.id}`});
    }

    res.json(updatedGame);
  });
};

const destroy = (req, res) => {
  db.List.findByIdAndDelete(req.params.id, (err, deletedGame) => {
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
