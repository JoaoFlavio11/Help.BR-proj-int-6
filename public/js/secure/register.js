function onChangeEmail(){
    const email = form.email().value;
    form.emailRequiredError().style = 
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    emailRequiredError: document.getElementById('email-required-error'),
    emailInvalidError: document.getElementById('email-invalid-error'),
}