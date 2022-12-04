import React, { useEffect,useRef, useState  } from 'react'
import { View,Text, Platform, StatusBar, ActivityIndicator, Image, TextInput} from 'react-native';
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

export default Inicio=({setLoguearse, setRegistrarse,mostrarItemMenuUno,setCoordenadasOrigen,tipoDeUsuario
    ,setVerTrayectoria,setOcultarMenu,coordenadasOrigen,coordenadasDestino,setCoordenadasDestino,verTrayectoria,iconosTransportes,tiemposRutasTrayectorias
    ,verParadasCercanas,setCoordenadasOrigenSecundario,setOcultarTercerMenu,setVerParadasCercanas,coordenadasOrigenSecundario,setDireccionPorUsuario
    ,idRutaAMostrar,setMostrarSniperCargando,idUsuarioIniciado,verTransportistasPorLaDerecha, setVerTransportistasPorLaDerecha
    , verTransportistasPorLaIzquierda,setVerTransportistasPorLaIzquierda,mostrarSniperCargando,direccionesPorUsuario,idUsuariosDeTrayectoria,rutasEnElMapa
    ,identificadorKey,secionIniciada,verCompetencia,setVerCompetencia,verRutasCercanas,setVerRutasCercanas,ocultarTrayecto, setOcultarTrayecto,height,width,
    obtenerRutas

    ,setPermitirEnviarUbicacion,permitirEnviarUbicacion

    ,menUno,setmenUno,menDos, setmenDos,menTres, setmenTres,menCuatro, setmenCuatro,menCinco, setmenCinco
    ,userLocation, setUserLocatio,setSecionIniciada, setTipoDeUsuario})=>{
    



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
            askLocationPermission
        }=useLocation(permitirEnviarUbicacion,tipoDeUsuario,idUsuarioIniciado,direccionesPorUsuario,userLocation,setUserLocatio);

    const [mostrarVentana,serMostrarVentana]=useState('none');    
    const [mostrarUsuarios, setMostrarUsuarios]=useState(false);
    const [mostrarParadas, serMostrarParadas]=useState(false);
    const [usuarioTransportista,setUsuarioTransportista]=useState({});    
    const [paradasCompletas, setParadasCompletas]=useState([]);
    const [rutasParadas,setRutasParadas]=useState([]);
    const [pausarEnvioDeUbicaciones,serPausarEnvioDeUbicaciones]=useState(false);

    const refMapView=useRef();
    const refFollowing=useRef(true);
    const [refChangeLocation,setrefChangeLocation]=useState({latitude:0, longitude:0});
    const refEnvioDeUbicacionesPasajero=useRef(true);
        
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
            let fecha= new Date();
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

  return(
    <View style={{width:'100%',height:(height>width)?(height-width*0.2):height*0.8, backgroundColor:'#2060A5'}}>
        
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
        ></IconosDeNavegacion>



        <View style={{height:40,width:'90%',zIndex:100,top:'8%',position:'absolute', 
        backgroundColor:'#2060A5',flexDirection:'row',marginLeft:'5%',marginRight:'5%',
        borderRadius:20,alignContent:'center',alignItems:'center'}}>
            <Image 
                source={require('../assets/Citycons_bus_icon-icons.com_67914.png')}
                style={{width:32, height:32,marginLeft:4}}>
            </Image>

            <TextInput placeholder="¿Adónde quieres ir?"style={{flex:1,marginLeft:4}}>
            </TextInput>

            <View onTouchEnd={()=>{
                serMostrarVentana('flex');                                 
            }}>
                
                <Image 
                    source={require('../assets/Sukuna.jpg')} 
                    style={{width:32, height:32,marginRight:4, borderRadius:16}}>
                </Image>
            </View>
        </View>
        
        {mostrarVentana=="flex" && <Perfil permitirEnviarUbicacion={permitirEnviarUbicacion} secionIniciada={secionIniciada} setSecionIniciada={setSecionIniciada} setTipoDeUsuario={setTipoDeUsuario} setRegistrarse={setRegistrarse} setLoguearse={setLoguearse} tipoDePerfil={[{principal:{width:'100%',height:height+StatusBar.currentHeight-width*0.2,position:'absolute',top:0,left:0,zIndex:200,backgroundColor:'#00000045'}}]} actualizar={serMostrarVentana}></Perfil>}
        
        {<MapView

        ref={(el)=>{
            refMapView.current=el;
        }}

        initialRegion={{latitude:inicialPosition.latitude,longitude:inicialPosition.longitude
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
                            {(item.direccionParadaInicial=='D') && <Text>{"⇛"+item.nombre}</Text>}
                            {(item.direccionParadaInicial=='I') && <Text>{"⇚"+item.nombre}</Text>}
                            {/* {(item.id_Ruta==2) && (item.direccionParadaInicial=='D') && <Text>{"⇛"+item.nombre}</Text>}
                            {(item.id_Ruta==2) && (item.direccionParadaInicial=='I') && <Text>{"⇚"+item.nombre}</Text>}
                            {(item.id_Ruta==3) && (item.direccionParadaInicial=='D') && <Text>{"⇛"+item.nombre}</Text>}                                                        
                            {(item.id_Ruta==3) && (item.direccionParadaInicial=='I') && <Text>{"⇚"+item.nombre}</Text>} */}
                            
                            {<Image style={{width:27,height:27}} source={urlDeLosIconos[item.id_Ruta-1]} ></Image>}
                            {/* {(item.id_Ruta==2) && <Image style={{width:27,height:27}} source={require("../assets/114c.png")} ></Image>}
                            {(item.id_Ruta==3) && <Image style={{width:27,height:27}} source={require("../assets/102c.png")} ></Image>}                             */}
                        
                            {<Text>{Math.floor(tiemposRutasTrayectorias[i]/3600)+":"+Math.floor(((tiemposRutasTrayectorias[i]-3600*(Math.floor(tiemposRutasTrayectorias[i]/3600)))/60))+":"+tiemposRutasTrayectorias[i]%60}</Text>}
                            
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

