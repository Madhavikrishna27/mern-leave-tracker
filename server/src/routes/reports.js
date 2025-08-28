const express = require('express');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const LeaveRequest = require('../models/LeaveRequest');

const router = express.Router();

router.get('/usage', auth, requireRole(['MANAGER','ADMIN']), async (req, res) => {
  const { from, to } = req.query;
  const match = {};
  if (from) match.startDate = { ...match.startDate, $gte: new Date(from) };
  if (to) match.endDate = { ...match.endDate, $lte: new Date(to) };

  const agg = await LeaveRequest.aggregate([
    { $match: Object.keys(match).length ? match : {} },
    { $group: { _id: '$type', count: { $sum: 1 }, days: { $sum: '$days' } } },
    { $project: { type: '$_id', _id: 0, count: 1, days: 1 } }
  ]);
  res.json({ range: { from, to }, summary: agg });
});

module.exports = router;
