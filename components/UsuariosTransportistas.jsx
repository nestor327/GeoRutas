
//ACTUALIZACION 18-1-23 aqui hay que actualizar algo

import React, { useEffect } from "react";
import { useQuery,queryKey } from "react-query";
import { Marker, Polyline } from "react-native-maps";
import {Image,View,Text, LogBox} from 'react-native'
import obtenerParadasPorParadas from "../data/obtencionDeLasParadasPorRuta.js";
import getAllRutas from '../data/rutasManagua.js'
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas.js";
    
    const UsuariosTransportistas=({tipoDeUsuario,idRuta,idUsuarioIniciado,verTransportistasPorLaDerecha,verTransportistasPorLaIzquierda
            ,emailState, tokenState})=>{

    try{
        const {data,error,isLoading}=useQuery(['obtenerUsuariosTransportistas',idRuta,emailState,tokenState],async({queryKey})=>{
            return await fetch('https://www.georutas.lat/api/NUsuarioTransporteParaUnaRuta/'+queryKey[1]+'?Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
        },{
            //staleTime:Infinity,
            refetchInterval:4000,
            cacheTime:4000
        })
    
    
    
        let obtenerCoordendasDeLasParadas=obtenerParadasPorParadas(idRuta,emailState,tokenState);
        if(isLoading){
            //console.log("Se estan cargando los usuarios");
        }
    
        let rutasDeManagua=getAllRutas();
        const urlDeLasImagenes=urlDeLasImagenesEstaticas();
    
        if(isLoading==false && obtenerCoordendasDeLasParadas.length>0 && rutasDeManagua.length>0 && urlDeLasImagenes.length>0 && data!=null && data!=undefined && data.length>1 ){
    
            let nombresEnElArregloFinal=[];
    
            let menorDistancia=1000000;
            let direccionesPorUsuario=[];
            
            for(let y=0;y<data.length;y++){
    
                nombresEnElArregloFinal.push(rutasDeManagua.filter(elemento => elemento.id_Ruta==data[y].id_Ruta)[0].nombre);
                
                direccionesPorUsuario.push(data[y].direccion);
            }
            
            /*, */  
    
            return(
                data.map((item, i)=>{
                    if(((tipoDeUsuario=='Transportista' && item.id_UsuarioTransporte!=idUsuarioIniciado) || tipoDeUsuario!='Transportista') && item.estado=='A' && 
                    ((verTransportistasPorLaIzquierda==true && item.direccion=='I')
                        || (verTransportistasPorLaDerecha==true && item.direccion=='D'))){                        
                    return(
                            <Marker key={i} coordinate={{latitude:item.longitude,
                            longitude:item.latitude,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05}}
                            >
                                <Text style={{color:'black'}}>{(item.direccion=='I')?"⇚"+nombresEnElArregloFinal[i]:"⇛"+nombresEnElArregloFinal[i]}</Text>
                                <Image style={{width:25,height:25}} source={urlDeLasImagenes[idRuta-1]} ></Image>
                            </Marker>                    
                        )
                    }
                })
            )
    
        }
        
        return(        
            
            <Marker coordinate={{latitude:-0,
                    longitude:0,
                    latitudeDelta:0.2,
                    longitudeDelta:0.05}}
                    icon={require("../assets/parada-de-autobusDerecha.png")}
                    style={{width:20,height:20}}>            
                        
            </Marker>        
        )    
    }catch{
        return(        
            
            <Marker coordinate={{latitude:0,
                    longitude:0,
                    latitudeDelta:0.2,
                    longitudeDelta:0.05}}
                    icon={require("../assets/parada-de-autobusDerecha.png")}
                    style={{width:20,height:20}}>            
                        
            </Marker>        
        )
    }
    
}

    export default UsuariosTransportistas