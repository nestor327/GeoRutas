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


    const getCurrentLocation= ()=>{
        return new Promise((resolve, reject)=>{
            if(isMounted.current==true){
                if(permisos=='granted'){
                    Geolocation.getCurrentPosition(
                        ({coords})=>{
                            resolve({latitude:coords.latitude,longitude:coords.longitude});
                            console.log("Intentaste o lo lograste");
                        },
                        ()=>{
                            (err)=>{
                                reject({err})
                                console.log("Mierda un error");
                        };
                        },
                        {
                            timeout:10000,
                            //maximumAge:10000,
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
                        console.log("Los segundos mientras sigues al usuario es: ");
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

    const actualizarUsuarioTransporte=async(id_UsuarioTransporte,id_Tipo_Transporte,id_Ruta
        ,latitude,longitude,longitudeAnterior,latitudeAnterior,emailState, tokenState)=>{

            if(id_Ruta==null){                
                return;
            }

        try{
            let datos=await fetch('https://www.georutas.lat/api/NUsuariosTransporte?Email='+emailState+'&Token='+tokenState,
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    },
                    body:JSON.stringify(
                        {
                            id_UsuarioTransporte: id_UsuarioTransporte,
                            id_Tipo_Transporte: id_Tipo_Transporte,
                            id_Ruta: id_Ruta,
                            longitude: latitude,
                            latitude: longitude,
                            longitudeAnterior: longitudeAnterior,
                            latitudeAnterior: latitudeAnterior,
                            estado: 'A',
                            direccion: 'I'
                        })
                });


        }catch(e){
            console.log("El token es: "+e.message);
            console.log("No se actualizo el usuario");
        }              
    }

    //const actualizarUbicacionEnElBackEnd=async(paradasCompletas,rutasParadas,coordenadasDeLaRuta,emailState, tokenState,id_Ruta)=>{
    const actualizarUbicacionEnElBackEnd=async(emailState, tokenState,tipoDeEnvio)=>{
        
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

        if(value=="true"){ 
            
            let enviando=await AsyncStorage.setItem('actualizando',"false");

        console.log("INICIASTE el rrecorrido de la actualizacion");
        
        let userLocationReal=(await new Promise(async (resolve) => {
            Geolocation.getCurrentPosition(
                ({coords})=>{
                    resolve({latitude:coords.latitude,longitude:coords.longitude});   
                    console.log("Los putos datos que estas enviando son: ");                 
                    console.log({latitude:coords.latitude,longitude:coords.longitude});
                    // console.log("La latitude es :"+coords.latitude);
                    // console.log("La longitude es :"+coords.longitude);
                    // let fechaG= new Date();
                    // if(fechaG.getSeconds()%60<6){                     
                    //     resolve({latitude: 12.148238,longitude:-86.265838});
                    // }else if(fechaG.getSeconds()%60<12){
                    //     resolve({latitude: 12.148155,longitude:-86.260540});
                    // }else if(fechaG.getSeconds()%60<18){
                    //     resolve({latitude: 12.148572,longitude:-86.254814});
                    // }else if(fechaG.getSeconds()%60<24){
                    //     resolve({latitude: 12.147569,longitude:-86.248405});
                    // }else if(fechaG.getSeconds()%60<30){
                    //     resolve({latitude: 12.147569,longitude:-86.241568});
                    // }else if(fechaG.getSeconds()%60<36){
                    //     resolve({latitude: 12.146982,longitude:-86.226354});
                    // }else if(fechaG.getSeconds()%60<42){
                    //     resolve({latitude: 12.148572,longitude:-86.254814});
                    // }else if(fechaG.getSeconds()%60<48){
                    //     resolve({latitude: 12.147569,longitude:-86.248405});
                    // }else if(fechaG.getSeconds()%60<54){
                    //     resolve({latitude: 12.147569,longitude:-86.241568});
                    // }else if(fechaG.getSeconds()%60<59){
                    //     resolve({latitude: 12.146982,longitude:-86.226354});
                    // }
                    // if(activarPrecision==false){
                    //     setUserLocation({longitude:coords.latitude,latitude:coords.longitude});
                    // }
                },()=>{
                    //
                }
                ,
                {
                    timeout: 3600,
                    maximumAge: 3600,
                    enableHighAccuracy: true,
                }
            )
        }))

        console.log("Los datos enviados al backend fueron: ");
        console.log(userLocationReal);

        if(userLocationReal=={} || userLocationReal==undefined || userLocationReal.latitude==undefined){
            setHasLocation(true);
            console.log("No se actualizo el backend");            
            return;
        }

        //let userLocation={latitude:0,longitude:0}
        console.log("La informacion es: ")
        console.log(userLocationReal);
        console.log("La informacion es: ")

        console.log("El tipo de envio es: "+tipoDeEnvio);

        let datos=null;
        try{
            datos=await fetch('https://www.georutas.lat/api/ActualizacionDelBackendParadas?latitude='+userLocationReal.latitude+'&longitude='+userLocationReal.longitude+'&Email='+emailState+'&Token='+tokenState+'&tipoEnvio='+tipoDeEnvio,
            {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    }
            }).then(res=>datos=res.json());
            console.log("SE LOGRO REALIZAR LA ACTUALIZACION");
            console.log(datos);
        }catch{
            console.log("No se logro actualizar");
            console.log(datos);
        }
        
           let enviandoDos=await AsyncStorage.setItem('actualizando',"true");
           let total=await AsyncStorage.setItem('actualizandoCantidad',"1");
           console.log("FINALIZASTE el rrecorrido de la actualizacion");
        }


        
    }
    const actualizarTiemposDeLasParadas= async(id_Ruta,emailState,tokenState)=>{
        let datos=null;
        try{
            datos=await fetch('https://www.georutas.lat/api/NActualizacionDeTiempos/'+id_Ruta+'?Email='+emailState+'&Token='+tokenState).then(res=>datos=res.json());
            console.log(datos);
            console.log("Los datos son los anteriosres");
        }catch{
            console.log("No se actualizaron las paradas");
            console.log(datos);
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
        setBacgroundPermisos,
        actualizarTiemposDeLasParadas
    };
}

export default useLocation