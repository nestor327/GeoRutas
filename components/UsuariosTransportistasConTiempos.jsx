
//ACTUALIZACION 18-1-23 aqui hay que actualizar algo

import React, { useEffect } from "react";
import { useQuery,queryKey } from "react-query";
import { Marker, Polyline } from "react-native-maps";
import {Image,View,Text, LogBox} from 'react-native'
import getAllRutas from '../data/rutasManagua.js'
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas.js";
    
    const UsuariosTransportistasConTiempo=({modoSimplificado,tipoDeUsuario,idRuta,idUsuarioIniciado,verTransportistasPorLaDerecha,verTransportistasPorLaIzquierda
            ,emailState, tokenState,modoOscuro,setTiempoParaUsaurioTransportistaLogueado,setTiempoPromedio})=>{

    try{
        const {data,error,isLoading}=useQuery(['obtenerUsuariosTransportistasConTiempo',idUsuarioIniciado,emailState,tokenState,idRuta,modoSimplificado],async({queryKey})=>{
            
            return await fetch((Math.ceil(idUsuarioIniciado/33.0)==queryKey[4] || queryKey[5]==true)?'https://www.georutas.lat/api/NUsuarioTransporteConTiemposDeDiferencia?Email='+queryKey[2]+'&Token='+queryKey[3]+'&IdUsuarioTransporte='+queryKey[1]
                                :'https://www.georutas.lat/api/NUsuarioTransporteParaUnaRuta/'+queryKey[4]+'?Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=> datos=res.json() )
        },{
            //staleTime:10000,
            refetchInterval:4000,
            cacheTime:4000,onSuccess:()=>{
                if(data!=undefined && data.filter(elem => elem.id_UsuarioTransporte==idUsuarioIniciado).length>0){
                    setTiempoParaUsaurioTransportistaLogueado(data.filter(elem => elem.id_UsuarioTransporte==idUsuarioIniciado)[0].tiempo);                    
                }
                if((Math.ceil(idUsuarioIniciado/33.0)==idRuta || modoSimplificado) && data!=undefined && data.filter(elem => elem.id_UsuarioTransporte==idUsuarioIniciado).length>0){
                    for(let t=0;t<data.length;t++){
                        if(data[t].tiempo<0){
                            setTiempoPromedio(Math.abs(data[t].tiempo));
                            console.log("La cantidad de iteraciones fueron: ");
                            break;
                        }                    
                        console.log("La cantidad de iteraciones fueron: ");
                    }
                }
            }
        }
        )
        
        if(!isLoading){
            //console.log("Se estan cargando los usuarios");
            //console.log("La data es: ");
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
                    if(((tipoDeUsuario=='Transportista' && item.id_UsuarioTransporte!=idUsuarioIniciado) || tipoDeUsuario!='Transportista') && item.estado=='A' 
                    && 
                    ((verTransportistasPorLaIzquierda==true && item.direccion=='I')
                        || (verTransportistasPorLaDerecha==true && item.direccion=='D') || modoSimplificado==true)
                        ){
                    return(
                            ((modoSimplificado==true && item.tiempo>0) || modoSimplificado==false) && <Marker key={i} coordinate={{latitude:item.longitude,
                            longitude:item.latitude,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05}}
                            style={{alignItems:'center'}}
                            >
                                <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{(item.direccion=='I')?"⇚"+nombresEnElArregloFinal[i]:"⇛"+nombresEnElArregloFinal[i]}</Text>
                                <Image style={{width:25,height:25}} source={urlDeLasImagenes[(modoSimplificado)?(Math.ceil(idUsuarioIniciado/33.0)-1):idRuta-1]} ></Image>
                                {(item.tiempo>=0 && item.tiempo!=undefined) && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3', fontWeight:'700'}}>
                                {((Math.floor((((item.tiempo))/60))>9)?Math.floor((((item.tiempo))/60)):"0"+Math.floor((((item.tiempo)-3600*(Math.floor((item.tiempo)/3600)))/60)))
                                    +":"+(((item.tiempo)%60>9)?(item.tiempo)%60:"0"+(item.tiempo)%60)}
                                    </Text>}
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

    export default UsuariosTransportistasConTiempo