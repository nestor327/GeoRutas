import * as React from 'react';
import { Linking, ScrollView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Inicio from './components/Inicio.jsx';
import Login from './components/Login.jsx';
//import LoginTransportistas from './components/LoginTransportistas.jsx';
import { useQuery, queryKey } from 'react-query';
import MenuBar from './components/MenuBar.jsx';
import Register from './components/Register.jsx';
import getAllRutas from './data/rutasManagua.js';
import { NativeModules } from 'react-native';
import useTrayectoria from './src/hooks/useTrayectoria.jsx';

import RutasBarItem from './components/RutasBarItem.jsx';
import IntercambiosRutas from './components/IntercambiosRutas.jsx';
import ParadasCercaDelOrigen from './components/ParadasCercaDeUbicacion.jsx';
import { getNombre, getRutasFavoritas, getTokenGeoRutasCode, getUsuario, setRutasFavoritas, setTipoDeMenbresiaCode, setTipoDeUsuarioCode, setTokenGeoRutasCode } from './data/asyncStorageData.js';
import ConfirmarCodigo from './components/ConfirmarCodigo.jsx';
import CambiarPassword from './components/CambiarPassword.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdministrarUsuarios from './components/AdministrarUsuarios.jsx';

import SplashScreen from 'react-native-splash-screen';
import EditarUsuario from './components/ComponentesParaAdmins/EditarUsuario.jsx';
import AlertComponet from './components/AlertComponent.jsx';


export default function App() {

    const [VERSIONDELAPLICACION,SETVERSIONDELAPLICACION]=React.useState(1);
    const [estadoAplicacion, setEstadoAplicacion]=React.useState(true);

    const verificarVersionDeLaAplicacion=async()=>{

        let datos=null;
        try{
            datos=await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/VersionesDeLaAplicacion').then(res => datos=res.json());
            console.log(datos);
        }catch{
            datos=null;
            console.log("No se logro acceder a los datos");
        }

        if(datos!=null && datos.id_Version!=0 && datos.id_Version!=-1){            

            let fecha=new Date(datos.fechaDeExpiracion);
            let fechaNueva=new Date();
            console.log(fecha);
            console.log(fechaNueva);
            if(VERSIONDELAPLICACION!=datos.numeroDeVersion && fechaNueva<fecha){                
                setMensajeAlerta("Actualiza la aplicacion, esta version caduca el: "+fecha.toLocaleDateString());
                setMostrarAlerte(true);
                setTipoDeAlerta('E');
            }else if(fechaNueva>=fecha && VERSIONDELAPLICACION!=datos.numeroDeVersion){
                setMensajeAlerta("Actualiza la aplicacion, esta version caduco el: "+fecha.toLocaleDateString());
                setMostrarAlerte(true);
                setTipoDeAlerta('F');
            }

        }        
    }

    React.useEffect(()=>{
        if(estadoAplicacion==true){
            verificarVersionDeLaAplicacion();
        }
    },[estadoAplicacion])

    const [loguearse,setLoguearse]=React.useState(false);
    const [tipoDeUsuario, setTipoDeUsuario]=React.useState("Ninguno");

    const [secionIniciada, setSecionIniciada]=React.useState(false);
      
    const [registrarse,setRegistrarse]=React.useState(false);

    const [loguearTransportista, setLosguearTransportista]=React.useState(false);

    const [idUsuarioIniciado, setIdUsuarioIniciado]=React.useState(-1);

    const [usuarioLogueado, setUsuarioLogueado]=React.useState({});

    const [permitirEnviarUbicacion, setPermitirEnviarUbicacion]=React.useState(false);
    
/** {"latitude": , "longitude": }
 LOG  Las coordenas del destino son:
 LOG  {"latitude": , "longitude": } */

    const [coordenadasOrigen, setCoordenadasOrigen]=React.useState({latitude:12.153800313208755,longitude:-86.30149193108082});
    const [coordenadasDestino, setCoordenadasDestino]=React.useState({latitude:12.134261,longitude:-86.269897});
    //const [coordenadasOrigen, setCoordenadasOrigen]=React.useState({latitude:12.147148643476557,longitude:-86.21404554694891});
    //const [coordenadasDestino, setCoordenadasDestino]=React.useState({latitude:12.155924,longitude:-86.302363});

    const [idUsuariosDeTrayectoria, setIdUsuariosDeTrayectoria]=React.useState([]);


    // const Gets=async ({queryKey}) =>{
  
    //     let url='https://georutas.somee.com/api/SP_PCalcularMenorRutaEnFuncionDelTiempoModificado/'+queryKey[1].latitude
    //     +','+queryKey[1].longitude+','+queryKey[2].latitude+','+queryKey[2].longitude;
  
    //     try{
    //       data=await fetch(url).then(res =>
    //         res.json()
    //       )        
    //     }catch(e){          
    //       data=[]
    //     }
    //     return data;
    //   }
      
    // let {data, error, isLoading,isError, isSuccess,status}=useQuery(["gets",coordenadasOrigen,coordenadasDestino],Gets,{
    //     refetchInterval:2000,
    //     cacheTime:2000
    // });


    

    const [rutasTrayectoria,setRutasTrayectoria]=React.useState([]);
    const [visualizarRutas,setVisualizarRutas]=React.useState(1);
    const verRutasTrayecto=React.useRef(false);

    const [tiemposRutasTrayectorias,setTiemposRutasTrayectorias]=React.useState([]);
    const [iconosTransportes,setIconosTransportes]=React.useState([]);
    
    const identificadorKey=React.useRef(0);
    const refCambiarLupa=React.useRef(false);
  
      const [verTrayectoria,setVerTrayectoria]=React.useState(true);
      const [ocultarMenu, setOcultarMenu]=React.useState(true);
      const [mostrarItemMenuUno, setMostrarItemMenuUno]=React.useState(true);
      const [verParadasCercanas,setVerParadasCercanas]=React.useState([{observar:false,latitude:12.155924,longitude:-86.302363,direccion:'K',id_Ruta:1}]);
      const [coordenadasOrigenSecundario, setCoordenadasOrigenSecundario]=React.useState({latitude:12.135744,longitude:-86.261872});
      const [ocultarTercerMenu, setOcultarTercerMenu]=React.useState(false);
      const [direccionesPorUsuario, setDireccionPorUsuario]=React.useState('K');
      const [idRutaAMostrar, setIdRutaAMostrar]=React.useState(-1);
      const [mostrarSniperCargando, setMostrarSniperCargando]=React.useState(false);

      const [verTransportistasPorLaDerecha, setVerTransportistasPorLaDerecha]=React.useState(false);
      const [verTransportistasPorLaIzquierda, setVerTransportistasPorLaIzquierda]=React.useState(false);
      const [verCompetencia, setVerCompetencia]=React.useState(false);
      const [verRutasCercanas, setVerRutasCercanas]=React.useState(false);
      const [ocultarTrayecto, setOcultarTrayecto]=React.useState(false);

      
      const [emailState, setEmailState]=React.useState("");
      const [tokenState, setTokenState]=React.useState("");

      const {height,width}=useWindowDimensions();

      let alturaTotal=height+StatusBar.currentHeight;

      const {data,obtenerRutas} = useTrayectoria(coordenadasOrigen,coordenadasDestino,setRutasTrayectoria,setVisualizarRutas,
      setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto,identificadorKey,emailState,tokenState);

      const [menUno, setmenUno] = React.useState([{ display: 'none',color:'#102769' }]);
      const [menDos, setmenDos] = React.useState([{ display: 'none',color:'#102769' }]);
      const [menTres, setmenTres] = React.useState([{ display: 'none',color:'#102769' }]);
      const [menCuatro, setmenCuatro] = React.useState([{ display: 'flex',color:'#101043' }]);
      const [menCinco, setmenCinco] = React.useState([{ display: 'none',color:'#102769' }]);

      const [userLocation,setUserLocatio]=React.useState({latitude:0,longitude:0});    

      const [mostrarBarraSecundariaDeUbicacion, setMostrarBarraSecundariaDeUbicacion]=React.useState(false);
      const [activarPrecision, setActivarPrecision]=React.useState(true);
      const [mostrarVentana,serMostrarVentana]=React.useState('none');

      const [cargando, setCargando]=React.useState(false);

      let todasLasRutasData=getAllRutas();
      const [todasLasRutasCompetencia, setTodasLasRutasCompetencia]=React.useState(getAllRutas());
      const [rutasSeleccionadasCompetencia, setRutasSeleccionadasCompetencia]=React.useState([]);

      const [tokenGeoRutas,setTokenGeoRutas]=React.useState("");
      const [confirmarCodigo,setConfirmarCodigo]=React.useState(false);
      const [cambiarPassword,setCambiarPassword]=React.useState(false);
      const [tipoDeSubscripcion,setTipoDeSubscripcion]=React.useState('C');
      const [verAdministrarUsuarios, setVerAdministrarUsuarios]=React.useState(false);

      const [nombreAdmin,setNombreAdmin]=React.useState();//Esto es practicamente forzado

      const [editarPerfil,setEditarPerfil]=React.useState(false);
      const [emailDelChoferEditar, setEmailDelChoferEditar]=React.useState("");
      const [editarInfoDelChofer, setEditarInfoDelChofer]=React.useState(false);
      const [choferAEditar,setChoferAEditar]=React.useState(
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

        const [refrescar,setRefrescar]=React.useState(false);
        const [mostrarAlerta, setMostrarAlerte]=React.useState(false);
        const [mensajeAlerta, setMensajeAlerta]=React.useState("Ocurrio un error");
        const [tipoDeAlerta, setTipoDeAlerta]=React.useState('C');



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

      React.useEffect(()=>{     
        SplashScreen.hide();   
        obtenerToken();
        getRutasFavoritas(setRutasSeleccionadasCompetencia);
        getTokenGeoRutasCode(setTokenGeoRutas);
        getNombre(setNombreAdmin);
      },[])

      React.useEffect(()=>{
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
        // console.log("El token que envias es: "+token);
        // console.log("El correo que envias es: "+email);
        // console.log("El id que envias es: "+idUsuarioIniciado);

        //%  %  
        //%25 %25

        if(tipoDeSubscripcion=='K'){
            //alert("Renueve su subscripcion");
        }
        
        try{
            let url='http://georutas.us-east-2.elasticbeanstalk.com/api/RefrescarToken?Email='+email+'&Token='+token;
            
            //Al momento de guardarlo en la base de datos, no debes de guardarlo con la misma estructura

            usuario=await fetch(url).then(res=>usuario=res.json());
            //usuario=await fetch(url);
            console.log("El usuario es: ");
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
        }else{
            setTokenState(usuario.token);
            setTokenGeoRutasCode(usuario.token);
        }
    }

    React.useEffect(()=>{
        SplashScreen.hide();
        if(emailState.length>2){
            refrescarToken(emailState,tokenState);
        }
    },[idRutaAMostrar,visualizarRutas])

  return (
     <View style={{height:alturaTotal, width:width}}>
    {/* //<View style={{flex:1}}> */}
      
        {/* <StatusBar barStyle={'dark-content'} backgroundColor={"#00000045"} translucent={true}></StatusBar>       */}


        
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
        setMensajeAlerta={setMensajeAlerta}        
        ></Inicio>
        
        <View style={{height:0,width:width,padding:0}}>
                <View style={[menDos, { left:(height<width)?width*0.2+(width*0.2-height*0.2)/2:width*0.2, 
                width: (height>width)?width*0.2:height*0.2,zIndex:1000,  position: 'absolute', 
                top:-width*0.6, backgroundColor: '#102769',height:width*0.6 }]}
                >
                <ScrollView
                >
                {
                    todasLasRutasData.map((item,i)=>{
                        return(                            
                            <View key={i} onTouchEnd={()=>{                                
                                setIdRutaAMostrar(i+1);
                                //setMostrarSniperCargando(false);
                            }}                            
                            >
                            { i>=0 && <RutasBarItem color={item.color} numeroDeRuta={item.nombre}
                                tiempoDeLlegada={'1231'}>
                                </RutasBarItem>            }           

                            </View>
                        )})}
                </ScrollView>
            </View>

            {ocultarMenu==true && <View style={[menUno, {left:(height<width)?(width*0.2-height*0.2)/2:0, 
          width: (height>width)?width*0.2:height*0.2, height: width*0.6, position: 'absolute', 
          bottom: 0, backgroundColor: '#102769' }]}>
                  <ScrollView>
                      
                      <IntercambiosRutas rutasEnElMapa={data} rutasTrayectoria={rutasTrayectoria} visualizarRutas={visualizarRutas} 
                      verRutasTrayecto={verRutasTrayecto} obtenerRutas={obtenerRutas}
                      setVerTrayectoria={setVerTrayectoria}
                      setVerRutasCercanas={setVerRutasCercanas} setVerCompetencia={setVerCompetencia} setOcultarTrayecto={setOcultarTrayecto}
                      identificadorKey={identificadorKey} refCambiarLupa={refCambiarLupa} setCargando={setCargando}
                      ></IntercambiosRutas>

                  </ScrollView>
          </View>}


          {ocultarTercerMenu==true && <View style={[menTres, { left:(height<width)?3*width*0.2+(width*0.2-height*0.2)/2:3*width*0.2, 
          width: (height>width)?width*0.2:height*0.2, 
          height: width*0.6, position: 'absolute', bottom:0, backgroundColor: '#102769' }]}>
                <ScrollView>
                {
                    <ParadasCercaDelOrigen emailState={emailState} tokenState={tokenState} lalitude={coordenadasOrigenSecundario.latitude} longitude={coordenadasOrigenSecundario.longitude} setVerParadasCercanas={setVerParadasCercanas}></ParadasCercaDelOrigen>
                }
                </ScrollView>
            </View>}



        </View>

        

        

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
        ></MenuBar>
  
        
        {loguearse==true && <Login setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} setTipoDeSubscripcion={setTipoDeSubscripcion} setCambiarPassword={setCambiarPassword} setTipoDeUsuario={setTipoDeUsuario} setSecionIniciada={setSecionIniciada} setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} setLosguearTransportista={setLosguearTransportista} height={height} width={width} 
        setIdUsuarioIniciado={setIdUsuarioIniciado} setUsuarioLogueado={setUsuarioLogueado} setTokenGeoRutas={setTokenGeoRutas} setConfirmarCodigo={setConfirmarCodigo} setEmailState={setEmailState} setTokenState={setTokenState}></Login>}
        {confirmarCodigo==true &&<ConfirmarCodigo setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} height={height} width={width} setConfirmarCodigo={setConfirmarCodigo}></ConfirmarCodigo>}
        {cambiarPassword==true && <CambiarPassword setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} height={height} width={width} setCambiarPassword={setCambiarPassword}></CambiarPassword>}
        {/* {loguearTransportista==true && <LoginTransportistas setLosguearTransportista={setLosguearTransportista} setRegistrarse={setRegistrarse} setSecionIniciada={setSecionIniciada} setLoguearse={setLoguearse} setTipoDeUsuario={setTipoDeUsuario}
        setIdUsuarioIniciado={setIdUsuarioIniciado} setUsuarioLogueado={setUsuarioLogueado} height={height} width={width}></LoginTransportistas>} */}

        {/* //DEBES ELIMINAR EL COMPONENTE QUE SE ENCIENTRA EN LA PARTE SUPERIOR */}

        {verAdministrarUsuarios==true && <AdministrarUsuarios setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} refrescar={refrescar}setRefrescar={setRefrescar} setChoferAEditar={setChoferAEditar} setEmailDelChoferEditar={setEmailDelChoferEditar} setEditarInfoDelChofer={setEditarInfoDelChofer} nombre={nombreAdmin} setVerAdministrarUsuarios={setVerAdministrarUsuarios} height={height} width={width} emailState={emailState} tokenState={tokenState}></AdministrarUsuarios>}
        {editarInfoDelChofer==true && <EditarUsuario setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} refrescar={refrescar}setRefrescar={setRefrescar} emailState={emailState} tokenState={tokenState} choferAEditar={choferAEditar} emailDelChoferEditar={emailDelChoferEditar} setEditarInfoDelChofer={setEditarInfoDelChofer} height={height} width={width} ></EditarUsuario>}
        {registrarse==true && <Register setConfirmarCodigo={setConfirmarCodigo} setMostrarAlerte={setMostrarAlerte} setMensajeAlerta={setMensajeAlerta} emailState={emailState} tokenState={tokenState} setEditarPerfil={setEditarPerfil} editarPerfil={editarPerfil} setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} 
        height={height} width={width}></Register>}
        {mostrarAlerta==true && <AlertComponet setTipoDeAlerta={setTipoDeAlerta} tipoDeAlert={tipoDeAlerta} setMostrarAlerte={setMostrarAlerte} AlerMensaje={mensajeAlerta} height={height}></AlertComponet>}
    </View>
  );
}




//Restringe la puto distancia minima entre paradas