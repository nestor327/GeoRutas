import React, { useEffect } from "react";
import { useQuery,queryKey } from "react-query";
import { Marker, Polyline } from "react-native-maps";
import {Image,View,Text} from 'react-native'
import getAllRutas from "../data/rutasManagua.js";
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas.js";
import obtenerParadasPorParadasCompletas from '../data/obtenerParadasPorParadasCompletas.js';
import todasLasRutasParadas from "../data/todasLasRutasParadas.js";
    


    const RutasCercaDelPasajero=({userLocation,rutasSeleccionadasCompetencia})=>{

    try{
        const {data,error,isLoading}=useQuery(['obtenerUsuariosCompetencia'],async({queryKey})=>{
            //return await fetch('https://georutas.somee.com/api/UsuariosTransporte').then(res=>datos=res.json())
            return await fetch('https://www.georutas.lat/api/UsuariosTransporte').then(res=>datos=res.json())
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
    
        let coordenadasParadas=obtenerParadasPorParadasCompletas();
        let rutasParadasObtenidas=todasLasRutasParadas();
    
        let todasLasRutas=getAllRutas();
        let todasLasUrls=urlDeLasImagenesEstaticas();
        
        if(isLoading){
            //console.log("Se estan cargando los usuarios");
            //setMostrarSniperCargando(true);
    
        }
    
        if(rutasSeleccionadasCompetencia!=undefined && rutasSeleccionadasCompetencia!=null && rutasSeleccionadasCompetencia.length>0 && isLoading==false && coordenadasParadas.length>0 && todasLasRutas.length>0 && todasLasRutas.length>0 && rutasParadasObtenidas.length>0){
            //setMostrarSniperCargando(true);       
    
            //console.log("El arreglo posee los siguientes elementos");
            //console.log(idRuta);
            //console.log("El arreglo posee los siguientes elementos");
    
            let arregloFinal=[];        
            let contador=0;
            
            for(let s=0;s<data.length;s++){
                 let distanciaComp=Math.sqrt(Math.pow((userLocation.longitude-data[s].latitude),2)+Math.pow((userLocation.latitude-data[s].longitude),2))
                 if(distanciaComp<=0.0140 && rutasSeleccionadasCompetencia[data[s].id_Ruta-1]=='✓'){
                    arregloFinal.push(data[s]);
                    contador++;
                }
            }
    
    
            let menorDistancia=1000000;
            let direccionesPorUsuario=[];        
    
            let nombreDeLasRutas=[];        
            let urlDeLasRutas=[];
            
    
            for(let y=0;y<arregloFinal.length;y++){
    
                if(arregloFinal[y].nombre==null){
                    continue;
                }
                
                let obtenerCoordendasDeLasParadas=[];
    
                nombreDeLasRutas.push(todasLasRutas.filter(elemento => elemento.id_Ruta==arregloFinal[y].id_Ruta)[0].nombre);            
                urlDeLasRutas.push(todasLasUrls[arregloFinal[y].id_Ruta-1]);
                
                let rutasParadas=rutasParadasObtenidas.filter(elemento => elemento.id_Ruta==arregloFinal[y].id_Ruta);
    
                
    
                for(let t=0;t<rutasParadas.length;t++){
                    obtenerCoordendasDeLasParadas.push(coordenadasParadas.filter(elemento=>elemento.id_Parada==rutasParadas[t].id_Parada)[0]);
                }
                
                //console.log(obtenerCoordendasDeLasParadas);
                let paradaCercanaAlPuntoPasado=-1;
    
                let distanciaAlaUltimaParadaCercanaAlPasado=10000;
    
                for(let k=0;k<obtenerCoordendasDeLasParadas.length;k++){
                    let distanciaReal=Math.sqrt(Math.pow((arregloFinal[y].longitudeAnterior-obtenerCoordendasDeLasParadas[k].longitude),2)
                    +Math.pow((arregloFinal[y].latitudeAnterior-obtenerCoordendasDeLasParadas[k].latitude),2));
    
                    if(distanciaReal<distanciaAlaUltimaParadaCercanaAlPasado){
                        distanciaAlaUltimaParadaCercanaAlPasado=distanciaReal;
                        paradaCercanaAlPuntoPasado=k;                    
                    }
                }
                
                let idParada=0;
    
                let ultimaParadaPorLaIzquierda=-1;
                let ultimaParadaPorLaDerecha=-1;
    
    
                for(let k=0;k<obtenerCoordendasDeLasParadas.length;k++){
    
                    let distanciaReal=Math.sqrt(Math.pow((arregloFinal[y].longitude-obtenerCoordendasDeLasParadas[k].longitude),2)
                    +Math.pow((arregloFinal[y].latitude-obtenerCoordendasDeLasParadas[k].latitude),2));
    
                    if(distanciaReal<menorDistancia 
                        && obtenerCoordendasDeLasParadas[k].direccion==obtenerCoordendasDeLasParadas[paradaCercanaAlPuntoPasado].direccion){
                        menorDistancia=distanciaReal;
                        idParada=k;                    
                    }
                    if(k<obtenerCoordendasDeLasParadas.length-1){
                        if(obtenerCoordendasDeLasParadas[k].direccion!=obtenerCoordendasDeLasParadas[k+1].direccion){
                            ultimaParadaPorLaIzquierda=k;
                            ultimaParadaPorLaDerecha=k+1;
                        }
                    }
    
                }
                
                menorDistancia=1000000;
                distanciaAlaUltimaParadaCercanaAlPasado=10000;
                
                if(paradaCercanaAlPuntoPasado<idParada){
                    direccionesPorUsuario.push(obtenerCoordendasDeLasParadas[idParada].direccion);
                }else if(paradaCercanaAlPuntoPasado>idParada){
                    if((obtenerCoordendasDeLasParadas[idParada].direccion)=='D'){
                        direccionesPorUsuario.push('I');
                    }else{
                        direccionesPorUsuario.push('D');
                    }
                }else{
                    if(idParada==0 || idParada==obtenerCoordendasDeLasParadas.length-1){
                        direccionesPorUsuario.push('I');
                    }else if(idParada==ultimaParadaPorLaDerecha || idParada==ultimaParadaPorLaDerecha){
                        direccionesPorUsuario.push('D');
                    }else {
                        direccionesPorUsuario.push(obtenerCoordendasDeLasParadas[idParada].direccion);
                    }
                }
    
                // for(let k=0;k<obtenerCoordendasDeLasParadas.length;k++){
    
                //     let distanciaReal=Math.sqrt(Math.pow((arregloFinal[y].longitude-obtenerCoordendasDeLasParadas[k].longitude),2)
                //     +Math.pow((arregloFinal[y].latitude-obtenerCoordendasDeLasParadas[k].latitude),2));
    
                //     if(distanciaReal<menorDistancia){
                //         menorDistancia=distanciaReal;
                //         idParada=k;                    
                //     }
    
                // }
                // numeroParadaCercana.push(idParada);
                // menorDistancia=1000000;
                
                // mayorParada=obtenerCoordendasDeLasParadas[obtenerCoordendasDeLasParadas.length-1].id_Parada;
                
                // if(obtenerCoordendasDeLasParadas[idParada].id_Parada<mayorParada){
                //     let distanciaEntreActualYparadaSiguiente=Math.sqrt(Math.pow((arregloFinal[y].longitude-obtenerCoordendasDeLasParadas[idParada+1].longitude),2)
                //     +Math.pow((arregloFinal[y].latitude-obtenerCoordendasDeLasParadas[idParada+1].latitude),2));
    
                //     let distanciaEntreAnteriorYparadaSiguiente=Math.sqrt(Math.pow((arregloFinal[y].longitudeAnterior-obtenerCoordendasDeLasParadas[idParada+1].longitude),2)
                //     +Math.pow((arregloFinal[y].latitudeAnterior-obtenerCoordendasDeLasParadas[idParada+1].latitude),2));
    
                //     if(distanciaEntreActualYparadaSiguiente<=distanciaEntreAnteriorYparadaSiguiente){
                //         direccionesPorUsuario.push(obtenerCoordendasDeLasParadas[idParada+1].direccion);
                        
                //     }else{
                //         if(obtenerCoordendasDeLasParadas[idParada].direccion=='D'){
                //             direccionesPorUsuario.push('I');
                //         }else{
                //             direccionesPorUsuario.push('D');
                //         }
                //     }
    
    
                // }else if(obtenerCoordendasDeLasParadas[idParada].id_Parada==mayorParada){
                //     let distanciaEntreActualYparadaSiguiente=Math.sqrt(Math.pow((arregloFinal[y].longitude-obtenerCoordendasDeLasParadas[0].longitude),2)
                //     +Math.pow((arregloFinal[y].latitude-obtenerCoordendasDeLasParadas[0].latitude),2));
    
                //     let distanciaEntreAnteriorYparadaSiguiente=Math.sqrt(Math.pow((arregloFinal[y].longitudeAnterior-obtenerCoordendasDeLasParadas[0].longitude),2)
                //     +Math.pow((arregloFinal[y].latitudeAnterior-obtenerCoordendasDeLasParadas[0].latitude),2));
    
    
                //     if(distanciaEntreActualYparadaSiguiente<=distanciaEntreAnteriorYparadaSiguiente){
                //         direccionesPorUsuario.push(obtenerCoordendasDeLasParadas[0].direccion);
                //     }else{
                //         if(obtenerCoordendasDeLasParadas[idParada].direccion=='D'){
                //             direccionesPorUsuario.push('I');
                //         }else{
                //             direccionesPorUsuario.push('D');
                //         }
                //     }
                // }                   
            }
    
            //setMostrarSniperCargando(false);
    
            return(
                   arregloFinal.map((item, i)=>{                       
                            if(item.estado=='A'){
                            return(
                                    <Marker key={i} coordinate={{latitude:item.longitude,
                                        longitude:item.latitude,
                                        latitudeDelta:0.02,
                                        longitudeDelta:0.05}}>
                                            
                                            {direccionesPorUsuario[i]=='D' && <Text>{"⇛"+nombreDeLasRutas[i]}</Text>}
                                            {direccionesPorUsuario[i]=='I' && <Text>{"⇚"+nombreDeLasRutas[i]}</Text>}
                                            <Image style={{width:25,height:25}} source={urlDeLasRutas[i]} ></Image>
                        
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