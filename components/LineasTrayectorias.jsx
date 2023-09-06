import React from "react";
import { useQuery } from "react-query";
import { Polyline } from "react-native-maps";

    const LineasTrayectorias=({iconoTrayectoItem,color,emailState, tokenState})=>{

        try{
            const {data,error,isLoading}=useQuery(['obtenerLineas',iconoTrayectoItem,emailState, tokenState],async({queryKey})=>{
                //return await fetch('https://georutas.somee.com/api/SP_PObtenerCoordendasDeLineaDeLaRutaEntreParadas/'+queryKey[1].latitudParadaUsuarioComun
                return await fetch('https://georutas.somee.com/api/SP_PObtenerCoordendasDeLineaDeLaRutaEntreParadas/'+queryKey[1].latitudParadaUsuarioComun+','+queryKey[1].longitudParadaUsuarioComun
                +','+queryKey[1].id_ParadaUsuarioComun+','+queryKey[1].id_ParadaFinal+'?Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
            },{
                staleTime:Infinity,
                cacheTime:20000
            })
        
            if(isLoading){        
                console.log("No se que pedo aqui");
            }
        
            if(isLoading==false){
                console.log("Los datos son: ");
                console.log(data.length);
        
                let objeto={"latitude": -86.29734, "longitude": 12.15022}
                let coordenadas=[];
                console.log("AQAQS");
                for(let y=0;y<data.length;y++){
                    coordenadas.push({latitude: data[y].longitude, longitude: data[y].latitude})
                }

        
                return(
                    <Polyline strokeColor={color} strokeWidth={3} coordinates={coordenadas}></Polyline>
                )
            }
        
            return(
                <Polyline coordinates={[{ latitude:12.1493,longitude:-86.2891},{ latitude:12.149333333,longitude:-86.28916666}]}></Polyline>
            )
        
        }catch{
            return(
                <Polyline coordinates={[{ latitude:12.1493,longitude:-86.2891},{ latitude:12.149333333,longitude:-86.28916666}]}></Polyline>
            )
        }
    
    }

    export default LineasTrayectorias