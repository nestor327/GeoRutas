import * as react from 'react';
import Perfil from './Perfil.jsx';
import IntercambiosRutas from './IntercambiosRutas.jsx';
import { ScrollView, View,Image,Text, TouchableHighlightBase, TouchableOpacity, StatusBar } from 'react-native';
import getAllRutas from '../data/rutasManagua.js';
import RutasBarItem from './RutasBarItem.jsx';
import ParadasCercaDelOrigen from './ParadasCercaDeUbicacion.jsx';
import styles from '../componentStyles/menuBarStyles.js';
import { useEffect } from 'react';

const MenuBar=({setLoguearse,setRegistrarse,ocultarMenu,rutasEnElMapa,rutasTrayectoria,visualizarRutas,verRutasTrayecto
                ,setVerTrayectoria,setIdRutaAMostrar,ocultarTercerMenu,coordenadasOrigenSecundario
                ,setVerParadasCercanas,secionIniciada,setMostrarItemMenuUno,setOcultarMenu,setOcultarTercerMenu
                ,obtenerRutas
                ,setVerRutasCercanas,setVerCompetencia,setOcultarTrayecto,height,width,identificadorKey

                ,menUno,setmenUno,menDos, setmenDos,menTres, setmenTres,menCuatro, setmenCuatro,menCinco, setmenCinco
                ,verParadasCercanas,userLocation,setCoordenadasOrigenSecundario,setSecionIniciada, setTipoDeUsuario
                ,permitirEnviarUbicacion, setMostrarBarraSecundariaDeUbicacion,refCambiarLupa,activarPrecision,setActivarPrecision
                ,tipoDeUsuario,serMostrarVentana
            })=>{
    
    // const {data,obtenerRutas} = useTrayectoria(coordenadasOrigen,coordenadasDestino,setRutasEnElMapa,rutasEnElMapa,setRutasTrayectoria,setVisualizarRutas,
    //                     setVerRutasTrayecto,setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto);
    const [verPerfil,setVerPerfil]=react.useState('none'); 
    
    useEffect(()=>{
        serMostrarVentana(verPerfil);
    },[verPerfil])

    // const [menUno, setmenUno] = react.useState([{ display: 'none',color:'#102769' }]);
    // const [menDos, setmenDos] = react.useState([{ display: 'none',color:'#102769' }]);
    // const [menTres, setmenTres] = react.useState([{ display: 'none',color:'#102769' }]);
    // const [menCuatro, setmenCuatro] = react.useState([{ display: 'flex',color:'#101043' }]);
    // const [menCinco, setmenCinco] = react.useState([{ display: 'none',color:'#102769' }]);

    let todasLasRutasData=getAllRutas();
    
    const resultado = () => {
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
            setVerPerfil('none');
        }
        return false;
    }



  return (
    <View style={{height:(height>width)?width*0.2:height*0.2}}>
        {/* {verPerfil=='flex' && <Perfil tipoDeUsuario={tipoDeUsuario} activarPrecision={activarPrecision} setActivarPrecision={setActivarPrecision} permitirEnviarUbicacion={permitirEnviarUbicacion} secionIniciada={secionIniciada} setSecionIniciada={setSecionIniciada} 
        setTipoDeUsuario={setTipoDeUsuario} tipoDePerfil={[{principal:{width:'100%',height:height+StatusBar.currentHeight-width*0.2,position:'absolute',top:-1*(height-width*0.2),left:0,zIndex:200,backgroundColor:'#00000045'}
        }]} actualizar={setVerPerfil} setLoguearse={setLoguearse} setRegistrarse={setRegistrarse}></Perfil>} */}

             {ocultarMenu==true && <View style={[menUno, {left:(height<width)?(width*0.2-height*0.2)/2:0, width: (height>width)?width*0.2:height*0.2, height: '300%', position: 'absolute', top: '-300%', backgroundColor: '#102769' }]}>
                <ScrollView>
                    
                    <IntercambiosRutas rutasEnElMapa={rutasEnElMapa} rutasTrayectoria={rutasTrayectoria} visualizarRutas={visualizarRutas} 
                    verRutasTrayecto={verRutasTrayecto} obtenerRutas={obtenerRutas}
                    setVerTrayectoria={setVerTrayectoria}
                    setVerRutasCercanas={setVerRutasCercanas} setVerCompetencia={setVerCompetencia} setOcultarTrayecto={setOcultarTrayecto}
                    identificadorKey={identificadorKey} refCambiarLupa={refCambiarLupa}
                    ></IntercambiosRutas>

                </ScrollView>
            </View>}

            <View style={[menDos, { left:(height<width)?width*0.2+(width*0.2-height*0.2)/2:width*0.2, width: (height>width)?width*0.2:height*0.2, height: '300%', position: 'absolute', top: '-300%', backgroundColor: '#102769' }]}>
                <ScrollView>
                { todasLasRutasData!=undefined && todasLasRutasData.length>0 &&
                
                    todasLasRutasData.map((item,i)=>{
                        return(                            
                            <View key={i} onTouchEnd={()=>{
                                setIdRutaAMostrar(i+1);
                                //setMostrarSniperCargando(false);
                            }}>
                                <RutasBarItem color={item.color} numeroDeRuta={item.nombre}
                                tiempoDeLlegada={'1231'}>
                                </RutasBarItem>                       
                            </View>
                        )})
                    
                }
                </ScrollView>
            </View>

            {ocultarTercerMenu==true && <View style={[menTres, { left:(height<width)?3*width*0.2+(width*0.2-height*0.2)/2:3*width*0.2, width: (height>width)?width*0.2:height*0.2, height: '300%', position: 'absolute', top: '-300%', backgroundColor: '#102769' }]}>
                <ScrollView>
                {
                    <ParadasCercaDelOrigen lalitude={coordenadasOrigenSecundario.latitude} longitude={coordenadasOrigenSecundario.longitude} setVerParadasCercanas={setVerParadasCercanas}></ParadasCercaDelOrigen>
                }
                </ScrollView>
            </View>}

            <View style={{ flexDirection: 'row', height: '100%', width: '100%' }} >
                <View style={[styles.container, { backgroundColor: '#102769' }]}>
                    <TouchableOpacity style={{height:'60%',width:(height>width)?width*0.2*0.8:height*0.2*0.8,backgroundColor: menUno[0].color, borderRadius:15,alignItems:'center',justifyContent:'center'}}
                        onPress={() => {
                            if(secionIniciada==true){
                                
                                if (menUno[0].display == 'none' && resultado() == false) {
                                    setmenUno([{ display: 'flex',color:'#101043' }]);
                                    setMostrarItemMenuUno(true);
                                    setIdRutaAMostrar(-1);
                                } else {
                                    setmenUno([{ display: 'none',color:'#102769' }]);
                                    setmenCuatro([{ display: 'flex',color:'#101043'}]);                           
                                    //setMostrarItemMenuUno(false);
                                }
                                //RutasTrayectorias(setRutasEnElMapa);    
                                setOcultarMenu(true);       
                                setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);
                                //console.log(userLocation);
                                setMostrarBarraSecundariaDeUbicacion(true);
                            }else{
                                setLoguearse(true);
                            }
                            
                        }}>
                        <Image source={require('../assets/rutasChulada7.png')}  
                        style={{height:'90%',width:(height>width)?width*0.2*0.8*0.675:height*0.2*0.8*0.675}}/>
                    </TouchableOpacity>
                    
                    
                    <Text style={{color:'white'}}>Trayectos</Text>
                </View>

                <View style={[styles.container, { backgroundColor: '#102769' }]}>
                    <TouchableOpacity style={{height:'60%',width:(height>width)?width*0.2*0.8:height*0.2*0.8,backgroundColor: menDos[0].color, borderRadius:15,alignItems:'center',justifyContent:'center'}}
                        onPress={() => {                    
                    
                            if(secionIniciada==true){
                                if (menDos[0].display == 'none' && resultado() == false) {
                                    setmenDos([{ display: 'flex',color:'#101043' }]);                
                                    setMostrarItemMenuUno(false);                        
                                } else {
                                    setmenDos([{ display: 'none',color:'#102769'}]);
                                    setmenCuatro([{ display: 'flex',color:'#101043'}]);   
                                }
                                setOcultarTrayecto(false);
                                setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);                                
                                setMostrarBarraSecundariaDeUbicacion(false);
                            }else{
                                setLoguearse(true);
                            }
        
                        }}>
                        
                        {menDos[0].display=='flex' && <Image source={require('../assets/TodasLasRutasv2.jpg')} style={{height:'90%',width:(height>width)?width*0.2*0.8*0.675:height*0.2*0.8*0.675, borderRadius:27}}/>}
                        {menDos[0].display=='none' && <Image source={require('../assets/TodasLasRutas.jpg')} style={{height:'90%',width:(height>width)?width*0.2*0.8*0.675:height*0.2*0.8*0.675, borderRadius:27}}/>}

                    </TouchableOpacity>    
                    <Text style={{color:'white'}}>Todas</Text>
                </View>

                <View style={[styles.container, { backgroundColor: '#102769' }]}>
                
                        <TouchableOpacity style={{height:'60%',width:(height>width)?width*0.2*0.8:height*0.2*0.8,backgroundColor: menCuatro[0].color, borderRadius:15,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{
                            if(secionIniciada==true){
                                if (menCuatro[0].display == 'none' && resultado() == false) {
                                    setmenCuatro([{ display: 'flex',color:'#101043' }]);                        
                                    setMostrarItemMenuUno(false);  
                                    setIdRutaAMostrar(-1);
                                }   
                                setOcultarTrayecto(false);                                
                            }else{
                                setLoguearse(true);
                            }                 
                        }}>
                            <Image source={require('../assets/mundo.png')} 
                            style={{height:'80%',width:(height>width)?width*0.2*0.8*0.6:height*0.2*0.8*0.6, borderRadius:27}} />
                        </TouchableOpacity>
                        
                        <Text style={{color:'white'}}>Inicio</Text>

                </View>

                <View style={[styles.container, { backgroundColor: '#102769' }]}>
                    <TouchableOpacity style={{height:'60%',width:(height>width)?width*0.2*0.8:height*0.2*0.8,backgroundColor: menTres[0].color, borderRadius:15,alignItems:'center',justifyContent:'center'}}
                    onPress={() => {
                        if(secionIniciada==true){
                            
                            if(userLocation.latitude!=0 
                                && userLocation.longitude>-86.430191 && userLocation.longitude<-86.109765
                                && userLocation.latitude<12.195666 && userLocation.latitude>12.066094){
                                setCoordenadasOrigenSecundario(userLocation);
                                console.log("En teoria se actualizo");
                            }

                            if (menTres[0].display == 'none' && resultado() == false) {
                                setmenTres([{ display: 'flex',color:'#101043'  }]); 
                                setMostrarItemMenuUno(false);    
                                setIdRutaAMostrar(-1);                     
                            } else {
                                setmenTres([{ display: 'none',color:'#102769'  }]);
                                setmenCuatro([{ display: 'flex',color:'#101043'}]);                      
                            }
                            setOcultarTrayecto(false);
                            //setVerParadasCercanas(...{...{observar:false}})
                            setVerParadasCercanas([{observar:true,latitude:verParadasCercanas[0].latitude,longitude:verParadasCercanas[0].longitude,direccion:verParadasCercanas[0].direccion,id_Ruta:verParadasCercanas[0].id_Ruta}]);
                            setOcultarTercerMenu(true);    
                            setMostrarBarraSecundariaDeUbicacion(false);                        
                        }else{
                            setLoguearse(true);
                        }
                        
                    }}>
                        {menTres[0].display=='flex' && <Image source={require('../assets/siguientesv2.png')} style={{height:'90%',width:(height>width)?width*0.2*0.8*0.675:height*0.2*0.8*0.675, borderRadius:28}} />}
                        {menTres[0].display=='none' &&<Image source={require('../assets/siguientes.png')} style={{height:'90%',width:(height>width)?width*0.2*0.8*0.675:height*0.2*0.8*0.675, borderRadius:28}} />}
                    </TouchableOpacity>
                    <Text style={{color:'white'}}>Siguientes</Text>
                </View>

                <View style={[styles.container, { backgroundColor: '#102769' }]}>
                    <TouchableOpacity style={{height:'60%',width:(height>width)?width*0.2*0.8:height*0.2*0.8,backgroundColor: menCinco[0].color, borderRadius:15,alignItems:'center',justifyContent:'center'}}
                    onPress={()=>{
                    
                    
                        if(verPerfil=='none')
                        {
                            setVerPerfil('flex');
                        }else
                        {
                            setVerPerfil('none');
                        }
                        
                        if(secionIniciada==true){
                            if (menCinco[0].display == 'none' && resultado() == false) {
                                setmenCinco([{ display: 'flex',color:'#101043'}]);
                                setMostrarItemMenuUno(false);
                                setIdRutaAMostrar(-1);
                            } else {
                                setmenCinco([{ display: 'none',color:'#102769'}]);
                                setmenCuatro([{ display: 'flex',color:'#101043'}]);   
                            }
                            setOcultarTrayecto(false);
                            setVerParadasCercanas([{observar:false,latitude:coordenadasOrigenSecundario.latitude,longitude:coordenadasOrigenSecundario.longitude,direccion:'K',id_Ruta:1}]);                            
                        }
    
                    }}>
                        {menCinco[0].display=='flex' && <Image source={require('../assets/usuario.png')} style={{height:'90%',width:(height>width)?width*0.2*0.8*0.675:height*0.2*0.8*0.675, borderRadius:27}} />}
                        {menCinco[0].display=='none' && <Image source={require('../assets/usuariov2.png')} style={{height:'90%',width:(height>width)?width*0.2*0.8*0.675:height*0.2*0.8*0.675, borderRadius:27}} />}
                    </TouchableOpacity>
                    <Text style={{color:'white'}}>Perfil</Text>
                </View>
            </View>

    </View>
  );
}
export default MenuBar