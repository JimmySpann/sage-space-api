import { createArrayBy_ObjectValues } from "../lib/commonFunctions.js";
import { USER_ROLES } from "./commonConstants.js";

const ALL_USERS = createArrayBy_ObjectValues(USER_ROLES);

// Options must be an array
const permissionGroups =  {
    ALL_USERS,
    REGISTERED_USERS_ONLY: ALL_USERS.find((role) => role !== USER_ROLES.GUEST),
    EDITORS_ONLY: [ USER_ROLES.ADMIN, USER_ROLES.MODERATOR ],
    ADMINS_ONLY: [ USER_ROLES.ADMIN ],
    NO_AUTH_REQUIRED: [ 'no auth required' ], // Probably not being used
};
export default permissionGroups

// handles all role based permissions. Can be string or object
export const ROUTE_PERMISSIONS_SETTINGS = {
    user: {
        register: {
            POST: permissionGroups.ADMINS_ONLY
        },
        login: {
            POST: permissionGroups.NO_AUTH_REQUIRED
        }
    },
    ticket: {
        '/': { 
            POST: permissionGroups.ADMINS_ONLY, // create
            GET: permissionGroups.REGISTERED_USERS_ONLY, // read
            PUT: permissionGroups.REGISTERED_USERS_ONLY // edit
        },
    },
}

