import * as react from 'react';
import { View,Image,Text, TouchableHighlightBase, TouchableOpacity} from 'react-native';
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
                ,tipoDeUsuario,serMostrarVentana,cargando,setCargando,idRutaAMostrar
            })=>{
    

    const [verPerfil,setVerPerfil]=react.useState('none'); 
    
    useEffect(()=>{
        serMostrarVentana(verPerfil);
    },[verPerfil])
    
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
    <View style={[{height:(height>width)?width*0.2:height*0.2,backgroundColor:'blue'}]}>
        {(cargando==true && (menUno[0].display == 'flex' || menDos[0].display == 'flex' || menTres[0].display == 'flex')) 
        && <View style={[{position:'absolute', zIndex:240
                ,backgroundColor:'#103070',opacity:0.7, height:'300%', width: (height>width)?width*0.2:height*0.2,top:'-300%'},
                menUno[0].display == 'flex' && {left:(height<width)?(width*0.2-height*0.2)/2:0}
                ,menDos[0].display == 'flex' && {left:(height<width)?width*0.2+(width*0.2-height*0.2)/2:width*0.2}
                ,menTres[0].display == 'flex' && {left:(height<width)?3*width*0.2+(width*0.2-height*0.2)/2:3*width*0.2}]}>
        </View>}
        {cargando==true && <View style={{position:'absolute', zIndex:240
                ,backgroundColor:'#103070',opacity:0.7, height:'100%', width:'100%',top:0}}>
        </View>}

        {/* {verPerfil=='flex' && <Perfil tipoDeUsuario={tipoDeUsuario} activarPrecision={activarPrecision} setActivarPrecision={setActivarPrecision} permitirEnviarUbicacion={permitirEnviarUbicacion} secionIniciada={secionIniciada} setSecionIniciada={setSecionIniciada} 
        setTipoDeUsuario={setTipoDeUsuario} tipoDePerfil={[{principal:{width:'100%',height:height+StatusBar.currentHeight-width*0.2,position:'absolute',top:-1*(height-width*0.2),left:0,zIndex:200,backgroundColor:'#00000045'}
        }]} actualizar={setVerPerfil} setLoguearse={setLoguearse} setRegistrarse={setRegistrarse}></Perfil>} */}
             

            <View style={{ flexDirection: 'row', height: '100%', width: '100%' }} >
                <View style={[styles.container,{ backgroundColor: '#102769' }]}>
                    <TouchableOpacity style={[{height:'60%',width:(height>width)?width*0.2*0.8:height*0.2*0.8,backgroundColor: menUno[0].color,
                     borderRadius:15,alignItems:'center',justifyContent:'center'}]}
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