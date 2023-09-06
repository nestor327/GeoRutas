import React from "react";
import { Image } from "react-native";
import { Linking, Text, TouchableOpacity, View,ScrollView } from "react-native";
import imagen from '../../assets/x_icon_imagen.png';
import RutasBarItem from "../RutasBarItem";

const ISiguientes=({width,height,setMostrarInstruccionesSiguientes})=>{

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:240,backgroundColor:'#00000045'}}>
            <View style={{backgroundColor:'#101038',height:'80%',
                    width:'88%',position:'absolute',top:'10%',left:'6%'
                    ,zIndex:190,borderWidth:0.4,borderColor:'#f1f1f1'}}>
                
                <TouchableOpacity style={{position:'absolute',zIndex:250,height:50,width:50,left:'87%',top:'2%'}} onPress={()=>{
                   setMostrarInstruccionesSiguientes(false);
                }}>
                    <Image source={imagen} style={{width:35,height:35, tintColor:'#f1f1f1'}}></Image>
                </TouchableOpacity>

                <View style={{marginTop:'5%', alignItems:'center'}}>
                    <Text style={{color:'#f1f1f1',fontSize:22,fontWeight:'500'}}>{"Instrucciones"}</Text>
                </View>
                <ScrollView style={{marginBottom:'5%'}}>
                    <View style={{marginTop:'1%',marginLeft:'10%', alignItems:'flex-start',marginRight:'10%',justifyContent:'center'}}>
                        <Text style={{color:'#f1f1f1',fontSize:16.5,textAlign:'center',width:'100%',marginTop:10,textDecorationLine:'underline',fontWeight:'600'}}>
                            {"Usa la función \"Siguientes\" para conocer la ubicación de tus paradas más cercanas"}
                        </Text>
                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
                            <Text style={{marginLeft:-9,color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700',marginTop:10}}>
                                {"1. "}
                            </Text>    
                            <Text style={{color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700',marginTop:10}}>{"Conoce las siguientes rutas por tu parada y el tiempo que te tomara llegar hasta ella:"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={{width:'35%',flexDirection:'row'}}>
                                <RutasBarItem color={'green'} numeroDeRuta={'6'}
                                        tiempoDeLlegada={'121'} mostrarTiempo={true}>
                                </RutasBarItem>
                                <RutasBarItem color={'blue'} numeroDeRuta={'101'}
                                        tiempoDeLlegada={'184'} mostrarTiempo={true}>
                                </RutasBarItem>
                                <RutasBarItem color={'red'} numeroDeRuta={'102'}
                                        tiempoDeLlegada={'231'} mostrarTiempo={true}>
                                </RutasBarItem>
                            </View>
                            
                        </View>

                        <View style={{width:'90%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center',marginLeft:'10%'}}>
                            <Image source={require('../../assets/square.png')} style={{height:10,width:10,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={{alignItems:'center'}}>
                                <View style={{alignItems:'center'}}>
                                <Text style={{color:'#c3c3c3'}}>{"⇛101"}</Text>
                                <Image source={require('../../assets/101c.png')} style={[{height:40,width:40,marginLeft:1}]}></Image>
                                <Text style={{color:'#c3c3c3'}}>{"2:20"}</Text>
                                </View>
                            </View>
                            
                            <Text style={{color:'#f1f1f1',marginLeft:10,marginRight:10,fontSize:14.5,width:'70%'}}>{"Conoce la dirección, la ubicación y el tiempo que le tomara a la ruta más cercana en llegar a tu parada más cercana"}</Text>
                        </View>

                        <View style={{width:'90%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center',marginLeft:'10%'}}>
                            <Image source={require('../../assets/square.png')} style={{height:10,width:10,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={{alignItems:'center'}}>
                                <View style={{alignItems:'center'}}>
                                    <Image source={require('../../assets/parada-de-autobusDerecha.png')} style={[{height:30,width:20,marginLeft:1}]}></Image>
                                </View>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <View style={{alignItems:'center'}}>
                                    <Image source={require('../../assets/parada-de-autobusIzquierda.png')} style={[{height:30,width:20,marginLeft:1}]}></Image>
                                </View>
                            </View>
                            
                            <Text style={{color:'#f1f1f1',marginLeft:10,marginRight:10,fontSize:14.5,width:'70%'}}>{"Conoce la parada más cercana para cada ruta que pase cerca de tu ubicación"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:35,display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
                            <Text style={{marginLeft:-9,color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>
                                {"2. "}
                            </Text>    
                            <Text style={{color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>{"Usa los iconos para una mejor experiencia"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <Image source={require('../../assets/ocultarUbicacionTransportista.png')} style={[{height:25,width:25,marginLeft:1,borderRadius:13}]}></Image>
                            <Image source={require('../../assets/ubicacionTransportista.png')} style={[{height:25,width:25,marginLeft:5,borderRadius:13}]}></Image>
                            <Image source={require('../../assets/tuUbicacioncopia.png')} style={[{height:25,width:25,marginLeft:5,borderRadius:13}]}></Image>                            
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Tu ubicación"}</Text>
                        </View>

                        <Text style={{color:'#f1f1f1',marginTop:5,fontSize:14.5,textAlign:'center',width:'80%',marginLeft:'10%'}}>
                            {"Usa estos iconos para ver tu ubicación actual o la más reciente"}
                        </Text>

                    </View>
                    
                    

                    <View style={{flexDirection:'row',width:'100%',height:'100%'}}>
                        <View style={{marginLeft:'62%',width:'50%',flexDirection:'row'}}>
                            
                        </View>
                    </View>
                </ScrollView>
                <View style={{height:45,marginBottom:20,justifyContent:'flex-end',flexDirection:'row'}}>
                    <TouchableOpacity style={{marginRight:40,width:60,height:35,borderWidth:2,borderColor:'#f1f1f1'
                                            ,alignItems:'center',flexDirection:'row',justifyContent:'center'
                                            ,borderRadius:7}}
                                    onPressOut={()=>{
                                        setMostrarInstruccionesSiguientes(false);
                                    }}>
                        <Text style={{color:"#f1f1f1"}}>Salir</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

export default ISiguientes