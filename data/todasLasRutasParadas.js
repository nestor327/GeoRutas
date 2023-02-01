    
    
    import React from "react";
    import { useQuery,queryKey } from "react-query";
    import { Marker, Polyline } from "react-native-maps";
    import {Image,View,Text} from 'react-native'

    const todasLasRutasParadas=(email,token)=>{

        const {data,error,isLoading}=useQuery(['obtenerTodasLasRutasParadas',email,token],async({queryKey})=>{
            //return await fetch('https://georutas.somee.com/api/RutasParada').then(res=>datos=res.json())
            return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/RutasParada/Email?Email='+email+'&token='+token).then(res=>datos=res.json())
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

    export default todasLasRutasParadas