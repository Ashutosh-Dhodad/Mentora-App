const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Mentora App is running on http://localhost:${PORT}`);
    console.log(`📱 Open your browser and navigate to: http://localhost:${PORT}`);
    console.log(`🔐 Test with these accounts:`);
    console.log(`   Parent: parent@example.com / password123`);
    console.log(`   Student: student@example.com / password123`);
    console.log(`   Mentor: mentor@example.com / password123`);
});
