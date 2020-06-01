
import makeAuthController from './auth';
import makeUsersController from './users';
import makePasswordManager from '../utils/passwordManager';


const passwordManager = makePasswordManager();
const authController = makeAuthController({  passwordManager });
const usersController = makeUsersController();


const controllers = Object.freeze({
 
  authController,
  usersController,

});

export default controllers;
export {

  authController,
  usersController,
  
};
