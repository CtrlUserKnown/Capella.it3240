// validation.js - Form validation for FourSides Studio contact page
// Author: Christian Alvarez
// Date: 06/21/2026
// Validates form fields using HTML5 constraint API and displays
// specific error messages near each field before allowing submission.
//
// Purpose:
// Acts as the gatekeeper for the contact form. It intercepts the submit event,
// checks each required field, surfaces field-level error messages, and only calls
// displayFormData() (in form.js) if every field passes. Keeping validation in its
// own file separates the "is the data valid?" concern from the "show the data"
// concern in form.js.
//
// Technique choices:
// - HTML5 Constraint Validation API (validity, setCustomValidity, checkValidity):
//   Used instead of writing regex checks from scratch. The browser already tracks
//   validity state (valueMissing, typeMismatch, tooShort, patternMismatch, etc.)
//   through the attributes set on each input in the HTML. This approach reads those
//   states and replaces the browser's default tooltip messages with custom inline
//   error text placed next to each field.
// - setCustomValidity("") before each check: Clears any custom message set in a
//   previous validation pass. Without this, a field that was invalid on the first
//   submit would stay invalid even after the user fixes it, because the custom
//   message string would still be set.
// - Error messages rendered next to each field: Inline errors placed adjacent to
//   the field are easier to act on than a single summary at the top or bottom of
//   the form. The user can see exactly which field is wrong without scrolling.

// Main validation function triggered on form submit
function validateForm(event) {
    // Step 1: Prevent default form submission so validation can run first
    event.preventDefault();

    // Step 2: Track overall form validity
    let isValid = true;

    // Step 3: Get references to form input elements
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let message = document.getElementById("message");

    // Step 4: Get references to error message display elements
    let nameError = document.getElementById("name-error");
    let emailError = document.getElementById("email-error");
    let phoneError = document.getElementById("phone-error");
    let messageError = document.getElementById("message-error");
    let formMessage = document.getElementById("form-message");

    // Step 5: Clear all previous error messages
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";
    formMessage.textContent = "";
    formMessage.className = "form-message";

    // --- Validate Full Name ---
    // Reset custom validity before checking
    name.setCustomValidity("");
    if (name.validity.valueMissing) {
        name.setCustomValidity("Please enter your full name.");
    } else if (name.validity.tooShort) {
        name.setCustomValidity("Name must be at least 2 characters.");
    } else if (name.validity.tooLong) {
        name.setCustomValidity("Name must be under 100 characters.");
    }
    if (!name.checkValidity()) {
        nameError.textContent = name.validationMessage;
        isValid = false;
    }

    // --- Validate Email Address ---
    email.setCustomValidity("");
    if (email.validity.valueMissing) {
        email.setCustomValidity("Please enter your email address.");
    } else if (email.validity.typeMismatch) {
        email.setCustomValidity("Enter a valid email address (e.g., name@domain.com).");
    }
    if (!email.checkValidity()) {
        emailError.textContent = email.validationMessage;
        isValid = false;
    }

    // --- Validate Phone Number ---
    phone.setCustomValidity("");
    if (phone.validity.valueMissing) {
        phone.setCustomValidity("Please enter your phone number.");
    } else if (phone.validity.patternMismatch) {
        phone.setCustomValidity("Use format 312-555-0123 (XXX-XXX-XXXX).");
    }
    if (!phone.checkValidity()) {
        phoneError.textContent = phone.validationMessage;
        isValid = false;
    }

    // --- Validate Message ---
    message.setCustomValidity("");
    if (message.validity.valueMissing) {
        message.setCustomValidity("Please describe your project or inquiry.");
    } else if (message.validity.tooShort) {
        message.setCustomValidity("Message must be at least 10 characters.");
    } else if (message.validity.tooLong) {
        message.setCustomValidity("Message must be under 1000 characters.");
    }
    if (!message.checkValidity()) {
        messageError.textContent = message.validationMessage;
        isValid = false;
    }

    // Step 6: Display overall result based on isValid
    if (isValid) {
        formMessage.textContent = "Form submitted successfully!";
        formMessage.className = "form-message success";
        // Call the display function from form.js to show submitted data
        displayFormData(event);
    } else {
        formMessage.textContent = "Please correct the errors above.";
        formMessage.className = "form-message error";
        // Focus the first invalid field so the user can start fixing right away
        let firstInvalidField = document.querySelector(".error-message:not(:empty)");
        if (firstInvalidField) {
            let fieldId = firstInvalidField.id.replace("-error", "");
            document.getElementById(fieldId).focus();
        }
    }
}

// Step 7: Attach the event listener so validation runs when the form is submitted
document.getElementById("webForm").addEventListener("submit", validateForm);
