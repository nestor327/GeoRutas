import React, { useEffect,useState } from "react"
import { Alert, ScrollView, StatusBar, View,TouchableOpacity,Image } from "react-native"
import IntercambiosRutas from "./IntercambiosRutas"
import ParadasCercaDelOrigen from "./ParadasCercaDeUbicacion"
import RutasBarItem from "./RutasBarItem"


const ItemsTrayectos=({height,width,todasLasRutasData,menDos,setIdRutaAMostrar,ocultarMenu,data,rutasTrayectoria,menUno
                        ,visualizarRutas,verRutasTrayecto,obtenerRutas,setVerTrayectoria,setVerRutasCercanas, setVerCompetencia,setOcultarTrayecto
                        ,identificadorKey, refCambiarLupa, setCargando,ocultarTercerMenu,menTres,emailState, tokenState, latitude, longitude
                        ,setVerParadasCercanas,setMostrarMenusBuenEstado,setmenUno,setmenDos,setmenTres,setmenCinco,setmenCuatro
                        ,setMostrarBarraSecundariaDeUbicacion,menCinco,modoOscuro,setMostrarCompañerosCercanos,fechaDeClicSalida, setFechaDeClicSalida
                        ,refMapView,setIniciarRecorridoDeLaTrayectoria,tipoDeSubscripcion,tipoDeUsuario,setMostrarLaLineaDeLaRutaQueComparte
                        ,verRutasTiempoReal, setVerRutasTiempoReal,setCoordenadasOrigen, coordenadasOrigen,setMostrarInstruccionesTrayectos,
                        mostrarInstruccionesTrayectos,setMostrarInstruccionesTodas, mostrarInstruccionesTodas, mostrarInstruccionesSiguientes, setMostrarInstruccionesSiguientes
                        })=>{

        const [fechaDeClicCambio, setFechaDeClicCambio]=useState(1679456668848);

        useEffect(()=>{
            setCargando(false);
            setFechaDeClicSalida(91);
        },[])

        useEffect(()=>{
            if(fechaDeClicSalida>fechaDeClicCambio || (fechaDeClicSalida==90 && fechaDeClicCambio==1679456668848)){

                let colorRes='#102769';
                if(modoOscuro){
                    colorRes='#151553';
                }

                if (menUno[0].display == 'flex' ) {
                    setmenUno([{display:'none',color:colorRes}]);
                    console.log("Aqui se esta mostrando la mierda");
                    console.log(fechaDeClicCambio);
                    console.log(fechaDeClicSalida);
                } else if(menDos[0].display == 'flex'){
                    setmenDos([{display:'none',color:colorRes}]);
                }else if(menTres[0].display == 'flex'){
                    setmenTres([{display:'none',color:colorRes}]);
                }
                setmenCuatro([{ display: 'flex',color:'#101043' }]);
                // setMostrarBarraSecundariaDeUbicacion(false);
                setMostrarMenusBuenEstado(false);
                setFechaDeClicSalida(91);
            }
        },[fechaDeClicCambio,fechaDeClicSalida])
        
    return(
        <View style={{width:'100%',height:(height>width)?height-width*0.2:height*0.8-StatusBar.currentHeight,position:'absolute',top:0,left:0,zIndex:140}}
            onTouchEnd={()=>{
                //setTipoDeClic(1);
                let fecha= new Date();
                setFechaDeClicSalida(fecha.getTime());                
                console.log("La mierda se propaga desde aqui");
            }}
            >
            <View style={{height:'100%',width:width,padding:0}}>
                <View style={[menDos, { left:(height<width)?width*0.2+(width*0.2-height*0.2)/2:width*0.2, borderTopEndRadius:5,borderTopStartRadius:5,
                width: (height>width)?width*0.2:height*0.2,zIndex:1000,  position: 'absolute', 
                top:(height>width)?height-width*0.8:height*0.6-height*0.2-StatusBar.currentHeight*0.8, 
                backgroundColor: '#102769',height:(height>width)?width*0.6:height*0.4 },modoOscuro && {backgroundColor:'#151553'}]}
                onTouchEnd={(e)=>{
                    e.stopPropagation();
                }}
                >

                <TouchableOpacity>
                    <View style={[{height:18,width:'100%',justifyContent:'flex-end',flexDirection:'row',padding:3,marginBottom:7}]} onTouchEnd={()=>{
                        setMostrarInstruccionesTodas(!mostrarInstruccionesTodas);
                    }}>
                        <Image source={require('../assets/question-mark.png')} style={[{height:18,width:18,tintColor:'#ffffff',borderColor:'#f1f1f1',borderWidth:2,borderRadius:16,backgroundColor:'#10279050'}]}></Image>
                    </View>
                </TouchableOpacity>
                <ScrollView
                >
                {
                    todasLasRutasData.map((item,i)=>{                        
                        if((i+1)!=25)
                            {
                                return(                            
                                <View key={i} onTouchEnd={()=>{                                    
                                    setIdRutaAMostrar(item.id_Ruta);
                                    console.log("Si lo cambiaste");
                                    console.log("El nombre de la mierda es: ");
                                    console.log(item.nombre);
                                    //setCambiandoDatos(false);
                                    // let fecha= new Date();
                                    // setFechaDeClicSalida(fecha.getTime());
                                    //setTipoDeClic(2);
                                    setMostrarCompañerosCercanos(false);
                                    setVerRutasCercanas(false);           
                                    let fecha= new Date();
                                    setFechaDeClicSalida(fecha.getTime());
                                }}                            
                                >
                                { i>=0 && <RutasBarItem color={item.color} numeroDeRuta={item.nombre}
                                    tiempoDeLlegada={'1231'}>
                                    </RutasBarItem>}           
    
                                </View>
                            )   
                        }

                        })}
                </ScrollView>
            </View>

            {ocultarMenu==true && <View style={[menUno, {left:(height<width)?(width*0.2-height*0.2)/2:0, borderTopEndRadius:5, 
            width: (height>width)?width*0.2:height*0.2, height:(height>width)?width*0.6:height*0.4, position: 'absolute', 
            top:(height>width)?height-width*0.8:height*0.6-height*0.2-StatusBar.currentHeight*0.8, backgroundColor: '#102769'},modoOscuro && {backgroundColor:'#151553'}]}
            onTouchEnd={(e)=>{
                e.stopPropagation();
            }}
            >
                <TouchableOpacity>
                    <View style={[{height:18,width:'100%',justifyContent:'flex-end',flexDirection:'row',padding:3}]} onTouchEnd={()=>{
                        setMostrarInstruccionesTrayectos(!mostrarInstruccionesTrayectos);
                    }}>
                        <Image source={require('../assets/question-mark.png')} style={[{height:18,width:18,tintColor:'#ffffff',borderColor:'#f1f1f1',borderWidth:2,borderRadius:16,backgroundColor:'#10279050'}]}></Image>
                    </View>
                </TouchableOpacity>
                  <TouchableOpacity
                    style={{width:'100%',borderRadius:10
                    ,height:40,alignItems:'center',justifyContent:'space-evenly',flexDirection:'row'}}
                    onPressOut={()=>{
                        //
                        setVerRutasTiempoReal(!verRutasTiempoReal);
                        let latitude=(verRutasTiempoReal)?coordenadasOrigen.latitude+0.0000001:coordenadasOrigen.latitude-0.0000001;

                        setCoordenadasOrigen({latitude:latitude,longitude:coordenadasOrigen.longitude});
                        obtenerRutas();
                        setOcultarTrayecto(false);
                        setIniciarRecorridoDeLaTrayectoria(false);
                    }}
                    >
                    {/* <Text style={{color:'white',fontSize:15}}>{(!verRutasTiempoReal)?"Activar modo oscuro":"Desactivar modo oscuro"}</Text> */}
                    <View style={[verRutasTiempoReal && {height:30,width:60,backgroundColor:'#c6c6c6',borderRadius:17,justifyContent:'center'}
                                ,!verRutasTiempoReal && {height:30,width:60,backgroundColor:'#a1a1a1',borderRadius:17,justifyContent:'center'}]}>
                        <Image source={(verRutasTiempoReal)?require('../assets/relojActivo.png'):require('../assets/relojInactivo.png')} style={[{height:28,width:28,marginLeft:1,tintColor:'#ffffff',borderColor:'#f1f1f1',borderWidth:2,borderRadius:16,backgroundColor:(!verRutasTiempoReal)?'#2050AA':'#102790'},!verRutasTiempoReal && {marginLeft:32}]}></Image>
                    </View>
                </TouchableOpacity>
                  <ScrollView>
                      
                      <IntercambiosRutas todasLasRutasData={todasLasRutasData} setFechaDeClicCambio={setFechaDeClicCambio} rutasEnElMapa={data} rutasTrayectoria={rutasTrayectoria} visualizarRutas={visualizarRutas} 
                      verRutasTrayecto={verRutasTrayecto} obtenerRutas={obtenerRutas}
                      setVerTrayectoria={setVerTrayectoria}
                      setVerRutasCercanas={setVerRutasCercanas} setVerCompetencia={setVerCompetencia} setOcultarTrayecto={setOcultarTrayecto}
                      identificadorKey={identificadorKey} refCambiarLupa={refCambiarLupa} setCargando={setCargando} setMostrarCompañerosCercanos={setMostrarCompañerosCercanos}                      
                      setIniciarRecorridoDeLaTrayectoria={setIniciarRecorridoDeLaTrayectoria} setMostrarLaLineaDeLaRutaQueComparte={setMostrarLaLineaDeLaRutaQueComparte}
                      verRutasTiempoReal={verRutasTiempoReal}
                      ></IntercambiosRutas>

                  </ScrollView>
            </View>}

            {ocultarTercerMenu==true && <View style={[menTres, { left:(height<width)?3*width*0.2+(width*0.2-height*0.2)/2:3*width*0.2, borderTopEndRadius:5,borderTopStartRadius:5,
            width: (height>width)?width*0.2:height*0.2, 
            height: (height>width)?width*0.6:height*0.4, position: 'absolute', 
            top:(height>width)?height-width*0.8:height*0.6-height*0.2-StatusBar.currentHeight*0.8, backgroundColor: '#102769'},modoOscuro && {backgroundColor:'#151553'}]}
            onTouchEnd={(e)=>{
                e.stopPropagation();
            }}
            >
                <TouchableOpacity>
                    <View style={[{height:18,width:'100%',justifyContent:'flex-end',flexDirection:'row',padding:3,marginBottom:7}]} onTouchEnd={()=>{
                        setMostrarInstruccionesSiguientes(!mostrarInstruccionesSiguientes);
                    }}>
                        <Image source={require('../assets/question-mark.png')} style={[{height:18,width:18,tintColor:'#ffffff',borderColor:'#f1f1f1',borderWidth:2,borderRadius:16,backgroundColor:'#10279050'}]}></Image>
                    </View>
                </TouchableOpacity>
                <ScrollView>
                {
                    <ParadasCercaDelOrigen todasLasRutasData={todasLasRutasData} tipoDeUsuario={tipoDeUsuario} tipoDeSubscripcion={tipoDeSubscripcion} refMapView={refMapView} setFechaDeClicCambio={setFechaDeClicCambio} emailState={emailState} tokenState={tokenState} lalitude={latitude} longitude={longitude} 
                    setVerParadasCercanas={setVerParadasCercanas} setMostrarCompañerosCercanos={setMostrarCompañerosCercanos} setVerRutasCercanas={setVerRutasCercanas} setVerCompetencia={setVerCompetencia}></ParadasCercaDelOrigen>
                }
                </ScrollView>
            </View>}

            </View>
        </View>
    )
}

export default ItemsTrayectos