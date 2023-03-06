import {useState,useEffect,useRef} from 'react';
import { Linking, ScrollView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Inicio from './components/Inicio.jsx';
import Login from './components/Login.jsx';
import { useQuery, queryKey } from 'react-query';
import MenuBar from './components/MenuBar.jsx';
import Register from './components/Register.jsx';
import getAllRutas from './data/rutasManagua.js';
import { NativeModules } from 'react-native';
import useTrayectoria from './src/hooks/useTrayectoria.jsx';

import RutasBarItem from './components/RutasBarItem.jsx';
import IntercambiosRutas from './components/IntercambiosRutas.jsx';
import ParadasCercaDelOrigen from './components/ParadasCercaDeUbicacion.jsx';
import { getNombre, getRutasFavoritas, getTokenGeoRutasCode, getUsuario, setApellidos, setIdUsuarioIniciadoCode, setNombre, setPermitirEnvio, setRutasFavoritas, setTipoDeMenbresiaCode, setTipoDeUsuarioCode, setTokenGeoRutasCode } from './data/asyncStorageData.js';
import ConfirmarCodigo from './components/ConfirmarCodigo.jsx';
import CambiarPassword from './components/CambiarPassword.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdministrarUsuarios from './components/AdministrarUsuarios.jsx';

import SplashScreen from 'react-native-splash-screen';
import EditarUsuario from './components/ComponentesParaAdmins/EditarUsuario.jsx';
import AlertComponet from './components/AlertComponent.jsx';
import ItemsTrayectos from './components/ItemsTrayectos.jsx';
import BVAplicacion from './components/BVAplicacion.jsx';
import JustificarUbicacion from './components/JustificarUbicacion.jsx';
import BGPermisos from './components/BGpermisos.jsx';
import Compras from './components/Tienda/Compras.jsx';
import { BannerAdSize,BannerAd,AppOpenAd, TestIds, AdEventType,InterstitialAd } from 'react-native-google-mobile-ads';
import InterstitialADS from './components/Anuncios/InterstitialADS.jsx';
import mobileAds from 'react-native-google-mobile-ads';
import RewardedADS from './components/Anuncios/RewardedADS.jsx';
import ComprasUsuariosPasajeros from './components/Tienda/CompraUsuariosPasajeros.jsx';
import useComprasPlayStore from './src/hooks/useComprasPlayStore.jsx';
import MostrarInformacion from './components/Otros/MostrarInformacion.jsx';

const App=()=>{

    const [VERSIONDELAPLICACION,SETVERSIONDELAPLICACION]=useState(1);
    const [estadoAplicacion, setEstadoAplicacion]=useState(true);
    const [urlDeLaAplicacion, setUrlDeLaAplicacion]=useState('');
    const [darBienvenida, setDarBienvenida]=useState(false);
    const [justificarUbicacion,setJustificarUbicacion]=useState(false);
    const [pedirUbicacion, setPedirUbicacion]=useState(false);
    const [pedirUbicacionSegundoPlano, setPedirUbicacionSegundoPlano]=useState(1);

    const verificarVersionDeLaAplicacion=async()=>{

        let bienvenida=null;
        try{
            bienvenida=await AsyncStorage.getItem('bienvenida');
        }catch{
            bienvenida=null
        }

        if(bienvenida==null){
            let respuesta=await AsyncStorage.setItem('bienvenida','bienvenida');
            setDarBienvenida(true);
        }

        let justificarU=null;
        try{
            justificarU=await AsyncStorage.getItem('justificarU');
        }catch{
            justificarU=null
        }

        if(justificarU==null){
            let respuesta=await AsyncStorage.setItem('justificarU','justificarU');
            setJustificarUbicacion(true);
            setPedirUbicacion(false);
            setPedirUbicacionSegundoPlano(1);
        }


        let datos=null;
        try{
            datos=await fetch('https://www.georutas.lat/api/VersionesDeLaAplicacion').then(res => datos=res.json());
            console.log(datos);
            if(datos!=null && datos!=undefined){
                setUrlDeLaAplicacion(datos.descripcionDeLaVersion);
            }
        }catch{
            datos=null;
            console.log("No se logro acceder a los datos");
            setUrlDeLaAplicacion('');
        }

        if(datos!=null && datos.id_Version!=0 && datos.id_Version!=-1){            

            let fecha=new Date(datos.fechaDeExpiracion);
            let fechaNueva=new Date();
            // console.log(fecha);
            // console.log(fechaNueva);
            if(VERSIONDELAPLICACION!=datos.numeroDeVersion && fechaNueva<fecha){                
                setMensajeAlerta("Actualiza la aplicacion, esta version caduca el: "+fecha.toLocaleDateString());
                setMostrarAlerte(true);
                setTipoDeAlerta('E');
            }else if(fechaNueva>=fecha && VERSIONDELAPLICACION!=datos.numeroDeVersion){
                setMensajeAlerta("Actualiza la aplicacion, esta version caduco el: "+fecha.toLocaleDateString());
                setMostrarAlerte(true);
                setTipoDeAlerta('F');
            }

            if((datos.numeroDeVersion)<5){
                SETVERSIONDELAPLICACION(datos.numeroDeVersion);
            }

        }
        
        
    }

    useEffect(()=>{
        if(estadoAplicacion==true){
            verificarVersionDeLaAplicacion();
        }
    },[estadoAplicacion])

    const [loguearse,setLoguearse]=useState(false);
    const [tipoDeUsuario, setTipoDeUsuario]=useState("Ninguno");

    const [secionIniciada, setSecionIniciada]=useState(false);
      
    const [registrarse,setRegistrarse]=useState(false);

    const [loguearTransportista, setLosguearTransportista]=useState(false);

    const [idUsuarioIniciado, setIdUsuarioIniciado]=useState(-1);

    const [usuarioLogueado, setUsuarioLogueado]=useState({});

    const [permitirEnviarUbicacion, setPermitirEnviarUbicacion]=useState(false);
    

    const [coordenadasOrigen, setCoordenadasOrigen]=useState({latitude:12.153800313208755,longitude:-86.30149193108082});
    const [coordenadasDestino, setCoordenadasDestino]=useState({latitude:12.134261,longitude:-86.269897});
    

    const [idUsuariosDeTrayectoria, setIdUsuariosDeTrayectoria]=useState([]);


    const [rutasTrayectoria,setRutasTrayectoria]=useState([]);
    const [visualizarRutas,setVisualizarRutas]=useState(1);
    const verRutasTrayecto=useRef(false);

    const [tiemposRutasTrayectorias,setTiemposRutasTrayectorias]=useState([]);
    const [iconosTransportes,setIconosTransportes]=useState([]);
    
    const identificadorKey=useRef(0);
    const refCambiarLupa=useRef(false);
  
      const [verTrayectoria,setVerTrayectoria]=useState(true);
      const [ocultarMenu, setOcultarMenu]=useState(true);
      const [mostrarItemMenuUno, setMostrarItemMenuUno]=useState(true);
      const [verParadasCercanas,setVerParadasCercanas]=useState([{observar:false,latitude:12.155924,longitude:-86.302363,direccion:'K',id_Ruta:1}]);
      const [coordenadasOrigenSecundario, setCoordenadasOrigenSecundario]=useState({latitude:12.135744,longitude:-86.261872});
      const [ocultarTercerMenu, setOcultarTercerMenu]=useState(false);
      const [direccionesPorUsuario, setDireccionPorUsuario]=useState('K');
      const [idRutaAMostrar, setIdRutaAMostrar]=useState(-1);
      const [mostrarSniperCargando, setMostrarSniperCargando]=useState(false);

      const [verTransportistasPorLaDerecha, setVerTransportistasPorLaDerecha]=useState(false);
      const [verTransportistasPorLaIzquierda, setVerTransportistasPorLaIzquierda]=useState(false);
      const [verCompetencia, setVerCompetencia]=useState(false);
      const [verRutasCercanas, setVerRutasCercanas]=useState(false);
      const [ocultarTrayecto, setOcultarTrayecto]=useState(false);

      
      const [emailState, setEmailState]=useState("");
      const [tokenState, setTokenState]=useState("");

      const {height,width}=useWindowDimensions();

      let alturaTotal=height+StatusBar.currentHeight;

      const {data,obtenerRutas} = useTrayectoria(coordenadasOrigen,coordenadasDestino,setRutasTrayectoria,setVisualizarRutas,
      setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto,identificadorKey,emailState,tokenState);

      const [menUno, setmenUno] = useState([{ display: 'none',color:'#102769' }]);
      const [menDos, setmenDos] = useState([{ display: 'none',color:'#102769' }]);
      const [menTres, setmenTres] = useState([{ display: 'none',color:'#102769' }]);
      const [menCuatro, setmenCuatro] = useState([{ display: 'flex',color:'#101043' }]);
      const [menCinco, setmenCinco] = useState([{ display: 'none',color:'#102769' }]);

      const [userLocation,setUserLocatio]=useState({latitude:0,longitude:0});    

      const [mostrarBarraSecundariaDeUbicacion, setMostrarBarraSecundariaDeUbicacion]=useState(false);
      const [activarPrecision, setActivarPrecision]=useState(true);
      const [mostrarVentana,serMostrarVentana]=useState('none');

      const [cargando, setCargando]=useState(false);

      let todasLasRutasData=getAllRutas();
      const [todasLasRutasCompetencia, setTodasLasRutasCompetencia]=useState(getAllRutas());
      const [rutasSeleccionadasCompetencia, setRutasSeleccionadasCompetencia]=useState([]);

      const [tokenGeoRutas,setTokenGeoRutas]=useState("");
      const [confirmarCodigo,setConfirmarCodigo]=useState(false);
      const [cambiarPassword,setCambiarPassword]=useState(false);
      const [tipoDeSubscripcion,setTipoDeSubscripcion]=useState('C');
      const [verAdministrarUsuarios, setVerAdministrarUsuarios]=useState(false);

      const [nombreAdmin,setNombreAdmin]=useState();//Esto es practicamente forzado

      const [editarPerfil,setEditarPerfil]=useState(false);
      const [emailDelChoferEditar, setEmailDelChoferEditar]=useState("");
      const [editarInfoDelChofer, setEditarInfoDelChofer]=useState(false);
      const [choferAEditar,setChoferAEditar]=useState(
        {
            idTablaForanea:0,
            codigoCorreo:0,
            fechaCodigoCorreo:new Date(),
            token:"",
            cuentaRegistrada:1,
            nombres:"",
            apellidos:"",
            telefono:"",
            tipoSubscripcion:"C",
            tipoDeUsuario:"T",
            estado:"I"});

        const [refrescar,setRefrescar]=useState(false);
        const [mostrarAlerta, setMostrarAlerte]=useState(false);
        const [mensajeAlerta, setMensajeAlerta]=useState("Ocurrio un error");
        const [tipoDeAlerta, setTipoDeAlerta]=useState('C');



      const obtenerToken=async()=>{
        const tokenValue=await AsyncStorage.getItem('tokenCodeGeoRutas');
            
        if(tokenValue!=null && tokenValue.length>10){

            //setLoguearse(false);
            setSecionIniciada(true);
            getUsuario(setEmailState);

            const tipoSubs=await AsyncStorage.getItem('tipoDeMenbresia');

            if(tipoSubs!=null && tipoSubs.length>0){
                setTipoDeMenbresiaCode(tipoSubs);
                setTipoDeSubscripcion(tipoSubs);
            }else{
                setTipoDeMenbresiaCode('C');
                setTipoDeSubscripcion('C');
            }

            setTokenState(tokenValue);
            setTokenGeoRutas(tokenValue);                

            const tipoUsuarioAsync=await AsyncStorage.getItem('tipoDeUsuario');

            if(tipoUsuarioAsync!=null && tipoUsuarioAsync=='Transportista'){
                setTipoDeUsuario("Transportista");

                let idUsuario=await AsyncStorage.getItem('IdUsuarioIniciado');

                if(idUsuario!=null && (idUsuario.length>0)){
                    setIdUsuarioIniciado(parseInt(idUsuario));
                }else{
                    setLoguearse(true);
                    setSecionIniciada(false);
                }

                setTipoDeUsuarioCode("Transportista");                
            }else{
                setTipoDeUsuario("Pasajero");
                setTipoDeUsuarioCode("Pasajero");
            }                
            return;
        }else{
            setLoguearse(true);
        }   
      }

    const [tiempoDesdeUltimoAnuncio, setTiempoDesdeUltimoAnuncio]=useState("0");

    const obtenerTiempoDesdeElUltimoAnucio=async()=>{
        try{
            let value=await AsyncStorage.getItem('tiempoDesdeUltimoAnuncio');
            if(value!=null && value!=undefined){
                setTiempoDesdeUltimoAnuncio(value);
            }else{
                let fechaActual=new Date();
                let tiempoTotal=fechaActual.getHours()*3600 + fechaActual.getMinutes()*60 + fechaActual.getSeconds();
                setTiempoDesdeUltimoAnuncio(tiempoTotal.toString());
            }
        }catch{
            let fechaActual=new Date();
            let tiempoTotal=fechaActual.getHours()*3600 + fechaActual.getMinutes()*60 + fechaActual.getSeconds();
            setTiempoDesdeUltimoAnuncio(tiempoTotal.toString());
        }
    }

    const enviarTiempoDesdeElUltimoAnuncio=async()=>{
        try{
            let fechaActual=new Date();
            let tiempoTotal=fechaActual.getHours()*3600 + fechaActual.getMinutes()*60 + fechaActual.getSeconds();
            setTiempoDesdeUltimoAnuncio(tiempoTotal.toString());
            let value=await AsyncStorage.setItem('tiempoDesdeUltimoAnuncio',tiempoTotal.toString());
        }catch{
            let fechaActual=new Date();
            let tiempoTotal=fechaActual.getHours()*3600 + fechaActual.getMinutes()*60 + fechaActual.getSeconds();
            setTiempoDesdeUltimoAnuncio(tiempoTotal.toString());
        }
    }


      useEffect(()=>{     
        SplashScreen.hide();   
        obtenerToken();
        getRutasFavoritas(setRutasSeleccionadasCompetencia);
        getTokenGeoRutasCode(setTokenGeoRutas);
        getNombre(setNombreAdmin);
        obtenerTiempoDesdeElUltimoAnucio();
      },[])

      useEffect(()=>{
        SplashScreen.hide();
        if(rutasSeleccionadasCompetencia==undefined || rutasSeleccionadasCompetencia==null || rutasSeleccionadasCompetencia.length==0){
            let arreglo=[];
            for(let y=0;y<45;y++){
                if(y<10){
                    arreglo.push("✓");
                }else{
                    arreglo.push("");
                }                
            }
            setRutasSeleccionadasCompetencia(arreglo);
        }
      },[rutasSeleccionadasCompetencia])

      

    const refrescarToken=async(email,token)=>{
        let usuario=null;
        
        if(tipoDeSubscripcion=='K'){
            //alert("Renueve su subscripcion");
        }
        
        try{
            let url='https://www.georutas.lat/api/RefrescarToken?Email='+email+'&Token='+token;
            
            
            usuario=await fetch(url).then(res=>usuario=res.json());
            //usuario=await fetch(url);
            // console.log("El usuario es: ");
            // console.log("La url es: "+url);
            // console.log(usuario);
            console.log("El token que se obtiene es: ");
            console.log(usuario);
            
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

        if(usuario.token=="0" || usuario.token=="3"){
            return;
        }else if(usuario.token=="2" || usuario.token=="1"){
            setSecionIniciada(false);            
            setTipoDeUsuario("Ninguno");
            setLoguearse(true);
        }else if(usuario.token=="4"){
            setTipoDeSubscripcion('C');
            setTipoDeMenbresiaCode('C');
        }else{
            setTokenState(usuario.token);
            setTokenGeoRutasCode(usuario.token);
        }
    }

    const [datosDelUsuarioSinSuscripcion, setDatosDelUsuarioSinSuscripcion]=useState(
        {apellidos: "", idTablaForanea: 0, nombres: "", tipoDeUsuario: "P",
            tipoSubscripcion: "B", token: ""});
    const [mostrarComprasPasajeros, setMostrarComprasPasajeros]=useState(false);
    
    useEffect(()=>{
        SplashScreen.hide();
        if(emailState.length>2 && secionIniciada==true){
            refrescarToken(emailState,tokenState);
            // console.log("ESTAS HACIENDO UNA PETICION AL TOKEN");
            if(idRutaAMostrar>0 && tipoDeUsuario=='Pasajero' && tipoDeSubscripcion=='C'){

                setDatosDelUsuarioSinSuscripcion({apellidos: "Des", idTablaForanea: 0, nombres: "Des", tipoDeUsuario: "P",
                tipoSubscripcion: "C", token: tokenState, email:emailState});
                
                // let fechaActual= new Date();
                // let tiempoTotal=fechaActual.getHours()*3600 + fechaActual.getMinutes()*60 + fechaActual.getSeconds();
                // if(Math.abs(tiempoTotal-(parseInt(tiempoDesdeUltimoAnuncio)))>=120){
                    setMostrarComprasPasajeros(true);
                //}

            }
        }
    },[idRutaAMostrar,visualizarRutas,emailState,secionIniciada,tokenState,tipoDeUsuario,tipoDeSubscripcion])

    const verificarMenbresia=async(email,token,tipoUsuario)=>{
        try{
            let urlUsuarioT='https://www.georutas.lat/api/VerificarTiempoDeMenbresia?Email='+email+'&Token='+token;
            let datos=await fetch(urlUsuarioT).then(res=>datos=res.json());

            if(datos!=undefined && datos!=null && datos.emailUsuario.length>10){
                let fecha=new Date(Date.parse(datos.tiempo));
                // console.log("La fecha obtenida es: ");
                // console.log(fecha);
                // let fechaHoy=new Date();
                // console.log("La otra fecha es: ");
                // console.log(fechaHoy);

                let cantidadDeTiempo=fecha-fechaHoy;

                if(cantidadDeTiempo<=0 && tipoUsuario=='Transportista'){
                    setMensajeAlerta("Renueve su subscripción para poder acceder");
                    setMostrarAlerte(true);                    
                    setSecionIniciada(false);
                    setLoguearse(true);
                    setPermitirEnvio("false");
                    setPermitirEnviarUbicacion(false);
                    let valor=await AsyncStorage.setItem('tokenCodeGeoRutas','');
                    return;
                }else if(cantidadDeTiempo>0 && cantidadDeTiempo<86400000){
                    setMensajeAlerta("Su suscripción caduca en "+((int)(cantidadDeTiempo/3600000))+" horas");
                    setMostrarAlerte(true);                           
                }else if(cantidadDeTiempo>=86400000 && cantidadDeTiempo<172800000){
                    setMensajeAlerta("Su suscripción caduca en 2 días");
                    setMostrarAlerte(true);
                }else if(cantidadDeTiempo>=172800000 && cantidadDeTiempo<259200000){
                    setMensajeAlerta("Su suscripción caduca en 3 días");
                    setMostrarAlerte(true);
                }else if(cantidadDeTiempo>=259200000 && cantidadDeTiempo<345600000){
                    setMensajeAlerta("Su suscripción caduca en 4 días");
                    setMostrarAlerte(true);
                }else if(cantidadDeTiempo<=0 && tipoUsuario=='Pasajero' && tipoDeSubscripcion!='C'){
                    setTipoDeMenbresiaCode('C');   
                    setTipoDeSubscripcion('C');
                }

                if(datos.tipoSuscripcion=='C' && tipoUsuario=='Pasajero'  && tipoDeSubscripcion!='C'){
                    setTipoDeMenbresiaCode('C');   
                    setTipoDeSubscripcion('C');
                }else if(datos.tipoSuscripcion=='B' && tipoUsuario=='Transportista'  && tipoDeSubscripcion!='B'){
                    setMensajeAlerta("Renueve su subscripción para poder acceder");
                    setMostrarAlerte(true);                    
                    setSecionIniciada(false);
                    setLoguearse(true);
                    setPermitirEnvio("false");
                    setPermitirEnviarUbicacion(false);
                    let valor=await AsyncStorage.setItem('tokenCodeGeoRutas','');
                }
            }

        }catch{
            console.log("No se que carajos paso");
        }
    }


    const [mostrarMenusBuenEstado,setMostrarMenusBuenEstado]=useState(false);
    const [ocultarLasMierdasDelPrimerMenu,setOcultarLasMierdasDelPrimerMenu]=useState(true);
    const [comprarSuscripcionT, setComprarSuscripcionT]=useState(false);

    const [mostrarAnuncioCompleto, setMostrarAnuncioCompleto]=useState(false);
    const [mostrarAnuncioRewarded, setMostrarAnuncioRewarded]=useState(false);
    const [eliminarAnuncios,setEliminarAnuncios]=useState(false);

    const [purchase, setPurchase]=useState(false);    

    
    const [tiempoDesdeLaUltimaSuscripcion, setTiempoDesdeLaUltimaSuscripcion]=useState("0");
    const [mostrarInformacion, setMostrarInformacion]=useState(false);

    const {comprarProducto,refrescarHistorial, purchaseTxt, historial,idFacturaOApellidos} = useComprasPlayStore(emailState,purchase, setPurchase,setMensajeAlerta,setMostrarAlerte,setTiempoDesdeLaUltimaSuscripcion,setMostrarInformacion,datosDelUsuarioSinSuscripcion,secionIniciada);


  return (
     <View style={{height:height, width:width}}>
        
        <Inicio setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} setCoordenadasOrigen={setCoordenadasOrigen} tipoDeUsuario={tipoDeUsuario}
        setVerTrayectoria={setVerTrayectoria} setOcultarMenu={setOcultarMenu} coordenadasOrigen={coordenadasOrigen} coordenadasDestino={coordenadasDestino}
        setCoordenadasDestino={setCoordenadasDestino} mostrarItemMenuUno={mostrarItemMenuUno} verTrayectoria={verTrayectoria} iconosTransportes={iconosTransportes}
        tiemposRutasTrayectorias={tiemposRutasTrayectorias} verParadasCercanas={verParadasCercanas} setCoordenadasOrigenSecundario={setCoordenadasOrigenSecundario}
        setOcultarTercerMenu={setOcultarTercerMenu} setVerParadasCercanas={setVerParadasCercanas} coordenadasOrigenSecundario={coordenadasOrigenSecundario}
        direccionesPorUsuario={direccionesPorUsuario} setDireccionPorUsuario={setDireccionPorUsuario} idRutaAMostrar={idRutaAMostrar} setMostrarSniperCargando={setMostrarSniperCargando} idUsuarioIniciado={idUsuarioIniciado}
        verTransportistasPorLaDerecha={verTransportistasPorLaDerecha} setVerTransportistasPorLaDerecha={setVerTransportistasPorLaDerecha} verTransportistasPorLaIzquierda={verTransportistasPorLaIzquierda} 
        setVerTransportistasPorLaIzquierda={setVerTransportistasPorLaIzquierda} mostrarSniperCargando={mostrarSniperCargando} idUsuariosDeTrayectoria={idUsuariosDeTrayectoria}
        rutasEnElMapa={data} identificadorKey={identificadorKey} secionIniciada={secionIniciada} verCompetencia={verCompetencia} setVerCompetencia={setVerCompetencia}
        verRutasCercanas={verRutasCercanas} setVerRutasCercanas={setVerRutasCercanas} ocultarTrayecto={ocultarTrayecto} setOcultarTrayecto={setOcultarTrayecto} height={alturaTotal} width={width}
        permitirEnviarUbicacion={permitirEnviarUbicacion} setPermitirEnviarUbicacion={setPermitirEnviarUbicacion}
        obtenerRutas={obtenerRutas} menUno={menUno} setmenUno={setmenUno} menDos={menDos} setmenDos={setmenDos} menTres={menTres} setmenTres={setmenTres} menCuatro={menCuatro} 
        setmenCuatro={setmenCuatro} menCinco={menCinco} setmenCinco={setmenCinco} userLocation={userLocation} setUserLocatio={setUserLocatio}
        setSecionIniciada={setSecionIniciada} setTipoDeUsuario={setTipoDeUsuario} mostrarBarraSecundariaDeUbicacion={mostrarBarraSecundariaDeUbicacion} setMostrarBarraSecundariaDeUbicacion={setMostrarBarraSecundariaDeUbicacion}
        setMostrarItemMenuUno={setMostrarItemMenuUno} setIdRutaAMostrar={setIdRutaAMostrar} refCambiarLupa={refCambiarLupa} activarPrecision={activarPrecision} setActivarPrecision={setActivarPrecision}
        mostrarVentana={mostrarVentana} serMostrarVentana={serMostrarVentana} setCargando={setCargando} cargando={cargando}
        todasLasRutasCompetencia={todasLasRutasCompetencia} rutasSeleccionadasCompetencia={rutasSeleccionadasCompetencia}
        setTodasLasRutasCompetencia={setTodasLasRutasCompetencia} setRutasSeleccionadasCompetencia={setRutasSeleccionadasCompetencia}
        emailState={emailState} tokenState={tokenState} setTokenState={setTokenState} tipoDeSubscripcion={tipoDeSubscripcion}
        setVerAdministrarUsuarios={setVerAdministrarUsuarios} setCambiarPassword={setCambiarPassword} setEditarPerfil={setEditarPerfil}
        registrarse={registrarse} estadoAplicacion={estadoAplicacion} setEstadoAplicacion={setEstadoAplicacion} setMostrarAlerte={setMostrarAlerte} 
        setMensajeAlerta={setMensajeAlerta} setMostrarMenusBuenEstado={setMostrarMenusBuenEstado}
        pedirUbicacion={pedirUbicacion} pedirUbicacionSegundoPlano={pedirUbicacionSegundoPlano} setPedirUbicacionSegundoPlano={setPedirUbicacionSegundoPlano}
        verificarMenbresia={verificarMenbresia} setMostrarAnuncioCompleto={setMostrarAnuncioCompleto} obtenerTiempoDesdeElUltimoAnucio={obtenerTiempoDesdeElUltimoAnucio}
        tiempoDesdeUltimoAnuncio={tiempoDesdeUltimoAnuncio} setMostrarAnuncioRewarded={setMostrarAnuncioRewarded} setMostrarComprasPasajeros={setMostrarComprasPasajeros}
        setEliminarAnuncios={setEliminarAnuncios} setTiempoDesdeUltimoAnuncio={setTiempoDesdeUltimoAnuncio} VERSIONDELAPLICACION={VERSIONDELAPLICACION}
        ></Inicio>

        {mostrarMenusBuenEstado==true && <ItemsTrayectos setOcultarLasMierdasDelPrimerMenu={setOcultarLasMierdasDelPrimerMenu} ocultarMenu={ocultarMenu} setIdRutaAMostrar={setIdRutaAMostrar} 
        height={height} width={width} todasLasRutasData={todasLasRutasData} 
        menDos={menDos}
        menUno={menUno}
        menTres={menTres}
        setmenCuatro={setmenCuatro}
        data={data} rutasTrayectoria={rutasTrayectoria} visualizarRutas={visualizarRutas} verRutasTrayecto={verRutasTrayecto}
        obtenerRutas={obtenerRutas} setVerTrayectoria={setVerTrayectoria}
        setVerRutasCercanas={setVerRutasCercanas} setVerCompetencia={setVerCompetencia} setOcultarTrayecto={setOcultarTrayecto}
        identificadorKey={identificadorKey} refCambiarLupa={refCambiarLupa} setCargando={setCargando}
        ocultarTercerMenu={ocultarTercerMenu}
        emailState={emailState} tokenState={tokenState} latitude={coordenadasOrigenSecundario.latitude} 
        longitude={coordenadasOrigenSecundario.longitude} setVerParadasCercanas={setVerParadasCercanas}
        setMostrarMenusBuenEstado={setMostrarMenusBuenEstado} setmenUno={setmenUno} setmenDos={setmenDos} setmenTres={setmenTres}
        setmenCinco={setmenCinco}
        menCinco={menCinco}
        >

        </ItemsTrayectos>}

        <MenuBar setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} ocultarMenu={ocultarMenu} rutasEnElMapa={data} rutasTrayectoria={rutasTrayectoria}
        visualizarRutas={visualizarRutas} verRutasTrayecto={verRutasTrayecto} setVerTrayectoria={setVerTrayectoria}
        setIdRutaAMostrar={setIdRutaAMostrar} ocultarTercerMenu={ocultarTercerMenu} coordenadasOrigenSecundario={coordenadasOrigenSecundario} setVerParadasCercanas={setVerParadasCercanas} secionIniciada={secionIniciada}
        setMostrarItemMenuUno={setMostrarItemMenuUno} setOcultarMenu={setOcultarMenu} setOcultarTercerMenu={setOcultarTercerMenu}
        setVerRutasCercanas={setVerRutasCercanas} setVerCompetencia={setVerCompetencia} setOcultarTrayecto={setOcultarTrayecto} height={height} width={width}
        obtenerRutas={obtenerRutas} identificadorKey={identificadorKey}
        menUno={menUno} setmenUno={setmenUno} menDos={menDos} setmenDos={setmenDos} menTres={menTres} setmenTres={setmenTres} menCuatro={menCuatro} setmenCuatro={setmenCuatro} menCinco={menCinco} setmenCinco={setmenCinco}
        verParadasCercanas={verParadasCercanas} userLocation={userLocation}
        setCoordenadasOrigenSecundario={setCoordenadasOrigenSecundario} setSecionIniciada={setSecionIniciada} setTipoDeUsuario={setTipoDeUsuario}
        permitirEnviarUbicacion={permitirEnviarUbicacion} setMostrarBarraSecundariaDeUbicacion={setMostrarBarraSecundariaDeUbicacion} refCambiarLupa={refCambiarLupa}
        activarPrecision={activarPrecision} setActivarPrecision={setActivarPrecision} tipoDeUsuario={tipoDeUsuario} 
        serMostrarVentana={serMostrarVentana} cargando={cargando} setCargando={setCargando} idRutaAMostrar={idRutaAMostrar}        
        setMostrarMenusBuenEstado={setMostrarMenusBuenEstado}
        ></MenuBar>
  
        
        {loguearse==true && <Login setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} setTipoDeSubscripcion={setTipoDeSubscripcion} setCambiarPassword={setCambiarPassword} setTipoDeUsuario={setTipoDeUsuario} setSecionIniciada={setSecionIniciada} setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} setLosguearTransportista={setLosguearTransportista} height={height} width={width} 
        setIdUsuarioIniciado={setIdUsuarioIniciado} setUsuarioLogueado={setUsuarioLogueado} setTokenGeoRutas={setTokenGeoRutas} setConfirmarCodigo={setConfirmarCodigo} setEmailState={setEmailState} setTokenState={setTokenState} setComprarSuscripcionT={setComprarSuscripcionT} setDatosDelUsuarioSinSuscripcion={setDatosDelUsuarioSinSuscripcion}></Login>}
        {confirmarCodigo==true &&<ConfirmarCodigo setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} height={height} width={width} setConfirmarCodigo={setConfirmarCodigo}></ConfirmarCodigo>}
        {cambiarPassword==true && <CambiarPassword setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} height={height} width={width} setCambiarPassword={setCambiarPassword}></CambiarPassword>}
        

        {verAdministrarUsuarios==true && <AdministrarUsuarios purchase={purchase} setPurchase={setPurchase} comprarProducto={comprarProducto} setSecionIniciada={setSecionIniciada} setTipoDeUsuario={setTipoDeUsuario} setLoguearse={setLoguearse} setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} refrescar={refrescar}setRefrescar={setRefrescar} setChoferAEditar={setChoferAEditar} setEmailDelChoferEditar={setEmailDelChoferEditar} setEditarInfoDelChofer={setEditarInfoDelChofer} 
        nombre={nombreAdmin} setVerAdministrarUsuarios={setVerAdministrarUsuarios} tiempoDesdeLaUltimaSuscripcion={tiempoDesdeLaUltimaSuscripcion}
        height={height} width={width} emailState={emailState} tokenState={tokenState} idFacturaOApellidos={idFacturaOApellidos}></AdministrarUsuarios>}
        {editarInfoDelChofer==true && <EditarUsuario setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} refrescar={refrescar}setRefrescar={setRefrescar} emailState={emailState} tokenState={tokenState} choferAEditar={choferAEditar} emailDelChoferEditar={emailDelChoferEditar} setEditarInfoDelChofer={setEditarInfoDelChofer} height={height} width={width} ></EditarUsuario>}
        {registrarse==true && <Register setConfirmarCodigo={setConfirmarCodigo} setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} emailState={emailState} tokenState={tokenState} setEditarPerfil={setEditarPerfil} editarPerfil={editarPerfil} setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} 
        height={height} width={width}></Register>}
        {mostrarAlerta==true && <AlertComponet width={width} urlDeLaAplicacion={urlDeLaAplicacion} setTipoDeAlerta={setTipoDeAlerta} tipoDeAlert={tipoDeAlerta} setMostrarAlerte={setMostrarAlerte} AlerMensaje={mensajeAlerta} height={height}></AlertComponet>}

        {darBienvenida==true && <BVAplicacion setDarBienvenida={setDarBienvenida} height={height} width={width}></BVAplicacion>}
        {secionIniciada==true && justificarUbicacion==true && <JustificarUbicacion setPedirUbicacionSegundoPlano={setPedirUbicacionSegundoPlano} setMensajeAlerta={setMensajeAlerta} setMostrarAlerte={setMostrarAlerte} setPedirUbicacion={setPedirUbicacion} tipoDeUsuario={tipoDeUsuario} setJustificarUbicacion={setJustificarUbicacion} height={height} width={width}></JustificarUbicacion>}
        {pedirUbicacionSegundoPlano==2 && <BGPermisos setMostrarAlerte={setMostrarAlerte} setPedirUbicacionSegundoPlano={setPedirUbicacionSegundoPlano} height={height} width={width}></BGPermisos>}
        {comprarSuscripcionT==true && <Compras tiempoDesdeLaUltimaSuscripcion={tiempoDesdeLaUltimaSuscripcion} purchase={purchase} setPurchase={setPurchase} comprarProducto={comprarProducto} setTipoDeSubscripcion={setTipoDeSubscripcion} setTokenGeoRutas={setTokenGeoRutas} setTokenState={setTokenState} setEmailState={setEmailState} datosDelUsuarioSinSuscripcion={datosDelUsuarioSinSuscripcion} setComprarSuscripcionT={setComprarSuscripcionT} setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} 
                                        height={height} width={width} setLoguearse={setLoguearse} setSecionIniciada={setSecionIniciada} setTipoDeUsuario={setTipoDeUsuario} setIdUsuarioIniciado={setIdUsuarioIniciado} setIdUsuarioIniciadoCode={setIdUsuarioIniciadoCode} idFacturaOApellidos={idFacturaOApellidos}></Compras>}
        {mostrarAnuncioCompleto==true && <InterstitialADS VERSIONDELAPLICACION={VERSIONDELAPLICACION} enviarTiempoDesdeElUltimoAnuncio={enviarTiempoDesdeElUltimoAnuncio} setMostrarAnuncioCompleto={setMostrarAnuncioCompleto}></InterstitialADS>}
        {mostrarAnuncioRewarded==true && <RewardedADS VERSIONDELAPLICACION={VERSIONDELAPLICACION} setMostrarComprasPasajeros={setMostrarComprasPasajeros} enviarTiempoDesdeElUltimoAnuncio={enviarTiempoDesdeElUltimoAnuncio} setMostrarAnuncioRewarded={setMostrarAnuncioRewarded}></RewardedADS>}
        {mostrarComprasPasajeros==true && <ComprasUsuariosPasajeros tiempoDesdeLaUltimaSuscripcion={tiempoDesdeLaUltimaSuscripcion} idFacturaOApellidos={idFacturaOApellidos} datosDelUsuarioSinSuscripcion={datosDelUsuarioSinSuscripcion} comprarProducto={comprarProducto} purchase={purchase} setPurchase={setPurchase} setEliminarAnuncios={setEliminarAnuncios} eliminarAnuncios={eliminarAnuncios} setMostrarComprasPasajeros={setMostrarComprasPasajeros} setMostrarAlerte={setMostrarAlerte} height={height} width={width} setMensajeAlerta={setMensajeAlerta} setLoguearse={setLoguearse} setSecionIniciada={setSecionIniciada} setTipoDeSubscripcion={setTipoDeSubscripcion}
                                            setTipoDeUsuario={setTipoDeUsuario} setMostrarAnuncioRewarded={setMostrarAnuncioRewarded} setmenDos={setmenDos} setMostrarItemMenuUno={setMostrarItemMenuUno} setIdRutaAMostrar={setIdRutaAMostrar} setOcultarTrayecto={setOcultarTrayecto} setVerRutasCercanas={setVerRutasCercanas}
                                            ></ComprasUsuariosPasajeros>}
        {mostrarInformacion==true && emailState=='nestorgtd27@gmail.com' && <MostrarInformacion setMostrarInformacion={setMostrarInformacion} refrescarHistorial={refrescarHistorial} height={height} width={width} historial={historial} purchase={purchaseTxt}></MostrarInformacion>}
    </View>

  );
}

export default App;