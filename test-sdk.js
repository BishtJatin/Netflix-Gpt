const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const AI_KEY = process.env.REACT_APP_AI_KEY;

console.log('Testing with official Google Generative AI SDK...\n');

async function testWithSDK() {
    try {
        const genAI = new GoogleGenerativeAI(AI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query: action movies. Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        console.log('Calling Gemini API via official SDK...\n');

        const result = await model.generateContent(gptQuery);
        const response = await result.response;
        const text = response.text();

        console.log('✅ SUCCESS! The official SDK works!\n');
        console.log('═══════════════════════════════════════');
        console.log('AI Response:');
        console.log(text);
        console.log('═══════════════════════════════════════\n');

        const moviesArray = text.split(',');
        console.log('Parsed Movies:');
        moviesArray.forEach((movie, index) => {
            console.log(`  ${index + 1}. ${movie.trim()}`);
        });

        console.log('\n🎉 Gemini API is working with the official SDK!');
        console.log('We can now update your app to use this method.\n');

        return true;
    } catch (error) {
        console.log('❌ ERROR with official SDK:');
        console.error(error.message);
        if (error.response) {
            console.error('Details:', error.response);
        }
        return false;
    }
}

testWithSDK();
