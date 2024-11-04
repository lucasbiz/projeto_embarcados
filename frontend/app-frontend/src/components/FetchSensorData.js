import React, { useEffect, useState } from 'react';
import CurrentSensorData from './CurrentSensorData';
import SensorChart from './SensorChart';
import AverageSensorData from './AverageChart';

function FetchSensorData() {
    const [sensorData, setSensorData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:3001/data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
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

        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []); 

    return (
        <div>
            {sensorData ? (
                <div>
                    <div className="data-container">
                        <div className="current-sensor-data">
                            <CurrentSensorData 
                                temperature={sensorData[sensorData.length - 1].temperature} 
                                humidity={sensorData[sensorData.length - 1].humidity} 
                                timestamp={sensorData[sensorData.length - 1].timestamp}
                            />
                        </div>
                        <div className="average-sensor-data">
                            <AverageSensorData />
                        </div>
                    </div>
                    <div className="chart-container">
                        <SensorChart data={sensorData} />
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default FetchSensorData;
