# 🌱 Campus Sustainability Dashboard

![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)

<p align="center">
  <img src="assets/banner.png" alt="Campus Sustainability Dashboard" width="100%">
</p>

## 🎯 About The Project

Campus Sustainability Dashboard is a web-based platform empowering universities to track, manage, and improve their environmental impact through gamification and community engagement.

### ✨ Key Features

- 🔐 Role-based authentication (Admin/Student)
- 📊 Real-time sustainability metrics dashboard
- 🎯 Interactive sustainability challenges
- 🏆 Points-based reward system
- 📈 Environmental impact tracking
- 👥 Community engagement features
- 🎁 Rewards marketplace

## 🚀 Tech Stack

- Frontend: HTML5, CSS3, JavaScript
- Charts: Chart.js
- Authentication: Custom JWT
- Responsive Design: CSS Grid & Flexbox

## 📸 Screenshots

<details>
<summary>View Screenshots</summary>

![Dashboard](assets/dashboard.png)
![Challenges](assets/challenges.png)
![Analytics](assets/analytics.png)

</details>

## 🛠️ Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/campus-sustainability.git
```

2. Navigate to project directory
```bash
cd campus-sustainability
```

3. Open index.html in a modern web browser

## 👥 User Roles

### Student
- View personal sustainability metrics
- Participate in challenges
- Earn & redeem rewards
- Track environmental impact

### Admin
- Manage users & challenges
- View analytics dashboard
- Create new rewards
- Monitor system performance

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/campus-sustainability](https://github.com/yourusername/campus-sustainability)

## Setup Instructions

1. Install Node.js if not already installed
2. Clone this repository
3. Navigate to project directory:
   ```
   cd "d:\cse proj"
   ```
4. Start the server:
   ```
   node server/app.js
   ```
5. Access the application at https://campus-kohl-nine.vercel.app/

## Test Credentials

### Admin User
- username: admin
- Password: password123



## API Endpoints

### Public
- POST /api/login - Login with email and password

### Student & Admin
- GET /api/metrics - View environmental metrics
- GET /api/challenges - List all challenges
- GET /api/leaderboard - View leaderboard
- GET /api/rewards - View available rewards
- GET /api/quizzes - View available quizzes

### Student Only
- POST /api/challenges/join - Join a challenge
- POST /api/rewards/redeem - Redeem a reward
- POST /api/quizzes/submit - Submit quiz answers

### Admin Only
- POST /api/challenges - Create new challenge
- PUT /api/challenges - Update challenge
- DELETE /api/challenges - Delete challenge
