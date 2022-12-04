import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import usePermissionsContext from "./usePermissionsContext.jsx";
import { AppState } from "react-native";
import { PermissionStatus,PERMISSIONS, request, check,openSettings } from "react-native-permissions";

const useLocation=(permitirEnviarUbicacion, tipoDeUsuario, idUsuarioIniciado, direccionesPorUsuario,userLocation,setUserLocation)=>{
    
    const [permisos,setPermisos]=useState('unavailable');

    const [hasLocation, setHasLocation]=useState(true);

    const [inicialPosition, setInicialPosition]=useState({latitude:12.127088,longitude:-86.255052});

    const [siguiendoAlUsuario,setSiguiendoAlUsuario]=useState(false);



    const watchID=useRef();
    const isMounted=useRef(true);

    const checkLocationPermission=async()=>{        
        if(Platform.OS === "ios"){

        }else if(Platform.OS === "android"){            
            setPermisos(await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION));
        }

    }

    const askLocationPermission=async()=>{
        if(Platform.OS === "ios"){

        }else if(Platform.OS === "android"){
            setPermisos(await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION));
            if(permisos=='blocked'){
                openSettings();
            }
        }
    }

    useEffect(()=>{
        
        isMounted.current=true;
        checkLocationPermission();

        const permisosState=AppState.addEventListener('change',async(state)=>{
        
            setPermisos(await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION));

            if(state!=='active') return;
                checkLocationPermission();
        })


        return ()=>{
            isMounted.current=false;
            permisosState.remove();
        }
    },[])

    useEffect(()=>{

        if(permisos=='granted'){
            
            getCurrentLocation().then(
                (coords) => {
                if(isMounted.current==true){
                    if((coords.longitude>-86.42 && coords.longitude<-86.11) && (coords.latitude>12.04 && coords.latitude<12.2)){
                        setInicialPosition({latitude:coords.latitude,longitude:coords.longitude});                
                    }else{
                        setInicialPosition({latitude:12.127088,longitude:-86.255052});
                    }
                    setUserLocation({latitude:coords.latitude,longitude:coords.longitude});
                }
            }
            )
        }else{            
            setInicialPosition({latitude:12.127088,longitude:-86.255052});
        }

    },[permisos])


    const getCurrentLocation=()=>{
        return new Promise((resolve, reject)=>{
            if(isMounted.current==true){
                if(permisos=='granted'){
                    Geolocation.getCurrentPosition(
                        ({coords})=>{
                            resolve({latitude:coords.latitude,longitude:coords.longitude});
                        },
                        ()=>{
                            (err)=>{reject({err})};
                        },
                        {
                            enableHighAccuracy:true
                        }
                        )
                }else{
                    askLocationPermission();
                }            
            }
        })
    }
    
    const followUseLocation=()=>{
        if(isMounted.current==true){
            if(permisos=='granted'){         
                setSiguiendoAlUsuario(true);                
                watchID.current= Geolocation.watchPosition(
                    ({coords})=>{
                        setUserLocation({latitude:coords.latitude,longitude:coords.longitude});                           
                        
                    },
                    ()=>{
                        (err)=>{console.log("Entraste al watch del usuario")};
                    },
                    {
                        enableHighAccuracy:true,
                        distanceFilter:10 //OJO CON ESTO, ES UN FILTRO PARA VER LA NOTIFICAR LA POSICION CON UNA DISTANCIA DE 10 METROS   
                    }
                    )  
                    console.log("Otorgaste permisos en: ");
                    console.log(watchID.current);
            }
      
        }
    }

    const stopFollowUserLocation=()=>{
        if(watchID.current>=0){
            if(permisos=='granted'){
                setSiguiendoAlUsuario(false);
                Geolocation.clearWatch(watchID.current);
                console.log("La mierda se cancelo, con "+watchID.current);
            }
        }
    }

    const actualizarUsuarioTransporte=async(id_UsuarioTransporte,id_Tipo_Transporte,id_Ruta,nombre,usuario,contrasenia,
        correo,telefono,latitude,longitude,longitudeAnterior,latitudeAnterior,estado)=>{


            // console.log("QUE PEDO GUEY");
            
            // console.log("id_UsuarioTransporte:"+ id_UsuarioTransporte + "id_Tipo_Transporte:" + id_Tipo_Transporte
            //             +"id_Ruta:"+ id_Ruta +"nombre:"+ nombre+ "usuario:"+ usuario +"contrasenia:"+ contrasenia
            //             +"correo:"+ correo+"telefono:"+ telefono+"longitude:"+ latitude +"latitude:"+ longitude
            //             +"longitudeAnterior:"+ longitudeAnterior +"latitudeAnterior:" +latitudeAnterior
            //             +"estado:" +estado);

            // console.log("QUE PEDO GUEY");

            if(nombre==null || usuario==null || contrasenia==null){
                console.log("Intentaste actualizar algo nulo");
                return;
            }

        let datos=await fetch('https://georutas.somee.com/api/UsuariosTransporte',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                },
                body:JSON.stringify(
                {
                    id_UsuarioTransporte: id_UsuarioTransporte,
                    id_Tipo_Transporte: id_Tipo_Transporte,
                    id_Ruta: id_Ruta,
                    nombre: nombre,
                    usuario: usuario,
                    contrasenia: contrasenia,
                    correo: correo,
                    telefono: telefono,
                    longitude: latitude,
                    latitude: longitude,
                    longitudeAnterior: longitudeAnterior,
                    latitudeAnterior: latitudeAnterior,
                    estado: estado
                })
        })
        //console.log(datos);        
    }


    const actualizarUbicacionEnElBackEnd=async(usuarioTransportista,paradasCompletas,rutasParadas,userLocation)=>{
        
        if(idUsuarioIniciado>0 && hasLocation==true){ 

        setHasLocation(false);
        console.log("INICIASTE el rrecorrido de la actualizacion");

        console.log(userLocation);

        //let paradasCompletas=await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json());
        //let rutasParadas=await fetch('https://georutas.somee.com/api/RutasParada').then(res=>datos=res.json());        

        let paradasDelUsuario=[];
        let paradasEnComunRuta=rutasParadas.filter(elemento => elemento.id_Ruta==usuarioTransportista.id_Ruta);

        for(let k=0;k<paradasEnComunRuta.length;k++){
            paradasDelUsuario.push(paradasCompletas.filter(elemento => elemento.id_Parada==paradasEnComunRuta[k].id_Parada)[0]);
        }

        console.log("Englobaste esta parte");
        
        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                                    usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                                    userLocation.longitude,usuarioTransportista.longitudeAnterior,usuarioTransportista.latitudeAnterior,usuarioTransportista.estado);
        
        console.log("Englobaste esta parte");

        let distanciaEntreUsuarioYRutaMenor=1000;
        let paradaMasCercana=-1;
        let paradaMasCercanaSinDireccion=-1;
        let distanciaEntreUsuarioYRutaMenorSinDireccion=1000;
    
        //Revisa porque no hace los cambios y porque no calcula la distancia
        let latitudActual=userLocation.latitude;
        let longitudeActual=userLocation.longitude;

        for(let y=0;y<paradasDelUsuario.length;y++){
                                
            let distanciaActual=Math.sqrt(Math.pow((latitudActual-paradasDelUsuario[y].longitude),2)
            +Math.pow((longitudeActual-paradasDelUsuario[y].latitude),2));
                                
            //console.log(distanciaActual);
    
            if(distanciaEntreUsuarioYRutaMenor>distanciaActual && paradasDelUsuario[y].direccion==direccionesPorUsuario){
                distanciaEntreUsuarioYRutaMenor=distanciaActual;
                paradaMasCercana=y;
            }

            if(distanciaEntreUsuarioYRutaMenorSinDireccion>distanciaActual){
                distanciaEntreUsuarioYRutaMenorSinDireccion=distanciaActual;
                paradaMasCercanaSinDireccion=y;
            }
        }


        if(distanciaEntreUsuarioYRutaMenor<=0.001097577788 && paradaMasCercana>=0 && tipoDeUsuario=='Transportista'){    
            
            let primerDato=0;
            let segundoDato=idUsuarioIniciado;
            let tercerDato=paradasDelUsuario[paradaMasCercana].id_Parada;            
            let ultimoDato=0;

            //Esta parte es la unica donde no
            //Generalisaste.

            if(usuarioTransportista.id_Ruta==1){
                primerDato=(idUsuarioIniciado-1)*120+(paradaMasCercana+1);
            }else if(usuarioTransportista.id_Ruta==2){
                primerDato=120*33+((idUsuarioIniciado-33)-1)*92+(paradaMasCercana+1);
            }else if(usuarioTransportista.id_Ruta==3){
                primerDato=120*33+92*36+((idUsuarioIniciado-69)-1)*97+(paradaMasCercana+1);
            }
            
            let tiempoAnterior=await fetch('https://georutas.somee.com/api/UsuarioTransporteParada/'+primerDato).then(res=>datos=res.json());
            
            let fechaAnterior=new Date(tiempoAnterior.ultimaActualizacion);
            let minutosDesdeElPasado=fechaAnterior.getHours()*60+fechaAnterior.getMinutes();

            let fechaActual=new Date();
            let minutosActuales=fechaActual.getHours()*60+fechaActual.getMinutes();
                        
            if(Math.abs(minutosActuales-minutosDesdeElPasado)>30){
            try{
                
                    let datos=await fetch('https://georutas.somee.com/api/UsuarioTransporteParada',{
                        method:"PUT",
                        headers:{
                            "Content-Type":"application/json",
                            },
                            body:JSON.stringify(
                                {
                                    id_UsuarioTransporte_Parada: primerDato,
                                    id_Usuario_Transporte: segundoDato,
                                    id_Parada: tercerDato,
                                    tiempoDeLlegadaAnterior: tiempoAnterior.tiempoDeLlegadaAnterior,
                                    ultimaActualizacion: fecha.toISOString()
                                }
                            )
                        }
                    ) 
                }catch(e){
                
            }
        }
        }

        let menorDistanciaBuscada=10000;
        let paradaBuscadaDelPasado=-1;
        let ultimaParadaPorLaDerecha=-1;
        let ultimaParadaPorLaIzquierda=-1;
        
        for(let z=0;z<paradasDelUsuario.length;z++){
            let distanciaEntrePasadoYParada=Math.sqrt(Math.pow((usuarioTransportista.latitudeAnterior-paradasDelUsuario[z].latitude),2)
                                                     +Math.pow((usuarioTransportista.longitudeAnterior-paradasDelUsuario[z].longitude),2));
            if(distanciaEntrePasadoYParada<=menorDistanciaBuscada && paradasDelUsuario[z].direccion==paradasDelUsuario[paradaMasCercanaSinDireccion].direccion){
                menorDistanciaBuscada=distanciaEntrePasadoYParada;
                paradaBuscadaDelPasado=z;
            }
            if(z<paradasDelUsuario.length-1 && paradasDelUsuario[z].direccion!=paradasDelUsuario[z+1].direccion){
                ultimaParadaPorLaDerecha=z+1;
                ultimaParadaPorLaIzquierda=z;
            }
        }

        if(distanciaEntreUsuarioYRutaMenorSinDireccion<=0.001097577788 && paradaMasCercanaSinDireccion>=0 && tipoDeUsuario=='Transportista'){
            //Primero verifica en que parada se encuentra y comparala con la de su antepasado, si son la misma, ni verga
            //poseen la misma direccion, sino si son de distinta direeccion encuentra la parada mas cercana a tu pasado y verifica 
            //si son las mismas, si lo son entonces ni verga, ahora si no, en base a si es mayor o no entonces la direccion estara 
            //dada, ahora si la direfencia de paradas es almenos dos, hay que la diferencia sea 1.

            
               if(paradaMasCercanaSinDireccion==0){
                   if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)<2){
                       //Tienes que entender cabrom que es lo que va aqui
                       
                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                        userLocation.longitude,paradasDelUsuario[0].longitude,paradasDelUsuario[0].latitude,usuarioTransportista.estado);
                        
                   }else if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){
                        
                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                        userLocation.longitude,paradasDelUsuario[1].longitude,paradasDelUsuario[1].latitude,usuarioTransportista.estado);

                   }
                   
               }else if(paradaMasCercanaSinDireccion==paradasDelUsuario.length-1){

                   if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)<2){
                           
                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                        userLocation.longitude,paradasDelUsuario[paradasDelUsuario.length-1].longitude,paradasDelUsuario[paradasDelUsuario.length-1].latitude,
                        usuarioTransportista.estado);


                   }else if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){
                        
                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                        userLocation.longitude,paradasDelUsuario[paradasDelUsuario.length-2].longitude,paradasDelUsuario[paradasDelUsuario.length-2].latitude,
                        usuarioTransportista.estado);
    
                   }
                   
               }else if(paradaMasCercanaSinDireccion==ultimaParadaPorLaIzquierda){
                   if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)<2){

                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                        userLocation.longitude,paradasDelUsuario[ultimaParadaPorLaIzquierda].longitude,paradasDelUsuario[ultimaParadaPorLaIzquierda].latitude,
                        usuarioTransportista.estado);

                   }else if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){

                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                        userLocation.longitude,paradasDelUsuario[ultimaParadaPorLaIzquierda-1].longitude,paradasDelUsuario[ultimaParadaPorLaIzquierda-1].latitude,
                        usuarioTransportista.estado);

                   }

               }else if(paradaMasCercanaSinDireccion==ultimaParadaPorLaDerecha){
                   if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)<2){
                       
                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                        userLocation.longitude,paradasDelUsuario[ultimaParadaPorLaDerecha].longitude,paradasDelUsuario[ultimaParadaPorLaDerecha].latitude,
                        usuarioTransportista.estado);

                   }else if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){

                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                        userLocation.longitude,paradasDelUsuario[ultimaParadaPorLaDerecha+1].longitude,paradasDelUsuario[ultimaParadaPorLaDerecha+1].latitude,
                        usuarioTransportista.estado);

                   }
               }else if(paradaBuscadaDelPasado!=paradaMasCercanaSinDireccion){
                   if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){
                       //Aqui asignas la parada del pasado que debe de ser reajustada
                       if(paradaBuscadaDelPasado>paradaMasCercanaSinDireccion){

                            actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                            usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                            userLocation.longitude,paradasDelUsuario[paradaMasCercanaSinDireccion+1].longitude,paradasDelUsuario[paradaMasCercanaSinDireccion+1].latitude,
                            usuarioTransportista.estado);
                       
                   }else if(paradaBuscadaDelPasado<paradaMasCercanaSinDireccion){

                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                        userLocation.longitude,paradasDelUsuario[paradaMasCercanaSinDireccion-1].longitude,paradasDelUsuario[paradaMasCercanaSinDireccion-1].latitude,
                        usuarioTransportista.estado);

                       }
                   }
                }

            //    else if(paradaBuscadaDelPasado==paradaMasCercanaSinDireccion && paradaMasCercanaSinDireccion>0){

            //         actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
            //         usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
            //         userLocation.longitude,paradasDelUsuario[paradaMasCercanaSinDireccion-1].longitude,paradasDelUsuario[paradaMasCercanaSinDireccion-1].latitude,
            //         usuarioTransportista.estado);

            //    }
           }else{
               
               // console.log("las coordendas son: ");
               // console.log(userLocation);
               actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,userLocation.latitude,
                userLocation.longitude,usuarioTransportista.longitudeAnterior,usuarioTransportista.latitudeAnterior,
                usuarioTransportista.estado);
           }
           setHasLocation(true);
           console.log("FINALIZASTE el rrecorrido de la actualizacion");
        }
    }

    return{
        permisos,
        hasLocation,
        inicialPosition,
        getCurrentLocation,
        followUseLocation,        
        userLocation,
        stopFollowUserLocation,
        actualizarUbicacionEnElBackEnd,
        siguiendoAlUsuario,
        askLocationPermission
    };
}

export default useLocation