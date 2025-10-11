const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.'));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-sustainability';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['student', 'admin'], required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, sparse: true },
    points: { type: Number, default: 0 },
    level: { type: String, default: 'Green Guardian' },
    badges: [{ type: String }],
    co2_saved: { type: Number, default: 0 },
    rank: { type: Number, default: 999 },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

// Event Schema
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    type: { 
        type: String, 
        enum: ['workshop', 'conference', 'meeting', 'social', 'festival', 'other'],
        required: true 
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    attendees: { type: Number, default: 0 },
    description: { type: String, required: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Challenge Schema
const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    duration: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    type: { type: String, enum: ['waste', 'energy', 'transport', 'water'], required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Campus Sustainability Dashboard API is running' });
});

// Authentication Routes
app.post('/api/auth/login', [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username, isActive: true });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT
        const token = jwt.sign(
            { 
                userId: user._id, 
                username: user.username, 
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role,
                points: user.points,
                level: user.level,
                badges: user.badges,
                co2_saved: user.co2_saved,
                rank: user.rank
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Events Routes
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find({ isActive: true })
            .populate('createdBy', 'name username')
            .sort({ date: 1 });
        res.json({ success: true, events });
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create event (Admin only)
app.post('/api/events', authenticateToken, requireAdmin, [
    body('name').trim().notEmpty().withMessage('Event name is required'),
    body('type').isIn(['workshop', 'conference', 'meeting', 'social', 'festival', 'other']).withMessage('Invalid event type'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('time').notEmpty().withMessage('Time is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('description').trim().notEmpty().withMessage('Description is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const eventData = {
            ...req.body,
            createdBy: req.user.userId,
            date: new Date(req.body.date)
        };

        const event = new Event(eventData);
        await event.save();
        await event.populate('createdBy', 'name username');

        res.status(201).json({ success: true, event });
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update event (Admin only)
app.put('/api/events/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        ).populate('createdBy', 'name username');

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json({ success: true, event });
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete event (Admin only)
app.delete('/api/events/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Challenges Routes
app.get('/api/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find({ isActive: true })
            .populate('participants', 'name username')
            .sort({ createdAt: -1 });
        res.json({ success: true, challenges });
    } catch (error) {
        console.error('Get challenges error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Join challenge
app.post('/api/challenges/:id/join', authenticateToken, async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        if (challenge.participants.includes(req.user.userId)) {
            return res.status(400).json({ error: 'Already joined this challenge' });
        }

        challenge.participants.push(req.user.userId);
        await challenge.save();

        // Update user points
        const user = await User.findById(req.user.userId);
        user.points += challenge.points;
        await user.save();

        res.json({ success: true, message: 'Successfully joined challenge' });
    } catch (error) {
        console.error('Join challenge error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Users Routes (Admin only)
app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const users = await User.find({ isActive: true })
            .select('-password')
            .sort({ points: -1 });
        res.json({ success: true, users });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Dashboard stats (Admin only)
app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ isActive: true });
        const activeUsers = await User.countDocuments({ 
            isActive: true, 
            lastLogin: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
        });
        const totalEvents = await Event.countDocuments({ isActive: true });
        const totalChallenges = await Challenge.countDocuments({ isActive: true });

        res.json({
            success: true,
            stats: {
                totalUsers,
                activeUsers,
                totalEvents,
                totalChallenges
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Initialize default data
async function initializeData() {
    try {
        // Check if admin user exists
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const admin = new User({
                username: 'admin',
                password: hashedPassword,
                role: 'admin',
                name: 'Admin User',
                email: 'admin@campus.edu',
                points: 0,
                level: 'System Administrator'
            });
            await admin.save();
            console.log('✅ Admin user created');
        }

        // Check if student user exists
        const studentExists = await User.findOne({ username: 'student' });
        if (!studentExists) {
            const hashedPassword = await bcrypt.hash('student123', 10);
            const student = new User({
                username: 'student',
                password: hashedPassword,
                role: 'student',
                name: 'Alex Chen',
                email: 'alex.chen@campus.edu',
                points: 2840,
                level: 'Eco-Champion',
                badges: ['Energy Saver', 'Recycling Hero', 'Green Commuter'],
                co2_saved: 45.2,
                rank: 3
            });
            await student.save();
            console.log('✅ Student user created');
        }

        // Check if default events exist
        const eventCount = await Event.countDocuments();
        if (eventCount === 0) {
            const adminUser = await User.findOne({ username: 'admin' });
            const defaultEvents = [
                {
                    name: 'Campus Clean-Up Day',
                    type: 'workshop',
                    date: new Date('2024-10-15'),
                    time: '09:00',
                    location: 'Main Campus',
                    attendees: 50,
                    description: 'Join us for a campus-wide sustainability cleanup event',
                    createdBy: adminUser._id
                },
                {
                    name: 'Renewable Energy Workshop',
                    type: 'workshop',
                    date: new Date('2024-10-22'),
                    time: '15:00',
                    location: 'Science Building',
                    attendees: 30,
                    description: 'Learn about solar and wind energy solutions',
                    createdBy: adminUser._id
                }
            ];

            await Event.insertMany(defaultEvents);
            console.log('✅ Default events created');
        }

        // Check if default challenges exist
        const challengeCount = await Challenge.countDocuments();
        if (challengeCount === 0) {
            const defaultChallenges = [
                {
                    title: 'Plastic-Free Week',
                    description: 'Avoid single-use plastics for 7 days',
                    points: 500,
                    duration: '7 days',
                    difficulty: 'Medium',
                    type: 'waste',
                    participants: []
                },
                {
                    title: 'Energy Conservation Challenge',
                    description: 'Reduce electricity usage by 20%',
                    points: 750,
                    duration: '14 days',
                    difficulty: 'Hard',
                    type: 'energy',
                    participants: []
                },
                {
                    title: 'Sustainable Transport Week',
                    description: 'Use only eco-friendly transportation',
                    points: 400,
                    duration: '7 days',
                    difficulty: 'Easy',
                    type: 'transport',
                    participants: []
                }
            ];

            await Challenge.insertMany(defaultChallenges);
            console.log('✅ Default challenges created');
        }

    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Dashboard available at: http://localhost:${PORT}`);
    console.log(`🔗 API available at: http://localhost:${PORT}/api`);
    
    // Initialize default data
    await initializeData();
});

module.exports = app;
