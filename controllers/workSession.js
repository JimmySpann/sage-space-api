import db from '../models/index.js';
import { checkUserPermissions } from '../lib/permissions.js'
import { handleResError } from '../lib/handleRes.js'

const create = async (req, res) => {
  try {
    const { body, currentUser } = req;
    
    // add currentUser as user in workSession
    body.user = [currentUser.id];

    const createdWorkSession = await db.WorkSession.create(body).catch(error => { throw error });

    const parsedWorkSession = {
      _id: createdWorkSession._id,
      name: createdWorkSession.name,
      category: createdWorkSession.category,
      rating: createdWorkSession.rating,
      start_time: createdWorkSession.start_time,
      end_time: createdWorkSession.end_time,
      timer_to_end: createdWorkSession.timer_to_end,
    };

    res.status(200).json(parsedWorkSession);
  }
  catch (error) {
    const message = 'Something went wrong. Please try again';
    handleResError(res, error, message, 500);
  }
};

const update = async (req, res) => {
  try {
    const { params, body, currentUser } = req;

    // Add permissions check

    const updatedWorkSession = await db.WorkSession.findByIdAndUpdate(params.id, body, { new: true }).catch(error => { throw error });
    if (!updatedWorkSession) {
      return res.status(400).json({message: `Could not find WorkSession with id ${params.id}`});
    }

    res.json(updatedWorkSession);
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
    const deletedWorkSession = await db.WorkSession.findByIdAndDelete(params.id).catch(error => { throw error });
    res.status(200).json(deletedWorkSession);
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
