import React, {createContext, useContext, useState} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {villesFrance} from '../data/villes_france.js';

const citiesContext = createContext();

export function useCities(){
    return useContext(citiesContext);
}

export const autoComplete = function(input){
       let matchingCity = [];
    for(let i = 0; i < villesFrance.length; i++){
        if(villesFrance[i].nom.startsWith(input)){
            matchingCity.push({codep:villesFrance[i].codep, nom:villesFrance[i].nom})
        }else if(String(villesFrance[i].codep).startsWith(input)){
            matchingCity.push({codep:villesFrance[i].codep, nom:villesFrance[i].nom})
        }       
    }
    matchingCity.sort((a, b) =>{
        if (a.nom < b.nom) return -1;
        if (a.nom > b.ville) return 1;
        return 0
    });
    const matchingCitySliced = matchingCity.slice(0, 5)
    return(matchingCitySliced)
};

export const CitiesProvider = ({ children }) => {
  
    const [cities, setCities] = useLocalStorage('cities',{});
    const [result, setResult] = useLocalStorage('result',{});
    const [match, setMatch] = useState([])

    const objet = {
        id:'city name',
        name:'city name',
        default:false,
    };
    
    return (
        <citiesContext.Provider
        value={{
            cities,
            setCities, 
            result,
            setResult,
            autoComplete
        }}>
            {children}
        </citiesContext.Provider>
    )
}