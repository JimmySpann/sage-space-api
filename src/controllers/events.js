const db = require('../models');

const index = (req, res) => {
  db.Event.find({}, (err, foundEvents) => {
    if (err) console.log('Error in event#index:', err);
    res.status(200).json(foundEvents);
  });
};

const show = (req, res) => {
  db.Event.findById(req.params.id, (err, foundEvent) => {
    if (err) console.log('Error in event#show:', err);
    res.status(200).send(foundEvent);
  });
};

const create = (req, res) => {
  db.Event.create(req.body, (err, savedEvent) => {
    if (err) console.log('Error in events#create:', err);
    res.status(200).json(savedEvent);
  });
};

const update = (req, res) => {
  db.Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEvent) => {
    if (err) console.log('Error in event#update:', err);

    if (!updatedEvent) {
      res.status(400).json({message: `Could not find event with id ${req.params.id}`});
    }

    res.json(updatedEvent);
  });
};

const destroy = (req, res) => {
  db.Event.findByIdAndDelete(req.params.id, (err, deletedEvent) => {
    if (err) console.log('Error in event#destroy:', err);

    res.status(200).json(deletedEvent);
  });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};