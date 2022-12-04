    
    
    import React from "react";
    import { useQuery,queryKey } from "react-query";
    import { Polyline } from "react-native-maps";
    import getAllRutas from '../data/rutasManagua.js';
import { View } from "react-native";

    const LineaDeUnaRuta=({idRuta,setMostrarSniperCargando})=>{

         let color="red";
        // if(idRuta==1)
        // {
        //     color="green";
        // }else if(idRuta==2){
        //     color="red";
        // }else{
        //     color="black";
        // }

        color=getAllRutas().filter(elemento => elemento.id_Ruta==idRuta)[0].color;
        
        //console.log(getAllRutas().filter(elemento => elemento.id_Ruta=idRuta)[0]);

    const {data,error,isLoading}=useQuery(['obtenerIndividual',idRuta],async({queryKey})=>{
        return await fetch('https://georutas.somee.com/api/Coordenadas/'+queryKey[1]).then(res=>datos=res.json())
    },{
        staleTime:Infinity,
        cacheTime:20000,
        onSuccess:()=>{
            setMostrarSniperCargando(true);            
        }
        
    })


    if(isLoading){
        //console.log("Se esta cargando la linea de la ruta");            
    }

    if(isLoading==false){

        
        let coordenadas=[]

        for(let y=0;y<data.length;y++){
            
                coordenadas.push({latitude: data[y].longitude, longitude: data[y].latitude})                        
                
        }
        
        
        return(
            <Polyline strokeColor={color} strokeWidth={2} coordinates={coordenadas}></Polyline>
        )
    }

    return(
        <View></View>
    )

    }

    export default LineaDeUnaRuta