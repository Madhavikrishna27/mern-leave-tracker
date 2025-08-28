const express = require('express');
const { z } = require('zod');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const User = require('../models/User');
const LeaveRequest = require('../models/LeaveRequest');

const router = express.Router();

const leaveSchema = z.object({
  type: z.enum(['SICK','VACATION','UNPAID','OTHER']),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string().optional()
});

router.post('/', auth, async (req, res) => {
  try {
    const data = leaveSchema.parse(req.body);
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (isNaN(start) || isNaN(end) || end < start) return res.status(400).json({ error: 'Invalid dates' });
    const days = Math.ceil((end - start) / (1000*60*60*24)) + 1;

    const employee = await User.findById(req.user.id);
    if (!employee) return res.status(404).json({ error: 'User not found' });

    const leave = await LeaveRequest.create({
      employeeId: employee._id,
      type: data.type,
      startDate: start,
      endDate: end,
      days,
      reason: data.reason || '',
      status: 'PENDING',
      approverId: employee.managerId
    });
    res.status(201).json(leave);
  } catch (e) {
    if (e.issues) return res.status(400).json({ error: e.issues.map(i=>i.message).join(', ') });
    res.status(500).json({ error: 'Failed to create leave' });
  }
});

router.get('/mine', auth, async (req, res) => {
  const leaves = await LeaveRequest.find({ employeeId: req.user.id }).sort({ createdAt: -1 });
  res.json(leaves);
});

router.get('/pending', auth, requireRole(['MANAGER','ADMIN']), async (req, res) => {
  const query = req.user.role === 'ADMIN'
    ? { status: 'PENDING' }
    : { status: 'PENDING', approverId: req.user.id };
  const leaves = await LeaveRequest.find(query).populate('employeeId', 'name email');
  res.json(leaves);
});

router.patch('/:id/approve', auth, requireRole(['MANAGER','ADMIN']), async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);
  if (!leave) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'ADMIN' && String(leave.approverId) !== req.user.id) {
    return res.status(403).json({ error: 'Not your approval' });
  }
  leave.status = 'APPROVED';
  await leave.save();
  res.json(leave);
});

router.patch('/:id/reject', auth, requireRole(['MANAGER','ADMIN']), async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);
  if (!leave) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'ADMIN' && String(leave.approverId) !== req.user.id) {
    return res.status(403).json({ error: 'Not your approval' });
  }
  leave.status = 'REJECTED';
  await leave.save();
  res.json(leave);
});

module.exports = router;
