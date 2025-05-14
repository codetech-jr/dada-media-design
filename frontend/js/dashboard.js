document.addEventListener("DOMContentLoaded", () => {
    // Llama al backend para obtener datos
    fetch("http://localhost:8080/analytics/dashboard")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.page);
        const visits = data.map((item) => item.visits);
  
        // Configura y renderiza el gráfico
        const ctx = document.getElementById("pageViewsChart").getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Visitas",
                data: visits,
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: { beginAtZero: true },
            },
          },
        });
      })
      .catch((error) => console.error("Error fetching analytics data:", error));
  });
  