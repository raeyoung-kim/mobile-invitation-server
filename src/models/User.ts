import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  image: String,
});

export default mongoose.model('User', userSchema);
