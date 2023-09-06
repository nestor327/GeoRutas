import React from "react";
import { Image } from "react-native";
import { Linking, Text, TouchableOpacity, View,ScrollView } from "react-native";
import imagen from '../../assets/x_icon_imagen.png';

const ITrayectos=({width,height,setMostrarInstruccionesTrayectos})=>{

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:240,backgroundColor:'#00000045'}}>
            <View style={{backgroundColor:'#101038',height:'80%',
                    width:'88%',position:'absolute',top:'10%',left:'6%'
                    ,zIndex:190,borderWidth:0.4,borderColor:'#f1f1f1'}}>
                
                <TouchableOpacity style={{position:'absolute',zIndex:250,height:50,width:50,left:'87%',top:'2%'}} onPress={()=>{
                   setMostrarInstruccionesTrayectos(false);
                }}>
                    <Image source={imagen} style={{width:35,height:35, tintColor:'#f1f1f1'}}></Image>
                </TouchableOpacity>

                <View style={{marginTop:'5%', alignItems:'center'}}>
                    <Text style={{color:'#f1f1f1',fontSize:22,fontWeight:'500'}}>{"Instrucciones"}</Text>
                </View>
                <ScrollView style={{marginBottom:'5%'}}>
                    <View style={{marginTop:'1%',marginLeft:'10%', alignItems:'flex-start',marginRight:'10%',justifyContent:'center'}}>
                        <Text style={{color:'#f1f1f1',fontSize:16.5,textAlign:'center',width:'100%',marginTop:10,textDecorationLine:'underline',fontWeight:'600'}}>
                            {"Usa los trayectos para viajar por la ciudad"}
                        </Text>
                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
                            <Text style={{marginLeft:-9,color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700',marginTop:10}}>
                                {"1. "}
                            </Text>    
                            <Text style={{color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700',marginTop:10}}>{"Escoge entre dos tipos de trayectos"}</Text>
                        </View>
                        

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={[{height:30,width:60,backgroundColor:'#c6c6c6',borderRadius:17,justifyContent:'center'}]}>
                                <Image source={require('../../assets/relojActivo.png')} style={[{height:28,width:28,marginLeft:1,tintColor:'#ffffff',borderColor:'#f1f1f1',borderWidth:2,borderRadius:16,backgroundColor:'#102790'}]}></Image>
                            </View>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Menor tiempo"}</Text>
                        </View>

                        <Text style={{color:'#f1f1f1',marginTop:5,fontSize:14.5,textAlign:'center',width:'80%',marginLeft:'10%'}}>{"Usando ubicacion de las rutas en tiempo real"}</Text>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={[{height:30,width:60,backgroundColor:'#a1a1a1',borderRadius:17,justifyContent:'center'}]}>
                                <Image source={require('../../assets/relojInactivo.png')} style={[{height:28,width:28,marginLeft:1,tintColor:'#ffffff',borderColor:'#f1f1f1',borderWidth:2,borderRadius:16,backgroundColor:'#2050AA'},{marginLeft:32}]}></Image>
                            </View>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Menor distancia"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:35,display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
                            <Text style={{marginLeft:-9,color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>
                                {"2. "}
                            </Text>    
                            <Text style={{color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>{"Identifica tu origen y destino usando los marcadores"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <Image source={require('../../assets/UsuarioPersona.png')} style={[{height:45,width:45,marginLeft:1}]}></Image>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Origen"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <Image source={require('../../assets/paradaFinal.png')} style={[{height:40,width:40,marginLeft:1}]}></Image>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Destino"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:35,display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
                            <Text style={{marginLeft:-9,color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>
                                {"3. "}
                            </Text>    
                            <Text style={{color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>{"Escoge tu origen y destino usando"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Arrastra los marcadores de origen o destino por el mapa "}
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontStyle:'italic',fontSize:14}}>{"(mantén presionado el marcador antes de arrastrar)"}</Text>
                            </Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Usa el buscador"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/buscador.jpg')} style={[{width:'100%',height:75,backgroundColor:'red',borderRadius:15}]}></Image>
                        </View>

                        <Text style={{color:'#f1f1f1',marginTop:5,fontSize:14.5,textAlign:'center',width:'80%',marginLeft:'10%'}}>{"Cambia entre origen y destino al hacer clic en los iconos de la izquierda"}</Text>                        
                        
                        <View style={{width:'100%',marginTop:35,display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
                            <Text style={{marginLeft:-9,color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>
                                {"4. "}
                            </Text>    
                            <Text style={{color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>{"Escoge tu trayecto y accede a:"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={{alignItems:'center'}}>
                                <View style={{backgroundColor:'#1e81ce', padding:2.5, borderRadius:10}}>
                                    <Image source={require("../../assets/rutasChulada5.png")} style={{height:43,width:43, borderRadius:25}}/>                                                             
                                </View>
                            </View>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Por tiempo"}</Text>
                        </View>
                        
                        <View style={{width:'90%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center',marginLeft:'10%'}}>
                            <Image source={require('../../assets/square.png')} style={{height:10,width:10,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={{alignItems:'center'}}>
                                <View style={{alignItems:'center'}}>
                                <Text style={{color:'#c3c3c3'}}>{"⇛101"}</Text>
                                <Image source={require('../../assets/101c.png')} style={[{height:40,width:40,marginLeft:1}]}></Image>
                                <Text style={{color:'#c3c3c3'}}>{"20:45"}</Text>
                                </View>
                            </View>
                            
                            <Text style={{color:'#f1f1f1',marginLeft:10,marginRight:10,fontSize:14.5,width:'70%'}}>{"Última ubicación de la ruta, su dirección y su tiempo de viaje"}</Text>
                        </View>

                        <View style={{width:'90%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center',marginLeft:'10%'}}>
                            <Image source={require('../../assets/square.png')} style={{height:10,width:10,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={{alignItems:'center'}}>
                                <View style={{alignItems:'center'}}>
                                <Image source={require('../../assets/trayectoParada.jpg')} style={[{height:45,width:45,marginLeft:1}]}></Image>
                                </View>
                            </View>
                            
                            <Text style={{color:'#f1f1f1',marginLeft:10,marginRight:10,fontSize:14.5,width:'70%'}}>{"Trayectoria del las rutas y paradas donde subir y bajar"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={{alignItems:'center'}}>
                                <View style={{backgroundColor:'#1e81ce', padding:2.5, borderRadius:10}}>
                                    <Image source={require("../../assets/rutasChulada5SoloTrayecto.png")} style={{height:43,width:43, borderRadius:25}}/>                                                             
                                </View>
                            </View>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Por distancia"}</Text>
                        </View>

                        <View style={{width:'90%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center',marginLeft:'10%'}}>
                            <Image source={require('../../assets/square.png')} style={{height:10,width:10,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <View style={{alignItems:'center'}}>
                                <View style={{alignItems:'center'}}>
                                <Image source={require('../../assets/trayectoParada.jpg')} style={[{height:45,width:45,marginLeft:1}]}></Image>
                                </View>
                            </View>
                            
                            <Text style={{color:'#f1f1f1',marginLeft:10,marginRight:10,fontSize:14.5,width:'70%'}}>{"Trayectoria del las rutas y paradas donde subir y bajar"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:35,display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
                            <Text style={{marginLeft:-9,color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>
                                {"5. "}
                            </Text>    
                            <Text style={{color:'#f1f1f1',fontSize:14.5,textAlign:'left',fontWeight:'700'}}>{"Usa los iconos para una mejor experiencia"}</Text>
                        </View>

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <Image source={require('../../assets/cambioDetrayectoriaCuatro.jpg')} style={[{height:25,width:25,marginLeft:1,borderRadius:13}]}></Image>
                            <Image source={require('../../assets/cambioDetrayectoriaTres.jpg')} style={[{height:25,width:25,marginLeft:5,borderRadius:13}]}></Image>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Iniciar recorrido"}</Text>
                        </View>

                        <Text style={{color:'#f1f1f1',marginTop:5,fontSize:14.5,textAlign:'center',width:'80%',marginLeft:'10%'}}>{"Usa estos iconos para ver la ubicación en tiempo real de las rutas de tu trayecto elegido"}</Text>                        

                        <View style={{width:'100%',marginTop:10,display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../assets/vinietapoint.png')} style={{height:15,width:15,tintColor:'#f1f1f1',marginEnd:10}}/>
                            <Image source={require('../../assets/noVerUsuariosblue.png')} style={[{height:25,width:25,marginLeft:1,borderRadius:13}]}></Image>
                            <Image source={require('../../assets/verUsuariosblue.png')} style={[{height:25,width:25,marginLeft:5,borderRadius:13}]}></Image>
                            <Text style={{color:'#f1f1f1',marginLeft:10,fontSize:14.5}}>{"Ver rutas cercanas"}</Text>
                        </View>

                        <Text style={{color:'#f1f1f1',marginTop:5,fontSize:14.5,textAlign:'center',width:'80%',marginLeft:'10%'}}>
                            {"Usa estos iconos para ver la ubicación de tus rutas favoritas cercanas a ti"}
                        </Text>

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
                                        setMostrarInstruccionesTrayectos(false);
                                    }}>
                        <Text style={{color:"#f1f1f1"}}>Salir</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

export default ITrayectos