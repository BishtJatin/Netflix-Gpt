const axios = require('axios');
require('dotenv').config();

const AI_KEY = process.env.REACT_APP_AI_KEY;

console.log('Testing gemini-pro model (final test)...\n');

const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query: action movies. Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

async function finalTest() {
    try {
        console.log('Calling Gemini API with gemini-pro model...\n');

        const gptResults = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + AI_KEY,
            method: "post",
            data: { contents: [{ parts: [{ text: gptQuery }] }] },
            timeout: 15000
        });

        const moviesList = gptResults.data.candidates[0].content.parts[0].text;
        const moviesArray = moviesList.split(",");

        console.log('✅ SUCCESS! Gemini API is working!\n');
        console.log('═══════════════════════════════════════');
        console.log('Raw AI Response:');
        console.log(moviesList);
        console.log('═══════════════════════════════════════\n');
        console.log('Parsed Movie Recommendations:');
        moviesArray.forEach((movie, index) => {
            console.log(`  ${index + 1}. ${movie.trim()}`);
        });
        console.log('\n═══════════════════════════════════════');
        console.log('🎉 Your Netflix-GPT app is now ready!');
        console.log('📍 Refresh your browser to test the GPT Search feature');
        console.log('═══════════════════════════════════════\n');

    } catch (error) {
        console.log('❌ ERROR!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Error details:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
}

finalTest();
