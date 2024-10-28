import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrando os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function SensorChart({ data }) {
  // Preparar os dados para o gráfico
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day}/${month} ${hours}:${minutes}`; // Formato dd/mm hh:mm
    }),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: data.map(item => item.temperature),
        borderColor: 'rgba(255, 99, 132, 1)', // Cor da linha de temperatura
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        tension: 0.3, // Curvatura da linha
      },
      {
        label: 'Umidade (%)',
        data: data.map(item => item.humidity),
        borderColor: 'rgba(54, 162, 235, 1)', // Cor da linha de umidade
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  // Configurações do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (context.dataset.label === 'Temperatura (°C)') {
              return `Temperatura: ${context.raw} °C`;
            } else if (context.dataset.label === 'Umidade (%)') {
              return `Umidade: ${context.raw} %`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data e Hora',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valor',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Histórico de Dados</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default SensorChart;



