    
    
    import React from "react";
    import { useQuery,queryKey } from "react-query";
    import { Marker, Polyline } from "react-native-maps";
    import {Image,View,Text} from 'react-native'

    const obtenerParadasPorParadas=(idRuta)=>{

        const {data,error,isLoading}=useQuery(['obtenerParadasConDireccion',idRuta],async({queryKey})=>{
            return await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json())
        },{
            staleTime:Infinity
        })

    if(isLoading){
        //console.log("Se estan cargando las paradas");        
    }

    if(isLoading==false){
        let paradasNecesarias=[];


        if(idRuta==1){        
            for(let y=0;y<120;y++){
                paradasNecesarias.push(data[y]);
            }
        }else if(idRuta==2){
            for(let y=120;y<212;y++){                
                paradasNecesarias.push(data[y]);
            }
        }else{
            for(let y=212;y<309;y++){                
                paradasNecesarias.push(data[y]);
            }
        }        


        return(paradasNecesarias)
    }

    return([])

    }

    export default obtenerParadasPorParadas