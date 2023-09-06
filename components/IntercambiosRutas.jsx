import React, { useEffect,useRef,useState } from "react";
import { View,Image,TextInput,Text, ScrollView, TouchableOpacity, ActivityIndicator, Animated, Alert } from "react-native";
import RutasBarItem from "./RutasBarItem.jsx";


const IntercambiosRutas=({todasLasRutasData,rutasEnElMapa,rutasTrayectoria,visualizarRutas,verRutasTrayecto,obtenerRutas
    ,setVerTrayectoria,setVerRutasCercanas,identificadorKey,refCambiarLupa
    ,setVerCompetencia,setOcultarTrayecto,setCargando,setFechaDeClicCambio,setMostrarCompañerosCercanos
    ,setIniciarRecorridoDeLaTrayectoria,setMostrarLaLineaDeLaRutaQueComparte,verRutasTiempoReal, setVerRutasTiempoReal})=>{

    let cantidadDeTrayectos =[0];
    let datosDeLasRutas=[];
    let todasLasRutas=todasLasRutasData;

    if(rutasEnElMapa==undefined){
        return(
            <View style={{marginTop:'150%'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    
    for(let i=0;i<rutasEnElMapa.length;i++){
        if(cantidadDeTrayectos[cantidadDeTrayectos.length-1]<rutasEnElMapa[i].id_Idetificador){
            cantidadDeTrayectos.push(rutasEnElMapa[i].id_Idetificador);
        }
    }

    cantidadDeTrayectos.pop();

    const fadeAnim=useRef(new Animated.Value(1));
    const [arregloVacio, setArregloVacio]=useState([12]);

   
    const RutasDelTrayecto=({rutasTrayectoria})=>{

        let coloresEnLasRutas=[];
        let nombreDeLasRutas=[];
        for(let h=0;h<rutasTrayectoria.length;h++){
            coloresEnLasRutas.push((todasLasRutas.length>0)?todasLasRutas[rutasTrayectoria[h].id_Ruta-1].color:"#102769");
            nombreDeLasRutas.push((todasLasRutas.length>0)?todasLasRutas[rutasTrayectoria[h].id_Ruta-1].nombre:"---");
        }
         
        return(
            rutasTrayectoria.map((ruta, i)=>{
                return(
                    <View style={{alignItems:'center',marginHorizontal:2.5}} key={(i)}                    
                    >
                        {/* <Image source={require("../assets/Citycons_bus_icon-icons.com_67914.png")} style={{height:50,width:50, borderRadius:25}}/> */}
                        
                        <RutasBarItem color={coloresEnLasRutas[i]} numeroDeRuta={nombreDeLasRutas[i]}
                        tiempoDeLlegada={123} mostrarTiempo={false}></RutasBarItem>
                        {/* {ruta.id_Ruta==2 && <RutasBarItem color={'red'} numeroDeRuta={114}
                        tiempoDeLlegada={123} mostrarTiempo={false}></RutasBarItem>}
                        {ruta.id_Ruta==3 && <RutasBarItem color={'black'} numeroDeRuta={102}
                        tiempoDeLlegada={123} mostrarTiempo={false}></RutasBarItem>}                        */}

                    </View> 
                )
             })                               
        )
    }
//-86.304667,12.15155,171,199,18 

    if(cantidadDeTrayectos==null || cantidadDeTrayectos==undefined || cantidadDeTrayectos.length<=0){
        return(
            <View style={{marginTop:'150%'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }else{
        const [mostrariItems, setMostrarItems]=useState(false);
        return(
            <View>
                <ScrollView>
                    {
                        cantidadDeTrayectos.map((item, i)=>{
                            return(
                                <View key={i} style={{alignItems:'center', marginBottom:'17%'}} 
                                onTouchEnd={()=>{  
                                    
                                    if(identificadorKey.current!=(i+1)){
                                        setIniciarRecorridoDeLaTrayectoria(false);                                        
                                    }

                                    setCargando(true);
                                    Animated.timing(fadeAnim.current, {
                                        toValue: 1,
                                        duration: 150,
                                        useNativeDriver: true
                                    }).start();
                                    if(identificadorKey.current==i+1){
                                        setMostrarItems(!mostrariItems);
                                    }else{
                                        setMostrarItems(true);
                                    }
                                    console.log("Aqui se deberia de hacer el cambio"+(visualizarRutas));
                                    obtenerRutas(i+1);
                                    //RutasTrayectorias(setRutasEnElMapa);
                                    setVerTrayectoria(true);   
                                    identificadorKey.current=(i+1);     
                                    setVerRutasCercanas(false);  
                                    setVerCompetencia(false);    
                                    setOcultarTrayecto(true); 
                                    refCambiarLupa.current=false;
                                    setCargando(false);
                                    let fecha= new Date();
                                    setFechaDeClicCambio(fecha.getTime());
                                    setMostrarCompañerosCercanos(false);  
                                    setMostrarLaLineaDeLaRutaQueComparte(false);
                                    //(i==0)?setVerRutasTiempoReal(!verRutasTiempoReal):"";
                                }
                                }>
                                    <Animated.View style={visualizarRutas==(i+1) && {opacity:fadeAnim.current, backgroundColor:'#1e81ce', padding:5, borderRadius:10}}
                                        
                                        onTouchStart={()=>{
                                            Animated.timing(fadeAnim.current, {
                                                toValue: 0.25,
                                                duration: 100,
                                                useNativeDriver: true
                                            }).start();
                                            //setVerRutasTiempoReal(!verRutasTiempoReal);
                                            
                                        }}    
                                        onTouchCancel={()=>{
                                            Animated.timing(fadeAnim.current, {
                                                toValue: 1,
                                                duration: 200,
                                                useNativeDriver: true
                                            }).start();
                                        }}
                                    >
                                        <Image source={(!verRutasTiempoReal)?require("../assets/rutasChulada5SoloTrayecto.png"):require("../assets/rutasChulada5.png")} style={{height:50,width:50, borderRadius:25}}/>                                                             
                                     </Animated.View>
                                     
                                     <Text style={{color:'white'}} >Ruta: {i+1}</Text>
        
                                     {visualizarRutas==(i+1) && mostrariItems==true && <RutasDelTrayecto rutasTrayectoria={rutasTrayectoria}></RutasDelTrayecto>}
                                </View>
                                
                            )
                        })
                    }
        
                </ScrollView>
        
            </View>
        )
    }
}

export default IntercambiosRutas