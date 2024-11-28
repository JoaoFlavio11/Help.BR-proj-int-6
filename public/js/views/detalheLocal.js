/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("container-pontos");

  if (!container) {
    console.error("Elemento com id 'container-pontos' não encontrado.");
    return;
  }

  // Função que atualiza a lista de pontos de apoio
  async function atualizarPontos() {
    try {
      const response = await fetch("/location/api/support");
      const pontos = await response.json();
      container.innerHTML = ""; // Limpa o container antes de adicionar novos itens

      pontos.forEach((ponto) => {
        const card = document.createElement("div");
        card.className = "apoio-card";

        // Incluindo conteúdo no cartão
        card.innerHTML = `
            <h2>${ponto.locationName}</h2>
            <p><strong>Cidade/CEP:</strong> ${ponto.locationCity}, ${ponto.locationPostalCode}.</p>
            <p><strong>Endereço:</strong> ${ponto.locationAdress}, ${ponto.locationNumber}.</p>
            <button class="donate-btn"><b>Salvar Endereço!</b></button>
          `;

        container.appendChild(card);
      });
    } catch (error) {
      console.error("Erro ao carregar pontos de apoio:", error);
      container.innerHTML = "<p>Erro ao carregar pontos de apoio</p>";
    }
  }

  // Atualiza os pontos ao carregar a página
  await atualizarPontos();

  // Atualiza os pontos automaticamente a cada 10 segundos
  setInterval(atualizarPontos, 10000);
});
