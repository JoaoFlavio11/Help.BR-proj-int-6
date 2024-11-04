document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("doacoes-container");
  
    // Função para atualizar a lista de doações
    async function atualizarDoacoes() {
      try {
        const response = await fetch("/api/doacoes"); // Altere a URL para "/api/doacoes"
        const doacoes = await response.json();
        container.innerHTML = ""; // Limpa o container antes de atualizar
  
        doacoes.forEach((doacao) => {
          const card = document.createElement("div");
          card.className = "doacao-card";
          card.innerHTML = `
            <h2>${doacao.donationName}</h2>
            <p>${doacao.donationDescription}</p>
            <p><strong>Tipo de Item:</strong> ${doacao.itemType}</p>
            <p><strong>Quantidade:</strong> ${doacao.quantity}</p>
          `;
          container.appendChild(card);
        });
      } catch    {
        container.innerHTML = "<p>Erro ao carregar doações</p>";
      }
    }
  
    await atualizarDoacoes(); // Carrega as doações ao carregar a página
  
    // Configurar atualização automática a cada 10 segundos
    setInterval(atualizarDoacoes, 10000);
  });
  