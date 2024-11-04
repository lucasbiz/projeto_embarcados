import React, { useEffect, useState } from "react";

function AverageSensorData() {
  const [averageData, setAverageData] = useState({ avg_temperature: null, avg_humidity: null });

  useEffect(() => {
    const fetchAverageData = async () => {
      try {
        const response = await fetch('http://localhost:3001/average_last_7_days');
        const data = await response.json();
        setAverageData(data);
      } catch (error) {
        console.error('Erro ao buscar dados médios:', error);
      }
    };

    fetchAverageData();

    // Atualiza os dados a cada 5 segundos
    const interval = setInterval(fetchAverageData, 5000);
    
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className="average-sensor-data">
      <h2>Médias dos Últimos 7 Dias</h2>
      <p>Média Temperatura: {averageData.avg_temperature !== null ? averageData.avg_temperature.toFixed(2) : 'Carregando...'} ºC</p>
      <p>Média Umidade: {averageData.avg_humidity !== null ? averageData.avg_humidity.toFixed(2) : 'Carregando...'} %</p>
    </div>
  );
}

export default AverageSensorData;
