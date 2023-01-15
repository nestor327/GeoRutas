import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import usePermissionsContext from "./usePermissionsContext.jsx";
import { AppState } from "react-native";
import { PermissionStatus,PERMISSIONS, request, check,openSettings } from "react-native-permissions";
import { getActualizando, getCantidadDeActualizando, setActualizando, setCantidadDeActualizando } from "../../data/asyncStorageData.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocation=(permitirEnviarUbicacion, tipoDeUsuario, idUsuarioIniciado, direccionesPorUsuario,userLocation,setUserLocation,activarPrecision)=>{
    
    const [permisos,setPermisos]=useState('unavailable');
    const [bacgroundPermisos,setBacgroundPermisos]=useState('unavailable');

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

    const askLocationPermissionSetting=()=>{
        
        if(Platform.OS === "android"){
            if(permisos=='blocked' || permisos=='denied'){
                openSettings();
            }
        }
    }

    const askLocationPermission=async()=>{
        if(Platform.OS === "ios"){

        }else if(Platform.OS === "android"){
            setPermisos(await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION));
        }
    }

    const askLocationBacgroundPermission=async()=>{
        if(Platform.OS === "android"){
            setBacgroundPermisos(await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION));            
        }
    }

    const checkBacgroundLocationPermission=async()=>{        
        
        if(Platform.OS === "ios"){

        }else if(Platform.OS === "android"){            
            //let {estatus}=await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
            // if(estatus!='granted' && estatus!=undefined){
            //     alert("Permita que a la aplicacion usar la ubicacion todo el tiempo "+estatus);
            // }
            setBacgroundPermisos(await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION));
        }
     
    }

    useEffect(()=>{
        
        isMounted.current=true;
        checkLocationPermission();
        checkBacgroundLocationPermission();

        const permisosState=AppState.addEventListener('change',async(state)=>{
        
            setPermisos(await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION));
            setBacgroundPermisos(await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION));

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
    
    const followUseLocation=(filtroDeDistancia)=>{
        if(isMounted.current==true){
            if(permisos=='granted'){         
                setSiguiendoAlUsuario(true);                
                watchID.current= Geolocation.watchPosition(
                    ({coords})=>{
                        setUserLocation({latitude:coords.latitude,longitude:coords.longitude});
                        //let fecha= new Date();
                        //console.log("Los segundos mientras sigues al usuario es: "+fecha.getSeconds());
                    },
                    ()=>{
                        (err)=>{console.log("Entraste al watch del usuario")};
                    },
                    {
                        enableHighAccuracy:true,
                        distanceFilter:filtroDeDistancia //OJO CON ESTO, ES UN FILTRO PARA VER LA NOTIFICAR LA POSICION CON UNA DISTANCIA DE 50 METROS   
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

        //let datos=await fetch('https://georutas.somee.com/api/UsuariosTransporte',{
        let datos=await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuariosTransporte',{
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
                    estado: 'A'
                })
        })
        //console.log(datos);        
    }

    const actualizarUbicacionEnElBackEnd=async(paradasCompletas,rutasParadas,coordenadasDeLaRuta)=>{
        
        let value=await AsyncStorage.getItem('actualizando');
        //
        //await AsyncStorage.setItem('actualizando',actualizando);
        let cantidad=await AsyncStorage.getItem('actualizandoCantidad');
        //await AsyncStorage.setItem('actualizandoCantidad',total);
        //

        if(cantidad>=8 || cantidad==undefined || cantidad==null || cantidad==NaN || cantidad=="NaN"){
            //setActualizando("true");
            let enviando=await AsyncStorage.setItem('actualizando',"true");
            //setCantidadDeActualizando("0");
            let total=await AsyncStorage.setItem('actualizandoCantidad',"0");
        }

        if(value=="false" || value==null || value==undefined){
            //setCantidadDeActualizando(1+cantidad);
            let total=await AsyncStorage.setItem('actualizandoCantidad',(1+parseInt(cantidad)).toString());
        }

        console.log("La cantidad de actualizaciones fallidas es:");
        console.log(cantidad);
        console.log(value);
        console.log("La cantidad de actualizaciones fallidas fue:");

        if(idUsuarioIniciado>0 && value=="true"){ 
            
            let enviando=await AsyncStorage.setItem('actualizando',"false");

        console.log("INICIASTE el rrecorrido de la actualizacion");

        let userLocationReal=(await new Promise(async (resolve) => {
            Geolocation.getCurrentPosition(
                ({coords})=>{
                    resolve({latitude:coords.latitude,longitude:coords.longitude});
                }
            )
        }))


        if(userLocationReal=={} || userLocationReal==undefined || userLocationReal.latitude==undefined){
            setHasLocation(true);
            console.log("No se actualizo el backend");            
            return;
        }

        let userLocation={latitude:0,longitude:0}
        //console.log(coordenadasDeLaRuta);

        if(coordenadasDeLaRuta.length==0 || coordenadasDeLaRuta==undefined && activarPrecision==true){            
            userLocation=userLocationReal;            
        }else{
            //console.log("Entraste al segundo lugar");
            let pendiente=0;

            pendiente=(coordenadasDeLaRuta[0].latitude-coordenadasDeLaRuta[1].latitude)/(coordenadasDeLaRuta[0].longitude-coordenadasDeLaRuta[1].longitude);

            
            let xValue=(userLocationReal.longitude+((1/pendiente)*(userLocationReal.latitude))
                -coordenadasDeLaRuta[0].latitude+pendiente*coordenadasDeLaRuta[0].longitude)/(pendiente+1/pendiente);
            
            let yValue=(-1/pendiente)*xValue+userLocationReal.longitude+(1/pendiente)*userLocationReal.latitude;

            let menorDistanciaHaciaLaLineaRuta=Math.sqrt(Math.pow(xValue-userLocationReal.latitude,2)+Math.pow(yValue-userLocationReal.longitude,2));

            let distanciaDeFiltroDeDistanciaHaciaLaLinea=2*menorDistanciaHaciaLaLineaRuta+10;

            let xValueFinal=xValue;
            let yValueFinal=yValue;
            
            for(let k=1;k<coordenadasDeLaRuta.length;k++){

                    pendiente=(coordenadasDeLaRuta[k-1].latitude-coordenadasDeLaRuta[k].latitude)/(coordenadasDeLaRuta[k-1].longitude-coordenadasDeLaRuta[k].longitude);

                    xValue=(userLocationReal.longitude+((1/pendiente)*(userLocationReal.latitude))
                    -coordenadasDeLaRuta[k-1].latitude+pendiente*coordenadasDeLaRuta[k-1].longitude)/(pendiente+1/pendiente);
    
                    yValue=(-1/pendiente)*xValue+userLocationReal.longitude+(1/pendiente)*userLocationReal.latitude;
    
                    distanciaDeFiltroDeDistanciaHaciaLaLinea=Math.sqrt(Math.pow(xValue-userLocationReal.latitude,2)+Math.pow(yValue-userLocationReal.longitude,2))
    
                    let latRectaUno=0;
                    let latRectaDos=0;
                    let longRectaUno=0;
                    let longRectaDos=0;

                    if(coordenadasDeLaRuta[k-1].latitude<coordenadasDeLaRuta[k].latitude){
                        latRectaUno=coordenadasDeLaRuta[k].latitude;
                        latRectaDos=coordenadasDeLaRuta[k-1].latitude;
                    }else{
                        latRectaUno=coordenadasDeLaRuta[k-1].latitude;
                        latRectaDos=coordenadasDeLaRuta[k].latitude;
                    }

                    if(coordenadasDeLaRuta[k-1].longitude<coordenadasDeLaRuta[k].longitude){
                        longRectaUno=coordenadasDeLaRuta[k].longitude;
                        longRectaDos=coordenadasDeLaRuta[k-1].longitude;
                    }else{
                        longRectaUno=coordenadasDeLaRuta[k-1].longitude;
                        longRectaDosRectaDos=coordenadasDeLaRuta[k].longitude;
                    }

                    if(distanciaDeFiltroDeDistanciaHaciaLaLinea < menorDistanciaHaciaLaLineaRuta 
                        && (yValue>=latRectaDos && yValue<=latRectaUno) && (xValue>=longRectaDos && xValue<=longRectaUno)){
                        menorDistanciaHaciaLaLineaRuta=distanciaDeFiltroDeDistanciaHaciaLaLinea;
                        xValueFinal=xValue;
                        yValueFinal=yValue;
                    }

                    xValue=(userLocationReal.longitude-coordenadasDeLaRuta[k-1].latitude+pendiente*coordenadasDeLaRuta[k-1].longitude)/pendiente;
                    yValue=userLocationReal.longitude;

                    distanciaDeFiltroDeDistanciaHaciaLaLinea=Math.abs(xValue-userLocation.latitude);

                    if(distanciaDeFiltroDeDistanciaHaciaLaLinea < menorDistanciaHaciaLaLineaRuta 
                        && (yValue>=latRectaDos && yValue<=latRectaUno) && (xValue>=longRectaDos && xValue<=longRectaUno)){
                        menorDistanciaHaciaLaLineaRuta=distanciaDeFiltroDeDistanciaHaciaLaLinea;
                        xValueFinal=xValue;
                        yValueFinal=yValue;
                    }

                    xValue=userLocationReal.latitude;
                    yValue=pendiente*xValue+coordenadasDeLaRuta[k-1].latitude-pendiente*coordenadasDeLaRuta[k-1].longitude;

                    distanciaDeFiltroDeDistanciaHaciaLaLinea=Math.abs(yValue-userLocation.longitude);

                    if(distanciaDeFiltroDeDistanciaHaciaLaLinea < menorDistanciaHaciaLaLineaRuta 
                        && (yValue>=latRectaDos && yValue<=latRectaUno) && (xValue>=longRectaDos && xValue<=longRectaUno)){
                        menorDistanciaHaciaLaLineaRuta=distanciaDeFiltroDeDistanciaHaciaLaLinea;
                        xValueFinal=xValue;
                        yValueFinal=yValue;
                    }

            }

            userLocation={latitude:xValueFinal,longitude:yValueFinal};            
            
            if(xValueFinal==0 || xValueFinal==undefined){
                userLocation=userLocationReal;
            }

        }


        //let usuarioTransportista= await fetch('https://georutas.somee.com/api/UsuariosTransporte/'+idUsuarioIniciado).then(res=>dat=res.json());
        let usuarioTransportista= await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuariosTransporte/'+idUsuarioIniciado).then(res=>dat=res.json());
        
        //let paradasCompletas=await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json());
        //let rutasParadas=await fetch('https://georutas.somee.com/api/RutasParada').then(res=>datos=res.json());        

        let paradasDelUsuario=[];
        let paradasEnComunRuta=rutasParadas.filter(elemento => elemento.id_Ruta==usuarioTransportista.id_Ruta);

        for(let k=0;k<paradasEnComunRuta.length;k++){
            paradasDelUsuario.push(paradasCompletas.filter(elemento => elemento.id_Parada==paradasEnComunRuta[k].id_Parada)[0]);
        }
        let latitudActual=userLocation.latitude;
        let longitudeActual=userLocation.longitude;
        
        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                                    usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                                    longitudeActual,usuarioTransportista.longitudeAnterior,usuarioTransportista.latitudeAnterior,usuarioTransportista.estado);
        

        let distanciaEntreUsuarioYRutaMenor=1000;
        let paradaMasCercana=-1;
        let paradaMasCercanaSinDireccion=-1;
        let distanciaEntreUsuarioYRutaMenorSinDireccion=1000;
    
        //De aqui toma la distancia, por tanto aqui debes de modificar la ubicacion putito


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

            // if(usuarioTransportista.id_Ruta==1){
            //     primerDato=(idUsuarioIniciado-1)*120+(paradaMasCercana+1);
            // }else if(usuarioTransportista.id_Ruta==2){
            //     primerDato=120*33+((idUsuarioIniciado-33)-1)*92+(paradaMasCercana+1);
            // }else if(usuarioTransportista.id_Ruta==3){
            //     primerDato=120*33+92*36+((idUsuarioIniciado-69)-1)*97+(paradaMasCercana+1);
            // }

            let dato=1;

            if(idUsuarioIniciado%33==0){
                dato=33
            }else{
                dato=idUsuarioIniciado%33;
            }

            primerDato=(rutasParadas[0].id_Parada-1)*33+((dato)-1)*rutasParadas.length+(paradaMasCercana+1);
            
            //let tiempoAnterior=await fetch('https://georutas.somee.com/api/UsuarioTransporteParada/'+primerDato).then(res=>datos=res.json());
            let tiempoAnterior=await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuarioTransporteParada/'+primerDato).then(res=>datos=res.json());
            
            let fechaAnterior=new Date(tiempoAnterior.ultimaActualizacion);
            let minutosDesdeElPasado=fechaAnterior.getHours()*60+fechaAnterior.getMinutes();

            let fechaActual=new Date();
            let minutosActuales=fechaActual.getHours()*60+fechaActual.getMinutes();
            
            if(Math.abs(minutosActuales-minutosDesdeElPasado)>30){
            try{

                    //let datos=await fetch('https://georutas.somee.com/api/UsuarioTransporteParada',{
                    let datos=await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuarioTransporteParada',{
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
                                    ultimaActualizacion: fechaActual.toISOString()
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
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                        longitudeActual,paradasDelUsuario[0].longitude,paradasDelUsuario[0].latitude,usuarioTransportista.estado);
                        
                   }else if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){
                        
                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                        longitudeActual,paradasDelUsuario[1].longitude,paradasDelUsuario[1].latitude,usuarioTransportista.estado);

                   }
                   
               }else if(paradaMasCercanaSinDireccion==paradasDelUsuario.length-1){

                   if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)<2){
                           
                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                        longitudeActual,paradasDelUsuario[paradasDelUsuario.length-1].longitude,paradasDelUsuario[paradasDelUsuario.length-1].latitude,
                        usuarioTransportista.estado);


                   }else if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){
                        
                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                        longitudeActual,paradasDelUsuario[paradasDelUsuario.length-2].longitude,paradasDelUsuario[paradasDelUsuario.length-2].latitude,
                        usuarioTransportista.estado);
    
                   }
                   
               }else if(paradaMasCercanaSinDireccion==ultimaParadaPorLaIzquierda){
                   if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)<2){

                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                        longitudeActual,paradasDelUsuario[ultimaParadaPorLaIzquierda].longitude,paradasDelUsuario[ultimaParadaPorLaIzquierda].latitude,
                        usuarioTransportista.estado);

                   }else if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){

                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                        longitudeActual,paradasDelUsuario[ultimaParadaPorLaIzquierda-1].longitude,paradasDelUsuario[ultimaParadaPorLaIzquierda-1].latitude,
                        usuarioTransportista.estado);

                   }

               }else if(paradaMasCercanaSinDireccion==ultimaParadaPorLaDerecha){
                   if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)<2){
                       
                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                        longitudeActual,paradasDelUsuario[ultimaParadaPorLaDerecha].longitude,paradasDelUsuario[ultimaParadaPorLaDerecha].latitude,
                        usuarioTransportista.estado);

                   }else if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){

                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                        longitudeActual,paradasDelUsuario[ultimaParadaPorLaDerecha+1].longitude,paradasDelUsuario[ultimaParadaPorLaDerecha+1].latitude,
                        usuarioTransportista.estado);

                   }
               }else if(paradaBuscadaDelPasado!=paradaMasCercanaSinDireccion){
                   if(Math.abs(paradaBuscadaDelPasado-paradaMasCercanaSinDireccion)>=2){
                       //Aqui asignas la parada del pasado que debe de ser reajustada
                       if(paradaBuscadaDelPasado>paradaMasCercanaSinDireccion){

                            actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                            usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                            longitudeActual,paradasDelUsuario[paradaMasCercanaSinDireccion+1].longitude,paradasDelUsuario[paradaMasCercanaSinDireccion+1].latitude,
                            usuarioTransportista.estado);
                       
                   }else if(paradaBuscadaDelPasado<paradaMasCercanaSinDireccion){

                        actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                        usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                        longitudeActual,paradasDelUsuario[paradaMasCercanaSinDireccion-1].longitude,paradasDelUsuario[paradaMasCercanaSinDireccion-1].latitude,
                        usuarioTransportista.estado);

                       }
                   }
                }

            //    else if(paradaBuscadaDelPasado==paradaMasCercanaSinDireccion && paradaMasCercanaSinDireccion>0){

            //         actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
            //         usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
            //         longitudeActual,paradasDelUsuario[paradaMasCercanaSinDireccion-1].longitude,paradasDelUsuario[paradaMasCercanaSinDireccion-1].latitude,
            //         usuarioTransportista.estado);

            //    }
           }else{
               
               // console.log("las coordendas son: ");
               // console.log(userLocation);
               actualizarUsuarioTransporte(idUsuarioIniciado,1,usuarioTransportista.id_Ruta,usuarioTransportista.nombre,usuarioTransportista.usuario,
                usuarioTransportista.contrasenia,usuarioTransportista.correo,usuarioTransportista.telefono,latitudActual,
                longitudeActual,usuarioTransportista.longitudeAnterior,usuarioTransportista.latitudeAnterior,
                usuarioTransportista.estado);
           }           
           let enviandoDos=await AsyncStorage.setItem('actualizando',"true");
           let total=await AsyncStorage.setItem('actualizandoCantidad',"1");
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
        askLocationPermission,
        askLocationPermissionSetting,
        askLocationBacgroundPermission,
        checkLocationPermission,
        checkBacgroundLocationPermission,
        bacgroundPermisos,
        setBacgroundPermisos
    };
}

export default useLocation