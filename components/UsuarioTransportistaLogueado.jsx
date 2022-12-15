  
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Marker } from "react-native-maps";
import obtenerParadasPorParadas from '../data/obtencionDeLasParadasPorRuta.js';
import { View,Text,Image } from "react-native";
import { getUsuario } from "../data/asyncStorageData.js";
import getAllRutas from '../data/rutasManagua.js'
import Polyline from 'react-native-maps'


//Este componente posee errores, revisalo luego
//Recibido, el problema que tiene es que no llama a los datos del backend se queda con el primero para siempre,
//ademas de que no muestra a el elemento por ninguna parte, despues de la primera vez.

    const UsuarioTransportistaLogueado=({usuario,direccionesPorUsuario,setDireccionPorUsuario,idUsuarioIniciado,userLocation})=>{

        let direccionesPorUsuarioDos='K';
        const UsuarioEncontrado=useRef({});


        const {data,error,isLoading}=useQuery(['obtenerTodosLosUsuarioComunesUnico123'],async({queryKey})=>{
            return await fetch('https://georutas.somee.com/api/UsuariosTransporte/').then(res=>datos=res.json())
            
        },{
            refetchInterval:4000,
            onSuccess:()=>{                
                setDireccionPorUsuario(direccionesPorUsuarioDos);
            },
            cacheTime:1500
        }
        
        )

        const [usuarioState, setUsuarioState]=useState("nnnn");
        
        
        

    if(isLoading){
        //console.log("Se esta cargando la linea de la ruta");            
    }
    let paradas=obtenerParadasPorParadas(UsuarioEncontrado.current.id_Ruta);
    let rutasDeManagua=getAllRutas();
    
    getUsuario(setUsuarioState);

    if(isLoading==false && paradas.length>0 && rutasDeManagua.length>0 && usuarioState!='nnnn' && rutasDeManagua!=undefined){

        let nombresEnElArregloFinal=[];
        

        for(let k=0;k<data.length;k++){
            if(data[k].nombre==null){
                continue;
            }

            if(data[k].id_UsuarioTransporte==idUsuarioIniciado){
            
                UsuarioEncontrado.current=(data[k]);                
                
                nombresEnElArregloFinal.push(rutasDeManagua.filter(elemento => elemento.id_Ruta==data[k].id_Ruta)[0].nombre);
            }
        }    
            //console.log(UsuarioEncontrado);
            //El problema es que aveces no encuentra el usuario, arregla eso...
            //console.log(UsuarioEncontrado);

            let paradaAnteriorAdondeEstuvo=-1;
            let paradaEnDondeEstaEnLaMismaDireccionPasada=-1;

            let distanciaPasadaALaRuta=10000;
            let distanciaActualALaParada=10000;
            let ultimaParadaPorLaIzquierda=-1;
            let ultimaParadaPorLaDerecha=-1;

            //console.log("Quedaste fuera");
            if( UsuarioEncontrado.current!={}){
                for(let g=0;g<paradas.length;g++){
                let distanciaALaActualParada=Math.sqrt(Math.pow((paradas[g].latitude-UsuarioEncontrado.current.latitudeAnterior),2)
                +Math.pow((paradas[g].longitude-UsuarioEncontrado.current.longitudeAnterior),2));

                if(distanciaPasadaALaRuta>distanciaALaActualParada){
                    distanciaPasadaALaRuta=distanciaALaActualParada;
                    paradaAnteriorAdondeEstuvo=g;
                }
                if(g<paradas.length-1){
                    if(paradas[g].direccion!=paradas[g+1].direccion){
                        ultimaParadaPorLaIzquierda=g;
                        ultimaParadaPorLaDerecha=g+1;
                    }
                }
            }

            
            for(let g=0;g<paradas.length;g++){
                let distanciaALaActualParada=Math.sqrt(Math.pow((paradas[g].latitude-UsuarioEncontrado.current.latitude),2)
                +Math.pow((paradas[g].longitude-UsuarioEncontrado.current.longitude),2));

                if(distanciaActualALaParada>distanciaALaActualParada 
                    && paradas[g].direccion==paradas[paradaAnteriorAdondeEstuvo].direccion){

                    distanciaActualALaParada=distanciaALaActualParada;
                    paradaEnDondeEstaEnLaMismaDireccionPasada=g;

                }
            }

            

            if(paradaAnteriorAdondeEstuvo<paradaEnDondeEstaEnLaMismaDireccionPasada){
                direccionesPorUsuarioDos=paradas[paradaAnteriorAdondeEstuvo].direccion;
            }else if(paradaAnteriorAdondeEstuvo>paradaEnDondeEstaEnLaMismaDireccionPasada){
                if(paradas[paradaAnteriorAdondeEstuvo].direccion=='D'){
                    direccionesPorUsuarioDos='I';
                }else{
                    direccionesPorUsuarioDos='D';
                }
            }else{
                if(paradaEnDondeEstaEnLaMismaDireccionPasada==0 || paradaEnDondeEstaEnLaMismaDireccionPasada==paradas.length-1){
                    direccionesPorUsuarioDos=('I');
                }else if(paradaEnDondeEstaEnLaMismaDireccionPasada==ultimaParadaPorLaDerecha 
                    || paradaEnDondeEstaEnLaMismaDireccionPasada==ultimaParadaPorLaDerecha){
                        direccionesPorUsuarioDos=('D');
                }else {
                    direccionesPorUsuarioDos=(paradas[paradaEnDondeEstaEnLaMismaDireccionPasada].direccion);
                }                
            }

            //En esta parte de aqui se encuentra la direccion con la primera idea que se tenia al principio
            //Se procedio a comentarla        
            // let idParada=0;
            // let menorDistancia=1000000;
            // const mayorParada=paradas[paradas.length-1].id_Parada;
            

            // for(let k=0;k<paradas.length;k++){

            //     let distanciaReal=Math.sqrt(Math.pow((UsuarioEncontrado.longitude-paradas[k].longitude),2)
            //     +Math.pow((UsuarioEncontrado.latitude-paradas[k].latitude),2));

            //     if(distanciaReal<menorDistancia){
            //         menorDistancia=distanciaReal;
            //         idParada=k;                    
            //     }

            // }


            

            // if(paradas[idParada].id_Parada<mayorParada){
            //     let distanciaEntreActualYparadaSiguiente=Math.sqrt(Math.pow((UsuarioEncontrado.longitude-paradas[idParada+1].longitude),2)
            //     +Math.pow((UsuarioEncontrado.latitude-paradas[idParada+1].latitude),2));

            //     let distanciaEntreAnteriorYparadaSiguiente=Math.sqrt(Math.pow((UsuarioEncontrado.longitudeAnterior-paradas[idParada+1].longitude),2)
            //     +Math.pow((UsuarioEncontrado.latitudeAnterior-paradas[idParada+1].latitude),2));

            //     if(distanciaEntreActualYparadaSiguiente<=distanciaEntreAnteriorYparadaSiguiente){
            //         direccionesPorUsuarioDos=(paradas[idParada+1].direccion);                    
            //     }else{
            //         if(paradas[idParada].direccion=='D'){
            //             direccionesPorUsuarioDos=('I');
            //         }else{
            //             direccionesPorUsuarioDos=('D');
            //         }
            //     }


            // }else if(paradas[idParada].id_Parada==mayorParada){
            //     let distanciaEntreActualYparadaSiguiente=Math.sqrt(Math.pow((UsuarioEncontrado.longitude-paradas[0].longitude),2)
            //     +Math.pow((UsuarioEncontrado.latitude-paradas[0].latitude),2));

            //     let distanciaEntreAnteriorYparadaSiguiente=Math.sqrt(Math.pow((UsuarioEncontrado.longitudeAnterior-paradas[0].longitude),2)
            //     +Math.pow((UsuarioEncontrado.latitudeAnterior-paradas[0].latitude),2));


            //     if(distanciaEntreActualYparadaSiguiente<=distanciaEntreAnteriorYparadaSiguiente){
            //         direccionesPorUsuarioDos=(paradas[0].direccion);
            //     }else{
            //         if(paradas[idParada].direccion=='D'){
            //             direccionesPorUsuarioDos=('I');
            //         }else{
            //             direccionesPorUsuarioDos=('D');
            //         }
            //     }
            // }                   
            


        return(
            <View>

                {/* //<Marker coordinate={{latitude:12.153800313208755,longitude:-86.30149193108082}}>        */}

                { UsuarioEncontrado.current.estado=='A' &&                    
                        <Marker coordinate={{latitude:(userLocation.latitude), longitude:(userLocation.longitude)}}>
                    
                            {direccionesPorUsuarioDos=='D' && <Text style={{color:'black'}}>{"⇛"+nombresEnElArregloFinal[0]}</Text>}
                            {direccionesPorUsuarioDos=='I' && <Text style={{color:'black'}}>{"⇚"+nombresEnElArregloFinal[0]}</Text>}

                            <Image style={{width:30,height:30}} source={require("../assets/transportistaAzul.png")}></Image>
                        </Marker>
                }
                
            </View>
        )}
     }

    return(
        <View></View>
    )

    }

    export default UsuarioTransportistaLogueado