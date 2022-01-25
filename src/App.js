import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card, Button} from "react-bootstrap";
import DefaultCity from './components/DefaultCity';
import CityPicker from './components/CityPicker';
import {CitiesProvider} from './context/Cities';


function App() {

  return (

    <CitiesProvider>
      <Container className='mx-auto my-4' style={{width:"max(600px, 50%)"}}>
        <h1 className='mx-auto text-center text-white'>Regarde comme il fait beau</h1>
        <CityPicker />
        <DefaultCity/>
      </Container>
    </CitiesProvider>
  );
}

export default App;
