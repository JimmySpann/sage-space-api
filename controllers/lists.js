import db from '../models/index.js';
import logger from '../lib/logger.js';
import { checkUserPermissions } from '../lib/permissions.js'
import { handleResError } from '../lib/handleRes.js'

const index = async (req, res) => {
  try {
    const userId = req.currentUser.id
    const foundLists = await db.List
      .find({ 'users.id':  userId })
      .populate({ path: 'items', model: 'Task' });
      
    res.status(200).json(foundLists);
  } catch(error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const show = (req, res) => {
  // db.List.findById(req.params.id, (err, foundList) => {
  //   if (err) console.log('Error in lists#show:', err);
  // }).populate('tasks').exec((err, foundList) => {
  //   res.status(200).send(foundList);
  // });
};

const create = async (req, res) => {
  try {
    const { body, currentUser } = req;
    body.users = [{
      id: currentUser.id,
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
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const update = async (req, res) => {
  try {
    const { body, currentUser, params } = req;
    delete body.users; // no permission changes;

    const permissionsError = await checkUserPermissions(params.id, currentUser, ['owner']);
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    const updatedList = await db.List.findByIdAndUpdate(params.id, body, { new: true }).catch(error => { throw error });

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

    const permissionsError = await checkUserPermissions(params.id, currentUser, ['owner']);
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    const deletedList = await db.List.findByIdAndDelete(params.id).catch(error => { throw error });

    if (deletedList) {
      const distinctItems = await db.List.distinct('items');
      await deletedList.items.forEach(async item => {
        const doesItemIdExistElseWhere = distinctItems.includes(item);
        if (!doesItemIdExistElseWhere) {
          await db.Task.findByIdAndDelete(item).catch(error => { throw error });
        }
      });
    }

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
