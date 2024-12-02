/* eslint-disable no-undef */

// Carrega os detalhes da doação a partir do ID da URL
async function carregarDetalhesDoacao() {
  const id = window.location.pathname.split("/").pop();
  try {
    const response = await fetch(`/api/doacoes/${id}`);
    const donation = await response.json();

    if (response.ok) {
      const nomeElemento = document.getElementById("doacao-nome");
      const descricaoElemento = document.getElementById("doacao-descricao");
      const tipoElemento = document.getElementById("doacao-tipo");
      const quantidadeElemento = document.getElementById("doacao-quantidade");
      const chavePixElemento = document.getElementById("doacao-chave-pix");

      if (nomeElemento) nomeElemento.textContent = donation.donationName;
      if (descricaoElemento) descricaoElemento.textContent = donation.donationDescription;
      if (tipoElemento) tipoElemento.textContent = donation.itemType;
      if (quantidadeElemento) quantidadeElemento.textContent = donation.quantity;
      if (chavePixElemento) chavePixElemento.textContent = donation.chavePix; // Adicionado campo chavePix
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
