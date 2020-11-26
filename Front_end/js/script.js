//var form = document.getElementsByName("form");
//function handleForm(event) { event.preventDefault(); } 
//form.addEventListener('submit', handleForm);


//form.addEventListener("focusout", () => validateForm());

function validateForm() {

    var full_name = document.forms["form"]["full_name"].value;
    var email = document.forms["form"]["email"].value;
    var text = document.forms["form"]["text"].value;
    var regex_email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (full_name.length < 1) {
        document.getElementById('error-full_name').innerHTML = "This field is required";
    }
    else {
        document.getElementById('error-full_name').innerHTML = "";
    }

    if (email.length < 1) {
        document.getElementById('error-email').innerHTML = "This field is required";
    }
    else {
        document.getElementById('error-email').innerHTML = "";
        if (!regex_email.test(email)) {
            document.getElementById('error-email').innerHTML = "Please, use valid email";
        }
        else {
            document.getElementById('error-email').innerHTML = "";
        }
    }

    if (text.length < 1) {
        document.getElementById('error-text').innerHTML = "This field is required";
    }
    else {
        document.getElementById('error-text').innerHTML = "";
        if (text.length < 10) {
            document.getElementById('error-text').innerHTML = "The text field should be at least 10 of characters";
        }
        else {
            document.getElementById('error-text').innerHTML = "";
            let result = sendEmail(full_name, email, text);
        }
    }

    if (full_name.length < 1 || email.length < 1 || text.length < 1 || !regex_email.test(email)) {
        return false;
    }
    return false;
}

async function sendEmail(fullname, email, text) {
    let data = {
        fullname: fullname,
        email: email,
        text: text
    };

    let response = await fetch('http://localhost:3000/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    let result = await response.text();
    document.getElementById('sent-text').innerHTML = "Message sent successfully!";
    // document.getElementById('sent-text').innerHTML = result;
    return result;

}