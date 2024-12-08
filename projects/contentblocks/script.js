// Initialize Editor.js
const editor = new EditorJS({
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
