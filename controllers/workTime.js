const db = require('../models');

const index = (req, res) => {
  db.WorkTime.find({}, (err, foundNotes) => {
    if (err) console.log('Error in notes#index:', err);

    res.status(200).json(foundNotes);
  });
};

const show = (req, res) => {
  db.WorkTime.findById(req.params.id, (err, foundNote) => {
    if (err) console.log('Error in notes#show:', err);

    res.status(200).send(foundNote);
  });
};

const create = (req, res) => {
  db.WorkTime.create(req.body, (err, savedNotes) => {
    if (err) console.log('Error in notes#create:', err);

    res.status(200).json(savedNotes);
  });
};

const update = (req, res) => {
  db.WorkTime.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedNote) => {
    if (err) console.log('Error in notes#update:', err);

    if (!updatedNote) {
      res.status(400).json({message: `Could not find Note with id ${req.params.id}`});
    }

    res.json("updatedNote");
  });
};

const destroy = (req, res) => {
  db.WorkTime.findByIdAndDelete(req.params.id, (err, deletedNote) => {
    if (err) console.log('Error in Notes#destroy:', err);

    res.status(200).json(deletedNote);
  });
};


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
