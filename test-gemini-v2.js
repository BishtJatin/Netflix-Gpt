const axios = require('axios');
require('dotenv').config();

const AI_KEY = process.env.REACT_APP_AI_KEY;

console.log('Testing Gemini API with v1 endpoint...\n');

async function testWithV1Endpoint() {
    const gptQuery = "List 3 action movies, comma separated";

    // Try with v1 endpoint instead of v1beta
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${AI_KEY}`;

    console.log('Testing v1 endpoint...');
    try {
        const response = await axios({
            url: url,
            method: 'post',
            data: {
                contents: [{
                    parts: [{ text: gptQuery }]
                }]
            },
            timeout: 10000
        });

        console.log('✅ SUCCESS with v1 endpoint!');
        console.log('Response:', response.data.candidates[0].content.parts[0].text);
        return true;
    } catch (error) {
        console.log('❌ v1 endpoint failed:', error.response?.data?.error?.message || error.message);
    }

    // Try with the @google/generative-ai npm package method
    console.log('\nTrying alternative request format...');
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`,
            {
                contents: [{
                    parts: [{ text: gptQuery }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': AI_KEY
                },
                timeout: 10000
            }
        );

        console.log('✅ SUCCESS with header-based auth!');
        console.log('Response:', response.data.candidates[0].content.parts[0].text);
        return true;
    } catch (error) {
        console.log('❌ Header auth failed:', error.response?.data?.error?.message || error.message);
    }

    return false;
}

testWithV1Endpoint();
