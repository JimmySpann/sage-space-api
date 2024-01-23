const db = require('../models');
const Lists = require('./lists')

const index = (req, res) => {
  db.Task.find({}, (err, foundTasks) => {
    if (err) console.log('Error in tasks#index:', err);
    const list = {
      name: 'First Ever Task List',
      tasks: foundTasks
    }
    res.status(200).json(list);
  });
};

const show = (req, res) => {
  db.Task.findById(req.params.id, (err, foundTask) => {
    if (err) console.log('Error in tasks#show:', err);

    res.status(200).send(foundTask);
  });
};

const create = (req, res) => {
  req.body.user = [req.currentUser.id];
  db.Task.create(req.body, (err, savedTask) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again",
      });
    }

    const sendTask = {
      _id: savedTask._id,
      name: savedTask.name,
      isHidden: savedTask.isHidden,
      isCompleted: savedTask.isCompleted,
      description: savedTask.description,
      createdAt: savedTask.createdAt,
    }
    
    res.status(200).json(sendTask);
  });

};

const update = (req, res) => {
  db.Task.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTask) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again",
      });
    }

    if (!updatedTask) {
      return res.status(400).json({message: `Could not find Task with id ${req.params.id}`});
    }

    res.json(updatedTask);
  });
};

const destroy = (req, res) => {
  db.Task.findByIdAndDelete(req.params.id, (err, deletedTask) => {
    if (err) console.log('Error in tasks#destroy:', err);

    res.status(200).json(deletedTask);
  });
};


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
