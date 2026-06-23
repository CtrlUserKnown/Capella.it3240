// JavaScript for FourSides Studio Tools page
// Author: Christian Alvarez
// Date: 06/21/2026
//
// Purpose:
// Populates the Tools page with a dynamically generated list of the studio's
// open-source software. The list is stored in an array rather than hard-coded
// in HTML so that adding or removing a tool only requires changing one place
// in one file rather than editing markup.
//
// Technique choices:
// - Array + for loop: Demonstrates iterating over an array by index, which maps
//   directly to how arrays work in most languages. A forEach call would be
//   shorter, but the index-based loop makes the iteration logic explicit.
// - String concatenation to build HTML: Shows how JavaScript can construct and
//   inject markup at runtime. The resulting <ul> is inserted via innerHTML rather
//   than appendChild so the entire list is written in a single DOM operation.
// - window.onload: Ensures the DOM is fully parsed before the script tries to
//   find #list. Because app.js is loaded before </body> this guard is technically
//   redundant, but it makes the dependency on the DOM explicit.

// Array of open-source tool names developed by FourSides Studio
let Tools = ["FractalForge", "ChromaEngine", "Timeline Weaver", "VectorForge", "ShaderSync", "LocationWeather"];

// Log the array to confirm its contents
console.log("Array of tool names:", Tools);
console.log("Number of tools in array:", Tools.length);

// Builds an HTML unordered list from the Tools array
function buildToolList() {
    // Variable to hold the assembled HTML string for the list
    let listCode = "<ul class=\"tool-list\">";
    // Loop through each item in the array and wrap it in list item tags
    for (let i = 0; i < Tools.length; i++) {
        listCode += "<li>" + Tools[i] + "</li>";
        // Log each item as it is added to the list
        console.log("Added tool to list:", Tools[i]);
    }
    listCode += "</ul>";
    // Insert the completed list HTML into the paragraph with id "list"
    document.getElementById("list").innerHTML = listCode;
}

// Event handler that runs the function after the page loads
window.onload = function() {
    buildToolList();
};
