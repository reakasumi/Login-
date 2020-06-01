
import usersRouter from './users';
import authRouter from './auth';
import facebookAuth from './facebookAuth';


const initRoutes = ( app, passport ) => {
 
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
  app.use('/authfacebook', facebookAuth(passport));

 
  
};



module.exports = initRoutes;
 
