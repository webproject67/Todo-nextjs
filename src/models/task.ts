import mongoose from 'mongoose';

const options = {
  timestamps: true,
};

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      default: '2',
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  options
);

export default mongoose.models.Task || mongoose.model('Task', taskSchema);
