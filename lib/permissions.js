import db from '../models/index.js';
import logger from '../lib/logger.js';

export const checkUserPermissions = async (listId, currentUser, requiredRoles) => {
    const foundList = await db.List.findOne({ _id: listId }).catch(error => { throw error });
    if (!foundList) {
      return { status: 400, message: `Could not find List with id ${listId}` };
    }

    const doesUserHavePermission = await foundList.users.find(user => {
      return (user.id === currentUser.id && 
              requiredRoles.find(role => user.role === role));
    });
    if (!doesUserHavePermission) {
      logger.error('Wrong permissions, possible hacker?', currentUser);
      return { status: 400, message: 'Something went wrong' };
    }
    return null;
}