document.addEventListener('DOMContentLoaded', () => {
    const topicInput = document.getElementById('topicInput');
    const digestBtn = document.getElementById('digestBtn');
    const summaryOutput = document.getElementById('summaryOutput');

    // Backend API endpoint placeholder
    // In a real application, replace this with your actual backend API URL
    const API_ENDPOINT = 'https://your-backend-api.com/digest'; // Replace with your actual backend endpoint

    digestBtn.addEventListener('click', async () => {
        const topic = topicInput.value.trim();

        if (topic) {
            summaryOutput.style.display = 'block';
            summaryOutput.innerHTML = `<p>Searching for information on "<strong>${topic}</strong>"...</p><p>Generating summary with Gemini AI...</p>`;

            try {
                // Simulate a network request to a backend API
                // In a real scenario, this fetch call would go to your backend
                // which then calls the Gemini API.
                const response = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ topic: topic }),
                });

                if (!response.ok) {
                    // Handle HTTP errors
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to digest information.');
                }

                const data = await response.json();

                // Assuming the backend returns an object like { summary: "Your generated summary" }
                const summary = data.summary || `<h3>Summary for "${topic}"</h3><p>This is a simulated summary for the topic you entered. In a real application, the Gemini API would provide a concise and easy-to-understand digest of relevant information found on the web about "<strong>${topic}</strong>". This would help you quickly grasp the essence of complex subjects without reading multiple articles.</p><p>For example, if the topic was 'Artificial Intelligence', the summary might cover its history, key concepts, applications, and future outlook.</p>`;
                summaryOutput.innerHTML = summary;

            } catch (error) {
                console.error('Error fetching summary:', error);
                summaryOutput.innerHTML = `<p style="color: red;">Error: Could not retrieve summary. Please try again later. (${error.message || 'Network error'})</p>`;
            }
        } else {
            summaryOutput.style.display = 'block';
            summaryOutput.innerHTML = '<p style="color: red;">Please enter a topic to digest!</p>';
        }
    });
});