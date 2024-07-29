const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title needed'],
  },
  allDay: {
    type: Boolean,
    default: true
  },
  start: {
    type: Date
  },
  end: {
    type: Date,
  },
  startStr: {
      type: String
  },
  endStr: {
      type: String
  },
  url: {
      type: String
  },
  classNames: {
      type: Array
  },
  editable: {
      type: Boolean,
      default: true
  },
  display: {
      type: String
  },
  backgroundColor: {
    type: String
  },
  borderColor: {
      type: String
  },
  textColor: {
      type: String
  },
  source: {
      type: String
  }
}, {timestamps: true});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
