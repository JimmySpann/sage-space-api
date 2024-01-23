const db = require('../models');

const index = (req, res) => {
  const userId = req.currentUser.id
  db.List.find({ 'users.id':  userId }, (err, foundLists) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again",
      });
    }
    console.log(foundLists)
    res.status(200).json(foundLists);
  });
};

const show = (req, res) => {
  db.List.findById(req.params.id, (err, foundList) => {
    if (err) console.log('Error in lists#show:', err);
  }).populate('tasks').exec((err, foundList) => {
    res.status(200).send(foundList);
  });
};

const create = (req, res) => {
  req.body.users = [{
    id: req.currentUser.id,
    role: 'owner'
  }];

  db.List.create(req.body, (err, savedList) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again",
      });
    }

    const sendList = {
      _id: savedList._id,
      name: savedList.name,
      items: savedList.items,
      type: savedList.type,
      users: savedList.users,
      createdAt: savedList.createdAt,
    }
    
    console.log(`${req.body.type} list created by ${req.currentUser.email}`);
    res.status(200).json(sendList);
  });
};

const update = (req, res) => {
  db.List.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedList) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again",
      });
    }

    if (!updatedList) {
      res.status(400).json({message: `Could not find List with id ${req.params.id}`});
    }

    res.json(updatedGame);
  });
};

const addTaskToList = (req, res) => {
  db.List.findById(req.listId, (err, foundList) => {
    if (err) console.log('Error in lists#show:', err);
    const listId = req.listId;
    const taskId = req.taskId;
    foundList.tasks.push(taskId);
    db.List.findByIdAndUpdate(listId, foundList, { new: true }, (err, updatedList) => {
      if (err) console.log('Error in lists#update:', err);
  
      if (!updatedList) {
        // res.status(400).json({message: `Could not find List with id ${req.params.id}`});
      }
    })
    // res.status(200).json(updatedList);
  });
};

const destroy = (req, res) => {
  db.List.findByIdAndDelete(req.params.id, (err, deletedList) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again",
      });
    }

    res.status(200).json(deletedList);
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
