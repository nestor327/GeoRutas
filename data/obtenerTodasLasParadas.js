    
    
    import React from "react";
    import { useQuery,queryKey } from "react-query";
    import { Marker, Polyline } from "react-native-maps";
    import {Image,View,Text} from 'react-native'

    const obtenerTodasLasParadas=(email,token)=>{

        const {data,error,isLoading}=useQuery(['obtenerTodasLasParadas',email,token],async({queryKey})=>{
            //return await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json())
            return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/Paradas/Email?Email='+queryKey[1]+'&token='+queryKey[2]).then(res=>datos=res.json())
        },{
            staleTime:Infinity,
            cacheTime:3600000
        })

    if(isLoading){
        //console.log("Se estan cargando las paradas");        
    }

    if(isLoading==false){

        return(data)
    }

    return([])

    }

    export default obtenerTodasLasParadas