import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },

});

const User = mongoose.model('User', UserSchema);

export default User;
