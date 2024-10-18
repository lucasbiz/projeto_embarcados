import React, {useEffect, useState} from 'react';


function FetchSensorData() {
    const [sensorData, setSensorData] = useState(null); // Declaração do estado
  
    useEffect(() => {
      const fetchData = async () => {
        await fetch('http://localhost:3000/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }})
          .then(response => response.json())
          .then(data => {
            const filteredData = data.map(item => ({
              temperature: item.temperature,
              humidity: item.humidity
            }));
            setSensorData(filteredData);// Atualiza o estado com os dados recebidos
          })
          .catch(error => {
            console.log('Erro ao buscar dados!', error);
          });
      };
  
      fetchData();
    }, []); 

    return (
        <div>
            <h1>Teste componente</h1>
            {sensorData ? (
                <pre>
                    {JSON.stringify(sensorData, null, 2)}
                </pre>
            ) : (<p>Carregando...</p>)}
        </div>
    );
}


export default FetchSensorData;
