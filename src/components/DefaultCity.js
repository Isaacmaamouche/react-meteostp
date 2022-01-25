import { Card, Container, Row, Col } from "react-bootstrap";
import {useCities} from '../context/Cities.js';

export default function DefaultCity(){

    const {result} = useCities();
    function unixToHour(unix) {return new Date(unix * 1000).toLocaleString("fr-FR", {hour: "numeric", minute: "numeric"});}
    
    return (
        <>
        {result.results&&(
        <Card bg='primary' className='my-5 text-white mx-auto' style={{width:"max(400px, 50%)"}}>
        <Card.Body>

            <Card.Text className='text-center fs-1'>
                <img src={`http://openweathermap.org/img/wn/${result.results.weather[0].icon}@2x.png`} />
            </Card.Text>
            
            <Container className='mx-auto'>
                <Row>
                    <Col><Card.Title className='mb-1'>{result.results.name} | {result.results.main.temp}° C | {result.results.weather[0].description}</Card.Title></Col>
                </Row>
                <Row>
                    <Col>Taux d'humidité&nbsp;: {result.results.main.humidity}%</Col>
                </Row>
                <Row>
                    <Col>Vent&nbsp;: {result.results.wind.speed}&nbsp;km/h</Col>
                </Row>
                <Row>
                    <Col>Levée du soleil&nbsp;: {unixToHour(result.results.sys.sunrise)}</Col>
                </Row>
                <Row>
                    <Col>Couchée du soleil&nbsp;: {unixToHour(result.results.sys.sunset)}</Col>
                </Row>

            </Container>
        </Card.Body>
        </Card>
        )}
        </>
    )
}