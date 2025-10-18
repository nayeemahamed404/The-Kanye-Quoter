// Get DOM elements (unchanged)
const generateBtn = document.getElementById('generate-btn');
const activityDisplay = document.getElementById('activity-display');
// Note: categoryFilter is not used by this API, but you can keep it or remove it from the HTML

// Set initial message
activityDisplay.innerHTML = `<p>Ready for some inspiration? Click below!</p>`;

async function generateActivity() {
    // Show a loading message
    activityDisplay.innerHTML = `<p class="loading">Fetching a legendary quote...</p>`;

    // Set the specific API URL
    const url = 'https://api.kanye.rest/';

    try {
        // 1. Fetch the data
        const response = await fetch(url);

        // 2. Check for a non-200 HTTP status
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        // 3. Parse the JSON response
        const data = await response.json();
        
        // The API response is always a single object: {"quote": "..."}
        const quote = data.quote;

        // 4. Update the HTML display
        activityDisplay.innerHTML = `
            <p class="activity-name">"${quote}"</p>
            <p class="details">— Kanye West</p>
        `;

    } catch (error) {
        // 5. Handle network or server errors
        console.error("Error fetching quote:", error);
        
        let errorMessage = "Connection Error. Could not load quote.";
        
        if (error.message.includes("Failed to fetch")) {
            errorMessage = "Failed to connect to the quote server. Check your internet connection.";
        }
        
        activityDisplay.innerHTML = `<p class="error">${errorMessage}</p>`;
    }
}

// Attach the function to the button click event
generateBtn.addEventListener('click', generateActivity);