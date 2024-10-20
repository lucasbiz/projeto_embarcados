import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function SensorChart({ data }) {
  // Função para formatar o timestamp no eixo X
  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}\n${hours}:${minutes}`;
  };

  return (
    <div className="chart-container">
      <h2>Histórico de Dados</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
          <Line type="monotone" dataKey="humidity" stroke="#387908" />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            interval={7} // Mostra um rótulo a cada 10 pontos
            />

          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SensorChart;


