/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-env browser */

function validateFields() {
    // Pega o valor do campo de Email
    // eslint-disable-next-line no-undef
    const email = document.getElementById("email").value;
    
    if (!email || !validateEmail(email)) {
        // eslint-disable-next-line no-undef
        document.getElementById('recover-password-button').disabled = true;
    } else {
        // eslint-disable-next-line no-undef
        document.getElementById('recover-password-button').disabled = false;
    }
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
