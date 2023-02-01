
//ACTUALIZACION 18-1-23 aqui hay que actualizar algo

import React, { useEffect } from "react";
import { useQuery,queryKey } from "react-query";
import { Marker, Polyline } from "react-native-maps";
import {Image,View,Text} from 'react-native'
import obtenerParadasPorParadas from "../data/obtencionDeLasParadasPorRuta.js";
import getAllRutas from '../data/rutasManagua.js'
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas.js";
    
    const UsuariosTransportistas=({tipoDeUsuario,idRuta,idUsuarioIniciado,verTransportistasPorLaDerecha,verTransportistasPorLaIzquierda
            ,emailState, tokenState})=>{

    const {data,error,isLoading}=useQuery(['obtenerUsuariosTransportistas',idRuta,emailState,tokenState],async({queryKey})=>{
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/NUsuarioTransporteParaUnaRuta/'+queryKey[1]+'?Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
    },{
        //staleTime:Infinity,
        refetchInterval:4000,
        cacheTime:1500
    })

    let obtenerCoordendasDeLasParadas=obtenerParadasPorParadas(idRuta,emailState,tokenState);
    if(isLoading){
        //console.log("Se estan cargando los usuarios");
    }

    let rutasDeManagua=getAllRutas();
    const urlDeLasImagenes=urlDeLasImagenesEstaticas();

    if(isLoading==false && obtenerCoordendasDeLasParadas.length>0 && rutasDeManagua.length>0 && urlDeLasImagenes.length>0){

        let nombresEnElArregloFinal=[];
        let arregloFinal=data;


        let menorDistancia=1000000;
        let direccionesPorUsuario=[];
        
        for(let y=0;y<arregloFinal.length;y++){

            nombresEnElArregloFinal.push(rutasDeManagua.filter(elemento => elemento.id_Ruta==arregloFinal[y].id_Ruta)[0].nombre);
            
            direccionesPorUsuario.push(arregloFinal[y].direccion);
        }

        return(
            <View>
                {
                    arregloFinal.map((item, i)=>{                       
                    return(
                    <View key={i}>
                        {((tipoDeUsuario=='Transportista' && item.id_UsuarioTransporte!=idUsuarioIniciado) || tipoDeUsuario!='Transportista') && item.estado=='A' && ((verTransportistasPorLaIzquierda==true && direccionesPorUsuario[i]=='I')
                         || (verTransportistasPorLaDerecha==true && direccionesPorUsuario[i]=='D')) &&<Marker coordinate={{latitude:item.longitude,
                            longitude:item.latitude,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05}}>
                                
                                {direccionesPorUsuario[i]=='D' && <Text style={{color:'black'}}>{"⇛"+nombresEnElArregloFinal[i]}</Text>}
                                {direccionesPorUsuario[i]=='I' && <Text style={{color:'black'}}>{"⇚"+nombresEnElArregloFinal[i]}</Text>}

                                {<Image style={{width:25,height:25}} source={urlDeLasImagenes[idRuta-1]} ></Image>}
            
                        </Marker>}
                    </View>
                    )
                    })}

            </View>         
        )

    }
    
    return(
        
     <View></View>
        
    )

    }

    export default UsuariosTransportistas