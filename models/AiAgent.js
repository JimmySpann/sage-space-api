import mongoose from 'mongoose';

const aiAgentSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'message needed'],
  },
  userName: {
    type: String,
  }
}, {timestamps: true});

const AiAgent = mongoose.model('AiAgent', aiAgentSchema);

export default AiAgent;
