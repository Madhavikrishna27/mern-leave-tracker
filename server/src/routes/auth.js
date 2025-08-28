const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['EMPLOYEE','MANAGER','ADMIN']).optional(),
  managerEmail: z.string().email().optional()
});

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const existing = await User.findOne({ email: data.email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(data.password, 10);

    let managerId = undefined;
    if (data.managerEmail) {
      const mgr = await User.findOne({ email: data.managerEmail });
      if (mgr) managerId = mgr._id;
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      role: data.role || 'EMPLOYEE',
      passwordHash: hash,
      managerId
    });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (e) {
    if (e.issues) return res.status(400).json({ error: e.issues.map(i=>i.message).join(', ') });
    return res.status(500).json({ error: 'Registration failed' });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    if (e.issues) return res.status(400).json({ error: e.issues.map(i=>i.message).join(', ') });
    return res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json(user);
});

module.exports = router;
