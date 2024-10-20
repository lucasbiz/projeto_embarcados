import React, {useEffect, useState} from 'react';
import CurrentSensorData from './CurrentSensorData';
import SensorChart from './SensorChart';

function FetchSensorData() {
    const [sensorData, setSensorData] = useState(null); // Declaração do estado
  
    useEffect(() => {
      const fetchData = async () => {
        await fetch('http://localhost:3001/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }})
          .then(response => response.json())
          .then(data => {
            console.log(data)
            const filteredData = data.map(item => ({
              temperature: item.temperature,
              humidity: item.humidity,
              timestamp: item.timestamp
            }));

            setSensorData(filteredData);
          })
          .catch(error => {
            console.log('Erro ao buscar dados!', error);
          });
      };
  
      fetchData();

        // Configura a atualização automática a cada 5 segundos
      const interval = setInterval(fetchData, 5000);
      
      // Limpa o intervalo ao desmontar o componente
      return () => clearInterval(interval);
    }, []); 

    return (
        <div>
            {sensorData ? (
                <pre>
                    <CurrentSensorData 
                    temperature={sensorData[sensorData.length - 1].temperature} 
                    humidity={sensorData[sensorData.length - 1].humidity} 
                    timestamp={sensorData[sensorData.length - 1].timestamp} // Passando o timestamp também
                    />
                    <SensorChart data={sensorData} />
                </pre>
            ) : (<p>Carregando...</p>)}
        </div>
    );
}


export default FetchSensorData;
