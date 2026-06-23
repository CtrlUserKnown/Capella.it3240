// form.js - Reads form data and displays it on the page
// Author: Christian Alvarez
// Date: 06/21/2026
//
// Purpose:
// Reads every field in the contact form and renders a formatted summary below it
// after the user submits. It does not send data to a server — the summary exists
// to confirm what was captured and to demonstrate several DOM access methods in one file.
//
// Technique choices:
// - getElementById(): Used for single, uniquely identified inputs (name, email,
//   phone, role, referral, message). The fastest and most direct selector when
//   an element has a known id.
// - getElementsByName(): Used for radio buttons and checkboxes because multiple
//   inputs share the same name attribute. Returns a live NodeList that can be
//   iterated to find which ones are checked.
// - getElementsByTagName("input"): Used to count all input elements on the page.
//   Included specifically to demonstrate this third access method alongside the
//   other two — in practice you would use a more targeted selector.
// - Called by validation.js, not directly: displayFormData() has no submit listener
//   of its own. validation.js owns the submit event and calls this function only
//   after all fields pass validation, enforcing a clear gate between the two files.

// Function to read form inputs and display formatted output below the form
function displayFormData(event) {
    // Prevent the form from actually submitting to the server
    event.preventDefault();

    // Confirm the function was triggered
    console.log("displayFormData() function triggered by submit button");

    // --- Read text inputs using getElementById() ---
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let role = document.getElementById("role").value;
    let phone = document.getElementById("phone").value;

    // --- Output to the console ---
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
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

// Note: submit event listener is now handled by validation.js, which calls
// displayFormData() after successful validation.
