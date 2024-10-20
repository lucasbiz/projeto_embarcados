import './App.css';
import FetchSensorData from './components/FetchSensorData';

function App() {
  return (
    <div className="App">
      <h1>Dashboard - Sensor de temperatura e umidade</h1>
      <FetchSensorData></FetchSensorData>
    </div>
  );
}

export default App;
