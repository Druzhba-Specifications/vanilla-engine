function loadScripts(scripts) {
    const scriptPaths = Array.isArray(scripts) ? scripts : [scripts];
    const promises = scriptPaths.map(scriptPath => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.async = false; // Ensures scripts execute in the order they are defined

            script.onload = () => {
                resolve();
            };

            script.onerror = () => {
                reject(new Error(`Failed to load script: ${scriptPath}`));
            };

            document.head.appendChild(script);
        });
    });

    return Promise.all(promises);
}

// Fetch the list of scripts from the JSON file
fetch('files.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Use the list of files to load the scripts
        return loadScripts(data.files);
    })
    .then(() => {
        console.log("All scripts from scripts.json loaded and executed.");
        // Your code can now use any functions or variables from the loaded scripts
    })
    .catch(error => {
        console.error("Error loading scripts:", error);
    });
