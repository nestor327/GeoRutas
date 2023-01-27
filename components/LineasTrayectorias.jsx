import React from "react";
import { useQuery } from "react-query";
import { Polyline } from "react-native-maps";

    const LineasTrayectorias=({iconoTrayectoItem,color,emailState, tokenState})=>{

    const {data,error,isLoading}=useQuery(['obtenerLineas',iconoTrayectoItem,emailState, tokenState],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/SP_PObtenerCoordendasDeLineaDeLaRutaEntreParadas/'+queryKey[1].latitudParadaUsuarioComun
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/SP_PObtenerCoordendasDeLineaDeLaRutaEntreParadas/'+queryKey[1].latitudParadaUsuarioComun+','+queryKey[1].longitudParadaUsuarioComun
        +','+queryKey[1].id_ParadaUsuarioComun+','+queryKey[1].id_ParadaFinal+'?Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
    },{
        staleTime:Infinity,
        cacheTime:20000
    })

    if(isLoading){        
        console.log("No se que pedo aqui");
    }

    if(isLoading==false){

        

        let mayorDistancia=0;
        let posicion=0;

        for(let i=0;i<data.length-2 ;i++){
            let distancia=Math.sqrt(Math.pow(data[i].latitude-data[i+1].latitude,2)+Math.pow(data[i].longitude-data[i+1].longitude,2));

            if(distancia>mayorDistancia){
                mayorDistancia=distancia;
                posicion=i;
            }
        }

        let distancia=Math.sqrt(Math.pow(data[0].latitude-data[data.length-1].latitude,2)+Math.pow(data[0].longitude-data[data.length-1].longitude,2));

            if(distancia>mayorDistancia){
                mayorDistancia=distancia;
                posicion=data.length-1;
            }

        let objeto={"latitude": -86.29734, "longitude": 12.15022}
        let coordenadas=[]
        let contador=1

        for(let y=posicion;y>=0;y--){
            coordenadas.push({latitude: data[y].longitude, longitude: data[y].latitude})
            contador++;
        }

        for(let y=data.length-1;y>posicion;y--){
            coordenadas.push({latitude: data[y].longitude, longitude: data[y].latitude})
            contador++;
        }


        return(
            <Polyline strokeColor={color} strokeWidth={2.5} coordinates={coordenadas}></Polyline>
        )
    }

    return(
        <Polyline coordinates={[{ latitude:12.1493,longitude:-86.2891},{ latitude:12.149333333,longitude:-86.28916666}]}></Polyline>
    )

    }

    export default LineasTrayectorias