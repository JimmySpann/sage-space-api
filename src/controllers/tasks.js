const db = require('../models');
const Lists = require('./lists')

const index = (req, res) => {
  db.Task.find({}, (err, foundTasks) => {
    if (err) console.log('Error in games#index:', err);
    console.log(foundTasks)
    res.status(200).json(foundTasks);
  });
};

const show = (req, res) => {
  db.Task.findById(req.params.id, (err, foundTask) => {
    if (err) console.log('Error in games#show:', err);

    res.status(200).send(foundTask);
  });
};

const create = (req, res) => {
  req.body.user = [req.currentUser.id];
  db.Task.create(req.body, (err, savedTask) => {
    if (err) console.log('Error in games#create:', err);
    const listId = savedTask.list;
    console.log('list', savedTask);
    const taskId = savedTask._id;

    Lists.addTaskToList({ listId, taskId }, (err, savedTask) => {
    });
    
    res.status(200).json(savedTask);
  });

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
