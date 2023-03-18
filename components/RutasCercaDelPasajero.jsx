import React, { useEffect } from "react";
import { useQuery,queryKey } from "react-query";
import { Marker, Polyline } from "react-native-maps";
import {Image,View,Text} from 'react-native'
import getAllRutas from "../data/rutasManagua.js";
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas.js";
import obtenerParadasPorParadasCompletas from '../data/obtenerParadasPorParadasCompletas.js';
import todasLasRutasParadas from "../data/todasLasRutasParadas.js";
    


    const RutasCercaDelPasajero=({modoOscuro,userLocation,rutasSeleccionadasCompetencia,emailState, tokenState})=>{

    try{
        const {data,error,isLoading}=useQuery(['obtenerUsuariosCompetencia',emailState,tokenState],async({queryKey})=>{
            //return await fetch('https://georutas.somee.com/api/UsuariosTransporte').then(res=>datos=res.json())
            return await fetch('https://www.georutas.lat/api/NUsuariosTransporte?Email='+queryKey[1]+'&Token='+queryKey[2]).then(res=>datos=res.json())
        },{
            //staleTime:Infinity,
            refetchInterval:4000,
            cacheTime:1500,
            onSuccess:()=>{
                console.log("Yes");
                console.log(rutasSeleccionadasCompetencia);
                console.log("Yes");
            }
        })
    
        let todasLasRutas=getAllRutas();
        let todasLasUrls=urlDeLasImagenesEstaticas();
        
        if(isLoading){

        }
    
        if(rutasSeleccionadasCompetencia!=undefined && rutasSeleccionadasCompetencia!=null && rutasSeleccionadasCompetencia.length>0 && isLoading==false && todasLasRutas.length>0 && todasLasRutas.length>0){
    
            let arregloFinal=[];        
            let contador=0;

            let distanciaUniversal=10000000;
            for(let t=0;t<data.length;t++){
                let distanciaBuscada=Math.sqrt(Math.pow((userLocation.longitude-data[t].latitude),2)
                                             + Math.pow((userLocation.latitude-data[t].longitude),2));
                if(distanciaBuscada<distanciaUniversal && data[t].estado=='A'){
                    distanciaUniversal=distanciaBuscada;
                }
            }
            
            if(distanciaUniversal>0.009){
                distanciaUniversal=distanciaUniversal+0.009;
            }else{
                distanciaUniversal=distanciaUniversal+0.009;
            }

            for(let s=0;s<data.length;s++){
                 let distanciaComp=Math.sqrt(Math.pow((userLocation.longitude-data[s].latitude),2)
                                            +Math.pow((userLocation.latitude-data[s].longitude),2))

                if(distanciaComp<=distanciaUniversal && rutasSeleccionadasCompetencia[data[s].id_Ruta-1]=='✓'){
                    arregloFinal.push(data[s]);
                    contador++;
                }
            }
    
            return(
                   arregloFinal.map((item, i)=>{                       
                            if(item.estado=='A'){
                            return(
                                    <Marker key={i} coordinate={{latitude:item.longitude,
                                        longitude:item.latitude,
                                        latitudeDelta:0.02,
                                        longitudeDelta:0.05}}>
                                            
                                            {item.direccion=='D' && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{"⇛"+todasLasRutas[item.id_Ruta-1].nombre}</Text>}
                                            {item.direccion=='I' && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{"⇚"+todasLasRutas[item.id_Ruta-1].nombre}</Text>}
                                            <Image style={{width:25,height:25}} source={todasLasUrls[item.id_Ruta-1]} ></Image>
                        
                                    </Marker>
                                )
                        }                    
                    })
            )
    
        }
        
        return(
            <Marker coordinate={{latitude:0,
                longitude:0,
                latitudeDelta:0.02,
                longitudeDelta:0.05}}>                
            </Marker>
        )
    
    }catch{
        return(
            <Marker coordinate={{latitude:0,
                longitude:0,
                latitudeDelta:0.02,
                longitudeDelta:0.05}}>                
            </Marker>
        )
    }
}

export default RutasCercaDelPasajero