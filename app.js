// Campus Sustainability Dashboard JavaScript

// Sample data from the provided JSON
const appData = {
    users: [
        {"id": 1, "name": "Alex Chen", "points": 2840, "level": "Eco-Champion", "badges": ["Energy Saver", "Recycling Hero", "Green Commuter"], "co2_saved": 45.2, "rank": 3},
        {"id": 2, "name": "Priya Sharma", "points": 3150, "level": "Sustainability Leader", "badges": ["Water Warrior", "Zero Waste", "Solar Advocate", "Green Commuter"], "co2_saved": 52.8, "rank": 1},
        {"id": 3, "name": "Marcus Johnson", "points": 2960, "level": "Eco-Champion", "badges": ["Energy Saver", "Composting King", "Eco-Transport"], "co2_saved": 48.6, "rank": 2},
        {"id": 4, "name": "Sarah Williams", "points": 2420, "level": "Green Guardian", "badges": ["Recycling Hero", "Water Saver"], "co2_saved": 38.4, "rank": 5},
        {"id": 5, "name": "David Kumar", "points": 2680, "level": "Eco-Champion", "badges": ["Energy Saver", "Green Commuter", "Waste Reducer"], "co2_saved": 42.1, "rank": 4}
    ],
    challenges: [
        {"id": 1, "title": "Plastic-Free Week", "description": "Avoid single-use plastics for 7 days", "points": 500, "duration": "7 days", "difficulty": "Medium", "participants": 234, "type": "waste"},
        {"id": 2, "title": "Energy Conservation Challenge", "description": "Reduce electricity usage by 20%", "points": 750, "duration": "14 days", "difficulty": "Hard", "participants": 156, "type": "energy"},
        {"id": 3, "title": "Sustainable Transport Week", "description": "Use only eco-friendly transportation", "points": 400, "duration": "7 days", "difficulty": "Easy", "participants": 189, "type": "transport"},
        {"id": 4, "title": "Water Saving Sprint", "description": "Reduce water usage by 30%", "points": 600, "duration": "10 days", "difficulty": "Medium", "participants": 112, "type": "water"}
    ],
    badges: [
        {"name": "Energy Saver", "description": "Completed 5 energy conservation challenges", "icon": "⚡", "rarity": "Common"},
        {"name": "Recycling Hero", "description": "Properly sorted 100 items for recycling", "icon": "♻️", "rarity": "Common"},
        {"name": "Water Warrior", "description": "Saved 1000 liters of water", "icon": "💧", "rarity": "Rare"},
        {"name": "Zero Waste", "description": "Generated zero waste for a full week", "icon": "🗑️", "rarity": "Epic"},
        {"name": "Solar Advocate", "description": "Promoted renewable energy adoption", "icon": "☀️", "rarity": "Rare"},
        {"name": "Green Commuter", "description": "Used sustainable transport for 30 days", "icon": "🚲", "rarity": "Common"}
    ],
    campus_metrics: {
        total_students: 1250,
        active_users: 847,
        co2_reduced_kg: 12450,
        waste_diverted_kg: 8900,
        energy_saved_kwh: 34500,
        water_saved_liters: 125000
    },
    rewards: [
        {"id": 1, "name": "Campus Cafe 20% Discount", "cost": 500, "category": "dining", "available": 45},
        {"id": 2, "name": "Eco-Friendly Water Bottle", "cost": 800, "category": "merchandise", "available": 20},
        {"id": 3, "name": "Bike Sharing Free Week", "cost": 600, "category": "transport", "available": 15},
        {"id": 4, "name": "Sustainability Workshop Access", "cost": 300, "category": "education", "available": 30},
        {"id": 5, "name": "Green Tech Conference Ticket", "cost": 1500, "category": "events", "available": 5}
    ]
};

// Current user (Alex Chen)
const currentUser = appData.users[0];

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Initialize section-specific functionality
    initializeSection(sectionId);
}

// Initialize section-specific functionality
function initializeSection(sectionId) {
    switch(sectionId) {
        case 'dashboard':
            initializeDashboard();
            break;
        case 'challenges':
            initializeChallenges();
            break;
        case 'leaderboard':
            initializeLeaderboard();
            break;
        case 'impact':
            initializeImpact();
            break;
        case 'rewards':
            initializeRewards();
            break;
        case 'community':
            initializeCommunity();
            break;
        case 'profile':
            initializeProfile();
            break;
        case 'admin':
            initializeAdmin();
            break;
        case 'carbon-calculator':
            initializeCarbonCalculator();
            break;
        case 'green-events':
            initializeGreenEvents();
            break;
    }
}

// Dashboard initialization
function initializeDashboard() {
    renderDashboardChallenges();
    renderDashboardBadges();
    renderImpactChart();
}

function renderDashboardChallenges() {
    const container = document.getElementById('dashboard-challenges');
    const challenges = appData.challenges.slice(0, 3);
    
    container.innerHTML = challenges.map(challenge => `
        <div class="challenge-card">
            <div class="challenge-header">
                <h3 class="challenge-title">${challenge.title}</h3>
                <span class="challenge-difficulty difficulty-${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
            </div>
            <p class="challenge-description">${challenge.description}</p>
            <div class="challenge-meta">
                <span class="challenge-points">+${challenge.points} points</span>
                <span class="challenge-duration">${challenge.duration}</span>
            </div>
            <button class="btn btn-primary" onclick="joinChallenge(${challenge.id})">Join Challenge</button>
        </div>
    `).join('');
}

function renderDashboardBadges() {
    const container = document.getElementById('dashboard-badges');
    const userBadges = currentUser.badges.slice(0, 3);
    
    container.innerHTML = userBadges.map(badgeName => {
        const badge = appData.badges.find(b => b.name === badgeName);
        return `
            <div class="badge-item">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
            </div>
        `;
    }).join('');
}

// Challenge functionality
function initializeChallenges() {
    renderChallenges();
    setupChallengeFilters();
}

function renderChallenges(filter = 'all') {
    const container = document.getElementById('challenges-list');
    const filteredChallenges = filter === 'all' 
        ? appData.challenges 
        : appData.challenges.filter(c => c.type === filter);
    
    container.innerHTML = filteredChallenges.map(challenge => `
        <div class="challenge-card" data-type="${challenge.type}">
            <div class="challenge-header">
                <div>
                    <h3 class="challenge-title">${challenge.title}</h3>
                    <span class="challenge-difficulty difficulty-${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
                </div>
            </div>
            <p class="challenge-description">${challenge.description}</p>
            <div class="challenge-meta">
                <span class="challenge-points">+${challenge.points} points</span>
                <span class="challenge-duration">${challenge.duration}</span>
                <span class="challenge-participants">${challenge.participants} participants</span>
            </div>
            <button class="btn btn-primary" onclick="joinChallenge(${challenge.id})">Join Challenge</button>
        </div>
    `).join('');
}

function setupChallengeFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderChallenges(btn.dataset.filter);
        });
    });
}

function joinChallenge(challengeId) {
    showNotification('Challenge joined successfully!', 'success');
    // In a real app, this would update the user's challenges
}

// Leaderboard functionality
function initializeLeaderboard() {
    renderLeaderboard();
    setupLeaderboardTabs();
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    const sortedUsers = [...appData.users].sort((a, b) => a.rank - b.rank);
    
    container.innerHTML = sortedUsers.map((user, index) => {
        let rankClass = '';
        if (index === 0) rankClass = 'gold';
        else if (index === 1) rankClass = 'silver';
        else if (index === 2) rankClass = 'bronze';
        
        return `
            <div class="leaderboard-item ${user.id === currentUser.id ? 'current-user' : ''}">
                <div class="rank ${rankClass}">#${user.rank}</div>
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-level">${user.level}</div>
                </div>
                <div class="user-points">${user.points} pts</div>
                <div class="user-co2">${user.co2_saved}kg CO₂</div>
            </div>
        `;
    }).join('');
}

function setupLeaderboardTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLeaderboard(); // In a real app, this would filter by time period
        });
    });
}

// Impact functionality
function initializeImpact() {
    renderTrendsChart();
}

// Rewards functionality
function initializeRewards() {
    renderRewards();
    setupRewardCategories();
}

function renderRewards(category = 'all') {
    const container = document.getElementById('rewards-list');
    const filteredRewards = category === 'all' 
        ? appData.rewards 
        : appData.rewards.filter(r => r.category === category);
    
    container.innerHTML = filteredRewards.map(reward => {
        const canAfford = currentUser.points >= reward.cost;
        const available = reward.available > 0;
        
        return `
            <div class="reward-card ${!canAfford || !available ? 'reward-unavailable' : ''}">
                <div class="reward-header">
                    <div class="reward-cost">⭐ ${reward.cost}</div>
                </div>
                <h3 class="reward-title">${reward.name}</h3>
                <p class="reward-category">${reward.category}</p>
                <p class="reward-availability">${reward.available} available</p>
                <button class="btn ${canAfford && available ? 'btn-primary' : 'btn-secondary'}" 
                        onclick="redeemReward(${reward.id})" 
                        ${!canAfford || !available ? 'disabled' : ''}>
                    ${canAfford && available ? 'Redeem' : !canAfford ? 'Not enough points' : 'Out of stock'}
                </button>
            </div>
        `;
    }).join('');
}

function setupRewardCategories() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRewards(btn.dataset.category);
        });
    });
}

function redeemReward(rewardId) {
    const reward = appData.rewards.find(r => r.id === rewardId);
    if (currentUser.points >= reward.cost && reward.available > 0) {
        showNotification(`Successfully redeemed ${reward.name}!`, 'success');
        // In a real app, this would deduct points and update inventory
    }
}

// Community functionality
function initializeCommunity() {
    renderActivityFeed();
}

function renderActivityFeed() {
    const container = document.getElementById('activity-feed');
    const activities = [
        { icon: '🏆', text: 'Priya Sharma completed the Water Saving Sprint!', time: '2 minutes ago' },
        { icon: '🌱', text: 'Marcus Johnson earned the Composting King badge!', time: '15 minutes ago' },
        { icon: '⚡', text: 'Alex Chen joined the Energy Conservation Challenge!', time: '1 hour ago' },
        { icon: '♻️', text: 'Sarah Williams recycled 50 items this week!', time: '3 hours ago' },
        { icon: '🚲', text: 'David Kumar used bike sharing 10 times!', time: '5 hours ago' }
    ];
    
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// Profile functionality
function initializeProfile() {
    renderProfileBadges();
}

function renderProfileBadges() {
    const container = document.getElementById('profile-badges');
    
    container.innerHTML = currentUser.badges.map(badgeName => {
        const badge = appData.badges.find(b => b.name === badgeName);
        return `
            <div class="badge-item">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-description">${badge.description}</div>
            </div>
        `;
    }).join('');
}

// Admin functionality
function initializeAdmin() {
    renderAdminUsers();
    renderAdminChallenges();
    renderAdminChart();
    setupAdminTabs();
}

function setupAdminTabs() {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.admin-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`admin-${btn.dataset.tab}`).classList.add('active');
        });
    });
}

function renderAdminUsers() {
    const container = document.getElementById('admin-users-list');
    
    container.innerHTML = appData.users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.points}</td>
            <td>${user.level}</td>
            <td>Sept 2025</td>
            <td><span style="color: var(--color-success);">Active</span></td>
        </tr>
    `).join('');
}

function renderAdminChallenges() {
    const container = document.getElementById('admin-challenges-list');
    
    container.innerHTML = appData.challenges.map(challenge => `
        <div class="admin-challenge-card">
            <div class="admin-challenge-info">
                <h4>${challenge.title}</h4>
                <div class="admin-challenge-meta">
                    ${challenge.participants} participants • ${challenge.difficulty} difficulty
                </div>
            </div>
            <div class="admin-challenge-actions">
                <button class="btn btn-secondary">Edit</button>
                <button class="btn btn-primary">View Details</button>
            </div>
        </div>
    `).join('');
}

// Chart functionality
function renderImpactChart() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['CO₂ Saved', 'Energy Saved', 'Water Saved', 'Waste Diverted'],
            datasets: [{
                data: [45.2, 120, 280, 95],
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function renderTrendsChart() {
    const ctx = document.getElementById('trendsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
            datasets: [{
                label: 'CO₂ Saved (kg)',
                data: [5.2, 8.1, 12.3, 18.7, 25.4, 34.8, 45.2],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Energy Saved (kWh)',
                data: [15, 28, 45, 67, 82, 98, 120],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderAdminChart() {
    const ctx = document.getElementById('adminChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Daily Active Users',
                data: [650, 780, 820, 900, 750, 420, 380],
                backgroundColor: '#10b981',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: 10px;">&times;</button>
        </div>
    `;
    
    document.getElementById('notifications').appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.dataset.section);
        });
    });
    
    // Initialize dashboard
    initializeDashboard();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to the Campus Sustainability Dashboard! 🌱', 'success');
    }, 1000);
});
// Authentication System
const authSystem = {
    currentUser: null,
    currentRole: null,
    
    // User credentials database
    users: {
        student: { username: 'student', password: 'student123', role: 'student', name: 'Alex Chen' },
        admin: { username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' }
    },
    
    // Events database
    events: [
        {
            id: 1,
            name: 'Campus Clean-Up Day',
            type: 'workshop',
            date: '2024-10-15',
            time: '09:00',
            location: 'Main Campus',
            attendees: 50,
            description: 'Join us for a campus-wide sustainability cleanup event',
            createdBy: 'admin',
            createdAt: '2024-10-01'
        },
        {
            id: 2,
            name: 'Renewable Energy Workshop',
            type: 'workshop',
            date: '2024-10-22',
            time: '15:00',
            location: 'Science Building',
            attendees: 30,
            description: 'Learn about solar and wind energy solutions',
            createdBy: 'admin',
            createdAt: '2024-10-02'
        }
    ],
    
    // Login function
    login(username, password) {
        const user = this.users[username];
        if (user && user.password === password) {
            this.currentUser = user;
            this.currentRole = user.role;
            return true;
        }
        return false;
    },
    
    // Logout function
    logout() {
        this.currentUser = null;
        this.currentRole = null;
    },
    
    // Check if user is admin
    isAdmin() {
        return this.currentRole === 'admin';
    },
    
    // Check if user is student
    isStudent() {
        return this.currentRole === 'student';
    },
    
    // Add new event (admin only)
    addEvent(eventData) {
        if (!this.isAdmin()) {
            showNotification('Only admins can add events', 'error');
            return false;
        }
        
        const newEvent = {
            id: Date.now(),
            ...eventData,
            createdBy: this.currentUser.username,
            createdAt: new Date().toISOString().split('T')[0]
        };
        
        this.events.push(newEvent);
        return true;
    },
    
    // Get events
    getEvents() {
        return this.events;
    }
};

// Login page functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const loginPage = document.getElementById('login-page');
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('.main-content');
    
    // Initially hide main content
    navbar.style.display = 'none';
    mainContent.style.display = 'none';
    
    // Login tab functionality
    const loginTabs = document.querySelectorAll('.login-tab');
    loginTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            loginTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validate credentials
        if (authSystem.login(username, password)) {
            // Hide login page and show main content
            loginPage.style.display = 'none';
            navbar.style.display = 'block';
            mainContent.style.display = 'block';
            
            // Update UI based on role
            updateUIForRole();
            
            // Show welcome message
            showNotification(`Welcome back, ${authSystem.currentUser.name}!`, 'success');
        } else {
            // Show error message
            loginError.style.display = 'block';
            setTimeout(() => {
                loginError.style.display = 'none';
            }, 3000);
        }
    });
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            authSystem.logout();
            loginPage.style.display = 'flex';
            navbar.style.display = 'none';
            mainContent.style.display = 'none';
            
            // Clear form
            loginForm.reset();
            loginError.style.display = 'none';
            
            showNotification('Logged out successfully', 'info');
        });
    }
});

// Update UI based on user role
function updateUIForRole() {
    const userRoleElement = document.getElementById('user-role');
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    
    if (userRoleElement) {
        userRoleElement.textContent = authSystem.currentRole.toUpperCase();
    }
    
    // Show/hide admin-only elements
    adminOnlyElements.forEach(element => {
        if (authSystem.isAdmin()) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
    
    // Initialize admin events if admin
    if (authSystem.isAdmin()) {
        renderAdminEvents();
    }
    
    // Initialize dashboard for all users
    initializeDashboard();
}

// Admin event management functions
function showAddEventForm() {
    if (!authSystem.isAdmin()) {
        showNotification('Only admins can add events', 'error');
        return;
    }
    
    document.getElementById('add-event-form').style.display = 'block';
}

function hideAddEventForm() {
    document.getElementById('add-event-form').style.display = 'none';
    // Clear form
    document.getElementById('add-event-form').reset();
}

function createNewEvent() {
    if (!authSystem.isAdmin()) {
        showNotification('Only admins can add events', 'error');
        return;
    }
    
    const eventData = {
        name: document.getElementById('new-event-name').value,
        type: document.getElementById('new-event-type').value,
        date: document.getElementById('new-event-date').value,
        time: document.getElementById('new-event-time').value,
        location: document.getElementById('new-event-location').value,
        attendees: parseInt(document.getElementById('new-event-attendees').value) || 0,
        description: document.getElementById('new-event-description').value
    };
    
    // Validate required fields
    if (!eventData.name || !eventData.date || !eventData.time || !eventData.location) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    if (authSystem.addEvent(eventData)) {
        showNotification('Event created successfully!', 'success');
        hideAddEventForm();
        renderAdminEvents();
    }
}

function renderAdminEvents() {
    const container = document.getElementById('admin-events-list');
    const events = authSystem.getEvents();
    
    if (events.length === 0) {
        container.innerHTML = '<p>No events created yet. Add your first event!</p>';
        return;
    }
    
    container.innerHTML = events.map(event => `
        <div class="event-card">
            <h4>${event.name}</h4>
            <div class="event-meta">
                <div><strong>Type:</strong> ${event.type}</div>
                <div><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</div>
                <div><strong>Time:</strong> ${event.time}</div>
                <div><strong>Location:</strong> ${event.location}</div>
                <div><strong>Attendees:</strong> ${event.attendees}</div>
                <div><strong>Created:</strong> ${event.createdAt}</div>
            </div>
            <p><strong>Description:</strong> ${event.description}</p>
            <div class="event-actions">
                <button class="btn btn-primary" onclick="editEvent(${event.id})">Edit</button>
                <button class="btn btn-secondary" onclick="viewEvent(${event.id})">View</button>
                <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function searchEvents() {
    const searchTerm = document.getElementById('event-search').value.toLowerCase();
    const events = authSystem.getEvents();
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.type.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('admin-events-list');
    if (filteredEvents.length === 0) {
        container.innerHTML = '<p>No events found matching your search.</p>';
        return;
    }
    
    container.innerHTML = filteredEvents.map(event => `
        <div class="event-card">
            <h4>${event.name}</h4>
            <div class="event-meta">
                <div><strong>Type:</strong> ${event.type}</div>
                <div><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</div>
                <div><strong>Time:</strong> ${event.time}</div>
                <div><strong>Location:</strong> ${event.location}</div>
                <div><strong>Attendees:</strong> ${event.attendees}</div>
                <div><strong>Created:</strong> ${event.createdAt}</div>
            </div>
            <p><strong>Description:</strong> ${event.description}</p>
            <div class="event-actions">
                <button class="btn btn-primary" onclick="editEvent(${event.id})">Edit</button>
                <button class="btn btn-secondary" onclick="viewEvent(${event.id})">View</button>
                <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function editEvent(eventId) {
    showNotification('Edit functionality coming soon!', 'info');
}

function viewEvent(eventId) {
    const event = authSystem.getEvents().find(e => e.id === eventId);
    if (event) {
        showNotification(`Viewing: ${event.name}`, 'info');
    }
}

function deleteEvent(eventId) {
    if (!authSystem.isAdmin()) {
        showNotification('Only admins can delete events', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to delete this event?')) {
        const eventIndex = authSystem.events.findIndex(e => e.id === eventId);
        if (eventIndex > -1) {
            authSystem.events.splice(eventIndex, 1);
            renderAdminEvents();
            showNotification('Event deleted successfully', 'success');
        }
    }
}

// Export functions for global access
window.showAddEventForm = showAddEventForm;
window.hideAddEventForm = hideAddEventForm;
window.createNewEvent = createNewEvent;
window.searchEvents = searchEvents;
window.editEvent = editEvent;
window.viewEvent = viewEvent;
window.deleteEvent = deleteEvent;
// Simulate real-time updates
setInterval(() => {
    // Update active users count
    const activeUsersElement = document.querySelector('.stat-card .stat-content h3');
    if (activeUsersElement && activeUsersElement.textContent !== '2,840') {
        const currentCount = parseInt(activeUsersElement.textContent);
        if (Math.random() > 0.7) {
            activeUsersElement.textContent = currentCount + Math.floor(Math.random() * 5 - 2);
        }
    }
}, 30000);

// Carbon Footprint Calculator Data and Functions
const carbonFootprintData = {
    // Transportation emission factors (kg CO2 per mile)
    transportFactors: {
        'car-gas': 0.411,
        'car-hybrid': 0.247,
        'car-electric': 0.053,
        'motorcycle': 0.228,
        'bus': 0.089,
        'train': 0.041,
        'bike': 0,
        'walking': 0
    },
    
    // Energy emission factors (kg CO2 per unit)
    energyFactors: {
        'electricity': 0.000371, // kg CO2 per kWh
        'natural-gas': 0.0053, // kg CO2 per cubic meter
        'oil': 0.00268, // kg CO2 per liter
        'propane': 0.00162, // kg CO2 per liter
        'wood': 0.0003 // kg CO2 per kg (assumes sustainable sourcing)
    },
    
    // Food emission factors (kg CO2 per meal)
    foodFactors: {
        'meat': 2.5,
        'vegetarian': 0.8,
        'vegan': 0.4,
        'waste': 0.5 // additional CO2 for food waste
    },
    
    // Lifestyle emission factors
    lifestyleFactors: {
        'shopping-trip': 0.5, // kg CO2 per trip
        'online-order': 0.3, // kg CO2 per order
        'clothing-item': 15, // kg CO2 per new item
        'electronics': 200 // kg CO2 per electronic device
    },
    
    // User's calculated footprints
    userFootprints: {
        transportation: 0,
        energy: 0,
        dining: 0,
        lifestyle: 0
    },
    
    // User goals
    userGoals: {
        targetReduction: 20,
        priorityAreas: ['transportation', 'energy', 'dining', 'lifestyle']
    }
};

// Initialize Carbon Calculator
function initializeCarbonCalculator() {
    setupCalculatorTabs();
    loadSavedData();
    updateSummary();
}

// Setup calculator tabs
function setupCalculatorTabs() {
    document.querySelectorAll('.calc-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            document.querySelectorAll('.calc-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.calculator-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(`calc-${btn.dataset.calc}`).classList.add('active');
        });
    });
}

// Transportation Calculator
function calculateTransportation() {
    const method = document.getElementById('transport-method').value;
    const distance = parseFloat(document.getElementById('transport-distance').value) || 0;
    const days = parseInt(document.getElementById('transport-days').value) || 0;
    
    if (distance === 0 || days === 0) {
        showNotification('Please enter valid distance and days', 'warning');
        return;
    }
    
    const factor = carbonFootprintData.transportFactors[method];
    const weeklyEmissions = distance * days * factor;
    const annualEmissions = weeklyEmissions * 52;
    
    // Update results
    document.getElementById('transport-weekly').textContent = `${weeklyEmissions.toFixed(2)} kg`;
    document.getElementById('transport-annual').textContent = `${annualEmissions.toFixed(2)} kg`;
    
    // Determine impact level
    const impact = getTransportImpact(annualEmissions);
    const impactElement = document.getElementById('transport-impact');
    impactElement.textContent = impact.text;
    impactElement.className = `result-impact ${impact.class}`;
    
    // Save data
    carbonFootprintData.userFootprints.transportation = annualEmissions;
    updateSummary();
    saveData();
    
    showNotification('Transportation footprint calculated!', 'success');
}

function getTransportImpact(annualEmissions) {
    if (annualEmissions < 500) return { text: 'Excellent', class: 'excellent' };
    if (annualEmissions < 1000) return { text: 'Good', class: 'good' };
    if (annualEmissions < 2000) return { text: 'Moderate', class: 'moderate' };
    return { text: 'Needs Improvement', class: 'poor' };
}

// Energy Calculator
function calculateEnergy() {
    const electricity = parseFloat(document.getElementById('electricity-usage').value) || 0;
    const heatingType = document.getElementById('heating-type').value;
    const heatingUsage = parseFloat(document.getElementById('heating-usage').value) || 0;
    const homeSize = parseFloat(document.getElementById('home-size').value) || 0;
    
    if (electricity === 0 && heatingUsage === 0) {
        showNotification('Please enter energy usage data', 'warning');
        return;
    }
    
    // Calculate electricity emissions
    const electricityEmissions = electricity * carbonFootprintData.energyFactors.electricity;
    
    // Calculate heating emissions
    const heatingEmissions = heatingUsage * carbonFootprintData.energyFactors[heatingType];
    
    // Calculate total monthly emissions
    const monthlyEmissions = electricityEmissions + heatingEmissions;
    const annualEmissions = monthlyEmissions * 12;
    
    // Update results
    document.getElementById('energy-monthly').textContent = `${monthlyEmissions.toFixed(2)} kg`;
    document.getElementById('energy-annual').textContent = `${annualEmissions.toFixed(2)} kg`;
    
    // Determine efficiency rating
    const efficiency = getEnergyEfficiency(annualEmissions, homeSize);
    const impactElement = document.getElementById('energy-impact');
    impactElement.textContent = efficiency.text;
    impactElement.className = `result-impact ${efficiency.class}`;
    
    // Save data
    carbonFootprintData.userFootprints.energy = annualEmissions;
    updateSummary();
    saveData();
    
    showNotification('Energy footprint calculated!', 'success');
}

function getEnergyEfficiency(annualEmissions, homeSize) {
    const emissionsPerSqFt = homeSize > 0 ? annualEmissions / homeSize : 0;
    
    if (emissionsPerSqFt < 0.5) return { text: 'Excellent', class: 'excellent' };
    if (emissionsPerSqFt < 1.0) return { text: 'Good', class: 'good' };
    if (emissionsPerSqFt < 1.5) return { text: 'Moderate', class: 'moderate' };
    return { text: 'Needs Improvement', class: 'poor' };
}

// Dining Calculator
function calculateDining() {
    const meatMeals = parseInt(document.getElementById('meat-meals').value) || 0;
    const vegetarianMeals = parseInt(document.getElementById('vegetarian-meals').value) || 0;
    const veganMeals = parseInt(document.getElementById('vegan-meals').value) || 0;
    const foodWaste = parseInt(document.getElementById('food-waste').value) || 0;
    const localFood = parseInt(document.getElementById('local-food').value) || 0;
    
    const totalMeals = meatMeals + vegetarianMeals + veganMeals;
    if (totalMeals === 0) {
        showNotification('Please enter your meal consumption', 'warning');
        return;
    }
    
    // Calculate weekly emissions
    const meatEmissions = meatMeals * carbonFootprintData.foodFactors.meat;
    const vegetarianEmissions = vegetarianMeals * carbonFootprintData.foodFactors.vegetarian;
    const veganEmissions = veganMeals * carbonFootprintData.foodFactors.vegan;
    const wasteEmissions = foodWaste * carbonFootprintData.foodFactors.waste;
    
    let weeklyEmissions = meatEmissions + vegetarianEmissions + veganEmissions + wasteEmissions;
    
    // Apply local food discount
    const localDiscount = (100 - localFood) / 100;
    weeklyEmissions *= localDiscount;
    
    const annualEmissions = weeklyEmissions * 52;
    
    // Update results
    document.getElementById('dining-weekly').textContent = `${weeklyEmissions.toFixed(2)} kg`;
    document.getElementById('dining-annual').textContent = `${annualEmissions.toFixed(2)} kg`;
    
    // Determine diet impact
    const impact = getDietImpact(annualEmissions);
    const impactElement = document.getElementById('dining-impact');
    impactElement.textContent = impact.text;
    impactElement.className = `result-impact ${impact.class}`;
    
    // Save data
    carbonFootprintData.userFootprints.dining = annualEmissions;
    updateSummary();
    saveData();
    
    showNotification('Dining footprint calculated!', 'success');
}

function getDietImpact(annualEmissions) {
    if (annualEmissions < 500) return { text: 'Excellent', class: 'excellent' };
    if (annualEmissions < 800) return { text: 'Good', class: 'good' };
    if (annualEmissions < 1200) return { text: 'Moderate', class: 'moderate' };
    return { text: 'Needs Improvement', class: 'poor' };
}

// Lifestyle Calculator
function calculateLifestyle() {
    const shoppingTrips = parseInt(document.getElementById('shopping-trips').value) || 0;
    const onlineOrders = parseInt(document.getElementById('online-orders').value) || 0;
    const clothingItems = parseInt(document.getElementById('clothing-items').value) || 0;
    const electronics = parseInt(document.getElementById('electronics').value) || 0;
    const recycling = parseInt(document.getElementById('recycling').value) || 0;
    
    // Calculate monthly emissions
    const shoppingEmissions = shoppingTrips * carbonFootprintData.lifestyleFactors['shopping-trip'];
    const onlineEmissions = onlineOrders * carbonFootprintData.lifestyleFactors['online-order'];
    const clothingEmissions = clothingItems * carbonFootprintData.lifestyleFactors['clothing-item'];
    const electronicsEmissions = (electronics * carbonFootprintData.lifestyleFactors['electronics']) / 12;
    
    let monthlyEmissions = shoppingEmissions + onlineEmissions + clothingEmissions + electronicsEmissions;
    
    // Apply recycling discount
    const recyclingDiscount = recycling / 100;
    monthlyEmissions *= (1 - recyclingDiscount * 0.3); // Up to 30% reduction
    
    const annualEmissions = monthlyEmissions * 12;
    
    // Update results
    document.getElementById('lifestyle-monthly').textContent = `${monthlyEmissions.toFixed(2)} kg`;
    document.getElementById('lifestyle-annual').textContent = `${annualEmissions.toFixed(2)} kg`;
    
    // Determine lifestyle impact
    const impact = getLifestyleImpact(annualEmissions);
    const impactElement = document.getElementById('lifestyle-impact');
    impactElement.textContent = impact.text;
    impactElement.className = `result-impact ${impact.class}`;
    
    // Save data
    carbonFootprintData.userFootprints.lifestyle = annualEmissions;
    updateSummary();
    saveData();
    
    showNotification('Lifestyle footprint calculated!', 'success');
}

function getLifestyleImpact(annualEmissions) {
    if (annualEmissions < 300) return { text: 'Excellent', class: 'excellent' };
    if (annualEmissions < 600) return { text: 'Good', class: 'good' };
    if (annualEmissions < 1000) return { text: 'Moderate', class: 'moderate' };
    return { text: 'Needs Improvement', class: 'poor' };
}

// Goals and Tracking
function setGoals() {
    const targetReduction = parseInt(document.getElementById('reduction-target').value);
    const priorityAreas = Array.from(document.querySelectorAll('#reduction-target').parentElement.parentElement.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    carbonFootprintData.userGoals.targetReduction = targetReduction;
    carbonFootprintData.userGoals.priorityAreas = priorityAreas;
    
    updateProgress();
    saveData();
    
    showNotification('Goals set successfully!', 'success');
}

function updateProgress() {
    const totalFootprint = Object.values(carbonFootprintData.userFootprints).reduce((sum, val) => sum + val, 0);
    const targetFootprint = totalFootprint * (1 - carbonFootprintData.userGoals.targetReduction / 100);
    const reductionProgress = totalFootprint > 0 ? Math.min(100, ((totalFootprint - targetFootprint) / totalFootprint) * 100) : 0;
    
    // Update progress displays
    document.getElementById('total-footprint').textContent = `${totalFootprint.toFixed(0)} kg CO₂/year`;
    document.getElementById('reduction-progress').textContent = `${reductionProgress.toFixed(0)}%`;
    
    // Update progress bars
    const footprintProgress = Math.min(100, (totalFootprint / 5000) * 100); // Assuming 5000kg as high benchmark
    document.getElementById('footprint-progress').style.width = `${footprintProgress}%`;
    document.getElementById('reduction-bar').style.width = `${reductionProgress}%`;
    
    // Update status text
    document.getElementById('footprint-status').textContent = totalFootprint > 0 ? 
        `Your annual carbon footprint is ${totalFootprint.toFixed(0)} kg CO₂` : 
        'Calculate your footprint to see progress';
    
    document.getElementById('reduction-status').textContent = carbonFootprintData.userGoals.targetReduction > 0 ?
        `Working towards ${carbonFootprintData.userGoals.targetReduction}% reduction goal` :
        'Set your goals to track progress';
    
    // Generate recommendations
    generateRecommendations();
}

function generateRecommendations() {
    const recommendations = [];
    const footprints = carbonFootprintData.userFootprints;
    
    // Transportation recommendations
    if (footprints.transportation > 1000) {
        recommendations.push('🚗 Consider carpooling or using public transportation to reduce your transportation footprint');
    }
    
    // Energy recommendations
    if (footprints.energy > 2000) {
        recommendations.push('⚡ Switch to LED bulbs and unplug electronics when not in use to reduce energy consumption');
    }
    
    // Dining recommendations
    if (footprints.dining > 800) {
        recommendations.push('🍽️ Try reducing meat consumption and minimize food waste to lower your dining footprint');
    }
    
    // Lifestyle recommendations
    if (footprints.lifestyle > 600) {
        recommendations.push('🏠 Buy second-hand items and increase recycling to reduce your lifestyle footprint');
    }
    
    // General recommendations
    if (recommendations.length === 0) {
        recommendations.push('🌱 Great job! Your carbon footprint is well-managed. Keep up the sustainable practices!');
    }
    
    // Update recommendations list
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
}

// Update summary cards
function updateSummary() {
    const footprints = carbonFootprintData.userFootprints;
    
    document.getElementById('summary-transport').textContent = `${footprints.transportation.toFixed(0)} kg/year`;
    document.getElementById('summary-energy').textContent = `${footprints.energy.toFixed(0)} kg/year`;
    document.getElementById('summary-dining').textContent = `${footprints.dining.toFixed(0)} kg/year`;
    document.getElementById('summary-lifestyle').textContent = `${footprints.lifestyle.toFixed(0)} kg/year`;
    
    const total = Object.values(footprints).reduce((sum, val) => sum + val, 0);
    document.getElementById('summary-total').textContent = `${total.toFixed(0)} kg CO₂`;
    
    updateProgress();
}

// Save and load data
function saveData() {
    localStorage.setItem('carbonFootprintData', JSON.stringify(carbonFootprintData));
}

function loadSavedData() {
    const saved = localStorage.getItem('carbonFootprintData');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(carbonFootprintData, parsed);
        updateSummary();
    }
}

// Export functions for global access
window.showSection = showSection;
window.joinChallenge = joinChallenge;
window.redeemReward = redeemReward;
window.showNotification = showNotification;
window.calculateTransportation = calculateTransportation;
window.calculateEnergy = calculateEnergy;
window.calculateDining = calculateDining;
window.calculateLifestyle = calculateLifestyle;
window.setGoals = setGoals;

// Green Event Planning Tools Data and Functions
const greenEventData = {
    // Sample vendor data
    vendors: [
        {
            id: 1,
            name: "EcoCater Co.",
            category: "catering",
            rating: 4.8,
            description: "Specializes in organic, locally-sourced catering with zero-waste practices",
            certifications: ["Organic Certified", "Zero Waste", "Local Sourcing"],
            contact: "contact@ecocater.com"
        },
        {
            id: 2,
            name: "Green Venues Ltd",
            category: "venue",
            rating: 4.6,
            description: "LEED-certified venues with renewable energy and water conservation systems",
            certifications: ["LEED Gold", "Energy Star", "WaterSense"],
            contact: "info@greenvenues.com"
        },
        {
            id: 3,
            name: "Sustainable Decor",
            category: "decorations",
            rating: 4.5,
            description: "Eco-friendly decorations made from recycled and biodegradable materials",
            certifications: ["Recycled Content", "Biodegradable", "Fair Trade"],
            contact: "hello@sustainabledecor.com"
        },
        {
            id: 4,
            name: "Green Transport Solutions",
            category: "transportation",
            rating: 4.7,
            description: "Electric vehicle fleet and bike-sharing programs for events",
            certifications: ["Electric Fleet", "Carbon Neutral", "Bike Friendly"],
            contact: "transport@greensolutions.com"
        },
        {
            id: 5,
            name: "EcoTech Systems",
            category: "technology",
            rating: 4.4,
            description: "Digital event solutions and energy-efficient AV equipment",
            certifications: ["Energy Efficient", "Digital Solutions", "Carbon Offset"],
            contact: "tech@ecosystems.com"
        }
    ],
    
    // User events data
    userEvents: [],
    
    // Certification tracking
    certifications: {
        'Green Events Standard': { status: 'not-started', progress: 0 },
        'Zero Waste Certification': { status: 'not-started', progress: 0 },
        'Carbon Neutral Event': { status: 'not-started', progress: 0 },
        'LEED Event Certification': { status: 'not-started', progress: 0 }
    },
    
    // Checklist items for certifications
    checklistItems: {
        'Green Events Standard': [
            { id: 'ges-1', text: 'Use LEED-certified or green venue', completed: false },
            { id: 'ges-2', text: 'Implement comprehensive recycling program', completed: false },
            { id: 'ges-3', text: 'Use renewable energy sources', completed: false },
            { id: 'ges-4', text: 'Offer plant-based menu options', completed: false },
            { id: 'ges-5', text: 'Provide public transportation information', completed: false }
        ],
        'Zero Waste Certification': [
            { id: 'zw-1', text: 'Achieve 90% waste diversion from landfills', completed: false },
            { id: 'zw-2', text: 'Implement composting program', completed: false },
            { id: 'zw-3', text: 'Use reusable or compostable servingware', completed: false },
            { id: 'zw-4', text: 'Partner with local food banks for leftovers', completed: false },
            { id: 'zw-5', text: 'Provide clear waste sorting instructions', completed: false }
        ],
        'Carbon Neutral Event': [
            { id: 'cn-1', text: 'Calculate total event carbon footprint', completed: false },
            { id: 'cn-2', text: 'Purchase verified carbon offsets', completed: false },
            { id: 'cn-3', text: 'Minimize transportation emissions', completed: false },
            { id: 'cn-4', text: 'Use renewable energy for event', completed: false },
            { id: 'cn-5', text: 'Document carbon reduction efforts', completed: false }
        ],
        'LEED Event Certification': [
            { id: 'leed-1', text: 'Select LEED-certified venue', completed: false },
            { id: 'leed-2', text: 'Optimize energy and water efficiency', completed: false },
            { id: 'leed-3', text: 'Use sustainable materials', completed: false },
            { id: 'leed-4', text: 'Improve indoor environmental quality', completed: false },
            { id: 'leed-5', text: 'Implement green cleaning practices', completed: false }
        ]
    }
};

// Initialize Green Events
function initializeGreenEvents() {
    setupEventTabs();
    loadEventData();
    renderVendors();
    updateCertificationStatus();
    renderEvents();
}

// Setup event planning tabs
function setupEventTabs() {
    document.querySelectorAll('.event-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            document.querySelectorAll('.event-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.event-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(`event-${btn.dataset.event}`).classList.add('active');
        });
    });
}

// Vendor Directory Functions
function renderVendors() {
    const container = document.getElementById('vendor-grid');
    container.innerHTML = greenEventData.vendors.map(vendor => `
        <div class="vendor-card">
            <div class="vendor-header">
                <h3 class="vendor-name">${vendor.name}</h3>
                <div class="vendor-rating">
                    <span class="rating-stars">${'★'.repeat(Math.floor(vendor.rating))}${'☆'.repeat(5 - Math.floor(vendor.rating))}</span>
                    <span>${vendor.rating}</span>
                </div>
            </div>
            <div class="vendor-category">${vendor.category}</div>
            <p class="vendor-description">${vendor.description}</p>
            <div class="vendor-certifications">
                ${vendor.certifications.map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
            </div>
            <div class="vendor-contact">
                <button class="contact-btn" onclick="contactVendor(${vendor.id})">Contact</button>
                <button class="btn btn-secondary" onclick="viewVendorDetails(${vendor.id})">Details</button>
            </div>
        </div>
    `).join('');
}

function searchVendors() {
    const searchTerm = document.getElementById('vendor-search').value.toLowerCase();
    const category = document.getElementById('vendor-category').value;
    
    let filteredVendors = greenEventData.vendors;
    
    if (searchTerm) {
        filteredVendors = filteredVendors.filter(vendor => 
            vendor.name.toLowerCase().includes(searchTerm) ||
            vendor.description.toLowerCase().includes(searchTerm) ||
            vendor.certifications.some(cert => cert.toLowerCase().includes(searchTerm))
        );
    }
    
    if (category) {
        filteredVendors = filteredVendors.filter(vendor => vendor.category === category);
    }
    
    // Update display
    const container = document.getElementById('vendor-grid');
    container.innerHTML = filteredVendors.map(vendor => `
        <div class="vendor-card">
            <div class="vendor-header">
                <h3 class="vendor-name">${vendor.name}</h3>
                <div class="vendor-rating">
                    <span class="rating-stars">${'★'.repeat(Math.floor(vendor.rating))}${'☆'.repeat(5 - Math.floor(vendor.rating))}</span>
                    <span>${vendor.rating}</span>
                </div>
            </div>
            <div class="vendor-category">${vendor.category}</div>
            <p class="vendor-description">${vendor.description}</p>
            <div class="vendor-certifications">
                ${vendor.certifications.map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
            </div>
            <div class="vendor-contact">
                <button class="contact-btn" onclick="contactVendor(${vendor.id})">Contact</button>
                <button class="btn btn-secondary" onclick="viewVendorDetails(${vendor.id})">Details</button>
            </div>
        </div>
    `).join('');
}

function contactVendor(vendorId) {
    const vendor = greenEventData.vendors.find(v => v.id === vendorId);
    showNotification(`Contacting ${vendor.name} at ${vendor.contact}`, 'info');
}

function viewVendorDetails(vendorId) {
    const vendor = greenEventData.vendors.find(v => v.id === vendorId);
    showNotification(`Opening detailed information for ${vendor.name}`, 'info');
}

// Environmental Impact Assessment
function calculateEventImpact() {
    const eventName = document.getElementById('event-name').value;
    const attendeeCount = parseInt(document.getElementById('attendee-count').value) || 0;
    const duration = parseInt(document.getElementById('event-duration').value) || 0;
    const venueType = document.getElementById('venue-type').value;
    
    if (!eventName || attendeeCount === 0 || duration === 0) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    // Transportation calculations
    const carPercentage = parseInt(document.getElementById('car-percentage').value) || 0;
    const publicPercentage = parseInt(document.getElementById('public-percentage').value) || 0;
    const walkCyclePercentage = parseInt(document.getElementById('walk-cycle-percentage').value) || 0;
    
    // Energy calculations
    const ledLighting = parseInt(document.getElementById('led-lighting').value) || 0;
    const renewableEnergy = parseInt(document.getElementById('renewable-energy').value) || 0;
    
    // Waste calculations
    const recyclingProgram = parseInt(document.getElementById('recycling-program').value) || 0;
    const digitalMaterials = parseInt(document.getElementById('digital-materials').value) || 0;
    
    // Calculate CO2 emissions
    const carEmissions = (attendeeCount * carPercentage / 100) * 0.411 * 10; // 10 miles average
    const publicEmissions = (attendeeCount * publicPercentage / 100) * 0.089 * 10;
    const transportEmissions = carEmissions + publicEmissions;
    
    // Calculate energy usage
    const baseEnergyUsage = attendeeCount * duration * 2; // kWh per person per hour
    const ledReduction = baseEnergyUsage * (ledLighting / 100) * 0.3; // 30% reduction with LED
    const renewableReduction = baseEnergyUsage * (renewableEnergy / 100) * 0.8; // 80% reduction with renewable
    const energyUsage = baseEnergyUsage - ledReduction - renewableReduction;
    
    // Calculate waste
    const baseWaste = attendeeCount * 0.5; // kg per person
    const recyclingReduction = baseWaste * (recyclingProgram / 100) * 0.7; // 70% reduction with recycling
    const digitalReduction = baseWaste * (digitalMaterials / 100) * 0.3; // 30% reduction with digital
    const wasteGenerated = baseWaste - recyclingReduction - digitalReduction;
    
    // Calculate water usage
    const baseWaterUsage = attendeeCount * 5; // liters per person
    const waterUsage = baseWaterUsage * (venueType === 'outdoor' ? 0.7 : 1.0);
    
    // Calculate green score (0-100)
    let greenScore = 0;
    greenScore += (100 - carPercentage) * 0.3; // Transportation weight
    greenScore += (ledLighting + renewableEnergy) * 0.2; // Energy weight
    greenScore += (recyclingProgram + digitalMaterials) * 0.3; // Waste weight
    greenScore += (venueType === 'outdoor' ? 20 : 10); // Venue bonus
    
    greenScore = Math.min(100, Math.max(0, greenScore));
    
    // Update results
    document.getElementById('score-number').textContent = Math.round(greenScore);
    document.getElementById('co2-emissions').textContent = `${transportEmissions.toFixed(1)} kg`;
    document.getElementById('energy-usage').textContent = `${energyUsage.toFixed(1)} kWh`;
    document.getElementById('waste-generated').textContent = `${wasteGenerated.toFixed(1)} kg`;
    document.getElementById('water-usage').textContent = `${waterUsage.toFixed(1)} L`;
    
    // Generate recommendations
    generateEventRecommendations(greenScore, transportEmissions, energyUsage, wasteGenerated);
    
    showNotification('Event impact assessment completed!', 'success');
}

function generateEventRecommendations(greenScore, transportEmissions, energyUsage, wasteGenerated) {
    const recommendations = [];
    
    if (greenScore < 50) {
        recommendations.push('🌱 Consider switching to a more sustainable venue');
        recommendations.push('🚗 Encourage carpooling and public transportation');
        recommendations.push('♻️ Implement comprehensive recycling and composting programs');
    }
    
    if (transportEmissions > 100) {
        recommendations.push('🚌 Provide shuttle services or public transport incentives');
        recommendations.push('🚲 Set up bike parking and encourage cycling');
    }
    
    if (energyUsage > 200) {
        recommendations.push('💡 Use LED lighting and energy-efficient equipment');
        recommendations.push('☀️ Consider outdoor venues or venues with natural lighting');
    }
    
    if (wasteGenerated > 50) {
        recommendations.push('📱 Use digital materials instead of printed materials');
        recommendations.push('🍽️ Partner with local food banks for leftover food');
    }
    
    if (greenScore >= 80) {
        recommendations.push('🏆 Excellent! Your event is very sustainable');
        recommendations.push('📊 Consider applying for green certifications');
    }
    
    // Update recommendations list
    const recommendationsList = document.getElementById('event-recommendations-list');
    recommendationsList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
}

// Certification Tracking
function updateCertificationStatus() {
    // Update certification status badges
    Object.keys(greenEventData.certifications).forEach(cert => {
        const statusElement = document.getElementById(cert.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-status');
        if (statusElement) {
            const status = greenEventData.certifications[cert].status;
            statusElement.textContent = status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            statusElement.className = `status-badge ${status}`;
        }
    });
    
    // Update checklist
    renderCertificationChecklist();
    
    // Update progress
    updateCertificationProgress();
}

function renderCertificationChecklist() {
    const container = document.getElementById('cert-checklist');
    container.innerHTML = '';
    
    Object.keys(greenEventData.checklistItems).forEach(cert => {
        const checklist = greenEventData.checklistItems[cert];
        const completedCount = checklist.filter(item => item.completed).length;
        const totalCount = checklist.length;
        const progress = (completedCount / totalCount) * 100;
        
        container.innerHTML += `
            <div class="checklist-category">
                <h4>${cert} (${completedCount}/${totalCount})</h4>
                <div class="checklist-items">
                    ${checklist.map(item => `
                        <label>
                            <input type="checkbox" ${item.completed ? 'checked' : ''} 
                                   onchange="toggleChecklistItem('${cert}', '${item.id}')">
                            ${item.text}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
}

function toggleChecklistItem(certification, itemId) {
    const item = greenEventData.checklistItems[certification].find(item => item.id === itemId);
    if (item) {
        item.completed = !item.completed;
        
        // Update certification status based on completion
        const checklist = greenEventData.checklistItems[certification];
        const completedCount = checklist.filter(item => item.completed).length;
        const totalCount = checklist.length;
        const progress = (completedCount / totalCount) * 100;
        
        greenEventData.certifications[certification].progress = progress;
        
        if (progress === 100) {
            greenEventData.certifications[certification].status = 'completed';
        } else if (progress > 0) {
            greenEventData.certifications[certification].status = 'in-progress';
        } else {
            greenEventData.certifications[certification].status = 'not-started';
        }
        
        updateCertificationStatus();
        saveEventData();
        
        showNotification('Checklist updated!', 'success');
    }
}

function updateCertificationProgress() {
    const totalProgress = Object.values(greenEventData.certifications)
        .reduce((sum, cert) => sum + cert.progress, 0) / Object.keys(greenEventData.certifications).length;
    
    const readinessProgress = Object.values(greenEventData.certifications)
        .filter(cert => cert.status === 'completed').length * 25; // 25% per certification
    
    document.getElementById('overall-score').textContent = `${Math.round(totalProgress)}%`;
    document.getElementById('cert-readiness').textContent = `${Math.round(readinessProgress)}%`;
    
    document.getElementById('overall-progress').style.width = `${totalProgress}%`;
    document.getElementById('cert-progress').style.width = `${readinessProgress}%`;
}

// Event Planner Functions
function createGreenEvent() {
    const eventName = document.getElementById('planner-event-name').value;
    const eventDate = document.getElementById('planner-event-date').value;
    const eventTime = document.getElementById('planner-event-time').value;
    const eventType = document.getElementById('planner-event-type').value;
    const attendees = parseInt(document.getElementById('planner-attendees').value) || 0;
    
    if (!eventName || !eventDate || !eventTime || attendees === 0) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    // Get checklist completion
    const checklistItems = document.querySelectorAll('.planning-checklist input[type="checkbox"]:checked');
    const completedItems = Array.from(checklistItems).map(cb => cb.value);
    
    const newEvent = {
        id: Date.now(),
        name: eventName,
        date: eventDate,
        time: eventTime,
        type: eventType,
        attendees: attendees,
        checklistCompleted: completedItems,
        createdAt: new Date().toISOString()
    };
    
    greenEventData.userEvents.push(newEvent);
    renderEvents();
    saveEventData();
    
    // Clear form
    document.getElementById('planner-event-name').value = '';
    document.getElementById('planner-event-date').value = '';
    document.getElementById('planner-event-time').value = '';
    document.getElementById('planner-attendees').value = '';
    document.querySelectorAll('.planning-checklist input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    showNotification('Green event created successfully!', 'success');
}

function renderEvents() {
    const container = document.getElementById('events-list');
    
    if (greenEventData.userEvents.length === 0) {
        container.innerHTML = '<p>No events created yet. Create your first green event!</p>';
        return;
    }
    
    container.innerHTML = greenEventData.userEvents.map(event => `
        <div class="event-item">
            <h4>${event.name}</h4>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()} at ${event.time}</p>
            <p><strong>Type:</strong> ${event.type} | <strong>Attendees:</strong> ${event.attendees}</p>
            <p><strong>Checklist Progress:</strong> ${event.checklistCompleted.length}/16 items completed</p>
        </div>
    `).join('');
}

// Data persistence
function saveEventData() {
    localStorage.setItem('greenEventData', JSON.stringify(greenEventData));
}

function loadEventData() {
    const saved = localStorage.getItem('greenEventData');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(greenEventData, parsed);
    }
}

// Export functions for global access
window.searchVendors = searchVendors;
window.contactVendor = contactVendor;
window.viewVendorDetails = viewVendorDetails;
window.calculateEventImpact = calculateEventImpact;
window.toggleChecklistItem = toggleChecklistItem;
window.createGreenEvent = createGreenEvent;
