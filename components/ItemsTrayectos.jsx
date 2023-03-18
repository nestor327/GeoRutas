import React, { useEffect,useState } from "react"
import { Alert, ScrollView, StatusBar, View } from "react-native"
import IntercambiosRutas from "./IntercambiosRutas"
import ParadasCercaDelOrigen from "./ParadasCercaDeUbicacion"
import RutasBarItem from "./RutasBarItem"


const ItemsTrayectos=({height,width,todasLasRutasData,menDos,setIdRutaAMostrar,ocultarMenu,data,rutasTrayectoria,menUno
                        ,visualizarRutas,verRutasTrayecto,obtenerRutas,setVerTrayectoria,setVerRutasCercanas, setVerCompetencia,setOcultarTrayecto
                        ,identificadorKey, refCambiarLupa, setCargando,ocultarTercerMenu,menTres,emailState, tokenState, latitude, longitude
                        ,setVerParadasCercanas,setMostrarMenusBuenEstado,setmenUno,setmenDos,setmenTres,setmenCinco,setmenCuatro
                        ,setMostrarBarraSecundariaDeUbicacion,menCinco,modoOscuro,setMostrarCompañerosCercanos
                        })=>{

        const [fechaDeClicCambio, setFechaDeClicCambio]=useState(1);
        const [fechaDeClicSalida, setFechaDeClicSalida]=useState(0);

        useEffect(()=>{
            setCargando(false);
        },[])

        useEffect(()=>{
            if(fechaDeClicSalida>fechaDeClicCambio){

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
                }
                setmenCuatro([{ display: 'flex',color:'#101043' }]);
                // setMostrarBarraSecundariaDeUbicacion(false);
                setMostrarMenusBuenEstado(false);
            }
        },[fechaDeClicCambio,fechaDeClicSalida])
        
    return(
        <View style={{width:'100%',height:(height>width)?height-width*0.2:height*0.8-StatusBar.currentHeight,position:'absolute',top:0,left:0,zIndex:240}}
            onTouchEnd={()=>{
                //setTipoDeClic(1);
                let fecha= new Date();
                setFechaDeClicSalida(fecha.getTime());
            }}
            >
            <View style={{height:'100%',width:width,padding:0}}>
                <View style={[menDos, { left:(height<width)?width*0.2+(width*0.2-height*0.2)/2:width*0.2, 
                width: (height>width)?width*0.2:height*0.2,zIndex:1000,  position: 'absolute', 
                top:(height>width)?height-width*0.8:height*0.6-height*0.2-StatusBar.currentHeight*0.8, 
                backgroundColor: '#102769',height:(height>width)?width*0.6:height*0.4 },modoOscuro && {backgroundColor:'#151553'}]}
                >
                <ScrollView
                >
                {
                    todasLasRutasData.map((item,i)=>{
                        return(                            
                            <View key={i} onTouchEnd={()=>{
                                setIdRutaAMostrar(i+1);
                                console.log("Si lo cambiaste");
                                //setCambiandoDatos(false);
                                // let fecha=new Date();
                                // setFechaDeClicCambio(fecha);
                                //setTipoDeClic(2);
                                setMostrarCompañerosCercanos(false);
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
            width: (height>width)?width*0.2:height*0.2, height:(height>width)?width*0.6:height*0.4, position: 'absolute', 
            top:(height>width)?height-width*0.8:height*0.6-height*0.2-StatusBar.currentHeight*0.8, backgroundColor: '#102769'},modoOscuro && {backgroundColor:'#151553'}]}>
                  <ScrollView>
                      
                      <IntercambiosRutas setFechaDeClicCambio={setFechaDeClicCambio} rutasEnElMapa={data} rutasTrayectoria={rutasTrayectoria} visualizarRutas={visualizarRutas} 
                      verRutasTrayecto={verRutasTrayecto} obtenerRutas={obtenerRutas}
                      setVerTrayectoria={setVerTrayectoria}
                      setVerRutasCercanas={setVerRutasCercanas} setVerCompetencia={setVerCompetencia} setOcultarTrayecto={setOcultarTrayecto}
                      identificadorKey={identificadorKey} refCambiarLupa={refCambiarLupa} setCargando={setCargando} setMostrarCompañerosCercanos={setMostrarCompañerosCercanos}
                      ></IntercambiosRutas>

                  </ScrollView>
            </View>}

            {ocultarTercerMenu==true && <View style={[menTres, { left:(height<width)?3*width*0.2+(width*0.2-height*0.2)/2:3*width*0.2, 
            width: (height>width)?width*0.2:height*0.2, 
            height: (height>width)?width*0.6:height*0.4, position: 'absolute', 
            top:(height>width)?height-width*0.8:height*0.6-height*0.2-StatusBar.currentHeight*0.8, backgroundColor: '#102769'},modoOscuro && {backgroundColor:'#151553'}]}>
                <ScrollView>
                {
                    <ParadasCercaDelOrigen setFechaDeClicCambio={setFechaDeClicCambio} emailState={emailState} tokenState={tokenState} lalitude={latitude} longitude={longitude} 
                    setVerParadasCercanas={setVerParadasCercanas} setMostrarCompañerosCercanos={setMostrarCompañerosCercanos}></ParadasCercaDelOrigen>
                }
                </ScrollView>
            </View>}

            </View>
        </View>
    )
}

export default ItemsTrayectos