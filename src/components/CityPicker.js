import { useRef, useState } from "react";
import { Button, Form, ListGroup, InputGroup } from "react-bootstrap"
import { useCities } from "../context/Cities";
import Loader from "./Loader.js";


export default function CityPicker(){

    const cityInput = useRef();
    const [inputValid, setInputValid] = useState(false);
    const {setResult, autoComplete} = useCities();
    const [isDataLoading, setDataLoading] = useState(false);
    const [matchListDisplay, setMatchListDisplay] = useState(false);
    const [matchList, setMatchList] = useState([]);

    function handleSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        setDataLoading(true);
        async function Fetch(){
            try{
                const response = await fetch(`https://warm-peak-43536.herokuapp.com/api/search?q=${cityInput.current.value}`);
                const data = await response.json();
                setResult(data)

                //Dummy result for testing
                //setResult({"success":true,"results":{"coord":{"lon":3.8772,"lat":43.6109},"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"base":"stations","main":{"temp":10.02,"feels_like":8.77,"temp_min":9.71,"temp_max":11.81,"pressure":1028,"humidity":65},"visibility":10000,"wind":{"speed":0.45,"deg":170,"gust":1.79},"clouds":{"all":0},"dt":1643032625,"sys":{"type":2,"id":2038454,"country":"FR","sunrise":1643008130,"sunset":1643042636},"timezone":3600,"id":2992166,"name":"Montpellier","cod":200}})    
            }
            catch(err){console.log(err);}
            finally{setDataLoading(false)}
        };
        Fetch()
    }

    function acceptInput(e){
        const input = e.target.value.toUpperCase();
        if(input.length>0){
            setInputValid(true);
            setMatchList(autoComplete(input));
            setMatchListDisplay(true);
        }else{
            setInputValid(false);
            setMatchListDisplay(false);
        }
    }

    function handleChange(e){acceptInput(e);}
    function handleFocus(e){acceptInput(e);}
    function handleBlur(){
        // setMatchListDisplay(false);
    }

    function inputFromMatchList(e) {
        cityInput.current.value = e.target.getAttribute('ville');
        cityInput.current.focus();
        setMatchListDisplay(false);
    }

    return (
        <>
        <Form onSubmit={handleSubmit} className="my-5" >
        <Form.Group className='d-flex flex-row mb-1 mx-auto' controlId="cityPickerTextCity">
              <Form.Control className='shadow me-3' type="text" pattern="[ a-zA-Z0-9]+" ref={cityInput} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} autoComplete="off" placeholder="Ville ou code postal"/>
              {inputValid?(
                <Button className="shadow" type="submit">Valider</Button>
                ):(
                <Button className="shadow" type="submit" disabled>Valider</Button>
                )}
        </Form.Group>
        {matchListDisplay&&(
            <ListGroup>
            {matchList.length>0?(
                matchList.map((ville, index) =>{
                return (
                    <ListGroup.Item key={index + '-' + ville.codep} action ville={ville.nom} onClick={inputFromMatchList}>
                        {ville.nom} - {ville.codep}
                    </ListGroup.Item>
                )
            })):(
                <ListGroup.Item key={'no result'} disabled >
                        Aucune ville ne correspond à votre sélection
                </ListGroup.Item>
            )}
            </ListGroup>
        )}
      </Form>

      {isDataLoading&&<Loader/>}
      </>
    )
}