
//NUEVA ACTUALIZACION 18-1-23 El endpoint devuelve lo necesario del usuario Transporte
//Hay un endpoint que devuelve las paradasrutas para una sola ruta

import React, { useEffect,useRef, useState  } from 'react'
import { View,Text, Platform, StatusBar, ActivityIndicator, Image, TextInput, TouchableOpacity, Keyboard, AppState, Linking, ScrollView, BackHandler} from 'react-native';
import {enableLatestRenderer, Marker, PROVIDER_GOOGLE,Polyline} from 'react-native-maps';
import MapView from 'react-native-maps';
import IconosDeNavegacion from './IconosDeNavegacion.jsx';
import Perfil from './Perfil.jsx';
import LineasTrayectorias from './LineasTrayectorias.jsx';
import RutasCercaDelPasajero from './RutasCercaDelPasajero.jsx';
import DireccionesSegunUbicacion from './DireccionesSegunUbicacion.jsx';
import LineaDeUnaRuta from './LineaDeUnaRuta.jsx';
import UsuariosTransportistas from './UsuariosTransportistas.jsx';
import UsuarioTransportistaLogueado from './UsuarioTransportistaLogueado.jsx';
import CompetenciaTransportistas from './CompetenciaTransportistas.jsx';
import urlDeLasImagenesEstaticas from '../data/urlDeLasImagenesDeLasRutas.js';
import urlDeLasImagenesParadaBajar from '../data/urlDeLasImagenesParadaBajar.js';
import urlDeLasImagenesParadaSubir from '../data/urlDeLasImagenesParadaSubir.js';
import useLocation from '../src/hooks/useLocation.jsx';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';
import { PermissionStatus,PERMISSIONS, request, check,openSettings } from "react-native-permissions";
import { getPermitirEnvio, getRutasParadasValue, setRutasParadasValue, setTokenGeoRutasCode } from '../data/asyncStorageData.js';
import Cargando from './Cargando.jsx';
import UsuarioCercanoAUnaParada from './UsuarioCercanoAUnaParada.jsx';
import styles from '../componentStyles/mapviewStyles.js';
import UsuariosTransportistasConTiempo from './UsuariosTransportistasConTiempos.jsx';
import SeguimientoAlTrayecto from './SeguimientoAlTrayecto.jsx';

export default Inicio=({setLoguearse, setRegistrarse,mostrarItemMenuUno,setCoordenadasOrigen,tipoDeUsuario
    ,setVerTrayectoria,setOcultarMenu,coordenadasOrigen,coordenadasDestino,setCoordenadasDestino,verTrayectoria,iconosTransportes,tiemposRutasTrayectorias
    ,verParadasCercanas,setCoordenadasOrigenSecundario,setOcultarTercerMenu,setVerParadasCercanas,coordenadasOrigenSecundario,setDireccionPorUsuario
    ,idRutaAMostrar,setMostrarSniperCargando,idUsuarioIniciado,verTransportistasPorLaDerecha, setVerTransportistasPorLaDerecha
    , verTransportistasPorLaIzquierda,setVerTransportistasPorLaIzquierda,mostrarSniperCargando,direccionesPorUsuario,idUsuariosDeTrayectoria,rutasEnElMapa
    ,identificadorKey,secionIniciada,verCompetencia,setVerCompetencia,verRutasCercanas,setVerRutasCercanas,ocultarTrayecto, setOcultarTrayecto,height,width,
    obtenerRutas

    ,setPermitirEnviarUbicacion,permitirEnviarUbicacion

    ,menUno,setmenUno,menDos, setmenDos,menTres, setmenTres,menCuatro, setmenCuatro,menCinco, setmenCinco
    ,userLocation, setUserLocatio,setSecionIniciada, setTipoDeUsuario
    ,mostrarBarraSecundariaDeUbicacion,setMostrarBarraSecundariaDeUbicacion,setMostrarItemMenuUno,setIdRutaAMostrar
    ,refCambiarLupa,activarPrecision,setActivarPrecision,mostrarVentana,serMostrarVentana
    ,setCargando,cargando,
    todasLasRutasCompetencia,rutasSeleccionadasCompetencia,setTodasLasRutasCompetencia,setRutasSeleccionadasCompetencia
    ,emailState, tokenState,setTokenState,tipoDeSubscripcion,setVerAdministrarUsuarios,setCambiarPassword,setEditarPerfil
    ,registrarse,estadoAplicacion, setEstadoAplicacion,setMostrarAlerte,setMensajeAlerta,setMostrarMenusBuenEstado,sesionIniciadaConGoogle
    ,pedirUbicacion,pedirUbicacionSegundoPlano,setPedirUbicacionSegundoPlano,verificarMenbresia,setMostrarAnuncioCompleto
    ,tiempoDesdeUltimoAnuncio,setMostrarAnuncioRewarded,obtenerTiempoDesdeElUltimoAnucio,setMostrarComprasPasajeros,setEliminarAnuncios
    ,setTiempoDesdeUltimoAnuncio,VERSIONDELAPLICACION,modoOscuro,setModoOscuro,mostrarCompañerosCercanos, setMostrarCompañerosCercanos
    ,tiempoParaUsaurioTransportistaLogueado, setTiempoParaUsaurioTransportistaLogueado, setTiempoPromedio, tiempoPromedio
    ,iniciarRecorridoDeLaTrayectoria, setIniciarRecorridoDeLaTrayectoria,datosDeLosUsuarios,setFechaDeClicSalida,mostrarComprasPasajeros
    ,detenerInterval,setDetenerInterval,tiempoDeEspera,setTiempoDeEspera,refMapView
    })=>{
    



    // const {data,obtenerRutas} = useTrayectoria(coordenadasOrigen,coordenadasDestino,setRutasEnElMapa,rutasEnElMapa,setRutasTrayectoria,setVisualizarRutas,
    //     setVerRutasTrayecto,setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto);


    const { permisos,
            hasLocation,
            stopFollowUserLocation,
            inicialPosition,
            getCurrentLocation,
            followUseLocation,            
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
        }=useLocation(permitirEnviarUbicacion,tipoDeUsuario,idUsuarioIniciado,direccionesPorUsuario,userLocation,setUserLocatio,activarPrecision);

    
    const [mostrarUsuarios, setMostrarUsuarios]=useState(false);
    const [mostrarParadas, serMostrarParadas]=useState(false);
    const [usuarioTransportista,setUsuarioTransportista]=useState({
        id_UsuarioTransporte:0,
        id_Tipo_Transporte:0,
        id_Ruta:0,
        longitude:0,
        latitude:0,
        longitudeAnterior:0,
        latitudeAnterior:0,
        estado:"I",
        direccion:"I"
    });    
    const [paradasCompletas, setParadasCompletas]=useState([]);
    const [rutasParadas,setRutasParadas]=useState([]);

    const [actualizarDestino, setActualizarDestino]=useState({latitude:0,longitude:0});
    const [actualizarOrigen,setActualizarOrigen]=useState({latitude:0,longitude:0});

    const [tipoDeModificacionDeLugar, setTipoDeModificacionDeLugar]=useState('Destino');
    const [verRecomendacionesDeUbicaciones, setVerRecomendacionesDeUbicacion]=useState(false);
    const [coordenadasDeLaRuta, setCoordenadasDeLaRuta]=useState([]);
    
    const [actualizarUsuarioTransportista, setActualizarUsuarioTransportista]=useState(false);



    const refFollowing=useRef(true);
    const [refChangeLocation,setrefChangeLocation]=useState({latitude:0, longitude:0});
    const refEnvioDeUbicacionesPasajero=useRef(true);
    const refInputAutoComplete=useRef();
    const refNombreDelDestino=useRef("Desconocido");
    const refNombreDelOrigen=useRef("Desconocido");    

    const refrescarToken=async(email,token)=>{
        let usuario=null;
        // console.log("El token que envias es: "+token);
        // console.log("El correo que envias es: "+email);
        // console.log("El id que envias es: "+idUsuarioIniciado);

        //%  %  
        //%25 %25
        try{
            let url='https://www.georutas.lat/api/RefrescarToken?Email='+email+'&Token='+token;
            
            //Al momento de guardarlo en la base de datos, no debes de guardarlo con la misma estructura

            usuario=await fetch(url).then(res=>usuario=res.json());
            //usuario=await fetch(url);
            // console.log("El usuario es: ");
            // console.log(usuario);    
        }catch{
            setMensajeAlerta("Revisa tu conexión a internet");
            setMostrarAlerte(true);
            return;
        }   

        if(usuario==null){
            setMensajeAlerta("Revisa tu conexión a internet");
            setMostrarAlerte(true);
            return;
        }

        if(usuario.token=="0"){
            return;
        }else if(usuario.token=="3" && tipoDeSubscripcion!='A' && tipoDeUsuario=='Pasajero'){
            setTipoDeSubscripcion('A');
            setTipoDeMenbresiaCode('A');
        }else if(usuario.token=="2" || usuario.token=="1"){
            setSecionIniciada(false);            
            setTipoDeUsuario("Ninguno");
            setLoguearse(true);
        }else if(usuario.token=="4" && tipoDeSubscripcion!='C' && tipoDeUsuario=='Pasajero'){
            setTipoDeSubscripcion('C');
            setTipoDeMenbresiaCode('C');
        }else if(usuario.token.length>10){
            setTokenState(usuario.token);
            setTokenGeoRutasCode(usuario.token);
        }

    }
        
    const capturarUsuarioTransportistaYDemas=async(email,token)=>{  
        
        let usuario=null;
        try{
            let url='https://www.georutas.lat/api/NUsuariosTransporte/'+idUsuarioIniciado.toString()+'?Email='+email+'&Token='+token;
            
            usuario=await fetch(url).then(res=>dat=res.json());
            
        }catch{
            setMensajeAlerta("Revisa tu conexión a internet");
            setMostrarAlerte(true);
        }

        if(usuario==null || usuario.id_Tipo_Transporte==0){
            setMensajeAlerta("Revisa tu conexión a internet");
            setMostrarAlerte(true);
            return;
        }else if(usuario.id_Tipo_Transporte==-1){            
            setMensajeAlerta("Hubo un problema con su usuario");
            setMostrarAlerte(true);
            return;
        }else if(usuario.id_Tipo_Transporte==-2){

            refrescarToken(email,token);
            return;
        }else if(usuario.id_Tipo_Transporte>0){
            setUsuarioTransportista(usuario);
        }
        
        if(usuario!=null && usuario.id_Ruta>0){
            let paradasRutas=[];

            try{
                paradasRutas=await fetch('https://www.georutas.lat/api/RutasParada?IdRuta='+usuario.id_Ruta+'&Email='+emailState+'&Token='+tokenState).then(res=>datos=res.json());        
            }catch{
                paradasRutas=[];
            }        

            if(paradasRutas.length>0){
                setRutasParadas(paradasRutas);
            }

            let paradasComple=[];
            try{
                paradasComple=await fetch('https://www.georutas.lat/api/Paradas/Email?Email='+email+'&token='+token).then(res=>datos=res.json());
            }catch{
                paradasComple=[];
            }

            if(paradasComple.length>0){
                setParadasCompletas(paradasComple);
            }            

            let lineaDeLaR=[];

            try{
                lineaDeLaR=await fetch('https://www.georutas.lat/api/Coordenadas/'+usuario.id_Ruta+'?email='+email+'&token='+token).then(res=>datos=res.json());
            }catch{
                lineaDeLaR=[];
            }

            if(lineaDeLaR.length>0){
                setCoordenadasDeLaRuta(lineaDeLaR);                
            }            
            // setRutasParadasValue(JSON.stringify(paradasRutas));        
        }
    }

    const centrePosition=async()=>{
        //AQUI VA LA LLAMADA A LA UBICACION DE DONDE SE ENCUENTRA EL USUARIO

        const {latitude,longitude}=await getCurrentLocation();        
            
        refMapView.current?.animateCamera({
            center:{latitude,longitude}
        })

        refFollowing.current=true;
        console.log("A la gran puta");

    }

    const ocultarUsuarioTransportistaEnElBackend=async(email,token)=>{
        console.log("NO ENTRO");
        
        if(usuarioTransportista.id_Ruta>0){

            console.log("El email es: "+email);
            console.log("El token es: "+token);
            try{
                let datos=await fetch('https://www.georutas.lat/api/NUsuariosTransporte?Email='+email+'&Token='+token,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        },
                        body:JSON.stringify(
                            {
                                id_UsuarioTransporte: idUsuarioIniciado,
                                id_Tipo_Transporte: 1,
                                id_Ruta: usuarioTransportista.id_Ruta,
                                longitude: usuarioTransportista.longitude,
                                latitude: usuarioTransportista.latitude,
                                longitudeAnterior: usuarioTransportista.longitudeAnterior,
                                latitudeAnterior: usuarioTransportista.latitudeAnterior,
                                estado: 'I',
                                direccion: 'I'
                            })
                    });

                    let json=null;

                    if(datos.ok){
                        try{
                            json=await datos.json();
                        }catch{
                            json=null;
                        }

                        if(json==null){
                            setMensajeAlerta("Revisa tu conexión a internet");
                            setMostrarAlerte(true);
                        }else if(json.id_UsuarioTransporte==0){
                            setMensajeAlerta("Revisa tu conexión a internet");
                            setMostrarAlerte(true);
                        }
                        //else if(json.id_UsuarioTransporte==-1){
                        //     alert("Hubo un problema con tu usuario");
                        // }else if(json.id_UsuarioTransporte==-2){
                        //     refrescarToken(email,token);
                        //     alert("No se logró actualizar tu estado");
                        // }else if(json.id_UsuarioTransporte==-3){
                        //     alert("Hubo un problema con tu usuario");
                        // }
                        
                    }else{
                        setMensajeAlerta("Revisa tu conexión a internet");
                        setMostrarAlerte(true);
                    }

                    console.log("La respuesta a la actualizacion ess: ");
                    console.log(json);


            }catch{
                setMensajeAlerta("Revisa tu conexión a internet");
                setMostrarAlerte(true);
                console.log("La respuesta a la actualizacion es: ");
                console.log(datos);
            }
            

        }
        console.log("NO ENTRO");
    }


    useEffect(()=>{
        if(tipoDeUsuario=='Transportista' ){
            
        }else if(tipoDeUsuario=='Pasajero' && refEnvioDeUbicacionesPasajero.current==false){            
            refEnvioDeUbicacionesPasajero.current=true;
            setrefChangeLocation(userLocation);
        }
        //console.log("Estas en el UseEffet numero 1");
    },[userLocation,tipoDeUsuario,coordenadasDeLaRuta])

    useEffect(()=>{
        if(idUsuarioIniciado>0){
            let Fecha= new Date();
            console.log("No se que pedo "+Fecha.getSeconds());
            capturarUsuarioTransportistaYDemas(emailState,tokenState);
            checkLocationPermission();
            //askLocationPermission();
            askLocationBacgroundPermission();
        }
        //console.log("Estas en el UseEffet numero 2");

    },[idUsuarioIniciado,idRutaAMostrar])

    useEffect(()=>{
        if(tipoDeUsuario=='Transportista'){
            getPermitirEnvio(setPermitirEnviarUbicacion);
        }
        //console.log("Estas en el UseEffet numero 3");
    },[tipoDeUsuario])

    useEffect(()=>{
        if(permitirEnviarUbicacion==="false"){
            setPermitirEnviarUbicacion(false);
        }else if(permitirEnviarUbicacion==="true"){
            setPermitirEnviarUbicacion(true);
        }

        if(permitirEnviarUbicacion==false){
            setActualizarUsuarioTransportista(false);
        }else if(permitirEnviarUbicacion==true){
            setActualizarUsuarioTransportista(true);
        }
        //console.log("Estas en el UseEffet numero 4");
    },[permitirEnviarUbicacion])

    useEffect(()=>{
        
        if(idUsuarioIniciado>0 && tipoDeUsuario=='Transportista'){
            

        }else if(tipoDeUsuario=='Pasajero'){
            // k=setInterval(()=>{
            //     refEnvioDeUbicacionesPasajero.current=false; 
            //     let Fecha= new Date();
            //     console.log(Fecha.getSeconds());
            // },4000)
        }
        //console.log("Estas en el UseEffet numero 5");
        return ()=>{
            //clearInterval(k);
        }        

    },[usuarioTransportista,tipoDeUsuario,idUsuarioIniciado])



    useEffect(()=>{
        //console.log("Estas en el UseEffet numero 6");
        let k=setInterval(()=>{

            if(tipoDeUsuario=='Transportista' && permitirEnviarUbicacion==true && estadoAplicacion==true){
                // //Este espacio, esta totalmente vacio
                // console.log("Pedo");

                //actualizarUbicacionEnElBackEnd(paradasCompletas,rutasParadas,coordenadasDeLaRuta,emailState, tokenState);
                actualizarUbicacionEnElBackEnd(emailState, tokenState,(!activarPrecision)?"1":"2");
                
                // //console.log(userLocation);
                //let fecha= new Date();
                //console.log("Segundos");
                //console.log(fecha.getSeconds());
            
                // console.log("Fin del Pedo");

                let fecha=new Date();
                if(usuarioTransportista.id_Ruta!=null && usuarioTransportista.id_Ruta!=undefined && ((fecha.getMinutes()) + usuarioTransportista.id_Ruta)%30==0 && idUsuarioIniciado%33<15){
                    actualizarTiemposDeLasParadas(usuarioTransportista.id_Ruta,emailState,tokenState);
                }

            }else if(actualizarUsuarioTransportista==true && tipoDeUsuario=='Transportista' && permitirEnviarUbicacion==false && usuarioTransportista.estado!=undefined
                && usuarioTransportista!={}){
                ocultarUsuarioTransportistaEnElBackend(emailState,tokenState);
            }

        },4000)
        
        return ()=>{
            clearInterval(k);
            console.log("Eliminando y actualizando");
        }

    },[tipoDeUsuario,coordenadasDeLaRuta,permitirEnviarUbicacion,estadoAplicacion,activarPrecision,emailState,actualizarUsuarioTransportista])




    useEffect(()=>{

        //console.log("Estas en el UseEffet numero 7");
          
        if(refFollowing.current==false){
            return;
        }

        const {latitude,longitude}=userLocation;      
        
        
        if(userLocation.latitude!=0){
            refMapView.current?.animateCamera({
                center:{latitude,longitude}
            })
        }

    },[userLocation])

    useEffect(()=>{
        //console.log("Estas en el UseEffet numero 8");
        if(secionIniciada==false){
                setTipoDeUsuario("Ninguno");
                serMostrarVentana('none');     
                refFollowing.current=false;
                stopFollowUserLocation();
                setVerCompetencia(false);
                setVerRutasCercanas(false);
                setVerTrayectoria(false);                         
                setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);
                
                let colorRes='#102769';
                if(modoOscuro){
                    colorRes='#151553';
                }

                if (menUno[0].display == 'flex' ) {                    
                    setmenUno([{ display: 'none',color:colorRes}]);
                } else if(menDos[0].display == 'flex'){
                    setmenDos([{display:'none',color:colorRes}]);
                }else if(menTres[0].display == 'flex'){
                    setmenTres([{display:'none',color:colorRes}]);
                }else if(menCinco[0].display=='flex'){
                    setmenCinco([{display:'none',color:colorRes}])                    
                }
                setmenCuatro([{ display: 'flex',color:'#101043' }]);
        }
        
        if((secionIniciada==true || tipoDeUsuario=='Pasajero') && pedirUbicacion==true){
            askLocationPermission();
            console.log("Se le pregunto la ubicacion al usario");
        }else if((secionIniciada==true && tipoDeUsuario=='Transportista') && pedirUbicacion==true){
            //askLocationBacgroundPermission();            
            askLocationPermission();
        }
    },[secionIniciada,tipoDeUsuario,pedirUbicacion])






    
    let urlDeLosIconos=urlDeLasImagenesEstaticas();
    let urlDeLasBajadas=urlDeLasImagenesParadaBajar();
    let urlDeLasSubidas=urlDeLasImagenesParadaSubir();

    const [permitirSeguirPasajero, setPermitirSeguirPasajero]=useState(false);

    useEffect(()=>{
        //console.log("Estas en el UseEffet numero 9");
        if(actualizarDestino.latitude==0){
            return;
        }
        setCoordenadasDestino(actualizarDestino);
        refCambiarLupa.current=true;
    },[actualizarDestino])

    useEffect(()=>{
        //console.log("Estas en el UseEffet numero 10");
        if(actualizarOrigen.latitude==0){
            return;
        }
        setCoordenadasOrigen(actualizarOrigen);
        refCambiarLupa.current=true;
    },[actualizarOrigen])



    // useEffect(()=>{

    //     let t=0;
       
    //         t=setInterval(
    //             ()=>{
    //                 let fecha=new Date();
    //                 actualizarIconosTransportes(identificadorKey.current,actualizarTrayecto);
    //             //     console.log("Puto"+fecha.getSeconds());
    //             //     console.log(identificadorKey.current);
    //             // console.log("Trabajando con esta parte");
    //             },2500)
        

    //     return()=>{
    //         clearInterval(t);
    //         console.log("Se activa con: "+ocultarTrayecto);
    //     }
    // },[identificadorKey,actualizarTrayecto])

    //

    useEffect(() => {
        //console.log("Estas en el UseEffet numero 11");
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            
            if(refInputAutoComplete.current.isFocused()==true){
                setMostrarBarraSecundariaDeUbicacion(true);
                refInputAutoComplete.current.clear();
                let colorRes='#102769';
                if(modoOscuro){
                    colorRes='#151553';
                }

                if (menUno[0].display == 'flex' ) {
                    setmenUno([{display:'none',color:colorRes}]);
                } else if(menDos[0].display == 'flex'){
                    setmenDos([{display:'none',color:colorRes}]);
                }else if(menTres[0].display == 'flex'){
                    setmenTres([{display:'none',color:colorRes}]);
                }else if(menCuatro[0].display=='flex'){
                    setmenCuatro([{display:'none',color:colorRes}])
                }else if(menCinco[0].display=='flex'){
                    setmenCinco([{display:'none',color:colorRes}])                    
                }
                setmenCuatro([{display:'flex',color:'#101043'}])
                //setmenUno([{ display: 'flex',color:'#101043' }]);
                setMostrarItemMenuUno(true);
                setIdRutaAMostrar(-1);
                setOcultarMenu(true);       
                setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);
                setMostrarCompañerosCercanos(false);
                setIniciarRecorridoDeLaTrayectoria(false);
                setMostrarUsuarios(false);
                setVerCompetencia(false);  
                setVerRutasCercanas(false);
            }
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            //Esto es cuando el teclado desaparece            
            // if (menUno[0].display == 'flex' ) {
            //     setmenUno([{display:'none',color:colorRes}]);
            // } else if(menDos[0].display == 'flex'){
            //     setmenDos([{display:'none',color:colorRes}]);
            // }else if(menTres[0].display == 'flex'){
            //     setmenTres([{display:'none',color:colorRes}]);
            // }else if(menCinco[0].display=='flex'){
            //     setmenCinco([{display:'none',color:colorRes}])                    
            // }            
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, [tipoDeModificacionDeLugar]);



      const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

      const veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise( async (resolve) => {
            console.log("La mierda se mando a llamar");

            for (let i = 0; BackgroundService.isRunning(); i++) {
                

                //let rutasParadasSegundoPlano=getRutasParadasValue();
                let permisosSegundoPlano=await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);

                if(permisosSegundoPlano!='granted' || permisosSegundoPlano==undefined){
                    let detener=await BackgroundService.stop();
                    console.log("Los permisos no estan activos: "+permisosSegundoPlano);
                }else{                    
                    
                    if(tipoDeUsuario=='Transportista' && permitirEnviarUbicacion==true){
                        //actualizarUbicacionEnElBackEnd(paradasCompletas,rutasParadas,coordenadasDeLaRuta,emailState, tokenState);
                        actualizarUbicacionEnElBackEnd(emailState, tokenState,(!activarPrecision)?"1":"2");
                        console.log("Mira en el fondo pasa esto"+usuarioTransportista.id_Ruta);
                        let fecha=new Date();
                        if(usuarioTransportista.id_Ruta!=null && usuarioTransportista.id_Ruta!=undefined && ((fecha.getMinutes()) + usuarioTransportista.id_Ruta)%30==0 && idUsuarioIniciado%33<15){
                            actualizarTiemposDeLasParadas(usuarioTransportista.id_Ruta,emailState,tokenState);
                        }
                    }else{
                        console.log("Se cancelo la tarea en segundo plano");
                        let detener=await BackgroundService.stop();
                    }        
                }
                await sleep(delay);
            }
        });
    };
    
    const options = {
        taskName: 'GeolocalizacionBackGround',
        taskTitle: 'Envio de Ubicacion',
        taskDesc: 'En progreso...',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
        parameters: {
            delay: 5000,
        },
    };
    
    const activarTarea=async()=>{
        await BackgroundService.start(veryIntensiveTask, options);
    }

    const actualizarTarea=async()=>{
        await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'});
    }

    const desactivarTarea=async()=>{
        await BackgroundService.stop();
    }


    useEffect(()=>{
        //console.log("Estas en el UseEffet numero 12");
    
        const permisosState=AppState.addEventListener('change',async(state)=>{
    
            if(state!=='active' && secionIniciada==true){
                if(tipoDeUsuario=='Transportista'){                    
                    activarTarea();                    
                }
                setEstadoAplicacion(false);
                console.log("La tarea se activo");
                return;
            } 
            
            if(state=='active' && secionIniciada==true){  
                setEstadoAplicacion(true);                
                console.log("La tarea se desactivo");
                if(tipoDeUsuario=='Transportista'){
                    verificarMenbresia(emailState,tokenState,tipoDeUsuario);
                    desactivarTarea();
                }else if(tipoDeUsuario=='Pasajero'){
                    verificarMenbresia(emailState,tokenState,tipoDeUsuario);
                    obtenerTiempoDesdeElUltimoAnucio();
                }
            }

        })


        return ()=>{
            permisosState.remove();
        }
    },[permitirEnviarUbicacion,secionIniciada,emailState,tokenState,tipoDeUsuario,tipoDeSubscripcion])


    useEffect(()=>{
        if(pedirUbicacionSegundoPlano==3){
            askLocationBacgroundPermission();
            setPedirUbicacionSegundoPlano(1);
        }
    },[pedirUbicacionSegundoPlano])

    const handleBackButton = () => {
        refInputAutoComplete.current.blur();
        setMostrarBarraSecundariaDeUbicacion(false);        
        setFechaDeClicSalida(90);
        //actualizar('none');
        // Aquí puedes agregar la lógica que deseas ejecutar al presionar el botón de retroceso
        // Por ejemplo, puedes cerrar un modal o salir de la aplicación
        return true; // Si deseas evitar el comportamiento predeterminado del botón de retroceso (que es salir de la aplicación), devuelve "true"
    };

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    },[])

  return(
    <View style={{height:(height>width)?(height-width*0.2-StatusBar.currentHeight):(height-2*StatusBar.currentHeight)*0.8,
    width:'100%', backgroundColor:'#2060A5'}}>
        
        {cargando==true && <Cargando height={height}></Cargando>}        
        
        <IconosDeNavegacion
        setPermitirEnviarUbicacion={setPermitirEnviarUbicacion} idUsuarioIniciado={idUsuarioIniciado} setMostrarUsuarios={setMostrarUsuarios}
        setVerTransportistasPorLaDerecha={setVerTransportistasPorLaDerecha} setVerTransportistasPorLaIzquierda={setVerTransportistasPorLaIzquierda}
        serMostrarParadas={serMostrarParadas} obtenerRutas={obtenerRutas} mostrarParadas={mostrarParadas}
        identificadorKey={identificadorKey} setVerCompetencia={setVerCompetencia} setOcultarTrayecto={setOcultarTrayecto}setVerRutasCercanas={setVerRutasCercanas}
        verTransportistasPorLaDerecha={verTransportistasPorLaDerecha} idRutaAMostrar={idRutaAMostrar} mostrarUsuarios={mostrarUsuarios}
        permitirEnviarUbicacion={permitirEnviarUbicacion} tipoDeUsuario={tipoDeUsuario} mostrarItemMenuUno={mostrarItemMenuUno} verTrayectoria={verTrayectoria}
        verCompetencia={verCompetencia} verRutasCercanas={verRutasCercanas} verTransportistasPorLaIzquierda={verTransportistasPorLaIzquierda}
        centrePosition={centrePosition} siguiendoAlUsuario={siguiendoAlUsuario} askLocationPermission={askLocationPermission} followUseLocation={followUseLocation}
        stopFollowUserLocation={stopFollowUserLocation} permitirSeguirPasajero={permitirSeguirPasajero} setPermitirSeguirPasajero={setPermitirSeguirPasajero}
        setVerTrayectoria={setVerTrayectoria} ocultarTrayecto={ocultarTrayecto} permisos={permisos}
        askLocationPermissionSetting={askLocationPermissionSetting} setUsuarioTransportista={setUsuarioTransportista} setCargando={setCargando}
        emailState={emailState} tokenState={tokenState} setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} 
        setMostrarComprasPasajeros={setMostrarComprasPasajeros} tipoDeSubscripcion={tipoDeSubscripcion} mostrarCompañerosCercanos={mostrarCompañerosCercanos} setMostrarCompañerosCercanos={setMostrarCompañerosCercanos}
        menCuatro={menCuatro} verParadasCercanas={verParadasCercanas} setIdRutaAMostrar={setIdRutaAMostrar} setMostrarMenusBuenEstado={setMostrarMenusBuenEstado} setMostrarItemMenuUno={setMostrarItemMenuUno}
        setVerParadasCercanas={setVerParadasCercanas} setMostrarBarraSecundariaDeUbicacion={setMostrarBarraSecundariaDeUbicacion} coordenadasOrigenSecundario={coordenadasOrigenSecundario} 
        iniciarRecorridoDeLaTrayectoria={iniciarRecorridoDeLaTrayectoria} setIniciarRecorridoDeLaTrayectoria={setIniciarRecorridoDeLaTrayectoria}
        setDetenerInterval={setDetenerInterval} setTiempoDeEspera={setTiempoDeEspera}
        ></IconosDeNavegacion>




        <View style={[{width:'90%',zIndex:100,top:height*0.08-StatusBar.currentHeight,position:'absolute', 
        backgroundColor:(!modoOscuro)?'#2060A5':'#151567',flexDirection:'row',marginLeft:'5%',borderTopRightRadius:20, 
        borderTopLeftRadius:20},mostrarBarraSecundariaDeUbicacion==false && {borderBottomRightRadius:20,borderBottomLeftRadius:20}
        ]}>
        {((
            //Aqui ya no mostramos la ubicacion presisa si no se esta compartiendo
            //activarPrecision==false || 
            bacgroundPermisos!='granted') && tipoDeUsuario=='Transportista') && 
        <TouchableOpacity style={[{position:'absolute', zIndex:101, top:-28,alignItems:'center',borderColor:'red',borderWidth:1,borderRadius:10,width:'105%',left:'-2.5%'}
        ,(bacgroundPermisos!='granted' && activarPrecision==true) &&{top:width*0.4},{backgroundColor:'#00000030'}]}
            onPress={()=>{
                if(activarPrecision==false){
                    serMostrarVentana('flex');
                }else if(bacgroundPermisos!='granted'){                    
                    serMostrarVentana('flex');
                    setMensajeAlerta("\"Permite\" que la aplicacion tenga acceso \"Siempre\" a la \"Localizacion\" con el boton verde que se muestra a continuacion");
                    setMostrarAlerte(true);                    
                }

            }}
            >
            <Text style={{color:'red',fontSize:18,fontWeight:'600'}} >
                {(activarPrecision==false)?"La Precision de la ubicacion esta desactivada!!":(bacgroundPermisos!="granted")?"Permite el envio de la ubicacion":""}
            </Text>
            {(bacgroundPermisos!='granted' && activarPrecision==true) && <Text style={{color:'red',fontSize:18,fontWeight:'600'}} >
            en segundo plano!!
            </Text>}
        </TouchableOpacity>
        }
            <TouchableOpacity 
                onPress={()=>{

                    if(mostrarBarraSecundariaDeUbicacion==false && secionIniciada==true){
                        setMostrarBarraSecundariaDeUbicacion(true);
                        if(tipoDeModificacionDeLugar=='Destino'){
                            refMapView.current?.animateCamera({
                                center:{...coordenadasDestino}
                            })  
                        }else{
                            refMapView.current?.animateCamera({
                                center:{...coordenadasOrigen}
                            })                            
                        }


                        if (menUno[0].display == 'none') {        
                            let colorRes='#102769';
                            if(modoOscuro){
                                colorRes='#151553';
                            }

                            if (menUno[0].display == 'flex' ) {
                                setmenUno([{display:'none',color:colorRes}]);
                            } else if(menDos[0].display == 'flex'){
                                setmenDos([{display:'none',color:colorRes}]);
                            }else if(menTres[0].display == 'flex'){
                                setmenTres([{display:'none',color:colorRes}]);
                            }else if(menCuatro[0].display=='flex'){
                                setmenCuatro([{display:'none',color:colorRes}])
                            }else if(menCinco[0].display=='flex'){
                                setmenCinco([{display:'none',color:colorRes}])                    
                            }                            
                            setMostrarItemMenuUno(true);
                            setIdRutaAMostrar(-1);
                            setMostrarUsuarios(false);
                            setVerTransportistasPorLaDerecha(false);
                            setVerTransportistasPorLaIzquierda(false);
                        } else {
                            let colorRes='#102769';
                            if(modoOscuro){
                                colorRes='#151553';
                            }

                            setmenUno([{ display: 'none',color:colorRes}]);
                            setmenCuatro([{ display: 'flex',color:'#101043'}]);                           
                            //setMostrarItemMenuUno(false);
                        }
                            
                        
                        //RutasTrayectorias(setRutasEnElMapa);    
                        setOcultarMenu(true);       
                        setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);
                        
                    }else if(secionIniciada==true){                        
                        if(tipoDeModificacionDeLugar=='Destino'){
                            refMapView.current?.animateCamera({
                                center:{...coordenadasOrigen}
                            })
                            setTipoDeModificacionDeLugar('Origen');
                            refInputAutoComplete.current.blur();
                            if(refNombreDelOrigen.current=='Desconocido'){
                                refInputAutoComplete.current.setAddressText('');
                            }else{
                                refInputAutoComplete.current.setAddressText(refNombreDelOrigen.current);
                            }
                        }else{
                            refMapView.current?.animateCamera({
                                center:{...coordenadasDestino}
                            })
                            setTipoDeModificacionDeLugar('Destino');
                            refInputAutoComplete.current.blur();
                            if(refNombreDelDestino.current=='Desconocido'){
                                refInputAutoComplete.current.setAddressText('');
                            }else{
                                refInputAutoComplete.current.setAddressText(refNombreDelDestino.current);
                            }
                        }
                    }

                }}
            >
                <View style={[{marginLeft:7,marginTop:7,marginBottom:7,backgroundColor:'#f1f1f1',borderRadius:20,marginRight:7,width:37, height:37,alignContent:'center',alignItems:'center'}]}>
                    <Image 
                    //require('../assets/Citycons_bus_icon-icons.com_67914.png')
                        source={(tipoDeModificacionDeLugar=='Destino')?require("../assets/paradaFinal.png"):require("../assets/UsuarioPersona.png")}
                        style={[tipoDeModificacionDeLugar=='Destino'?{width:33, height:33,marginTop:2}:{width:37, height:37}]}>
                    </Image>
                </View>
            </TouchableOpacity>

            <View style={{flex:1, flexDirection:'row',alignContent:'center',alignItems:'center'}}>

           

            {/* <TextInput placeholder="¿Adónde quieres ir?"style={{flex:1,marginLeft:4}}>
            </TextInput> */}

            <GooglePlacesAutocomplete
                ref={refInputAutoComplete}
                
                placeholder={(tipoDeModificacionDeLugar=='Destino')?"¿Adónde quieres ir?":"¿Cual es tu punto de partida?"}
                minLength={2}
                styles={{

                    textInputContainer:{
                        //Este es el color de subrayado sin detalles del buscador
                        backgroundColor:(!modoOscuro)?'#2060A5':'#151567',
                        marginTop:8,
                        marginBottom:3,
                        color:'black'
                    },
                    textInput: {                    
                        backgroundColor: (!modoOscuro)?'#dcdcdc':'#a1b2d5',
                        height: 35,
                        borderRadius: 14,
                        paddingVertical: 0,
                        paddingHorizontal: 10,
                        fontSize: 15,
                        flex: 1,
                        textAlign:'left',
                        color:'black'
                      },
                      poweredContainer: {
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderBottomRightRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderColor: '#c8c7cc',
                        borderTopWidth: 0.5,                        
                        alignContent:'flex-start',
                        color:'black'
                      },
                    powered: {},
                    listView: {},
                    row: {
                        backgroundColor: '4682B4',
                        padding: 0,
                        alignContent:'center',
                        alignItems:'center',
                        height: 40,
                        flexDirection: 'row',
                        color:'black'
                    },
                    separator: {
                        height: 0.5,
                        backgroundColor: '#c8c7cc'
                    },
                    description: {},
                    loader: {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        height: 20,
                        color:'black'
                    }
                    
                }}
                enablePoweredByContainer={false}
                           
                onPress={(data, details)=>{

                    if(details!=null && secionIniciada==true){
                        

                        let latitude=details.geometry.location.lat;
                        let longitude=details.geometry.location.lng;

                        refMapView.current?.animateCamera({
                            center:{ latitude,longitude}//{latitude:,latitude:}
                        })
                        if(tipoDeModificacionDeLugar=='Destino'){
                            setActualizarDestino({latitude:latitude,longitude:longitude});
                            if(data.structured_formatting.main_text.length>30){
                                refNombreDelDestino.current=(data.structured_formatting.main_text.substring(0,24));
                                refInputAutoComplete.current.setAddressText(data.structured_formatting.main_text.substring(0,24));
                            }else{
                                refNombreDelDestino.current=(data.structured_formatting.main_text);
                                refInputAutoComplete.current.setAddressText(data.structured_formatting.main_text);
                            }
                                
                        }else{
                            setActualizarOrigen({latitude:latitude,longitude:longitude});
                            if(data.structured_formatting.main_text.length>30){
                                refNombreDelOrigen.current=(data.structured_formatting.main_text.substring(0,24));
                                refInputAutoComplete.current.setAddressText(data.structured_formatting.main_text.substring(0,24));
                            }else{
                                refNombreDelOrigen.current=(data.structured_formatting.main_text);
                                refInputAutoComplete.current.setAddressText(data.structured_formatting.main_text);
                            }
                                
                        }

                        let colorRes='#102769';
                        if(modoOscuro){
                            colorRes='#151553';
                        }

                        if (menUno[0].display == 'flex' ) {
                            setmenUno([{display:'none',color:colorRes}]);
                        } else if(menDos[0].display == 'flex'){
                            setmenDos([{display:'none',color:colorRes}]);
                        }else if(menTres[0].display == 'flex'){
                            setmenTres([{display:'none',color:colorRes}]);
                        }else if(menCuatro[0].display=='flex'){
                            setmenCuatro([{display:'none',color:colorRes}])
                        }else if(menCinco[0].display=='flex'){
                            setmenCinco([{display:'none',color:colorRes}])
                        }

                        setOcultarTrayecto(false);
                        setIdRutaAMostrar(-1);
                        setmenCuatro([{ display: 'flex',color:'#101043' }]);
                        //setMostrarItemMenuUno(false);  
                    }
                }}

                query={{
                    key:'AIzaSyCNl411y84GibkNJrHX4cKJeRbldOe5hsc',
                    language:'es',
                    components:'country:ni'
                }}
                fetchDetails={true}
            />
        </View>

            <View onTouchEnd={()=>{
                if(mostrarBarraSecundariaDeUbicacion==false){
                    serMostrarVentana('flex'); 
                    let colorRes='#102769';
                    if(modoOscuro){
                        colorRes='#151553';
                    }

                    if (menUno[0].display == 'flex' ) {
                        setmenUno([{display:'none',color:colorRes}]);
                    } else if(menDos[0].display == 'flex'){
                        setmenDos([{display:'none',color:colorRes}]);
                    }else if(menTres[0].display == 'flex'){
                        setmenTres([{display:'none',color:colorRes}]);
                    }else if(menCuatro[0].display=='flex'){
                        setmenCuatro([{display:'none',color:colorRes}])
                    }else if(menCinco[0].display=='flex'){
                        setmenCinco([{display:'none',color:colorRes}])                    
                    }
                    //setmenUno([{ display: 'flex',color:'#101043' }]);
                    //setMostrarItemMenuUno(true);
                    //setIdRutaAMostrar(-1);
                    //setOcultarMenu(true);       
                    //setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);
                                    
                }else{
                    setMostrarBarraSecundariaDeUbicacion(false);
                    refInputAutoComplete.current.blur();
                    refInputAutoComplete.current.clear(); 

                    let colorRes='#102769';
                    if(modoOscuro){
                        colorRes='#151553';
                    }

                    if (menUno[0].display == 'flex' ) {
                        setmenUno([{display:'none',color:colorRes}]);
                    } else if(menDos[0].display == 'flex'){
                        setmenDos([{display:'none',color:colorRes}]);
                    }else if(menTres[0].display == 'flex'){
                        setmenTres([{display:'none',color:colorRes}]);
                    }else if(menCuatro[0].display=='flex'){
                        setmenCuatro([{display:'none',color:colorRes}])
                    }else if(menCinco[0].display=='flex'){
                        setmenCinco([{display:'none',color:colorRes}])                    
                    }
                }                
                }}>
                
                <Image 
                    //source={require('../assets/Sukuna.jpg')} 
                    source={(mostrarBarraSecundariaDeUbicacion==true)?require('../assets/x_icon_imagen.png'):((!modoOscuro)?require('../assets/ajustes.png'):require('../assets/ajustesv2.png'))}
                    style={[{width:39, height:39,marginLeft:6,marginRight:6, borderRadius:20,marginTop:6,marginBottom:6,
                    },(mostrarBarraSecundariaDeUbicacion==true) && {tintColor:'#f1f1f1',marginRight:10,marginLeft:4}]}>
                </Image>
            </View>            
    </View>
    
    {mostrarBarraSecundariaDeUbicacion==true && <View style={{width:(mostrarBarraSecundariaDeUbicacion==true)?'90%':12,zIndex:90,top:height*0.08+47-StatusBar.currentHeight
    ,position:'absolute', backgroundColor:(!modoOscuro)?'#2060A5':'#151567',flexDirection:'row',marginLeft:'5%',
        borderBottomLeftRadius:20,borderBottomRightRadius:20,alignItems:'flex-start',paddingBottom:0,paddingTop:5}}>
            
            <TouchableOpacity 
                onPress={()=>{
                    if(tipoDeModificacionDeLugar=='Destino' && secionIniciada==true){
                        refMapView.current?.animateCamera({
                            center:{...coordenadasOrigen}
                        })
                        setTipoDeModificacionDeLugar('Origen');
                        refInputAutoComplete.current.blur();
                        if(refNombreDelOrigen.current=='Desconocido'){
                            refInputAutoComplete.current.setAddressText('');
                        }else{
                            refInputAutoComplete.current.setAddressText(refNombreDelOrigen.current);
                        }
                    }else if(secionIniciada==true){
                        refMapView.current?.animateCamera({
                            center:{...coordenadasDestino}
                        })
                        setTipoDeModificacionDeLugar('Destino');
                        refInputAutoComplete.current.blur();
                        if(refNombreDelDestino.current=='Desconocido'){
                            refInputAutoComplete.current.setAddressText('');
                        }else{
                            refInputAutoComplete.current.setAddressText(refNombreDelDestino.current);
                        }
                    }                  
                }}
            >
                <View style={[{marginBottom:7.5,marginLeft:6,backgroundColor:'#f1f1f1',borderRadius:20,marginRight:6
                    ,marginTop:0.5,width:37,height:37,alignContent:'center',alignItems:'center'}]}>
                    <Image 
                    //require('../assets/Citycons_bus_icon-icons.com_67914.png')
                        source={(tipoDeModificacionDeLugar!='Destino')?require("../assets/paradaFinal.png"):require("../assets/UsuarioPersona.png")}
                        style={[tipoDeModificacionDeLugar!='Destino'?{width:33, height:33,marginTop:2}:{width:36, height:36}]}>
                    </Image>
                </View>
            </TouchableOpacity>
        
            {<View
                style={{                      
                    width:'100%',
                    borderRadius: 10,
                    fontSize: 15,
                    flex: 1,
                    textAlignVertical:'center',                    
                    color:'white',
                    fontWeight:'500',                  
                    textAlign:'left',
                    paddingBottom:0,
                    paddingTop:0,
                    marginBottom:4,
                    marginLeft:3
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        backgroundColor: '#4682B4',
                        height: 35,
                        width:'100%',
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        fontSize: 15,
                        flex: 1,
                        textAlignVertical:'center',                        
                        color:'white',
                        fontWeight:'500',                  
                        textAlign:'left',
                        paddingBottom:0,
                        paddingTop:0,
                        marginBottom:4
                    }}
                    editable={false}
                    onPressOut={()=>{
                        if(secionIniciada==true){                            
                        setVerRecomendacionesDeUbicacion(!verRecomendacionesDeUbicaciones);
                        }
                    }}
                        >
                    <Text
                        style={{fontWeight:'700',fontSize:16,color:'#3e4144',margin:0}}
                    >
                        {(tipoDeModificacionDeLugar=='Destino')?"Origen: ":"Destino: "}
                    </Text>

                    <Text
                        style={{fontSize:15,color:'#f1f1f1',margin:0,flex:1,height:22}}
                    >
                        {(tipoDeModificacionDeLugar=='Destino')?refNombreDelOrigen.current:refNombreDelDestino.current}
                    </Text>
                     
                </TouchableOpacity>
                {verRecomendacionesDeUbicaciones==true && <View>
                    <TouchableOpacity
                        style={{                        
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            //borderBottomRightRadius: 12,
                            //borderBottomLeftRadius: 12,
                            borderRadius:12,
                            borderColor: '#c8c7cc',
                            borderBottomWidth: 0.5,
                            borderTopWidth:0.5,                            
                            alignContent:'flex-start',                            
                            backgroundColor:'#f1f1f1',
                            height:40,
                            paddingLeft:15,
                            marginBottom:0,
                        }}  
                        onPress={()=>{
                            if(secionIniciada==true){
                                setVerRecomendacionesDeUbicacion(false);

                                if(tipoDeModificacionDeLugar=='Destino'){
                                    refMapView.current?.animateCamera({
                                        center:{...coordenadasOrigen}
                                    })
                                    setTipoDeModificacionDeLugar('Origen');
                                    refInputAutoComplete.current.blur();
                                    //refInputAutoComplete.current.setAddressText(refNombreDelOrigen.current);                        
                                    refInputAutoComplete.current.focus();
                                }else{
                                    refMapView.current?.animateCamera({
                                        center:{...coordenadasDestino}
                                    })
                                    setTipoDeModificacionDeLugar('Destino');
                                    refInputAutoComplete.current.blur();
                                    refInputAutoComplete.current.focus();
                                    //refInputAutoComplete.current.setAddressText(refNombreDelDestino.current);
                                }
                            }
                            
                        }}                      
                    >
                        <Text style={{color:'gray',fontSize:15}}>Buscar</Text>
                    </TouchableOpacity>

                    {tipoDeModificacionDeLugar=='Destino' && refNombreDelOrigen.current!='Desconocido' &&
                    refNombreDelOrigen.current!='Tu ubicación' && <TouchableOpacity
                    style={{                        
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderBottomRightRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderColor: '#c8c7cc',
                        borderBottomWidth: 0.5,
                        color:'black',
                        alignContent:'center',
                        color:'black',
                        paddingLeft:15,
                        marginBottom:0,
                        height:40
                        }}

                        onPress={()=>{
                            if(secionIniciada==true){
                                setVerRecomendacionesDeUbicacion(false);
                                refMapView.current?.animateCamera({
                                    center:{...coordenadasOrigen}
                                })
                            }                            
                            //setTipoDeModificacionDeLugar('Origen');
                            //refInputAutoComplete.current.blur();
                            //refInputAutoComplete.current.setAddressText(refNombreDelOrigen.current);                        
                            //refInputAutoComplete.current.focus();
                        }}

                        >
                        <Text style={{color:'black',fontSize:15}}>{refNombreDelOrigen.current}</Text>
                    </TouchableOpacity>}

                    {tipoDeModificacionDeLugar!='Destino' && refNombreDelDestino.current!='Desconocido'
                    && <TouchableOpacity
                    style={{                        
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderBottomRightRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderColor: '#c8c7cc',
                        borderBottomWidth: 0.5,
                        color:'black',
                        alignContent:'center',
                        color:'black',
                        paddingLeft:15,
                        marginBottom:0,
                        height:40}}
                        
                        onPress={()=>{
                            if(secionIniciada==true){
                                setVerRecomendacionesDeUbicacion(false);
                                refMapView.current?.animateCamera({
                                    center:{...coordenadasDestino}
                                })
                            }
                        }}
                        >
                        <Text style={{color:'black',fontSize:15}}>{refNombreDelDestino.current}</Text>
                    </TouchableOpacity>}

                    {tipoDeModificacionDeLugar=='Destino'  && <TouchableOpacity
                    style={{                        
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderBottomRightRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderRadius:12,
                        marginTop:3,
                        borderColor: '#c8c7cc',
                        borderWidth: 1,
                        borderColor: 'white',
                        color:'black',
                        alignContent:'center',
                        color:'black',
                        paddingLeft:15,
                        marginBottom:0,
                        height:40
                    }}

                        onPress={()=>{
                            if(secionIniciada==true){
                                if(permisos!='granted'){
                                    askLocationPermission();
                                    askLocationPermissionSetting();
                                    return;
                                }
                                refNombreDelOrigen.current='Tu ubicación';
                                setVerRecomendacionesDeUbicacion(false);
                                const {latitude,longitude}=getCurrentLocation();
                                
                                setCoordenadasOrigen(userLocation);
    
                                refMapView.current?.animateCamera({
                                    center:{...userLocation}
                                })
                            }
                        }}
                    >
                        <Text style={{color:(!modoOscuro)?'black':'#f1f1f1',fontSize:15}}>Tu ubicación</Text>
                    </TouchableOpacity>}
                </View>}

            </View>}

        {mostrarBarraSecundariaDeUbicacion==true && <TouchableOpacity
            onPress={()=>{

                if(menUno[0].display=='none' && secionIniciada==true){
                    let colorRes='#102769';
                    if(modoOscuro){
                        colorRes='#151553';
                    }

                    setmenUno([{ display: 'flex',color:'#101043' }]);
                    if(menDos[0].display == 'flex'){
                        setmenDos([{display:'none',color:colorRes}]);
                    }else if(menTres[0].display == 'flex'){
                        setmenTres([{display:'none',color:colorRes}]);
                    }
                    setMostrarMenusBuenEstado(true);
                    setMostrarItemMenuUno(true);
                    setIdRutaAMostrar(-1);
                    setOcultarMenu(true);       
                    setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);                        
                }else if(secionIniciada==true){
                    let colorRes='#102769';
                    if(modoOscuro){
                        colorRes='#151553';
                    }

                    setmenUno([{ display: 'none',color:colorRes}]);
                    setmenCuatro([{ display: 'flex',color:'#101043'}]);                          
                }else{
                    setLoguearse(true);
                }
                
            }}
        >
                <Image 
                //require('../assets/Citycons_bus_icon-icons.com_67914.png')
                    source={(refCambiarLupa.current==true)?((!modoOscuro)?require("../assets/lupaRota.png"):require("../assets/lupaRotav2.png")):(!modoOscuro)?require("../assets/lupa.png"):require("../assets/lupav2.png")}
                    style={{marginBottom:0,width:40, height:40,marginRight:7,backgroundColor:(!modoOscuro)?'#2060A5':'#151567',borderRadius:20,
                        borderWidth:2,borderColor:(!modoOscuro)?'#2060A5':'#151567',marginLeft:7}}>                    
                </Image>
        </TouchableOpacity>}
    </View>}

        {tipoDeUsuario=='Pasajero' && mostrarItemMenuUno==true && detenerInterval==false && <View style={{position:'absolute', backgroundColor:(!modoOscuro)?'#2060A9':'#151567',height:40,width:80,zIndex:10,right:'5%',top:'20%',
        alignItems:'center',justifyContent:'center',borderRadius:10,borderWidth:2,borderColor:(tiempoDeEspera>=30)?'green':'red'}}>
            <Text style={{fontWeight:'600'}}
            >{"0"+Math.floor(tiempoDeEspera/60)+":"+[((tiempoDeEspera-60*(Math.floor(tiempoDeEspera/60)))>9)?(tiempoDeEspera-60*(Math.floor(tiempoDeEspera/60))):"0"+(tiempoDeEspera-60*(Math.floor(tiempoDeEspera/60)))]}</Text>
        </View>}

        {mostrarVentana=="flex" && <Perfil VERSIONDELAPLICACION={VERSIONDELAPLICACION} setMostrarComprasPasajeros={setMostrarComprasPasajeros} height={height} setEliminarAnuncios={setEliminarAnuncios} width={width} setMostrarAnuncioRewarded={setMostrarAnuncioRewarded} sesionIniciadaConGoogle={sesionIniciadaConGoogle} registrarse={registrarse} setEditarPerfil={setEditarPerfil} setCambiarPassword={setCambiarPassword} setVerAdministrarUsuarios={setVerAdministrarUsuarios} tipoDeSubscripcion={tipoDeSubscripcion} permitirEnviarUbicacion={permitirEnviarUbicacion} secionIniciada={secionIniciada} 
            setSecionIniciada={setSecionIniciada} setTipoDeUsuario={setTipoDeUsuario} setRegistrarse={setRegistrarse} 
            setLoguearse={setLoguearse} tipoDePerfil={[{principal:{width:'100%',height:(height>width)?height-width*0.2:height*0.8-StatusBar.currentHeight,position:'absolute',top:0,left:0,zIndex:200,backgroundColor:'#00000045'}}]} 
            actualizar={serMostrarVentana} activarPrecision={activarPrecision} setActivarPrecision={setActivarPrecision}
            tipoDeUsuario={tipoDeUsuario} permisosEnSegundoPlano={bacgroundPermisos} setPermisosEnSegundoPlano={setBacgroundPermisos}
            todasLasRutasCompetencia={todasLasRutasCompetencia} rutasSeleccionadasCompetencia={rutasSeleccionadasCompetencia}
            setTodasLasRutasCompetencia={setTodasLasRutasCompetencia} setRutasSeleccionadasCompetencia={setRutasSeleccionadasCompetencia}
            setMensajeAlerta={setMensajeAlerta} setMostrarAlerte={setMostrarAlerte} setMostrarAnuncioCompleto={setMostrarAnuncioCompleto} modoOscuro={modoOscuro} setModoOscuro={setModoOscuro}></Perfil>}
        
         {<MapView

        ref={(el)=>{
            refMapView.current=el;
        }}

        initialRegion={{latitude:
                                    coordenadasDestino.latitude,//inicialPosition.latitude,
                        longitude:
                                    coordenadasDestino.longitude//inicialPosition.longitude
                        ,latitudeDelta:0.04,longitudeDelta:0.04}}

        style={{width:'100%',height:'100%',position:'absolute',top:0,left:0, zIndex:1}}
        
        //Esta vaina genero problemas en el primer renderizado, sirve para usar google map en IOS
        provider={PROVIDER_GOOGLE} 
        
        //showsUserLocation={true}
        showsUserLocation={(tipoDeUsuario=="Pasajero" && permitirSeguirPasajero==true)?true:false}
        showsMyLocationButton={false}

        customMapStyle={(modoOscuro)?styles.mapStyle:styles.mapStyleLight}

        onTouchStart={
            ()=>{
                if(secionIniciada==true){
                    refFollowing.current=false;                
                    // if (menUno[0].display == 'flex' ) {
                    //     setmenUno([{display:'none',color:'#102769'}]);
                    // } else if(menDos[0].display == 'flex'){
                    //     setmenDos([{display:'none',color:'#102769'}]);
                    // }else if(menTres[0].display == 'flex'){
                    //     setmenTres([{display:'none',color:'#102769'}]);
                    // }else if(menCinco[0].display=='flex'){
                    //     setmenCinco([{display:'none',color:'#102769'}])                    
                    // }
                    // setmenCuatro([{ display: 'flex',color:'#101043' }]);
                    // console.log("ocultarTrayecto es:"+ ocultarTrayecto);         
                    // console.log("mostrarItemMenuUno es:" + mostrarItemMenuUno);
                    // console.log("verTrayectoria es:" + verTrayectoria);

                    if(tipoDeUsuario=='Pasajero' && tipoDeSubscripcion=='C'){
                        let fechaAlPresionar=new Date();
                        let tiempoTotalAlPresionar=fechaAlPresionar.getHours()*3600 + fechaAlPresionar.getMinutes()*60 + fechaAlPresionar.getSeconds();
                        
                        if(Math.abs(tiempoTotalAlPresionar - parseInt(tiempoDesdeUltimoAnuncio))>=3600){
                            setMostrarAnuncioRewarded(true);
                            console.log("Entro en el primer anuncio");
                            setTiempoDesdeUltimoAnuncio(tiempoTotalAlPresionar);
                        }else if(Math.abs(tiempoTotalAlPresionar - parseInt(tiempoDesdeUltimoAnuncio))>=240){
                            let random=Math.random()*100;
                            console.log("Entro en el segundo anuncio");                            
                            if(random<50){
                                setMostrarAnuncioCompleto(true);
                            }else{
                                setMostrarAnuncioRewarded(true);                                    
                            }
                            setTiempoDesdeUltimoAnuncio(tiempoTotalAlPresionar);
                        }
                    
                    console.log("El tiempo total es: "+tiempoTotalAlPresionar);
                    console.log("El tiempo anterior es: "+tiempoDesdeUltimoAnuncio);
                    }
                    refInputAutoComplete.current.blur();
                    setMostrarBarraSecundariaDeUbicacion(false);
                }                
            }
        }
        >

            {secionIniciada==true && mostrarItemMenuUno==true && verRutasCercanas==false && verCompetencia==false && !mostrarCompañerosCercanos &&
            <>
                <Marker onDragEnd={
                    async(coords)=>{
                        refNombreDelOrigen.current='Desconocido';
                        if(tipoDeModificacionDeLugar!='Destino'){
                            refInputAutoComplete.current.setAddressText('');
                        }                        
                        setMostrarBarraSecundariaDeUbicacion(false);
                        setCoordenadasOrigen(coords.nativeEvent.coordinate);                           
                        //RutasTrayectorias(setRutasEnElMapa);              
                        obtenerRutas(identificadorKey.current);
                        setVerTrayectoria(false);
                        setOcultarMenu(false);
                        }
                    }
                    coordinate={{latitude:coordenadasOrigen.latitude,
                        longitude:coordenadasOrigen.longitude,
                        latitudeDelta:0.02,
                        longitudeDelta:0.05}}
                    
                    draggable={true}>
                        <Image 
                        style={{height:40,width:40}}
                        source={(!modoOscuro)?require("../assets/UsuarioPersona.png"):require("../assets/UsuarioPersona.png")}
                        ></Image>

                </Marker>
                
                <Marker onDragEnd={
                        async (coords)=>{
                        refNombreDelDestino.current='Desconocido';
                        if(tipoDeModificacionDeLugar=='Destino'){
                            refInputAutoComplete.current.setAddressText('');    
                        }                        
                        setMostrarBarraSecundariaDeUbicacion(false);
                        setCoordenadasDestino(coords.nativeEvent.coordinate);
                        //RutasTrayectorias(setRutasEnElMapa); 
                        obtenerRutas(identificadorKey.current);
                        setVerTrayectoria(false);   
                        setOcultarMenu(false);
                        // setOcultarTrayecto(!ocultarTrayecto);
                        // console.log(ocultarTrayecto);
                        //console.log(nombresIconosTransportes);                      
                        }
                
                    }
                coordinate={{latitude:coordenadasDestino.latitude,
                    longitude:coordenadasDestino.longitude,
                    latitudeDelta:0.02,
                    longitudeDelta:0.05}}
                    draggable={true}
                    >
                    <Image style={{height:35,width:35}} source={require("../assets/paradaFinal.png")}></Image>
                </Marker>
            </>}


            {!iniciarRecorridoDeLaTrayectoria && secionIniciada==true && ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && !mostrarCompañerosCercanos &&
                    iconosTransportes.map((item, i)=>{
                        return(
                            <Marker key={i} coordinate={{
                                latitude:item.longitudUsuarioComun,
                                longitude:item.latitudUsuarioComun,
                                latitudeDelta:0.02,
                                longitudeDelta:0.05
                            }} style={{alignItems:'center'}}>
                                {(item.direccionParadaInicial=='D') && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{"⇛"+item.nombre}</Text>}
                                {(item.direccionParadaInicial=='I') && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{"⇚"+item.nombre}</Text>}
    
                                
                                <Image style={{width:27,height:27}} source={urlDeLosIconos[item.id_Ruta-1]} ></Image>
                        
                                {i==0 && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>
                                    {Math.floor(tiemposRutasTrayectorias[i]/3600)
                                    +":"+((Math.floor(((tiemposRutasTrayectorias[i]-3600*(Math.floor(tiemposRutasTrayectorias[i]/3600)))/60))>9)?Math.floor(((tiemposRutasTrayectorias[i]-3600*(Math.floor(tiemposRutasTrayectorias[i]/3600)))/60)):"0"+Math.floor(((tiemposRutasTrayectorias[i]-3600*(Math.floor(tiemposRutasTrayectorias[i]/3600)))/60)))
                                    +":"+((tiemposRutasTrayectorias[i]%60>9)?tiemposRutasTrayectorias[i]%60:"0"+tiemposRutasTrayectorias[i]%60)}</Text>}

                                {i>0 && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>
                                    {Math.floor((tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])/3600)
                                    +":"+((Math.floor((((tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])-3600*(Math.floor((tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])/3600)))/60))>9)?Math.floor((((tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])-3600*(Math.floor((tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])/3600)))/60)):"0"+Math.floor((((tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])-3600*(Math.floor((tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])/3600)))/60)))
                                    +":"+(((tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])%60>9)?(tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])%60:"0"+(tiemposRutasTrayectorias[i]-tiemposRutasTrayectorias[i-1])%60)}</Text>}
                                
                            </Marker>
                        )
                    })
            }

            {secionIniciada==true && ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && !mostrarCompañerosCercanos &&
                    iconosTransportes.map((item, i)=>{
                        return(
                            <View key={i} >
                                <LineasTrayectorias emailState={emailState} tokenState={tokenState} iconoTrayectoItem={item} color={item.color}></LineasTrayectorias>
                            </View>
                        )
                    })
            }
            {secionIniciada==true && ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && !mostrarCompañerosCercanos &&
                    iconosTransportes.map((item, i)=>{
                        return(
                            <Marker key={i} coordinate={{                            
                                latitude:item.longitudParadaFinal,
                                longitude:item.latitudParadaFinal,
                                latitudeDelta:0.02,
                                longitudeDelta:0.05}}>
                                <Image style={{width:35,height:35}} source={urlDeLasBajadas[item.id_Ruta-1]} ></Image>
    
                            </Marker>
                        )
                    })
            }
            {secionIniciada==true && ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && !mostrarCompañerosCercanos &&
                    iconosTransportes.map((item, i)=>{
                        return(
                            <Marker key={i} coordinate={{                            
                                latitude:item.longitudParadaUsuarioComun,
                                longitude:item.latitudParadaUsuarioComun,
                                latitudeDelta:0.02,
                                longitudeDelta:0.05}}>
                                <Image style={{width:35,height:35}} source={urlDeLasSubidas[item.id_Ruta-1]} ></Image>
                            </Marker>
                        )
                    })
            }
            {secionIniciada==true && ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && !mostrarCompañerosCercanos &&
                    iconosTransportes.map((item, i)=>{
                        if(i==0){
                            return(                            
                                <Polyline key={i} lineCap={"butt"} coordinates={[{latitude:coordenadasOrigen.latitude,longitude:coordenadasOrigen.longitude},{latitude:item.longitudParadaUsuarioComun,longitude:item.latitudParadaUsuarioComun}]} strokeColor={(!modoOscuro)?"black":"#c3c3c3"}></Polyline>
                           )
                        }
                    })
            }
            {secionIniciada==true && ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && !mostrarCompañerosCercanos &&
                    iconosTransportes.map((item, i)=>{
                        if(i==iconosTransportes.length-1){                        
                        return(                    
                            <Polyline key={i} coordinates={[{latitude:coordenadasDestino.latitude,longitude:coordenadasDestino.longitude},{latitude:item.longitudParadaFinal,longitude:item.latitudParadaFinal}]} strokeColor={(!modoOscuro)?"black":"#c3c3c3"}></Polyline>
                    )}}
                )
            }


            {secionIniciada==true && mostrarParadas==true && !mostrarCompañerosCercanos && <DireccionesSegunUbicacion emailState={emailState} tokenState={tokenState} idRuta={idRutaAMostrar}></DireccionesSegunUbicacion>}
            {secionIniciada==true && idRutaAMostrar>0 && mostrarUsuarios==true && tipoDeUsuario=='Pasajero' && mostrarComprasPasajeros==false && <UsuariosTransportistas emailState={emailState} tokenState={tokenState} tipoDeUsuario={tipoDeUsuario} idRuta={idRutaAMostrar} idUsuarioIniciado={idUsuarioIniciado}
                        verTransportistasPorLaDerecha={verTransportistasPorLaDerecha} verTransportistasPorLaIzquierda={verTransportistasPorLaIzquierda} modoOscuro={modoOscuro}></UsuariosTransportistas>}
            
            {secionIniciada==true && tipoDeUsuario=='Transportista' && idRutaAMostrar>0 && mostrarUsuarios==true && !mostrarCompañerosCercanos && <UsuariosTransportistasConTiempo setTiempoPromedio={setTiempoPromedio} setTiempoParaUsaurioTransportistaLogueado={setTiempoParaUsaurioTransportistaLogueado} modoSimplificado={false}
                            emailState={emailState} tokenState={tokenState} tipoDeUsuario={tipoDeUsuario} idRuta={idRutaAMostrar} idUsuarioIniciado={idUsuarioIniciado}
                        verTransportistasPorLaDerecha={verTransportistasPorLaDerecha} verTransportistasPorLaIzquierda={verTransportistasPorLaIzquierda} modoOscuro={modoOscuro}></UsuariosTransportistasConTiempo>}
                        
            {mostrarCompañerosCercanos && secionIniciada==true && tipoDeUsuario=='Transportista' && <UsuariosTransportistasConTiempo setTiempoPromedio={setTiempoPromedio} setTiempoParaUsaurioTransportistaLogueado={setTiempoParaUsaurioTransportistaLogueado} modoSimplificado={true}
                            emailState={emailState} tokenState={tokenState} tipoDeUsuario={tipoDeUsuario} idRuta={idRutaAMostrar} idUsuarioIniciado={idUsuarioIniciado}
                        verTransportistasPorLaDerecha={verTransportistasPorLaDerecha} verTransportistasPorLaIzquierda={verTransportistasPorLaIzquierda} modoOscuro={modoOscuro}></UsuariosTransportistasConTiempo>}
                        
            {secionIniciada==true && mostrarCompañerosCercanos && tipoDeUsuario=='Transportista' &&
                <LineaDeUnaRuta emailState={emailState} tokenState={tokenState} setCargando={setCargando} setMostrarSniperCargando={setMostrarSniperCargando} idRuta={Math.ceil(idUsuarioIniciado/33.0)} ></LineaDeUnaRuta>
            }
            {secionIniciada==true && idRutaAMostrar>0 && !mostrarCompañerosCercanos &&
                <LineaDeUnaRuta emailState={emailState} tokenState={tokenState} setCargando={setCargando} setMostrarSniperCargando={setMostrarSniperCargando} idRuta={idRutaAMostrar} ></LineaDeUnaRuta>
            }

            {mostrarItemMenuUno==true && secionIniciada==true && tipoDeUsuario=="Transportista" && verCompetencia==true && <CompetenciaTransportistas modoOscuro={modoOscuro} emailState={emailState} tokenState={tokenState} 
            tipoDeUsuario={tipoDeUsuario} idUsuarioIniciado={idUsuarioIniciado} rutasSeleccionadasCompetencia={rutasSeleccionadasCompetencia}></CompetenciaTransportistas>}

            {mostrarItemMenuUno==true && secionIniciada==true && tipoDeUsuario=='Pasajero' && userLocation.latitude!=0 && verRutasCercanas==true && mostrarComprasPasajeros==false &&  <RutasCercaDelPasajero tiempoDeEspera={tiempoDeEspera} refMapView={refMapView} modoOscuro={modoOscuro} emailState={emailState} tokenState={tokenState} userLocation ={userLocation}
            rutasSeleccionadasCompetencia={rutasSeleccionadasCompetencia}></RutasCercaDelPasajero>}

            {verParadasCercanas[0].observar==true &&
                verParadasCercanas[0].direccion=='D' && <Marker coordinate={{latitude:verParadasCercanas[0].latitude,
                    longitude:verParadasCercanas[0].longitude,
                    latitudeDelta:0.02,
                    longitudeDelta:0.05}}
                    icon={require("../assets/parada-de-autobusDerecha.png")}></Marker>
            }
            {verParadasCercanas[0].observar==true &&
                verParadasCercanas[0].direccion=='I' && <Marker coordinate={{latitude:verParadasCercanas[0].latitude,
                    longitude:verParadasCercanas[0].longitude,
                    latitudeDelta:0.02,
                    longitudeDelta:0.05}}
                    icon={require("../assets/parada-de-autobusIzquierda.png")}></Marker>
            }
            {(verParadasCercanas[0].direccion=='I' || verParadasCercanas[0].direccion=='D') && <Polyline strokeColor={(!modoOscuro)?"black":"#c3c3c3"} coordinates={[{latitude:verParadasCercanas[0].latitude,longitude:verParadasCercanas[0].longitude},
                    {latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude}]}></Polyline>}

            {secionIniciada==true && verParadasCercanas[0].observar==true && verParadasCercanas.map((item, i)=>{
            
            return(
                <View key={i}>
                        
                    <Marker onDragEnd={
                        async(coords)=>{
                            setCoordenadasOrigenSecundario(coords.nativeEvent.coordinate);               
                            setOcultarTercerMenu(false);
                            setVerParadasCercanas([{observar:true,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);
                            }
                        }
                        coordinate={{latitude:coordenadasOrigenSecundario.latitude,
                            longitude:coordenadasOrigenSecundario.longitude,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05}}
                            draggable={true}>  
                            <Image 
                            style={{height:40,width:40}}
                            source={require("../assets/UsuarioPersona.png")}
                            ></Image>
                    </Marker>
                        

                    </View>
                )
            })}  
            {secionIniciada==true && idUsuarioIniciado>0 && permitirEnviarUbicacion==true && tipoDeUsuario=="Transportista" && <UsuarioTransportistaLogueado tiempoPromedio={tiempoPromedio} mostrarCompañerosCercanos={mostrarCompañerosCercanos} tiempoParaUsaurioTransportistaLogueado={tiempoParaUsaurioTransportistaLogueado} modoOscuro={modoOscuro} emailState={emailState} tokenState={tokenState} activarPrecision={activarPrecision} direccionesPorUsuario={direccionesPorUsuario}
            setDireccionPorUsuario={setDireccionPorUsuario} idUsuarioIniciado={idUsuarioIniciado} userLocation={userLocation} idRutaAMostrar={idRutaAMostrar}></UsuarioTransportistaLogueado>}
            {verParadasCercanas[0].observar==true && verParadasCercanas[0].id_Parada>0
                && (tipoDeUsuario=='Transportista' || (tipoDeUsuario=='Pasajero' && 
                (tipoDeSubscripcion=='A' ||tipoDeSubscripcion=='S'))) && <UsuarioCercanoAUnaParada modoOscuro={modoOscuro} idRuta={verParadasCercanas[0].id_Ruta} emailState={emailState} tokenState={tokenState} idParada={verParadasCercanas[0].id_Parada}
                    tipoDeUsuario={tipoDeUsuario} idUsuarioIniciado={idUsuarioIniciado}></UsuarioCercanoAUnaParada>}
            {secionIniciada==true && ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && !mostrarCompañerosCercanos && iniciarRecorridoDeLaTrayectoria && <SeguimientoAlTrayecto permitirSeguirPasajero={permitirSeguirPasajero} permitirEnviarUbicacion={permitirEnviarUbicacion} refMapView={refMapView} datosDeLosUsuarios={datosDeLosUsuarios} modoOscuro={modoOscuro}emailState={emailState}tokenState={tokenState}></SeguimientoAlTrayecto>}
            
        </MapView>}         
    </View>
  )
}

