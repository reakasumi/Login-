import { User } from '../models';
import makeBaseController from './base';
import makeSignupController from './signup';

export default function makeUsersController() {
  const baseController = makeBaseController({ Model: User });
  const signupController = makeSignupController({ Model: User });


  return Object.freeze({
    getUser: (httpRequest) => baseController.getItemById({
      id: httpRequest.userId,
    }),
    getUsers: (httpRequest) => baseController.getItems({
      query: httpRequest.query,
    }),
    insertUser: (httpRequest) => signupController.insertUser({
      info: httpRequest.body,
    }),

  });
}
