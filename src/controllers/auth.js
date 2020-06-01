import { User } from '../models';
import makeHttpResponse from '../utils/httpResponse';


export default function makeAuthController({ passwordManager }) {
  return Object.freeze({
      login,
     
  });

  async function login(httpRequest) {
    const { email, password } = httpRequest.body;
    if (!email) throw new Error('You must supply an email address.');
    if (!password) throw new Error('You must supply a password.');

    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('User does not exists.');

    const isPasswordValid = passwordManager.comparePasswords(password.toString(), user.password);
  
    if (!isPasswordValid) {
      return makeHttpResponse({
        result: {
          message: 'Invalid username or password.',
        },
        statusCode: 201,
      });
    
    }
  
    
    const result = {
      message: 'Succesful login!',
       
    };
    
    return makeHttpResponse({
      result,
      statusCode: 201,
    });
  }


}
