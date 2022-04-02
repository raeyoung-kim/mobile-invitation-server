import mongoose from 'mongoose';

const { Schema } = mongoose;

const sampleMainSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
});

export default mongoose.model('SampleMain', sampleMainSchema);
