/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
function onChangeEmail() {
  const email = form.email().value;

  form.emailRequiredError().style.display = email ? "none" : "block";
  form.emailInvalidError().style.display = validateEmail(email)
    ? "none"
    : "block";

  toggleRegisterButtonDisabled();
}

function onChangePassword() {
  const password = form.password().value;

  form.passwordRequiredError().style.display = password ? "none" : "block";
  form.passwordMinLengthError().style.display =
    password.length >= 6 ? "none" : "block";

  validatePasswordMatch();
  toggleRegisterButtonDisabled();
}

function onChangeConfirmPassword() {
  validatePasswordMatch();
  toggleRegisterButtonDisabled();
}

function validatePasswordMatch() {
  const password = form.password().value;
  const confirmPassword = form.confirmPassword().value;

  form.confirmPasswordDoesntMatchError().style.display =
    password === confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisabled() {
  form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
  const email = form.email().value;
  const password = form.password().value;
  const confirmPassword = form.confirmPassword().value;

  if (!email || !validateEmail(email)) {
    return false;
  }

  if (!password || password.length < 6) {
    return false;
  }

  if (password !== confirmPassword) {
    return false;
  }

  return true;
}

function register(){
    const email = form.email().value;
    const password = form.password().value;

    showLoading();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        hideLoading();
        window.location.href = "http://localhost:3000/login";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function authPage() {
    showLoading();
    window.location.href = "http://localhost:3000/login";
  }

function getErrorMessage(error){
    switch(error.code){
        case 'auth/invalid-email':
            return 'E-mail inválido';
        case 'auth/wrong-password':
            return 'Senha incorreta';
        case 'auth/missing-password':
            return 'Campo de senha vazio';
        case 'auth/missing-email':
            return 'Campo de email vazio';
        case 'auth/user-not-found':
            return 'Usuário não encontrado';
        case 'auth/user-disabled':
            return 'Usuário desabilitado';
        case 'auth/invalid-credential':
            return 'Credenciais inválidas';
        case 'auth/operation-not-allowed':
            return 'Operação não permitida';
        case 'auth/email-already-in-use':
            return 'este E-mail já está em uso';
        case 'auth/invalid-verification-code':
            return 'Código de verificação inválido';
        case 'auth/expired-action-code':
            return 'Código de verificação expirado';
        default:
            return 'Erro desconhecido';
    }
}

const form = {
  email: () => document.getElementById("email"),
  password: () => document.getElementById("password"),
  confirmPassword: () => document.getElementById("confirmPassword"),
  registerButton: () => document.getElementById("login-button"),
  emailRequiredError: () => document.getElementById("email-required-error"),
  emailInvalidError: () => document.getElementById("email-invalid-error"),
  passwordRequiredError: () =>
    document.getElementById("password-required-error"),
  passwordMinLengthError: () =>
    document.getElementById("password-min-length-error"),
  confirmPasswordDoesntMatchError: () =>
    document.getElementById("password-doesnt-match-error"),
};
