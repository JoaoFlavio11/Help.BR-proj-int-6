/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "http://localhost:3000/";
  }
});

function onChangeEmail() {
  toggleButtonsDisable();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonsDisable();
  togglePasswordErrors();
}

function login() {
  showLoading();
  const email = form.email().value;
  const password = form.password().value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      hideLoading();
      window.location.href = "http://localhost:3000/";
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
      console.error("Error:", error);
    });
}

function register() {
  showLoading();
  window.location.href = "http://localhost:3000/register";
}

function recoverPassword() {
  showLoading();
  const email = form.email().value;

  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      hideLoading();
      alert("E-mail de recuperação enviado com sucesso!");
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "E-mail inválido";
    case "auth/wrong-password":
      return "Senha incorreta";
    case "auth/missing-password":
      return "Campo de senha vazio";
    case "auth/missing-email":
      return "Campo de email vazio";
    case "auth/user-not-found":
      return "Usuário não encontrado";
    case "auth/user-disabled":
      return "Usuário desabilitado";
    case "auth/invalid-credential":
      return "Credenciais inválidas";
    case "auth/operation-not-allowed":
      return "Operação não permitida";
    case "auth/email-already-in-use":
      return "este E-mail já está em uso";
    case "auth/invalid-verification-code":
      return "Código de verificação inválido";
    case "auth/expired-action-code":
      return "Código de verificação expirado";
    default:
      return "Erro desconhecido";
  }
}

function toggleEmailErrors() {
  const email = form.email().value;
  form.emailRequiredError().style.display = email ? "none" : "block";
  form.emailInvalidError().style.display = validateEmail(email)
    ? "none"
    : "block";
}

function togglePasswordErrors() {
  const password = form.password().value;
  form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  form.recoverPasswordButton().disabled = !emailValid;

  const passwordValid = isPasswordValid();
  form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
  const email = form.email().value;
  return email && validateEmail(email);
}

function isPasswordValid() {
  return !!form.password().value;
}

const form = {
  email: () => document.getElementById("email"),
  emailInvalidError: () => document.getElementById("email-invalid-error"),
  emailRequiredError: () => document.getElementById("email-required-error"),
  loginButton: () => document.getElementById("login-button"),
  password: () => document.getElementById("password"),
  passwordRequiredError: () =>
    document.getElementById("password-required-error"),
  recoverPasswordButton: () =>
    document.getElementById("recover-password-button"),
};
