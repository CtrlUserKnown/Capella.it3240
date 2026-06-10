const configureValidation = function() {
    document.getElementsByTagName("form").item(0).onsubmit = function(event) {
        event.preventDefault()
    }
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function() {
        const form = document.getElementsByTagName("form")[0]
        const message = document.getElementById("resultMessage")
        if(form.checkValidity()) {
            message.style.color = "forestgreen"
            message.innerHTML = "Form valid"
        }
        else {
            message.style.color = "darkred"
            let errorText = "Form not valid:<br>"
            const userName = document.getElementById("userName")
            if (!userName.checkValidity()) {
                if (userName.validity.valueMissing) {
                    errorText += "- User name is required<br>"
                } else if (userName.validity.patternMismatch) {
                    errorText += "- User name must be 5+ word characters<br>"
                }
            }
            const phone = document.getElementById("phone")
            if (!phone.checkValidity()) {
                if (phone.validity.patternMismatch) {
                    errorText += "- Phone format: (###) ###-####<br>"
                }
            }
            const email = document.getElementById("email")
            if (!email.checkValidity()) {
                if (email.validity.valueMissing) {
                    errorText += "- Email is required<br>"
                } else if (email.validity.typeMismatch || email.validity.patternMismatch) {
                    errorText += "- Enter a valid email address<br>"
                }
            }
            const acceptTerms = document.getElementById("acceptTerms")
            if (!acceptTerms.checkValidity()) {
                if (acceptTerms.validity.valueMissing) {
                    errorText += "- You must accept the terms<br>"
                }
            }
            message.innerHTML = errorText
        }
    })
 }

window.onload = () => {
    configureValidation()
}
