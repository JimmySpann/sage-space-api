import db from '../models/index.js';
import logger from '../lib/logger.js';
import { checkUserPermissions } from '../lib/permissions.js'
import { handleResError } from '../lib/handleRes.js'

const index = async (req, res) => {
  try {
    const userId = req.currentUser.id
    const foundHabits = await db.Habit.find({ 'users.id':  userId, 'users.role': 'owner' }); 
    res.status(200).json(foundHabits);
  } catch(error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const show = (req, res) => {
  // db.Habit.findById(req.params.id, (err, foundHabit) => {
  //   if (err) console.log('Error in habits#show:', err);
  // }).populate('tasks').exec((err, foundHabit) => {
  //   res.status(200).send(foundHabit);
  // });
};

const create = async (req, res) => {
  try {
    console.log('test test test tetst test')
    const { body, currentUser } = req;

    body.users = [{
      id: currentUser.id,
      role: 'owner'
    }];

    body.daysCompleted = [];

    const createdHabit = await db.Habit.create(req.body).catch(err => { throw err });

    const parsedHabit = {
      _id: createdHabit._id,
      name: createdHabit.name,
      description: createdHabit.description,
      users: createdHabit.users,
      createdAt: createdHabit.createdAt,
      daysCompleted: createdHabit.daysCompleted
    }

    logger.info(`Habit created by ${currentUser.email}`);
    res.status(200).json(parsedHabit);
  } catch (error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const update = async (req, res) => {
  try {
    const { body, currentUser, params } = req;

    delete body.users; // to prevent permission changes;
    const permissionsError = await checkUserPermissions(params.id, currentUser, ['owner'], 'Habit');
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    const updatedHabit = await db.Habit.findByIdAndUpdate(params.id, body, { new: true }).catch(error => { throw error });

    res.status(200).json(updatedHabit);
  }
  catch (error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const destroy = async (req, res) => {
  try {
    const { currentUser, params } = req;

    const permissionsError = await checkUserPermissions(params.id, currentUser, ['owner'], 'Habit');
    if (permissionsError) {
      return res.status(permissionsError.status).json({ message: permissionsError.message })
    }

    const deletedHabit = await db.Habit.findByIdAndDelete(params.id).catch(error => { throw error });

    const deleteTasksIfTheyAreNotInAnotherHabit = async () => {
      if (deletedHabit) {
        const distinctItems = await db.Habit.distinct('items');
        await deletedHabit.items.forEach(async item => {
          const doesItemIdExistElseWhere = distinctItems.includes(item);
          if (!doesItemIdExistElseWhere) {
            await db.Task.findByIdAndDelete(item).catch(error => { throw error });
          }
        });
      }
    };
    await deleteTasksIfTheyAreNotInAnotherHabit().catch(error => { throw error });


    res.status(200).json(deletedHabit);
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
