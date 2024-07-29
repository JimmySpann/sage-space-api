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
  }).populate('tasks').exec((err, foundList) => {
    res.status(200).send(foundList);
  });
};

const create = (req, res) => {
  db.List.create(req.body, (err, savedList) => {
    if (err) console.log('Error in games#create:', err);

    res.status(200).json(savedList);
  });
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

const addTaskToList = (req, res) => {
  db.List.findById(req.listId, (err, foundList) => {
    if (err) console.log('Error in games#show:', err);
    const listId = req.listId;
    const taskId = req.taskId;
    console.log('foundList', foundList, err, listId, taskId);
    foundList.tasks.push(taskId);
    db.List.findByIdAndUpdate(listId, foundList, { new: true }, (err, updatedList) => {
      if (err) console.log('Error in games#update:', err);
  
      if (!updatedList) {
        // res.status(400).json({message: `Could not find List with id ${req.params.id}`});
      }
    })
    // res.status(200).json(updatedList);
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
    addTaskToList,
};
