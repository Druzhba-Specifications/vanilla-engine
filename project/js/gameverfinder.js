async function fetchAndDisplayVersion() {
    const outputDiv = document.getElementById('output');

    try {
        const response = await fetch('project/ver/gameversion.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const versionDetails = data.gamever[0];
        const commentDetails = data.gamever[1];

        outputDiv.innerHTML = `
            <h2>Version Information</h2>
            <p><strong>Version Name:</strong> ${versionDetails.vername}</p>
            <p><strong>Major Version:</strong> ${versionDetails.major}</p>
            <p><strong>Minor Version:</strong> ${versionDetails.minor}</p>
            <p><strong>Subrelease:</strong> ${versionDetails.subrelease}</p>
            ${commentDetails.comment ? `<p class="comment"><strong>Comment:</strong> ${commentDetails.comment}</p>` : ''}
        `;
    } catch (error) {
        console.error('Error:', error);
        outputDiv.innerHTML = `<p class="error">Failed to load data: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayVersion);
