import * as React from 'react';
import { StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Inicio from './components/Inicio.jsx';
import Login from './components/Login.jsx';
//import LoginTransportistas from './components/LoginTransportistas.jsx';
import { useQuery, queryKey } from 'react-query';
import MenuBar from './components/MenuBar.jsx';
import Register from './components/Register.jsx';
import getAllRutas from './data/rutasManagua.js';
import { NativeModules } from 'react-native';
import useTrayectoria from './src/hooks/useTrayectoria.jsx';


export default function App() {
    const [loguearse,setLoguearse]=React.useState(true);
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
    const [coordenadasDestino, setCoordenadasDestino]=React.useState({latitude:12.143833235026133,longitude:-86.2169248983264});
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
    
    
    //const todasLasRutas=getAllRutas();

    // const obtenerRutas=(key)=>{
    //     const resultados=[];
    //     const tiempos=[];
    //     const transportes=[];
    //     const idUsuarios=[];
            
    
    //     //console.log(rutasEnElMapa);
    //     for(let k=0;k<rutasEnElMapa.length;k++){
    //         if(rutasEnElMapa[k].id_Idetificador==(key)){
    //             resultados.push(rutasEnElMapa[k]);
    //             tiempos.push(rutasEnElMapa[k].tiempoDeLlegada);
    //             //transportes.push(rutasEnElMapa[k]);
                
    //             transportes.push({color:rutasEnElMapa[k].color, direccionParadaInicial:rutasEnElMapa[k].direccionParadaInicial, 
    //                              id_Ruta:rutasEnElMapa[k].id_Ruta, nombre:todasLasRutas.filter(elemento => elemento.id_Ruta==rutasEnElMapa[k].id_Ruta)[0].nombre, 
    //                              latitudParadaUsuarioComun:rutasEnElMapa[k].latitudParadaUsuarioComun,longitudParadaUsuarioComun:rutasEnElMapa[k].longitudParadaUsuarioComun,
    //                              id_ParadaUsuarioComun:rutasEnElMapa[k].id_ParadaUsuarioComun,id_ParadaFinal:rutasEnElMapa[k].id_ParadaFinal,id_Usuario:rutasEnElMapa[k].id_Usuario,
    //                              latitudParadaFinal:rutasEnElMapa[k].latitudParadaFinal,longitudParadaFinal:rutasEnElMapa[k].longitudParadaFinal,
    //                              longitudUsuarioComun:rutasEnElMapa[k].longitudUsuarioComun,latitudUsuarioComun:rutasEnElMapa[k].latitudUsuarioComun});
    //         //console.log(todasLasRutas.filter(elemento => elemento.id_Ruta==2));
                
    //             idUsuarios.push({id_Usuario:rutasEnElMapa[k].id_Usuario,id_Ruta:rutasEnElMapa[k].id_Ruta});
    //         }
    //     }
    
    //     setRutasTrayectoria(resultados);
    //     setVisualizarRutas(key);      
    //     setVerRutasTrayecto(!verRutasTrayecto);
    
    //     setTiemposRutasTrayectorias(tiempos);        
    
    //     setIconosTransportes(transportes);
    //     setIdUsuariosDeTrayectoria(idUsuarios);
    //     //console.log(nombresIconosTransportes);
    //     //Esto llega vacio a inicio putp, luego se llena y aun asi no sirve

    //   }

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

      const {height,width}=useWindowDimensions();

      let alturaTotal=height+StatusBar.currentHeight;

    //   const { CustomModule }=NativeModules;

    //   const hadleNativeFuntion=async()=>{
        
    //     console.log(CustomModule);
        
    //     let name="Nestor Daniel Gonzalez Trujillo";
    //     const result=await CustomModule.customEvent(name);
  
    //     console.log(result);
    //   }

    //   useEffect(()=>{
    //     hadleNativeFuntion();
    //   },[])
    const {data,obtenerRutas} = useTrayectoria(coordenadasOrigen,coordenadasDestino,setRutasTrayectoria,setVisualizarRutas,
      setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto,identificadorKey);

      const [menUno, setmenUno] = React.useState([{ display: 'none',color:'#102769' }]);
      const [menDos, setmenDos] = React.useState([{ display: 'none',color:'#102769' }]);
      const [menTres, setmenTres] = React.useState([{ display: 'none',color:'#102769' }]);
      const [menCuatro, setmenCuatro] = React.useState([{ display: 'flex',color:'#101043' }]);
      const [menCinco, setmenCinco] = React.useState([{ display: 'none',color:'#102769' }]);

      const [userLocation,setUserLocatio]=React.useState({latitude:0,longitude:0});    

  return (
    // <View style={{height:alturaTotal, width:width}}>
    <View style={{flex:1}}>
      
        <StatusBar barStyle={'dark-content'} backgroundColor={"#00000045"} translucent={true}></StatusBar>      

        <Inicio setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} setCoordenadasOrigen={setCoordenadasOrigen} tipoDeUsuario={tipoDeUsuario}
        setVerTrayectoria={setVerTrayectoria} setOcultarMenu={setOcultarMenu} coordenadasOrigen={coordenadasOrigen} coordenadasDestino={coordenadasDestino}
        setCoordenadasDestino={setCoordenadasDestino} mostrarItemMenuUno={mostrarItemMenuUno} verTrayectoria={verTrayectoria} iconosTransportes={iconosTransportes}
        tiemposRutasTrayectorias={tiemposRutasTrayectorias} verParadasCercanas={verParadasCercanas} setCoordenadasOrigenSecundario={setCoordenadasOrigenSecundario}
        setOcultarTercerMenu={setOcultarTercerMenu} setVerParadasCercanas={setVerParadasCercanas} coordenadasOrigenSecundario={coordenadasOrigenSecundario}
        direccionesPorUsuario={direccionesPorUsuario} setDireccionPorUsuario={setDireccionPorUsuario} idRutaAMostrar={idRutaAMostrar} setMostrarSniperCargando={setMostrarSniperCargando} idUsuarioIniciado={idUsuarioIniciado}
        verTransportistasPorLaDerecha={verTransportistasPorLaDerecha} setVerTransportistasPorLaDerecha={setVerTransportistasPorLaDerecha} verTransportistasPorLaIzquierda={verTransportistasPorLaIzquierda} 
        setVerTransportistasPorLaIzquierda={setVerTransportistasPorLaIzquierda} mostrarSniperCargando={mostrarSniperCargando} idUsuariosDeTrayectoria={idUsuariosDeTrayectoria}
        rutasEnElMapa={data} identificadorKey={identificadorKey} secionIniciada={secionIniciada} verCompetencia={verCompetencia} setVerCompetencia={setVerCompetencia}
        verRutasCercanas={verRutasCercanas} setVerRutasCercanas={setVerRutasCercanas} ocultarTrayecto={ocultarTrayecto} setOcultarTrayecto={setOcultarTrayecto} height={height} width={width}
        permitirEnviarUbicacion={permitirEnviarUbicacion} setPermitirEnviarUbicacion={setPermitirEnviarUbicacion}
        obtenerRutas={obtenerRutas} menUno={menUno} setmenUno={setmenUno} menDos={menDos} setmenDos={setmenDos} menTres={menTres} setmenTres={setmenTres} menCuatro={menCuatro} 
        setmenCuatro={setmenCuatro} menCinco={menCinco} setmenCinco={setmenCinco} userLocation={userLocation} setUserLocatio={setUserLocatio}
        setSecionIniciada={setSecionIniciada} setTipoDeUsuario={setTipoDeUsuario}
        ></Inicio>

        <MenuBar setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} ocultarMenu={ocultarMenu} rutasEnElMapa={data} rutasTrayectoria={rutasTrayectoria}
        visualizarRutas={visualizarRutas} verRutasTrayecto={verRutasTrayecto} setVerTrayectoria={setVerTrayectoria}
        setIdRutaAMostrar={setIdRutaAMostrar} ocultarTercerMenu={ocultarTercerMenu} coordenadasOrigenSecundario={coordenadasOrigenSecundario} setVerParadasCercanas={setVerParadasCercanas} secionIniciada={secionIniciada}
        setMostrarItemMenuUno={setMostrarItemMenuUno} setOcultarMenu={setOcultarMenu} setOcultarTercerMenu={setOcultarTercerMenu}
        setVerRutasCercanas={setVerRutasCercanas} setVerCompetencia={setVerCompetencia} setOcultarTrayecto={setOcultarTrayecto} height={height} width={width}
        obtenerRutas={obtenerRutas} identificadorKey={identificadorKey}
        menUno={menUno} setmenUno={setmenUno} menDos={menDos} setmenDos={setmenDos} menTres={menTres} setmenTres={setmenTres} menCuatro={menCuatro} setmenCuatro={setmenCuatro} menCinco={menCinco} setmenCinco={setmenCinco}
        verParadasCercanas={verParadasCercanas} userLocation={userLocation}
        setCoordenadasOrigenSecundario={setCoordenadasOrigenSecundario} setSecionIniciada={setSecionIniciada} setTipoDeUsuario={setTipoDeUsuario}
        permitirEnviarUbicacion={permitirEnviarUbicacion}
        ></MenuBar>


        
        {loguearse==true && <Login setTipoDeUsuario={setTipoDeUsuario} setSecionIniciada={setSecionIniciada} setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} setLosguearTransportista={setLosguearTransportista} height={height} width={width} 
        setIdUsuarioIniciado={setIdUsuarioIniciado} setUsuarioLogueado={setUsuarioLogueado} ></Login>}
       {/* {loguearTransportista==true && <LoginTransportistas setLosguearTransportista={setLosguearTransportista} setRegistrarse={setRegistrarse} setSecionIniciada={setSecionIniciada} setLoguearse={setLoguearse} setTipoDeUsuario={setTipoDeUsuario}
        setIdUsuarioIniciado={setIdUsuarioIniciado} setUsuarioLogueado={setUsuarioLogueado} height={height} width={width}></LoginTransportistas>} */}

        {/* //DEBES ELIMINAR EL COMPONENTE QUE SE ENCIENTRA EN LA PARTE SUPERIOR */}

        {registrarse==true && <Register setLoguearse={setLoguearse} setRegistrarse={setRegistrarse} height={height} width={width}></Register>}
    </View>
  );
}




//Restringe la puto distancia minima entre paradas