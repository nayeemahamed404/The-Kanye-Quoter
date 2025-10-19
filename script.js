
const generateBtn = document.getElementById('generate-btn');
const activityDisplay = document.getElementById('activity-display');

activityDisplay.innerHTML = `<p>Ready for some inspiration? Click below!</p>`;

async function generateActivity() {
    activityDisplay.innerHTML = `<p class="loading">Fetching a legendary quote...</p>`;

    const url = 'https://api.kanye.rest/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        const quote = data.quote;

        activityDisplay.innerHTML = `
            <p class="activity-name">"${quote}"</p>
            <p class="details">— Kanye West</p>
        `;

    } catch (error) {
        console.error("Error fetching quote:", error);
        
        let errorMessage = "Connection Error. Could not load quote.";
        
        if (error.message.includes("Failed to fetch")) {
            errorMessage = "Failed to connect to the quote server. Check your internet connection.";
        }
        
        activityDisplay.innerHTML = `<p class="error">${errorMessage}</p>`;
    }
}


generateBtn.addEventListener('click', generateActivity);
