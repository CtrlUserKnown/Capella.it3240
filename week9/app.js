// JavaScript for FourSides Studio Tools page
// Author: Christian Alvarez
// Date: 06/14/2026

// Array of open-source tool names developed by FourSides Studio
let tools = ["FractalForge", "ChromaEngine", "Timeline Weaver", "VectorForge", "ShaderSync"];

// Log the array to confirm its contents
console.log("Array of tool names:", tools);
console.log("Number of tools in array:", tools.length);

// Builds an HTML unordered list from the tools array
function buildToolList() {
    // Variable to hold the assembled HTML string for the list
    let listCode = "<ul class=\"tool-list\">";
    // Loop through each item in the array and wrap it in list item tags
    for (let i = 0; i < tools.length; i++) {
        listCode += "<li>" + tools[i] + "</li>";
        // Log each item as it is added to the list
        console.log("Added tool to list:", tools[i]);
    }
    listCode += "</ul>";
    // Insert the completed list HTML into the paragraph with id "list"
    document.getElementById("list").innerHTML = listCode;
}

// Event handler that runs the function after the page loads
window.onload = function() {
    buildToolList();
};
