/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
firebase.auth().onAuthStateChanged( user => {
    if(!user){
        window.location.href = "http://localhost:3000/login"
    }
})

function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "http://localhost:3000/login";
    }).catch(() => {
        alert("Erro ao fazer logout")
    })
}