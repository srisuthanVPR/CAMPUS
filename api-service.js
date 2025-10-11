// API Service for Campus Sustainability Dashboard
class APIService {
    constructor() {
        this.baseURL = 'http://localhost:3000/api';
        this.token = localStorage.getItem('authToken');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    // Clear authentication token
    clearToken() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    // Make authenticated request
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(this.token && { 'Authorization': `Bearer ${this.token}` })
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Authentication methods
    async login(username, password) {
        const response = await this.makeRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });

        if (response.success && response.token) {
            this.setToken(response.token);
        }

        return response;
    }

    async getProfile() {
        return await this.makeRequest('/auth/profile');
    }

    async logout() {
        this.clearToken();
    }

    // Events methods
    async getEvents() {
        return await this.makeRequest('/events');
    }

    async createEvent(eventData) {
        return await this.makeRequest('/events', {
            method: 'POST',
            body: JSON.stringify(eventData)
        });
    }

    async updateEvent(eventId, eventData) {
        return await this.makeRequest(`/events/${eventId}`, {
            method: 'PUT',
            body: JSON.stringify(eventData)
        });
    }

    async deleteEvent(eventId) {
        return await this.makeRequest(`/events/${eventId}`, {
            method: 'DELETE'
        });
    }

    // Challenges methods
    async getChallenges() {
        return await this.makeRequest('/challenges');
    }

    async joinChallenge(challengeId) {
        return await this.makeRequest(`/challenges/${challengeId}/join`, {
            method: 'POST'
        });
    }

    // Admin methods
    async getUsers() {
        return await this.makeRequest('/users');
    }

    async getAdminStats() {
        return await this.makeRequest('/admin/stats');
    }
}

// Create global API service instance
window.apiService = new APIService();
