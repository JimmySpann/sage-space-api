import db from '../models/index.js';
import logger from '../lib/logger.js';

const index = async (req, res) => {
  try {
    const userId = req.currentUser.id
    const foundLists = await db.List
      .find({ 'users.id':  userId })
      .populate({ path: 'items', model: 'Task' });
      
    res.status(200).json(foundLists);
  } catch(error) {
    logger.error(error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

const show = (req, res) => {
  db.List.findById(req.params.id, (err, foundList) => {
    if (err) console.log('Error in lists#show:', err);
  }).populate('tasks').exec((err, foundList) => {
    res.status(200).send(foundList);
  });
};

const create = async (req, res) => {
  try {
    const { body, currentUser } = req;
    body.users = [{
      id: req.currentUser.id,
      role: 'owner'
    }];

    const createdList = await db.List.create(req.body).catch(err => { throw err });

    const savedList = {
      _id: createdList._id,
      name: createdList.name,
      items: createdList.items,
      type: createdList.type,
      users: createdList.users,
      createdAt: createdList.createdAt,
    }

    logger.info(`${body.type} list created by ${currentUser.email}`);
    res.status(200).json(savedList);
  } catch (error) {
    logger.error(err);
    res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

const update = async (req, res) => {
  try {
    const updatedList = await db.List.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedList) {
      res.status(400).json({message: `Could not find List with id ${req.params.id}`});
    }

    res.status(200).json(updatedList);
  }
  catch (error) {
    logger.error(err);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const deletedList = await db.List.findByIdAndDelete(req.params.id).catch(error => { throw error });
    res.status(200).json(deletedList);
  } 
  catch (e) {
    logger.error(err);
    res.status(500).json({
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
