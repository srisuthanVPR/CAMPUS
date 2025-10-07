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
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const mainContent = document.getElementById('main-content');
    const loginPage = document.getElementById('login-page');

    // Hardcoded credentials
    const validUsername = 'admin';
    const validPassword = 'password123';

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validate credentials
        if (username === validUsername && password === validPassword) {
            // Hide login page and show main content
            loginPage.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            // Show error message
            loginError.style.display = 'block';
        }
    });
});
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

// Export functions for global access
window.showSection = showSection;
window.joinChallenge = joinChallenge;
window.redeemReward = redeemReward;
window.showNotification = showNotification;
