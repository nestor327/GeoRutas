
//ACTUALIZACION 18-1-23 aqui hay que actualizar algo

import React, { useEffect } from "react";
import { useQuery,queryKey } from "react-query";
import { Marker, Polyline } from "react-native-maps";
import {Image,View,Text, LogBox} from 'react-native'
import obtenerParadasPorParadas from "../data/obtencionDeLasParadasPorRuta.js";
import getAllRutas from '../data/rutasManagua.js'
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas.js";
    
    const UsuariosTransportistas=({tipoDeUsuario,idRuta,idUsuarioIniciado,verTransportistasPorLaDerecha,verTransportistasPorLaIzquierda
            ,emailState, tokenState,modoOscuro})=>{

    try{
        const {data,error,isLoading}=useQuery(['obtenerUsuariosTransportistas',idRuta,emailState,tokenState],async({queryKey})=>{
            return await fetch('https://www.georutas.lat/api/NUsuarioTransporteParaUnaRuta/'+queryKey[1]+'?Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
        },{
            //staleTime:10000,
            refetchInterval:4000,
            cacheTime:6000
        })
        /*
        {"direccion": "D", "estado": "I", "id_Ruta": 3, "id_Tipo_Transporte": 1, "id_UsuarioTransporte": 94, "latitude": -86.2594812, "latitudeAnterior": -86.25932900000001, "longitude": 12.1438887, "longitudeAnterior": 12.14147925}, 
        {"direccion": "D", "estado": "I", "id_Ruta": 3, "id_Tipo_Transporte": 1, "id_UsuarioTransporte": 95, "latitude": -86.2532633, "latitudeAnterior": -86.25417955, "longitude": 12.145393, "longitudeAnterior": 12.14592715}, 
        {"direccion": "D", "estado": "I", "id_Ruta": 3, "id_Tipo_Transporte": 1, "id_UsuarioTransporte": 96, "latitude": -86.2429639, "latitudeAnterior": -86.24439955, "longitude": 12.1461098, "longitudeAnterior": 12.1461782}, 
        {"direccion": "D", "estado": "I", "id_Ruta": 3, "id_Tipo_Transporte": 1, "id_UsuarioTransporte": 97, "latitude": -86.23386, "latitudeAnterior": -86.23429365000001, "longitude": 12.1442824, "longitudeAnterior": 12.1450929}, 
        {"direccion": "D", "estado": "I", "id_Ruta": 3, "id_Tipo_Transporte": 1, "id_UsuarioTransporte": 98, "latitude": -86.22924, "latitudeAnterior": -86.2308209, "longitude": 12.1383414, "longitudeAnterior": 12.138581}, 
        {"direccion": "D", "estado": "I", "id_Ruta": 3, "id_Tipo_Transporte": 1, "id_UsuarioTransporte": 99, "latitude": -86.2218424, "latitudeAnterior": -86.22290534999999, "longitude": 12.1383846, "longitudeAnterior": 12.1383531}*/
        if(!isLoading){
            //console.log("Se estan cargando los usuarios");
            //console.log(data);
        }
    
        let rutasDeManagua=getAllRutas();
        const urlDeLasImagenes=urlDeLasImagenesEstaticas();
    
        if(!error && isLoading==false && rutasDeManagua.length>0 && urlDeLasImagenes.length>0 && data!=null && data!=undefined && data.length>1 ){
    
            let nombresEnElArregloFinal=[];
    
            let menorDistancia=1000000;
            let direccionesPorUsuario=[];
            
            for(let y=0;y<data.length;y++){
    
                nombresEnElArregloFinal.push(rutasDeManagua.filter(elemento => elemento.id_Ruta==data[y].id_Ruta)[0].nombre);
                
                direccionesPorUsuario.push(data[y].direccion);
            }
            
    
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
                            style={{alignItems:'center'}}
                            >
                                <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{(item.direccion=='I')?"⇚"+nombresEnElArregloFinal[i]:"⇛"+nombresEnElArregloFinal[i]}</Text>
                                <Image style={{width:25,height:25}} source={urlDeLasImagenes[idRuta-1]} ></Image>
                            </Marker>                    
                        )
                    }
                })
            )
    
        }
        
        return(        
            
            <Marker coordinate={{latitude:0,
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