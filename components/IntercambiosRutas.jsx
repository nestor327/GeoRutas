import React, { useEffect,useRef,useState } from "react";
import { View,Image,TextInput,Text, ScrollView, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import RutasBarItem from "./RutasBarItem.jsx";
import getAllRutas from '../data/rutasManagua.js'


const IntercambiosRutas=({rutasEnElMapa,rutasTrayectoria,visualizarRutas,verRutasTrayecto,obtenerRutas
    ,setVerTrayectoria,setVerRutasCercanas,identificadorKey,refCambiarLupa
    ,setVerCompetencia,setOcultarTrayecto,setCargando})=>{

    let cantidadDeTrayectos =[0];
    let datosDeLasRutas=[];
    let todasLasRutas=getAllRutas();
    

    if(rutasEnElMapa==undefined){
        return;
    }

    for(let i=0;i<rutasEnElMapa.length;i++){
        if(cantidadDeTrayectos[cantidadDeTrayectos.length-1]<rutasEnElMapa[i].id_Idetificador){
            cantidadDeTrayectos.push(rutasEnElMapa[i].id_Idetificador);
        }
    }

    cantidadDeTrayectos.pop();

    const fadeAnim=useRef(new Animated.Value(1));

   
    const RutasDelTrayecto=({rutasTrayectoria})=>{

        let coloresEnLasRutas=[];
        let nombreDeLasRutas=[];
        for(let h=0;h<rutasTrayectoria.length;h++){
            coloresEnLasRutas.push(todasLasRutas[rutasTrayectoria[h].id_Ruta-1].color);
            nombreDeLasRutas.push(todasLasRutas[rutasTrayectoria[h].id_Ruta-1].nombre);
        }    
         
        return(
            rutasTrayectoria.map((ruta, i)=>{
                return(
                    <View style={{alignItems:'center',marginHorizontal:2.5}} key={(i)}>
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


return(
    <View >
        <ScrollView>
            {     
                cantidadDeTrayectos.map((item, i)=>{
                    return(
                        <View key={i} style={{alignItems:'center', marginTop:'17%'}} 
                        onTouchEnd={()=>{  
                            
                            setCargando(true);
                            Animated.timing(fadeAnim.current, {
                                toValue: 1,
                                duration: 150,
                                useNativeDriver: true
                            }).start();
                            if(identificadorKey.current==i+1){
                                verRutasTrayecto.current==!verRutasTrayecto.current;
                            }
                            obtenerRutas(i+1);
                            //RutasTrayectorias(setRutasEnElMapa);
                            setVerTrayectoria(true);   
                            identificadorKey.current=(i+1);     
                            setVerRutasCercanas(false);  
                            setVerCompetencia(false);    
                            setOcultarTrayecto(true); 
                            refCambiarLupa.current=false;
                            setCargando(false);
                        }
                        }>
                            <Animated.View style={visualizarRutas==(i+1) && {opacity:fadeAnim.current, backgroundColor:'#1e81ce', padding:5, borderRadius:10}}
                                
                                onTouchStart={()=>{
                                    Animated.timing(fadeAnim.current, {
                                        toValue: 0.25,
                                        duration: 100,
                                        useNativeDriver: true
                                    }).start();
                                    
                                }}    
                                onTouchCancel={()=>{
                                    Animated.timing(fadeAnim.current, {
                                        toValue: 1,
                                        duration: 200,
                                        useNativeDriver: true
                                    }).start();
                                }}
                            >
                                <Image source={require("../assets/rutasChulada5.png")} style={{height:50,width:50, borderRadius:25}}/>                                                             
                             </Animated.View>
                             
                             <Text style={{color:'white'}} >Ruta: {i+1}</Text>

                             {visualizarRutas==(i+1) && verRutasTrayecto.current==true && <RutasDelTrayecto rutasTrayectoria={rutasTrayectoria}></RutasDelTrayecto>}
                        </View>
                        
                    )
                })
            }

        </ScrollView>

    </View>
)
}

export default IntercambiosRutas