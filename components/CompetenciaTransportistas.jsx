
//NUEVA ACTUALIZACION 18-1-23 El endpint devuelve la direccion del usuario de una sola vez y los datos necesarios nada mas

import React, { useEffect } from "react";
import { useQuery,queryKey } from "react-query";
import { Marker, Polyline } from "react-native-maps";
import {View,Text, Image} from 'react-native'
import getAllRutas from '../data/rutasManagua.js'
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas.js";
import obtenerTodasLasParadas from "../data/obtenerTodasLasParadas.js";
import todasLasRutasParadas from "../data/todasLasRutasParadas.js";

    


const CompetenciaTransportistas=({tipoDeUsuario,idUsuarioIniciado,setCargando,rutasSeleccionadasCompetencia,emailState, tokenState})=>{

try{        
    const {data,error,isLoading,isSuccess}=useQuery(['obtenerUsuariosCompetencia',emailState,tokenState],async({queryKey})=>{
        return await fetch('https://www.georutas.lat/api/NUsuariosTransporte?Email='+queryKey[1]+'&Token='+queryKey[2]).then(res=>datos=res.json())
    },{
        //staleTime:Infinity,
        refetchInterval:4000,
        cacheTime:1500
    })


    const urlDeLasImagenes=urlDeLasImagenesEstaticas();
    
    let todasLasParadas=obtenerTodasLasParadas(emailState,tokenState)
    let todasLasRutasParada=todasLasRutasParadas(emailState,tokenState);

    let rutasDeManagua=getAllRutas();
    
    if(isLoading){
        //console.log("Se estan cargando los usuarios");
    }


    if(rutasSeleccionadasCompetencia!=undefined && rutasSeleccionadasCompetencia!=null && rutasSeleccionadasCompetencia.length>0 && idUsuarioIniciado>0 && isSuccess==true && rutasDeManagua.length>0 && todasLasParadas.length>0 && todasLasRutasParada.length>0 && rutasDeManagua!=undefined){
        

        let usuarioPrincipal=data[idUsuarioIniciado-1];
        let arregloFinal=[];
        let nombresEnElArregloFinal=[];
        
        let posicionUsuario=0;
        let contador=0;


        for(let s=0;s<data.length;s++){
            let distanciaComp=Math.sqrt(Math.pow((usuarioPrincipal.latitude-data[s].latitude),2)+Math.pow((usuarioPrincipal.longitude-data[s].longitude),2))
            if(distanciaComp<=0.018){

                let verificandoCompetencia=false;
                let rutasParadasLogueado=todasLasRutasParada.filter(elemento=>elemento.id_Ruta==data[idUsuarioIniciado].id_Ruta);
                let rutasParadasCompetencia=todasLasRutasParada.filter(elemento=>elemento.id_Ruta==data[s].id_Ruta);

                let paradasLogueado=todasLasParadas.filter(elemento=>(elemento.id_Parada>=rutasParadasLogueado[0].id_Parada && elemento.id_Parada
                    <=rutasParadasLogueado[rutasParadasLogueado.length-1].id_Parada));

                let paradasCompetencia=todasLasParadas.filter(elemento=>(elemento.id_Parada>=rutasParadasCompetencia[0].id_Parada && elemento.id_Parada
                    <=rutasParadasCompetencia[rutasParadasCompetencia.length-1].id_Parada));

                for(let n=0;n<paradasLogueado.length;n++){
                    if(paradasCompetencia.filter(elemento => elemento.longitude==paradasLogueado[n].longitude && elemento.latitude==paradasLogueado[n].latitude).length>0){
                        verificandoCompetencia=true;
                        break;
                    }
                }

                if(verificandoCompetencia==true && (rutasSeleccionadasCompetencia[data[s].id_Ruta-1]=='✓' || data[s].id_Ruta==data[idUsuarioIniciado].id_Ruta)){
                    arregloFinal.push(data[s]);
                
                    if(data.id_UsuarioTransporte==idUsuarioIniciado){
                        posicionUsuario=contador;
                    }
                    contador++;
                }
            }
        }


        return(
                arregloFinal.map((item, i)=>{                       
                if(((item.id_UsuarioTransporte)!=idUsuarioIniciado) && item.estado=='A' && arregloFinal[posicionUsuario].direccion==item.direccion){
                    return(
                        <Marker key={i} coordinate={{latitude:item.longitude,
                            longitude:item.latitude}}>                                
                                <Text style={{color:'black'}}>{(item.direccion=='D')?"⇛"+rutasDeManagua[item.id_Ruta-1].nombre:"⇚"+rutasDeManagua[item.id_Ruta-1].nombre}</Text>                                
                                <Image source={urlDeLasImagenes[item.id_Ruta-1]} style={{width:25,height:25}}/>            
                        </Marker>
                    ) 
                }                    
                }) 
        )

    }
    
    return(
        
        <Marker coordinate={{latitude:0,
            longitude:0}}>                                
                
        </Marker>
        
    )
}catch{
    return(
        
        <Marker coordinate={{latitude:0,
            longitude:0}}>                                
                
        </Marker>
        
    )
}

}

export default CompetenciaTransportistas