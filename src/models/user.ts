import mongoose from 'mongoose';

const options = {
  timestamps: true,
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
  },
  options
);

export default mongoose.models.User || mongoose.model('User', userSchema);
