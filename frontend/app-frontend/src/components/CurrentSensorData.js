import React from "react";

function CurrentSensorData ({timestamp, temperature, humidity}) {
    // Função para formatar a data e horário
    const formatDate = (timestamp) => {
    const date = new Date(timestamp); // Converte a string de timestamp para objeto Date
    const day = date.getDate().toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses em JS começam de 0
    const year = date.getFullYear().toString().slice(-2); // Pega os dois últimos dígitos do ano
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
    return (
        <div className="current-sensor-data">
            <h2>Dados Atuais</h2>
            <p>Data: {formatDate(timestamp)} </p>
            <p>Temperatura atual: {temperature} ºC</p>
            <p>Umidade atual: {humidity} %</p>
        </div>
    );
};

export default CurrentSensorData;
