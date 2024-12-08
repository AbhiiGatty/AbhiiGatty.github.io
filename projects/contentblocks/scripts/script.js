// Select elements
const loadingMessage = document.getElementById('loadingMessage');
const jsonOutputContainer = document.getElementById('jsonOutputContainer');

// Show loading message before Editor.js is initialized
loadingMessage.style.display = 'block';
jsonOutputContainer.style.display = 'none'; // Hide JSON container initially

// Initialize Editor.js
const editor = new EditorJS({
    onReady: () => {
        // Hide loading message after the editor is initialized
        loadingMessage.style.display = 'none';
        jsonOutputContainer.style.display = 'block';
    },
    onChange: async () => {
        const content = await editor.save();
        document.getElementById('jsonOutput').textContent = JSON.stringify(content, null, 2);
    },
    data: {
        blocks: [
            {
                type: 'header',
                data: {
                    text: 'Welcome to ContentBlocks!',
                    level: 2,
                },
            },
            {
                type: 'paragraph',
                data: {
                    text: 'This is a pre-populated paragraph in Editor.js. You can edit this content or add new blocks.',
                },
            },
        ],
    },
    autofocus: true,
    holder: 'editorjs',
    tools: {
        header: {
            class: Header,
            inlineToolbar: true,
            config: {
                placeholder: 'Enter a header',
            },
            // blockClass: 'custom-paragraph', // Custom class for blocks
        },
        list: {
            class: EditorjsList, 
            inlineToolbar: true,
            config: {
                defaultStyle: 'ordered',
            },
        },
        code: {
            class: CodeTool,
        },
        delimiter: Delimiter,
        quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: "Quote's author",
            },
        },
        table: {
            class: Table,
            inlineToolbar: true,
        },
        // image: {
        //     class: ImageTool,
        //     config: {
        //         endpoints: {
        //             // byFile: 'http://localhost:8008/uploadFile', // Your endpoint for file uploads
        //             // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint for URL-based uploads
        //         },
        //     },
        // },
    },
});

// Save content and trigger download as JSON
document.getElementById('saveButton').addEventListener('click', () => {
    editor.save().then((outputData) => {
        const jsonData = JSON.stringify(outputData, null, 2); // Beautify JSON
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create a temporary link to trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'editor-content.json'; // File name
        a.click();

        // Clean up
        URL.revokeObjectURL(url);
    }).catch((error) => {
        console.error('Error saving content:', error);
    });
});


// Validate JSON in the textarea
const jsonOutput = document.getElementById('jsonOutput');
jsonOutput.addEventListener('input', () => {
    try {
        JSON.parse(jsonOutput.value); // Try to parse the JSON
        jsonOutput.classList.remove('invalid_json'); // Remove red border if valid
    } catch (err) {
        jsonOutput.classList.add('invalid_json'); // Add red border if invalid
    }
});

// Save to Clipboard functionality
document.getElementById('copyButton').addEventListener('click', () => {
    const jsonOutput = document.getElementById('jsonOutput').value; // Get JSON content
    navigator.clipboard.writeText(jsonOutput) // Copy to clipboard
        .then(() => alert('JSON copied to clipboard!')) // Success message
        .catch(err => alert('Failed to copy JSON: ' + err)); // Error handling
});

// Apply changes from JSON textarea to Editor.js
document.getElementById('jsonOutput').addEventListener('input', () => {
    const jsonOutput = document.getElementById('jsonOutput').value;
    try {
        const parsedData = JSON.parse(jsonOutput); // Parse JSON from textarea
        editor.render(parsedData); // Render the parsed data back into Editor.js
    } catch (error) {
        console.error('Invalid JSON:', error); // Handle invalid JSON
    }
});

// Run the update 2 seconds after the page loads
setTimeout(async () => {
    const content = await editor.save(); // Save editor content
    document.getElementById('jsonOutput').textContent = JSON.stringify(content, null, 2); // Update JSON textarea
}, 1000);