import makeHttpResponse from '../utils/httpResponse';
import makePasswordManager from '../utils/passwordManager';

const passwordManager = makePasswordManager();
export default function makeSignUpController({ Model }) {
  return Object.freeze({
    insertUser,
  });

  async function insertUser({ info }) {
    const { email, password } = info;
    if (!email && !password) throw new Error('Please provide email and password');
    const user = {
        email,
        password: passwordManager.makePasswordHash(password.toString()),
      };
      const User = new Model(user);
      const result= await User.save();

    return Object.freeze({
      headers: {
        'Last-Modified': result.modifiedOn,
      },
      ...makeHttpResponse({
        result,
        statusCode: 201,
      }),
    });
  }

}
