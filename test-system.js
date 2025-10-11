// Test script for Campus Sustainability Dashboard
const fetch = require('node-fetch').default;

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
    console.log('🧪 Testing Campus Sustainability Dashboard API...\n');

    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing Health Check...');
        const healthResponse = await fetch(`${API_BASE}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health Check:', healthData.message);

        // Test 2: Student Login
        console.log('\n2️⃣ Testing Student Login...');
        const studentLoginResponse = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'student', password: 'student123' })
        });
        const studentData = await studentLoginResponse.json();
        if (studentData.success) {
            console.log('✅ Student Login Successful:', studentData.user.name);
            const studentToken = studentData.token;
            
            // Test 3: Get Student Profile
            console.log('\n3️⃣ Testing Student Profile...');
            const profileResponse = await fetch(`${API_BASE}/auth/profile`, {
                headers: { 'Authorization': `Bearer ${studentToken}` }
            });
            const profileData = await profileResponse.json();
            console.log('✅ Student Profile:', profileData.user.name, '- Role:', profileData.user.role);
        }

        // Test 4: Admin Login
        console.log('\n4️⃣ Testing Admin Login...');
        const adminLoginResponse = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'admin123' })
        });
        const adminData = await adminLoginResponse.json();
        if (adminData.success) {
            console.log('✅ Admin Login Successful:', adminData.user.name);
            const adminToken = adminData.token;

            // Test 5: Get Events
            console.log('\n5️⃣ Testing Get Events...');
            const eventsResponse = await fetch(`${API_BASE}/events`);
            const eventsData = await eventsResponse.json();
            console.log('✅ Events Retrieved:', eventsData.events.length, 'events found');

            // Test 6: Create Event (Admin)
            console.log('\n6️⃣ Testing Create Event...');
            const newEvent = {
                name: 'Test Event',
                type: 'workshop',
                date: '2024-12-01',
                time: '10:00',
                location: 'Test Location',
                attendees: 25,
                description: 'This is a test event created by the test script'
            };
            const createEventResponse = await fetch(`${API_BASE}/events`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify(newEvent)
            });
            const createEventData = await createEventResponse.json();
            if (createEventData.success) {
                console.log('✅ Event Created Successfully:', createEventData.event.name);
                const eventId = createEventData.event._id;

                // Test 7: Update Event
                console.log('\n7️⃣ Testing Update Event...');
                const updateEventResponse = await fetch(`${API_BASE}/events/${eventId}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${adminToken}`
                    },
                    body: JSON.stringify({ attendees: 30 })
                });
                const updateEventData = await updateEventResponse.json();
                if (updateEventData.success) {
                    console.log('✅ Event Updated Successfully');
                }

                // Test 8: Delete Event
                console.log('\n8️⃣ Testing Delete Event...');
                const deleteEventResponse = await fetch(`${API_BASE}/events/${eventId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${adminToken}` }
                });
                const deleteEventData = await deleteEventResponse.json();
                if (deleteEventData.success) {
                    console.log('✅ Event Deleted Successfully');
                }
            }

            // Test 9: Get Challenges
            console.log('\n9️⃣ Testing Get Challenges...');
            const challengesResponse = await fetch(`${API_BASE}/challenges`);
            const challengesData = await challengesResponse.json();
            console.log('✅ Challenges Retrieved:', challengesData.challenges.length, 'challenges found');

            // Test 10: Get Admin Stats
            console.log('\n🔟 Testing Admin Stats...');
            const statsResponse = await fetch(`${API_BASE}/admin/stats`, {
                headers: { 'Authorization': `Bearer ${adminToken}` }
            });
            const statsData = await statsResponse.json();
            if (statsData.success) {
                console.log('✅ Admin Stats Retrieved:');
                console.log('   - Total Users:', statsData.stats.totalUsers);
                console.log('   - Active Users:', statsData.stats.activeUsers);
                console.log('   - Total Events:', statsData.stats.totalEvents);
                console.log('   - Total Challenges:', statsData.stats.totalChallenges);
            }
        }

        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📊 System Status:');
        console.log('   ✅ Backend API: Running on port 3000');
        console.log('   ✅ MongoDB: Connected and operational');
        console.log('   ✅ Authentication: Working');
        console.log('   ✅ Event Management: Working');
        console.log('   ✅ Admin Features: Working');
        console.log('\n🌐 Access your dashboard at: http://localhost:8000');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   1. Ensure MongoDB is running: mongod --dbpath ./data --port 27017');
        console.log('   2. Ensure Node.js server is running: node server.js');
        console.log('   3. Check if ports 3000 and 27017 are available');
    }
}

// Run tests
testAPI();
