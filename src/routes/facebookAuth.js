var express = require('express');
const router = express.Router();

export default function facebookAuth(passport){
    router.get('/facebook', passport.authenticate('facebook'));

    router.get('/facebook/callback',
      passport.authenticate('facebook', { successRedirect: '/index2',
                                          failureRedirect: '/' }));

 return router; 

}