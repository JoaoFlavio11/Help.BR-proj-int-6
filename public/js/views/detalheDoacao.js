/* eslint-disable no-undef */

// Carrega os detalhes da doação a partir do ID da URL
async function carregarDetalhesDoacao() {
  const id = window.location.pathname.split("/").pop();
  try {
    const response = await fetch(`/api/doacoes/${id}`);
    const donation = await response.json();

    if (response.ok) {
      document.getElementById("doacao-nome").textContent =
        donation.donationName;
      document.getElementById("doacao-descricao").textContent =
        donation.donationDescription;
      document.getElementById("doacao-tipo").textContent = donation.itemType;
      document.getElementById("doacao-quantidade").textContent =
        donation.quantity;
    } else {
      document.querySelector(".detalhes-container").innerHTML =
        "<p>Doação não encontrada.</p>";
    }
  } catch (error) {
    console.error("Erro ao carregar detalhes da doação:", error);
    document.querySelector(".detalhes-container").innerHTML =
      "<p>Erro ao carregar detalhes da doação.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarDetalhesDoacao);
