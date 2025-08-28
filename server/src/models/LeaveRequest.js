const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const LeaveRequestSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['SICK','VACATION','UNPAID','OTHER'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: { type: Number, required: true },
  reason: { type: String },
  status: { type: String, enum: ['PENDING','APPROVED','REJECTED'], default: 'PENDING' },
  approverId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = model('LeaveRequest', LeaveRequestSchema);
