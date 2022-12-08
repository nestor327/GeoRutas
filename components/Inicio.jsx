import React, { useEffect,useRef, useState  } from 'react'
import { View,Text, Platform, StatusBar, ActivityIndicator, Image, TextInput, TouchableOpacity, Keyboard} from 'react-native';
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
    ,refCambiarLupa})=>{
    



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
            askLocationPermissionSetting
        }=useLocation(permitirEnviarUbicacion,tipoDeUsuario,idUsuarioIniciado,direccionesPorUsuario,userLocation,setUserLocatio);

    const [mostrarVentana,serMostrarVentana]=useState('none');    
    const [mostrarUsuarios, setMostrarUsuarios]=useState(false);
    const [mostrarParadas, serMostrarParadas]=useState(false);
    const [usuarioTransportista,setUsuarioTransportista]=useState({});    
    const [paradasCompletas, setParadasCompletas]=useState([]);
    const [rutasParadas,setRutasParadas]=useState([]);
    const [pausarEnvioDeUbicaciones,serPausarEnvioDeUbicaciones]=useState(false);

    const [actualizarDestino, setActualizarDestino]=useState({latitude:0,longitude:0});
    const [actualizarOrigen,setActualizarOrigen]=useState({latitude:0,longitude:0});

    const [tipoDeModificacionDeLugar, setTipoDeModificacionDeLugar]=useState('Destino');
    const [verRecomendacionesDeUbicaciones, setVerRecomendacionesDeUbicacion]=useState(false);



    const refMapView=useRef();
    const refFollowing=useRef(true);
    const [refChangeLocation,setrefChangeLocation]=useState({latitude:0, longitude:0});
    const refEnvioDeUbicacionesPasajero=useRef(true);
    const refInputAutoComplete=useRef();
    const refNombreDelDestino=useRef("Desconocido");
    const refNombreDelOrigen=useRef("Desconocido");
        
    const capturarUsuarioTransportistaYDemas=async()=>{
        console.log("El puto numero es: "+idUsuarioIniciado);
        setUsuarioTransportista(await fetch('https://georutas.somee.com/api/UsuariosTransporte/'+idUsuarioIniciado).then(res=>datos=res.json()));
        setParadasCompletas(await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json()));
        setRutasParadas(await fetch('https://georutas.somee.com/api/RutasParada').then(res=>datos=res.json()));        
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

        
    // if(hasLocation==false){
    //     return <ActivityIndicator></ActivityIndicator>
    // }else{
    //     //console.log(inicialPosition);
    // }

    useEffect(()=>{
        if(pausarEnvioDeUbicaciones==false && tipoDeUsuario=='Transportista'){
            actualizarUbicacionEnElBackEnd(usuarioTransportista,paradasCompletas,rutasParadas,userLocation);            
            serPausarEnvioDeUbicaciones(true);
        }else if(tipoDeUsuario=='Pasajero' && refEnvioDeUbicacionesPasajero.current==false){            
            refEnvioDeUbicacionesPasajero.current=true;
            setrefChangeLocation(userLocation);
        }

        
    },[userLocation,usuarioTransportista])

    useEffect(()=>{
        
        let k=0;
        if(idUsuarioIniciado>0 && usuarioTransportista.estado=='A' && tipoDeUsuario=='Transportista' && pausarEnvioDeUbicaciones==true){
            k=setInterval(()=>{
                serPausarEnvioDeUbicaciones(false);
            },2500)
        }else if(tipoDeUsuario=='Pasajero'){
            k=setInterval(()=>{
                refEnvioDeUbicacionesPasajero.current=false;                
            },2500)
        }
        
        
        return ()=>{
            clearInterval(k);            
        }        

    },[usuarioTransportista,tipoDeUsuario])

    useEffect(()=>{
        if(idUsuarioIniciado>0){
            capturarUsuarioTransportistaYDemas();
            askLocationPermission();
            askLocationPermissionSetting();
        }
        
    },[idUsuarioIniciado,permitirEnviarUbicacion])

    useEffect(()=>{
        
        if(userLocation.latitude!=0 
            && userLocation.longitude>-86.430191 && userLocation.longitude<-86.109765
            && userLocation.latitude<12.195666 && userLocation.latitude>12.066094){
                setCoordenadasOrigen(userLocation);
        }

        return ()=>{
            stopFollowUserLocation();
        }
    },[])


    useEffect(()=>{
          
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
        if(secionIniciada==false){
                setTipoDeUsuario("Ninguno");
                serMostrarVentana('none');     
                refFollowing.current=false;
                stopFollowUserLocation();
                setVerCompetencia(false);
                setVerRutasCercanas(false);
                setVerTrayectoria(false);                         
                setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);
                
                if (menUno[0].display == 'flex' ) {
                    setmenUno([{display:'none',color:'#102769'}]);
                } else if(menDos[0].display == 'flex'){
                    setmenDos([{display:'none',color:'#102769'}]);
                }else if(menTres[0].display == 'flex'){
                    setmenTres([{display:'none',color:'#102769'}]);
                }else if(menCinco[0].display=='flex'){
                    setmenCinco([{display:'none',color:'#102769'}])                    
                }
                setmenCuatro([{ display: 'flex',color:'#101043' }]);
        }
    },[secionIniciada])

    let urlDeLosIconos=urlDeLasImagenesEstaticas();
    let urlDeLasBajadas=urlDeLasImagenesParadaBajar();
    let urlDeLasSubidas=urlDeLasImagenesParadaSubir();

    const [permitirSeguirPasajero, setPermitirSeguirPasajero]=useState(false);

    useEffect(()=>{
        if(actualizarDestino.latitude==0){
            return;
        }
        setCoordenadasDestino(actualizarDestino);
        refCambiarLupa.current=true;
    },[actualizarDestino])

    useEffect(()=>{
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
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            
            if(refInputAutoComplete.current.isFocused()==true){
                setMostrarBarraSecundariaDeUbicacion(true);
                refInputAutoComplete.current.clear();
                if (menUno[0].display == 'flex' ) {
                    setmenUno([{display:'none',color:'#102769'}]);
                } else if(menDos[0].display == 'flex'){
                    setmenDos([{display:'none',color:'#102769'}]);
                }else if(menTres[0].display == 'flex'){
                    setmenTres([{display:'none',color:'#102769'}]);
                }else if(menCuatro[0].display=='flex'){
                    setmenCuatro([{display:'none',color:'#102769'}])
                }else if(menCinco[0].display=='flex'){
                    setmenCinco([{display:'none',color:'#102769'}])                    
                }
                //setmenUno([{ display: 'flex',color:'#101043' }]);
                setMostrarItemMenuUno(true);
                setIdRutaAMostrar(-1);
                setOcultarMenu(true);       
                setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);
                // setMostrarUsuarios(false);
                // setVerTransportistasPorLaDerecha(false);
                // setVerTransportistasPorLaIzquierda(false);
            }
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            //Esto es cuando el teclado desaparece            
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, [tipoDeModificacionDeLugar]);


  return(
    <View style={{height:(height>width)?(height-width*0.2-StatusBar.currentHeight):height*0.8-StatusBar.currentHeight,width:'100%', backgroundColor:'#2060A5'}}>
        
        <IconosDeNavegacion
        setPermitirEnviarUbicacion={setPermitirEnviarUbicacion} idUsuarioIniciado={idUsuarioIniciado} setMostrarUsuarios={setMostrarUsuarios}
        setVerTransportistasPorLaDerecha={setVerTransportistasPorLaDerecha} setVerTransportistasPorLaIzquierda={setVerTransportistasPorLaIzquierda}
        serMostrarParadas={serMostrarParadas} obtenerRutas={obtenerRutas}
        identificadorKey={identificadorKey} setVerCompetencia={setVerCompetencia} setOcultarTrayecto={setOcultarTrayecto}setVerRutasCercanas={setVerRutasCercanas}
        verTransportistasPorLaDerecha={verTransportistasPorLaDerecha} idRutaAMostrar={idRutaAMostrar} mostrarUsuarios={mostrarUsuarios}
        permitirEnviarUbicacion={permitirEnviarUbicacion} tipoDeUsuario={tipoDeUsuario} mostrarItemMenuUno={mostrarItemMenuUno} verTrayectoria={verTrayectoria}
        verCompetencia={verCompetencia} verRutasCercanas={verRutasCercanas} verTransportistasPorLaIzquierda={verTransportistasPorLaIzquierda}
        centrePosition={centrePosition} siguiendoAlUsuario={siguiendoAlUsuario} askLocationPermission={askLocationPermission} followUseLocation={followUseLocation}
        stopFollowUserLocation={stopFollowUserLocation} permitirSeguirPasajero={permitirSeguirPasajero} setPermitirSeguirPasajero={setPermitirSeguirPasajero}
        setVerTrayectoria={setVerTrayectoria} ocultarTrayecto={ocultarTrayecto} permisos={permisos} usuarioTransportista={usuarioTransportista}
        askLocationPermissionSetting={askLocationPermissionSetting}
        ></IconosDeNavegacion>




        <View style={[{width:'90%',zIndex:100,top:height*0.08-StatusBar.currentHeight,position:'absolute', 
        backgroundColor:'#2060A5',flexDirection:'row',marginLeft:'5%',borderTopRightRadius:20, 
        borderTopLeftRadius:20},mostrarBarraSecundariaDeUbicacion==false && {borderBottomRightRadius:20,borderBottomLeftRadius:20}]}>

            <TouchableOpacity 
                onPress={()=>{

                    if(mostrarBarraSecundariaDeUbicacion==false){
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
                            if (menUno[0].display == 'flex' ) {
                                setmenUno([{display:'none',color:'#102769'}]);
                            } else if(menDos[0].display == 'flex'){
                                setmenDos([{display:'none',color:'#102769'}]);
                            }else if(menTres[0].display == 'flex'){
                                setmenTres([{display:'none',color:'#102769'}]);
                            }else if(menCuatro[0].display=='flex'){
                                setmenCuatro([{display:'none',color:'#102769'}])
                            }else if(menCinco[0].display=='flex'){
                                setmenCinco([{display:'none',color:'#102769'}])                    
                            }                            
                            setMostrarItemMenuUno(true);
                            setIdRutaAMostrar(-1);
                            setMostrarUsuarios(false);
                            setVerTransportistasPorLaDerecha(false);
                            setVerTransportistasPorLaIzquierda(false);
                        } else {
                            setmenUno([{ display: 'none',color:'#102769' }]);
                            setmenCuatro([{ display: 'flex',color:'#101043'}]);                           
                            //setMostrarItemMenuUno(false);
                        }
                            
                        
                        //RutasTrayectorias(setRutasEnElMapa);    
                        setOcultarMenu(true);       
                        setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);
                        
                    }else{                        
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
                <Image 
                //require('../assets/Citycons_bus_icon-icons.com_67914.png')
                    source={(tipoDeModificacionDeLugar=='Destino')?require("../assets/paradaFinal.png"):require("../assets/UsuarioPersona.png")}
                    style={{width:37, height:37,marginLeft:7,marginTop:7,marginBottom:7,backgroundColor:'#f1f1f1',borderRadius:20,marginRight:7}}>
                </Image>
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
                        backgroundColor:'#2060A5',
                        marginTop:8,
                        marginBottom:3,
                        color:'black',
                        placeholderTextColor:'gray'
                    },
                    textInput: {                        
                        placeholderTextColor:'gray',
                        backgroundColor: '#dcdcdc',
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
                    console.log(data);
                    console.log(details);
                    // console.log("Mierda");

                    if(details!=null){
                        
                        console.log(details.geometry.location.lat +" n "+details.geometry.location.lng);

                        let latitude=details.geometry.location.lat;
                        let longitude=details.geometry.location.lng;

                        refMapView.current?.animateCamera({
                            center:{ latitude,longitude}//{latitude:,latitude:}
                        })
                        console.log("Se debio de actualizar");
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

                        if (menUno[0].display == 'flex' ) {
                            setmenUno([{display:'none',color:'#102769'}]);
                        } else if(menDos[0].display == 'flex'){
                            setmenDos([{display:'none',color:'#102769'}]);
                        }else if(menTres[0].display == 'flex'){
                            setmenTres([{display:'none',color:'#102769'}]);
                        }else if(menCuatro[0].display=='flex'){
                            setmenCuatro([{display:'none',color:'#102769'}])
                        }else if(menCinco[0].display=='flex'){
                            setmenCinco([{display:'none',color:'#102769'}])                    
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
                    if (menUno[0].display == 'flex' ) {
                        setmenUno([{display:'none',color:'#102769'}]);
                    } else if(menDos[0].display == 'flex'){
                        setmenDos([{display:'none',color:'#102769'}]);
                    }else if(menTres[0].display == 'flex'){
                        setmenTres([{display:'none',color:'#102769'}]);
                    }else if(menCuatro[0].display=='flex'){
                        setmenCuatro([{display:'none',color:'#102769'}])
                    }else if(menCinco[0].display=='flex'){
                        setmenCinco([{display:'none',color:'#102769'}])                    
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
                }                
                }}>
                
                <Image 
                    //source={require('../assets/Sukuna.jpg')} 
                    source={(mostrarBarraSecundariaDeUbicacion==true)?require('../assets/x_icon_imagen.png'):require('../assets/Sukuna.jpg')}
                    style={[{width:37, height:37,marginLeft:7,marginRight:7, borderRadius:20,marginTop:7,marginBottom:7,
                    },(mostrarBarraSecundariaDeUbicacion==true) && {tintColor:'#f1f1f1',marginRight:10,marginLeft:4}]}>
                </Image>
            </View>
    </View>
    
    {mostrarBarraSecundariaDeUbicacion==true && <View style={{width:(mostrarBarraSecundariaDeUbicacion==true)?'90%':12,zIndex:90,top:height*0.08+47-StatusBar.currentHeight
    ,position:'absolute', backgroundColor:'#2060A5',flexDirection:'row',marginLeft:'5%',
        borderBottomLeftRadius:20,borderBottomRightRadius:20,alignItems:'flex-start',paddingBottom:0,paddingTop:5}}>
            
            <TouchableOpacity 
                onPress={()=>{
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
                }}
            >
                <Image 
                //require('../assets/Citycons_bus_icon-icons.com_67914.png')
                    source={(tipoDeModificacionDeLugar=='Destino')?require("../assets/UsuarioPersona.png"):require("../assets/paradaFinal.png")}
                    style={{marginBottom:8,marginLeft:6.5,backgroundColor:'#f1f1f1',borderRadius:20,marginRight:6.5
                    ,marginTop:1,width:36,height:36}}>
                </Image>
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
                        setVerRecomendacionesDeUbicacion(!verRecomendacionesDeUbicaciones);

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
                            setVerRecomendacionesDeUbicacion(false);
                            refMapView.current?.animateCamera({
                                center:{...coordenadasOrigen}
                            })
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
                            setVerRecomendacionesDeUbicacion(false);
                            refMapView.current?.animateCamera({
                                center:{...coordenadasDestino}
                            })
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
                        borderColor: '#c8c7cc',
                        borderBottomWidth: 0.5,
                        color:'black',
                        alignContent:'center',
                        color:'black',
                        paddingLeft:15,
                        marginBottom:0,
                        height:40}}

                        onPress={()=>{
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
                        }}
                    >
                        <Text style={{color:'black',fontSize:15}}>Tu ubicación</Text>
                    </TouchableOpacity>}
                </View>}

            </View>}

        {mostrarBarraSecundariaDeUbicacion==true && <TouchableOpacity
            onPress={()=>{
                if(menUno[0].display=='none'){
                    setmenUno([{ display: 'flex',color:'#101043' }]);
                    setMostrarItemMenuUno(true);
                    setIdRutaAMostrar(-1);
                    setOcultarMenu(true);       
                    setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);                        
                }else{                    
                    setmenUno([{ display: 'none',color:'#102769' }]);
                    setmenCuatro([{ display: 'flex',color:'#101043'}]);                          
                }
                

            }}
        >
                <Image 
                //require('../assets/Citycons_bus_icon-icons.com_67914.png')
                    source={(refCambiarLupa.current==true)?require("../assets/lupaRota.png"):require("../assets/lupa.png")}
                    style={{marginBottom:0,width:40, height:40,marginRight:7,backgroundColor:'#2060A5',borderRadius:20,
                        borderWidth:2,borderColor:'#2060A5',marginLeft:7}}>                    
                </Image>
        </TouchableOpacity>}
    </View>}
        




        {mostrarVentana=="flex" && <Perfil permitirEnviarUbicacion={permitirEnviarUbicacion} secionIniciada={secionIniciada} setSecionIniciada={setSecionIniciada} setTipoDeUsuario={setTipoDeUsuario} setRegistrarse={setRegistrarse} setLoguearse={setLoguearse} tipoDePerfil={[{principal:{width:'100%',height:height-width*0.2,position:'absolute',top:0,left:0,zIndex:200,backgroundColor:'#00000045'}}]} actualizar={serMostrarVentana}></Perfil>}
        
        {<MapView

        ref={(el)=>{
            refMapView.current=el;
        }}

        initialRegion={{latitude:inicialPosition.latitude,
                        longitude:inicialPosition.longitude
                        ,latitudeDelta:0.04,longitudeDelta:0.04}}

        style={{width:'100%',height:'100%'}}
        
        //Esta vaina genero problemas en el primer renderizado, sirve para usar google map en IOS
        provider={PROVIDER_GOOGLE} 
        
        showsUserLocation={(tipoDeUsuario=="Pasajero" && permitirSeguirPasajero==true)?true:false}
        showsMyLocationButton={false}

        onTouchStart={
            ()=>{
                refFollowing.current=false;                
                if (menUno[0].display == 'flex' ) {
                    setmenUno([{display:'none',color:'#102769'}]);
                } else if(menDos[0].display == 'flex'){
                    setmenDos([{display:'none',color:'#102769'}]);
                }else if(menTres[0].display == 'flex'){
                    setmenTres([{display:'none',color:'#102769'}]);
                }else if(menCinco[0].display=='flex'){
                    setmenCinco([{display:'none',color:'#102769'}])                    
                }
                setmenCuatro([{ display: 'flex',color:'#101043' }]);
                refInputAutoComplete.current.blur();
                setMostrarBarraSecundariaDeUbicacion(false);
            }
        }
        >
            {/*Este no sera necesario despues de todo, debido a que ya esta el marcador que necesitabamos*/}
            {/* {tipoDeUsuario=="Pasajero" && userLocation.latitude!=undefined && userLocation.latitude!=0 && <Marker coordinate={{
                latitude:refChangeLocation.latitude,
                longitude:refChangeLocation.longitude,
                latitudeDelta:0.01,
                longitudeDelta:0.04
                }} icon={require("../assets/usuarioFinal.png")}>
                    
            </Marker>} */}

            {mostrarItemMenuUno==true && verRutasCercanas==false && verCompetencia==false &&
            <View>
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
                        source={require("../assets/UsuarioPersona.png")}
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
                        //console.log(nombresIconosTransportes);                      
                        }
                
                    }
                    coordinate={{latitude:coordenadasDestino.latitude,
                        longitude:coordenadasDestino.longitude,
                        latitudeDelta:0.02,
                        longitudeDelta:0.05}}
                        draggable={true} icon={require("../assets/paradaFinal.png")}
                        style={{width:50,height:50}}>
                </Marker>
            </View>}

            {ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true &&
                    iconosTransportes.map((item, i)=>{
                        //latitude:coordenadasDestino.latitude,longitude:coordenadasDestino.longitude}
                        //,{latitude:item.longitudParadaFinal,longitude:item.latitudParadaFinal
                        
                    return(
                        <View key={(i)}>

                            <Marker coordinate={{
                            latitude:item.longitudUsuarioComun,
                            longitude:item.latitudUsuarioComun,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05
                        }} style={{alignItems:'center'}}>
                            {(item.direccionParadaInicial=='D') && <Text style={{color:'black'}}>{"⇛"+item.nombre}</Text>}
                            {(item.direccionParadaInicial=='I') && <Text style={{color:'black'}}>{"⇚"+item.nombre}</Text>}
                            {/* {(item.id_Ruta==2) && (item.direccionParadaInicial=='D') && <Text>{"⇛"+item.nombre}</Text>}
                            {(item.id_Ruta==2) && (item.direccionParadaInicial=='I') && <Text>{"⇚"+item.nombre}</Text>}
                            {(item.id_Ruta==3) && (item.direccionParadaInicial=='D') && <Text>{"⇛"+item.nombre}</Text>}                                                        
                            {(item.id_Ruta==3) && (item.direccionParadaInicial=='I') && <Text>{"⇚"+item.nombre}</Text>} */}
                            
                            {<Image style={{width:27,height:27}} source={urlDeLosIconos[item.id_Ruta-1]} ></Image>}
                            {/* {(item.id_Ruta==2) && <Image style={{width:27,height:27}} source={require("../assets/114c.png")} ></Image>}
                            {(item.id_Ruta==3) && <Image style={{width:27,height:27}} source={require("../assets/102c.png")} ></Image>}                             */}
                        
                            {<Text style={{color:'black'}}>{Math.floor(tiemposRutasTrayectorias[i]/3600)+":"+Math.floor(((tiemposRutasTrayectorias[i]-3600*(Math.floor(tiemposRutasTrayectorias[i]/3600)))/60))+":"+tiemposRutasTrayectorias[i]%60}</Text>}
                            
                        </Marker>

                            {<LineasTrayectorias iconoTrayectoItem={item} color={item.color}></LineasTrayectorias>}
                            {/* {(item.id_Ruta==2) && <LineasTrayectorias iconoTrayectoItem={item} color={"red"}></LineasTrayectorias>}
                            {(item.id_Ruta==3) && <LineasTrayectorias iconoTrayectoItem={item} color={"black"}></LineasTrayectorias>} */}

                            {iconosTransportes.length==(i+1) && <Marker coordinate={{                            
                            latitude:item.longitudParadaFinal,
                            longitude:item.latitudParadaFinal,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05}}>
                            {<Image style={{width:35,height:35}} source={urlDeLasBajadas[item.id_Ruta-1]} ></Image>}
                            {/*{(item.id_Ruta==2) && <Image style={{width:35,height:35}} source={require("../assets/114paradaBajar.png")} ></Image>}
                            {(item.id_Ruta==3) && <Image style={{width:35,height:35}} source={require("../assets/102aradaBajar.png")} ></Image>}*/}
                        </Marker>}
                        
                        <Marker coordinate={{                            
                            latitude:item.longitudParadaUsuarioComun,
                            longitude:item.latitudParadaUsuarioComun,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05}}>
                            {<Image style={{width:35,height:35}} source={urlDeLasSubidas[item.id_Ruta-1]} ></Image>}
                            {/* {(item.id_Ruta==2) && <Image style={{width:35,height:35}} source={require("../assets/114paradaSubir.png")} ></Image>}
                            {(item.id_Ruta==3) && <Image style={{width:35,height:35}} source={require("../assets/102paradaSubir.png")} ></Image>} */}
                        </Marker>

                            {i==0 && <Polyline lineCap={"butt"} coordinates={[{latitude:coordenadasOrigen.latitude,longitude:coordenadasOrigen.longitude},{latitude:item.longitudParadaUsuarioComun,longitude:item.latitudParadaUsuarioComun}]} color={"black"}></Polyline>}
                            {i==iconosTransportes.length-1 && <Polyline coordinates={[{latitude:coordenadasDestino.latitude,longitude:coordenadasDestino.longitude},{latitude:item.longitudParadaFinal,longitude:item.latitudParadaFinal}]} color={"black"}></Polyline>}                            
                        </View>
                    )
                })
            }

            {idRutaAMostrar>0 &&
                     <View>
                         {mostrarParadas==true && <DireccionesSegunUbicacion idRuta={idRutaAMostrar}></DireccionesSegunUbicacion>}
                         <LineaDeUnaRuta setMostrarSniperCargando={setMostrarSniperCargando} idRuta={idRutaAMostrar} ></LineaDeUnaRuta>
                         {mostrarUsuarios==true && <UsuariosTransportistas tipoDeUsuario={tipoDeUsuario} idRuta={idRutaAMostrar} idUsuarioIniciado={idUsuarioIniciado}
                         verTransportistasPorLaDerecha={verTransportistasPorLaDerecha} verTransportistasPorLaIzquierda={verTransportistasPorLaIzquierda}></UsuariosTransportistas>}                        
                     </View>
            }

            {mostrarItemMenuUno==true && secionIniciada==true && tipoDeUsuario=="Transportista" && verCompetencia==true && <CompetenciaTransportistas tipoDeUsuario={tipoDeUsuario} idUsuarioIniciado={idUsuarioIniciado}></CompetenciaTransportistas>}
            {mostrarItemMenuUno==true && secionIniciada==true && tipoDeUsuario=='Pasajero' && userLocation.latitude!=0 && verRutasCercanas==true &&  <RutasCercaDelPasajero userLocation ={userLocation}></RutasCercaDelPasajero>}

            {verParadasCercanas[0].observar==true && verParadasCercanas.map((item, i)=>{
            
            return(
                <View key={i}>

                    {item.direccion=='D' && <Marker coordinate={{latitude:item.latitude,
                    longitude:item.longitude,
                    latitudeDelta:0.02,
                    longitudeDelta:0.05}}
                    icon={require("../assets/parada-de-autobusDerecha.png")}></Marker>}

                    {item.direccion=='I' && <Marker coordinate={{latitude:item.latitude,
                    longitude:item.longitude,
                    latitudeDelta:0.02,
                    longitudeDelta:0.05}}
                    icon={require("../assets/parada-de-autobusIzquierda.png")}></Marker>}

                    {(item.direccion=='I' || item.direccion=='D') && <Polyline coordinates={[{latitude:item.latitude,longitude:item.longitude},
                    {latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude}]}></Polyline>}
                        
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
            {idUsuarioIniciado>0 && permitirEnviarUbicacion==true && tipoDeUsuario=="Transportista" && <UsuarioTransportistaLogueado direccionesPorUsuario={direccionesPorUsuario}
            setDireccionPorUsuario={setDireccionPorUsuario} idUsuarioIniciado={idUsuarioIniciado} userLocation={userLocation}></UsuarioTransportistaLogueado>}
            
        </MapView>}        
    </View>
  )
}

