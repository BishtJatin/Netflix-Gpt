// TMDb API Test Script
const https = require('https');

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTliZDVmMDM4ZDI3MDE1ZTMyOTRhZjQyNGM5NzA1YyIsInN1YiI6IjY0N2I0MWEyY2Y0YjhiMDBjM2QyMmQyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pa7rrihinMTebss5GMp1vYNg-SNIzH9AKUu3rx-PTP4";

const options = {
    hostname: 'api.themoviedb.org',
    port: 443,
    path: '/3/movie/now_playing?page=1',
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
    }
};

console.log('Testing TMDb API...\n');
console.log('Endpoint:', `https://${options.hostname}${options.path}`);
console.log('Method:', options.method);
console.log('Authorization: Bearer [token]\n');

const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Status Message: ${res.statusMessage}\n`);

    if (res.statusCode === 200) {
        console.log('✅ API Token is VALID!\n');
    } else if (res.statusCode === 401) {
        console.log('❌ API Token is INVALID or EXPIRED!\n');
    } else {
        console.log('⚠️  Unexpected response code\n');
    }

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);

            if (json.results) {
                console.log(`Movies received: ${json.results.length}`);
                console.log('\nFirst movie:');
                console.log(`  Title: ${json.results[0].title}`);
                console.log(`  Release Date: ${json.results[0].release_date}`);
                console.log(`  Rating: ${json.results[0].vote_average}\n`);
                console.log('✅ API is working correctly!');
            } else if (json.status_message) {
                console.log('Error message:', json.status_message);
                console.log('Error code:', json.status_code);
            }
        } catch (e) {
            console.log('Response:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Network Error:', error.message);
    console.error('\nPossible causes:');
    console.error('  - No internet connection');
    console.error('  - Firewall blocking the request');
    console.error('  - Proxy/VPN issues');
    console.error('  - TMDb API is down');
});

req.end();
