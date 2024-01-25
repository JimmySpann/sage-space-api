import db from '../models/index.js';
import logger from '../lib/logger.js';
import Lists from './lists.js';

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

const create = async (req, res) => {
  try {
    const body = req.body;
    const currentUser = req.currentUser;
    body.user = [currentUser.id];

    const foundList = await db.List.findById(body.listId).catch(error => { throw error });
    if(!foundList) {
      return res.status(400).json({
        status: 400,
        message: "List Id is invalid",
      })
    };

    const savedTask = await db.Task.create(body).catch(error => { throw error });
    foundList.items.push(savedTask._id);

    const updatedList = await db.List.findByIdAndUpdate(body.listId, foundList, { new: true }).catch(error => { throw error });
    if(!updatedList) {
      return res.status(500).json({
        status: 500,
        message: "Failed to update list",
      })
    };

    const sendTask = {
      _id: savedTask._id,
      name: savedTask.name,
      isHidden: savedTask.isHidden,
      isCompleted: savedTask.isCompleted,
      description: savedTask.description,
      createdAt: savedTask.createdAt,
      listId: foundList._id
    };

    res.status(200).json(sendTask);
  }
  catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

const update = async (req, res) => {
  try {
    const updatedTask = await db.Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).catch(error => { throw error });

    if (!updatedTask) {
      return res.status(400).json({message: `Could not find Task with id ${req.params.id}`});
    }

    res.json(updatedTask);
  }
  catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const deletedTask = await db.Task.findByIdAndDelete(req.params.id).catch(error => { throw error });
    res.status(200).json(deletedTask);
  }
  catch (error) {
    logger.error(error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};


const controllers = {
    index,
    show,
    create,
    update,
    destroy,
};

export default controllers;
