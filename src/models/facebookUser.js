import mongoose, { Schema } from 'mongoose';

const UserFacebookSchema = new Schema({
  id: { type: String },
  token: { type: String },
  email: { type: String },
  name: { type: String },

});

const UserFacebook = mongoose.model('UserFacebook', UserFacebookSchema);

export default UserFacebook;


