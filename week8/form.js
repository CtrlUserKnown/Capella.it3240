// form.js - Reads form data and displays it on the page
// Author: Christian Alvarez
// Date: 06/02/2026

// Function to read form inputs and display formatted output below the form
function displayFormData(event) {
    // Prevent the form from actually submitting to the server
    event.preventDefault();

    // Confirm the function was triggered
    console.log("displayFormData() function triggered by submit button");

    // --- Read text inputs using getElementById() ---
    let name = document.getElementById("name").value;
    console.log("Name:", name);

    let email = document.getElementById("email").value;
    console.log("Email:", email);

    let phone = document.getElementById("phone").value;
    console.log("Phone:", phone);

    let role = document.getElementById("role").value;
    console.log("Role:", role);

    // --- Read select menu using getElementById() ---
    let referral = document.getElementById("referral").value;
    console.log("Referral referral source:", referral);

    // --- Read radio buttons using getElementsByName() ---
    let serviceOptions = document.getElementsByName("service");
    let selectedService = "";
    for (let i = 0; i < serviceOptions.length; i++) {
        if (serviceOptions[i].checked) {
            selectedService = serviceOptions[i].value;
            break;
        }
    }
    console.log("Primary service selected:", selectedService);

    // --- Read checkboxes using getElementsByName() ---
    let interestOptions = document.getElementsByName("interest");
    let selectedInterests = [];
    for (let i = 0; i < interestOptions.length; i++) {
        if (interestOptions[i].checked) {
            selectedInterests.push(interestOptions[i].value);
        }
    }
    console.log("Areas of interest selected:", selectedInterests);

    // --- Read textarea using getElementById() ---
    let message = document.getElementById("message").value;
    console.log("Project message:", message);

    // --- Read all input elements using getElementsByTagName() ---
    // Demonstrates the getElementsByTagName method by counting total inputs
    let allInputs = document.getElementsByTagName("input");
    console.log("Total <input> elements on the page:", allInputs.length);

    // --- Build neatly formatted output HTML ---
    let outputHTML = "<h3>Form Submission Summary</h3>";
    outputHTML += "<div class=\"form-output\">";
    outputHTML += "<p><strong>Full Name:</strong> " + name + "</p>";
    outputHTML += "<p><strong>Email Address:</strong> " + email + "</p>";
    outputHTML += "<p><strong>Phone Number:</strong> " + phone + "</p>";
    outputHTML += "<p><strong>Role / Title:</strong> " + role + "</p>";
    outputHTML += "<p><strong>How Did You Hear About Us:</strong> " + referral + "</p>";
    outputHTML += "<p><strong>Primary Service Interest:</strong> " + (selectedService || "None selected") + "</p>";
    outputHTML += "<p><strong>Areas of Interest:</strong> " + (selectedInterests.length > 0 ? selectedInterests.join(", ") : "None selected") + "</p>";
    outputHTML += "<p><strong>Project Message:</strong><br>" + message + "</p>";
    outputHTML += "</div>";

    // Insert the formatted output into the page below the form
    document.getElementById("form-output").innerHTML = outputHTML;

    console.log("Form data displayed successfully in #form-output");
}

// After the page loads, attach the event listener to the form's submit event
window.onload = function () {
    let form = document.getElementById("webForm");
    form.addEventListener("submit", displayFormData);
    console.log("submit event listener attached to #webForm");
};
