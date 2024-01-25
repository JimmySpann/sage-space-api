import db from '../models/index.js';
import { checkUserPermissions } from '../lib/permissions.js'
import { handleResError } from '../lib/handleRes.js'

const create = async (req, res) => {
  try {
    const { body, currentUser } = req;
    
    // add currentUser as user in task (not used)
    body.user = [currentUser.id];

    // handle checkUserPermissions to use list
    const permissionsError = await checkUserPermissions(body.listId, currentUser, ['owner', 'edit']);
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    // create task
    const createdTask = await db.Task.create(body).catch(error => { throw error });

    // find list and update with new task
    const foundList = await db.List.findById(body.listId).catch(error => { throw error });
    foundList.items.push(createdTask._id);
    const updatedList = await db.List.findByIdAndUpdate(body.listId, foundList, { new: true }).catch(error => { throw error });
    if(!updatedList) {
      const message = 'Failed to update list';
      return handleResError(res, error, message, 500);
    };

    // parse task sent to user
    const parsedTask = {
      _id: createdTask._id,
      name: createdTask.name,
      isHidden: createdTask.isHidden,
      isCompleted: createdTask.isCompleted,
      description: createdTask.description,
      createdAt: createdTask.createdAt,
      listId: foundList._id
    };

    // send task back to user
    res.status(200).json(parsedTask);
  }
  catch (error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const update = async (req, res) => {
  try {
    const { params, body, currentUser } = req;

    // handle checkUserPermissions to use list
    const permissionsError = await checkUserPermissions(body.listId, currentUser, ['owner', 'edit']);
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    // update task
    const updatedTask = await db.Task.findByIdAndUpdate(params.id, body, { new: true }).catch(error => { throw error });
    if (!updatedTask) {
      return res.status(400).json({message: `Could not find Task with id ${params.id}`});
    }

    // send updatedTask to user
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
    create,
    update,
    destroy,
};

export default controllers;
