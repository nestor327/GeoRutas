  
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Marker } from "react-native-maps";
import obtenerParadasPorParadas from '../data/obtencionDeLasParadasPorRuta.js';
import { View,Text,Image } from "react-native";
import getAllRutas from '../data/rutasManagua.js'


//Este componente posee errores, revisalo luego

    const UsuarioTransportistaLogueado=({usuario,direccionesPorUsuario,setDireccionPorUsuario,idUsuarioIniciado,userLocation,activarPrecision})=>{

        let direccionesPorUsuarioDos='K';

        const {data,error,isLoading}=useQuery(['obtenerTodosLosUsuarioComunes'],async({queryKey})=>{
            return await fetch('https://georutas.somee.com/api/UsuariosTransporte').then(res=>datos=res.json())
            
        },{
            refetchInterval:2000,
            onSuccess:()=>{                
                setDireccionPorUsuario(direccionesPorUsuarioDos);
            }   
        }
        
        )

        
        let UsuarioEncontrado={};
        
        

    if(isLoading){
        //console.log("Se esta cargando la linea de la ruta");            
    }
    let paradas=obtenerParadasPorParadas(UsuarioEncontrado.id_Ruta);
    let rutasDeManagua=getAllRutas();
    

    if(isLoading==false && paradas.length>0 && rutasDeManagua.length>0){

        
        let nombresEnElArregloFinal=[];
        

        for(let k=0;k<data.length;k++){
            if(data[k].id_UsuarioTransporte==idUsuarioIniciado){
                UsuarioEncontrado=data[k];
                
                nombresEnElArregloFinal.push(rutasDeManagua.filter(elemento => elemento.id_Ruta==UsuarioEncontrado.id_Ruta)[0].nombre);
                //console.log(nombresEnElArregloFinal);
            }
        }    
            //console.log(UsuarioEncontrado);
            //console.log(UsuarioEncontrado);
            //El problema es que aveces no encuentra el usuario, arregla eso...
            //console.log(UsuarioEncontrado);

            let paradaAnteriorAdondeEstuvo=-1;
            let paradaEnDondeEstaEnLaMismaDireccionPasada=-1;

            let distanciaPasadaALaRuta=10000;
            let distanciaActualALaParada=10000;
            let ultimaParadaPorLaIzquierda=-1;
            let ultimaParadaPorLaDerecha=-1;

            if( UsuarioEncontrado.estado=='A'){
                //console.log("Entraste");
                for(let g=0;g<paradas.length;g++){
                let distanciaALaActualParada=Math.sqrt(Math.pow((paradas[g].latitude-UsuarioEncontrado.latitudeAnterior),2)
                +Math.pow((paradas[g].longitude-UsuarioEncontrado.longitudeAnterior),2));

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
                let distanciaALaActualParada=Math.sqrt(Math.pow((paradas[g].latitude-UsuarioEncontrado.latitude),2)
                +Math.pow((paradas[g].longitude-UsuarioEncontrado.longitude),2));

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


        return(
            <View>
                {data.length>0 && data!=undefined &&
                    <Marker coordinate={{latitude:(activarPrecision==true)?data[idUsuarioIniciado-1].longitude:userLocation.latitude, longitude:(activarPrecision==true)?data[idUsuarioIniciado-1].latitude:userLocation.longitude}}>
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