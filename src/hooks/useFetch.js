import { useEffect, useState } from "react";

const server = 'https://warm-peak-43536.herokuapp.com/api/search?q=';

export function useFetch(query){

    const [data, setData] = useState({});
    const [isDataLoading, setDataLoading] = useState(false);
    
    useEffect(() => {
        if(!(query.length>0)) return;
        setDataLoading(true);
        async function Fetch(){
            try{
                // const response = await fetch(server+query);
                // const data = await response.json();
                // setData(data);
                setData({"success":true,"results":{"coord":{"lon":3.8772,"lat":43.6109},"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"base":"stations","main":{"temp":10.02,"feels_like":8.77,"temp_min":9.71,"temp_max":11.81,"pressure":1028,"humidity":65},"visibility":10000,"wind":{"speed":0.45,"deg":170,"gust":1.79},"clouds":{"all":0},"dt":1643032625,"sys":{"type":2,"id":2038454,"country":"FR","sunrise":1643008130,"sunset":1643042636},"timezone":3600,"id":2992166,"name":"Montpellier","cod":200}})
            }
            catch(err){console.log(err);}
            finally{setDataLoading(false)}
        };
        Fetch()
    }, [query]);



    return {isDataLoading, data};
}