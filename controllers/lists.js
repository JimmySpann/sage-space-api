import db from '../models/index.js';
import logger from '../lib/logger.js';
import { checkUserPermissions } from '../lib/permissions.js'
import { handleResError } from '../lib/handleRes.js'

const index = async (req, res) => {
  try {
    const userId = req.currentUser.id;

    const foundLists = await db.List
      .find({ 'users.id':  userId, 'users.role': 'owner' })
      .populate({ path: 'items', model: 'Task' });

   const userLists = await db.List
    .find({ 'users.id':  userId, 'users.role': 'owner' })
    .select('_id name')

    res.status(200).json({ foundLists, userLists });
  } catch(error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const show = async (req, res) => {
  try {
    const listId = req.params.id;
    const userId = req.currentUser.id;

    const foundLists = await db.List
      .find({ 'users.id':  userId, 'users.role': 'owner', _id: listId })
      .populate({ path: 'items', model: 'Task' });

    const userLists = await db.List
      .find({ 'users.id':  userId, 'users.role': 'owner' })
      .select('_id name')

    res.status(200).json({ foundLists, userLists });
  } catch(error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const create = async (req, res) => {
  try {
    const { body, currentUser } = req;

    // Set currentUser as owner
    body.users = [{
      id: currentUser.id,
      role: 'owner'
    }];

    // create list
    const createdList = await db.List.create(req.body)
      .catch(err => { throw err });

    // parse list
    const parsedList = {
      _id: createdList._id,
      name: createdList.name,
      items: createdList.items,
      type: createdList.type,
      users: createdList.users,
      createdAt: createdList.createdAt,
    }

    // log to server and send parsedList to user
    logger.info(`${body.type} list created by ${currentUser.email}`);
    res.status(200).json(parsedList);
  } catch (error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const update = async (req, res) => {
  try {
    const { body, currentUser, params } = req;

    delete body.users; // to prevent permission changes;

    // handle checkUserPermissions to use list
    const permissionsError = await checkUserPermissions(params.id, currentUser, ['owner']);
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    // update list
    const updatedList = await db.List.findByIdAndUpdate(params.id, body, { new: true }).catch(error => { throw error });

    // send updatedList to user
    res.status(200).json(updatedList);
  }
  catch (error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const destroy = async (req, res) => {
  try {
    const { currentUser, params } = req;

    // handle checkUserPermissions to use list
    const permissionsError = await checkUserPermissions(params.id, currentUser, ['owner']);
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    // delete list
    const deletedList = await db.List.findByIdAndDelete(params.id).catch(error => { throw error });

    const deleteTasksIfTheyAreNotInAnotherList = async () => {
      if (deletedList) {
        const distinctItems = await db.List.distinct('items');
        await deletedList.items.forEach(async item => {
          const doesItemIdExistElseWhere = distinctItems.includes(item);
          if (!doesItemIdExistElseWhere) {
            await db.Task.findByIdAndDelete(item).catch(error => { throw error });
          }
        });
      }
    };
    await deleteTasksIfTheyAreNotInAnotherList().catch(error => { throw error });


    res.status(200).json(deletedList);
  } 
  catch (e) {
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
