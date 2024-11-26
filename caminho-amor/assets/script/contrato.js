// Dados fictícios das empresas
const companies = {
    roupas: [
      { name: "Loja de Roupas A", contact: "Tel: (11) 1234-5678" },
      { name: "Loja de Roupas B", contact: "Tel: (11) 2345-6789" }
    ],
    alimentos: [
      { name: "Buffet de Casamento X", contact: "Tel: (21) 9876-5432" },
      { name: "Doces & Sabores", contact: "Tel: (21) 8765-4321" }
    ],
    decoracao: [
      { name: "Decorações Y", contact: "Tel: (31) 6543-2109" },
      { name: "Flor de Liz Decorações", contact: "Tel: (31) 5432-1098" }
    ],
    musicos: [
      { name: "Orquestra Musical", contact: "Tel: (41) 3456-7890" },
      { name: "DJ Casamento 360", contact: "Tel: (41) 2345-6789" }
    ],
    fotografos: [
      { name: "Fotos de Casamento", contact: "Tel: (61) 4321-9876" },
      { name: "Fotografia A", contact: "Tel: (61) 3210-8765" }
    ],
    floristas: [
      { name: "Flores para Casamento", contact: "Tel: (51) 5678-1234" },
      { name: "Flores & Arte", contact: "Tel: (51) 4567-4321" }
    ]
  };
  
  // Seleção dos botões e do modal
  const categoryBtns = document.querySelectorAll(".category-btn");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const companiesList = document.getElementById("companies-list");
  const closeModal = document.querySelector(".close");
  
  // Mostrar modal com empresas
  categoryBtns.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      const selectedCompanies = companies[category];
  
      // Limpar a lista de empresas antes de adicionar novas
      companiesList.innerHTML = "";
  
      // Inserir empresas no modal
      selectedCompanies.forEach(company => {
        const li = document.createElement("li");
        li.innerHTML = `<h3>${company.name}</h3><p>${company.contact}</p>`;
        companiesList.appendChild(li);
      });
  
      // Alterar o título do modal de acordo com a categoria
      modalTitle.textContent = `Empresas de ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  
      // Mostrar modal
      modal.style.display = "block";
    });
  });
  
  // Fechar modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  // Fechar modal clicando fora dele
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  