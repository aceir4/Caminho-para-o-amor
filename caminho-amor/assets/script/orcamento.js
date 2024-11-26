let totalIncome = 0;
    let totalExpenses = 0;
    const addCategoryBtn = document.getElementById("addCategoryBtn");
    const categoriesList = document.getElementById("categoriesList");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const addCategoryConfirm = document.getElementById("addCategoryConfirm");
    const categoryNameInput = document.getElementById("categoryName");
    const categoryCostInput = document.getElementById("categoryCost");
    const updateIncomeBtn = document.getElementById("updateIncomeBtn");
    const totalIncomeDisplay = document.getElementById("totalIncomeDisplay");
    const incomeModal = document.getElementById("incomeModal");
    const newIncomeInput = document.getElementById("newIncome");
    const updateIncomeConfirm = document.getElementById("updateIncomeConfirm");
    const closeIncomeModalBtn = document.getElementById("closeIncomeModalBtn");

 // Configuração do gráfico
const ctx = document.getElementById("budgetChart").getContext("2d");
const budgetChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Despesas", "Sobra (Renda Disponível)"],
    datasets: [{
      data: [0, 100],
      backgroundColor: ["#ff6666", "#66ff66"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "center",
        labels: {
          color: "white", // Cor do texto da legenda
          font: {
            size: 14, // Tamanho da fonte da legenda
            family: "Arial, sans-serif", // Fonte da legenda
            weight: "bold" // Peso da fonte (opcional)
          }
        }
      }
    }
  }
});

    // Função para atualizar gráfico
    function updateChart() {
      const remainingIncome = Math.max(totalIncome - totalExpenses, 0);
      budgetChart.data.datasets[0].data = [totalExpenses, remainingIncome];
      budgetChart.update();
    }

    // Mostrar modal para adicionar categoria
    addCategoryBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    // Fechar modal de categoria
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Adicionar categoria e atualizar despesas
    addCategoryConfirm.addEventListener("click", () => {
      const categoryName = categoryNameInput.value.trim();
      const categoryCost = parseFloat(categoryCostInput.value) || 0;
      
      if (categoryName && categoryCost > 0) {
        // Adicionar categoria à lista
        const li = document.createElement("li");
        li.innerHTML = `${categoryName}: R$ ${categoryCost.toFixed(2)} 
                        <span>R$ ${categoryCost.toFixed(2)}</span>`;
        categoriesList.appendChild(li);

        // Atualizar total de despesas
        totalExpenses += categoryCost;
        updateChart();

        // Fechar modal
        modal.style.display = "none";
        categoryNameInput.value = "";
        categoryCostInput.value = "";
      }
    });

    // Mostrar modal para atualizar renda
    updateIncomeBtn.addEventListener("click", () => {
      incomeModal.style.display = "flex";
    });

    // Fechar modal de renda
    closeIncomeModalBtn.addEventListener("click", () => {
      incomeModal.style.display = "none";
    });

    // Atualizar renda
    updateIncomeConfirm.addEventListener("click", () => {
      const newIncome = parseFloat(newIncomeInput.value);
      if (newIncome && newIncome > 0) {
        totalIncome = newIncome;
        totalIncomeDisplay.textContent = totalIncome.toFixed(2);
        updateChart();
        incomeModal.style.display = "none";
        newIncomeInput.value = "";
      }
    });

    // Inicializa o gráfico
    updateChart();