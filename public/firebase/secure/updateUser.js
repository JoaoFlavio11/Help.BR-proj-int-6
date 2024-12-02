/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("userEmail").innerText = user.email;
    if (user.displayName) {
      document.getElementById("userName").value = user.displayName;
    }
  } else {
    window.location.href = "http://localhost:3000/login";
  }
});

function updateUserProfile() {
  const user = firebase.auth().currentUser;
  const displayName = document.getElementById("userName").value;

  user
    .updateProfile({ displayName })
    .then(() => alert("Perfil atualizado com sucesso!"))
    .catch((error) => alert("Erro ao atualizar perfil: " + error.message));
}
