import db from '../models/index.js';
import { checkUserPermissions } from '../lib/permissions.js'
import { handleResError } from '../lib/handleRes.js'
import Lists from './lists.js';

const index = (req, res) => {
  // db.Task.find({}, (err, foundTasks) => {
  //   if (err) console.log('Error in tasks#index:', err);
  //   const list = {
  //     name: 'First Ever Task List',
  //     tasks: foundTasks
  //   }
  //   res.status(200).json(list);
  // });
};

const show = (req, res) => {
  // db.Task.findById(req.params.id, (err, foundTask) => {
  //   if (err) console.log('Error in tasks#show:', err);

  //   res.status(200).send(foundTask);
  // });
};

const create = async (req, res) => {
  try {
    const body = req.body;
    const currentUser = req.currentUser;
    body.user = [currentUser.id];

    const permissionsError = await checkUserPermissions(body.listId, currentUser, ['owner', 'edit']);
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    const foundList = await db.List.findById(body.listId).catch(error => { throw error });
    if(!foundList) {
      const message = 'List Id is invalid';
      return handleResError(res, error, message, 400);
    };

    const savedTask = await db.Task.create(body).catch(error => { throw error });
    foundList.items.push(savedTask._id);

    const updatedList = await db.List.findByIdAndUpdate(body.listId, foundList, { new: true }).catch(error => { throw error });
    if(!updatedList) {
      const message = 'Failed to update list';
      return handleResError(res, error, message, 500);
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
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const update = async (req, res) => {
  try {
    const { params, body, currentUser } = req;

    const permissionsError = await checkUserPermissions(body.listId, currentUser, ['owner', 'edit']);
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    const updatedTask = await db.Task.findByIdAndUpdate(params.id, body, { new: true }).catch(error => { throw error });
    if (!updatedTask) {
      return res.status(400).json({message: `Could not find Task with id ${params.id}`});
    }

    res.json(updatedTask);
  }
  catch (error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const destroy = async (req, res) => {
  // Not well built. Come back and fix some time. - JS 1/24/24
  try {
    const { params } = req;

    const deletedTask = await db.Task.findByIdAndDelete(params.id).catch(error => { throw error });
    res.status(200).json(deletedTask);
  }
  catch (error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
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
