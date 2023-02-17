
import {View,Text,Image} from 'react-native'
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const justificarUbicacion=({setPedirUbicacionSegundoPlano,setMensajeAlerta, setMostrarAlerte,setPedirUbicacion,tipoDeUsuario,setJustificarUbicacion,width,height})=>{

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:240,backgroundColor:'#00000045'}}>
            <View style={{backgroundColor:'#101038',height:(height>width)?height*0.9-width*0.2:'100%',
                    width:(height>width)?'90%':'50%',position:'absolute',top:(height>width)?'5%':'0%',
                    left:(height>width)?'5%':'25%',zIndex:190}}>
                    <ScrollView>
                    <View style={{marginTop:40,alignItems:'center'}}>
                        <Text style={{fontWeight:'700',color:'#ffffff',fontSize:45,fontFamily:'Bevan',textAlign:'center'}}>Uso de la Ubicacion</Text>
                    </View>                      

                    <View>
                        <Text style={{textAlign:'center',color:'#ffffff',marginTop:15,fontSize:14,marginLeft:'10%',marginRight:'10%'}}>
                            GeoRutas recopila datos de ubicación para habilitar las siguientes funciones
                        </Text>                        
                    </View>

                    <View style={{width:height*0.2,height:height*0.2,marginLeft:(height>width)?(width*0.45-height*0.1):(width*0.25-height*0.1),marginTop:20}}>
                        <Image source={require('../assets/rutasChulada7.png')}
                            style={{width:'100%',height:'100%'}}
                        >

                        </Image>
                    </View>

                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row',marginRight:'15%'}}>
                            <Text style={{marginLeft:'10%',fontSize:14,marginTop:10}}>1. </Text>
                            <Text style={{textAlign:'left',color:'#ffffff',marginTop:10,
                            fontSize:14}}>
                                Mostrarte tus rutas favoritas cercanas a tu ubicacion, desde la funcion trayectos.
                            </Text>
                        </View>
                        <View style={{flexDirection:'row',marginRight:'15%'}}>
                            <Text style={{marginLeft:'10%',fontSize:14,marginTop:7}}>2. </Text>
                            <Text style={{textAlign:'left',color:'#ffffff',marginTop:7,fontSize:14}}>
                                Seleccionar tu ubicacion desde el buscador como origen.
                            </Text>
                        </View>
                        <View style={{flexDirection:'row',marginRight:'15%'}}>
                            <Text style={{marginLeft:'10%',fontSize:14,marginTop:7}}>3. </Text>
                            <Text style={{textAlign:'left',color:'#ffffff',marginTop:7,fontSize:14}}>
                                {"Mostrar tu ubicacion a los demas usuarios, solo si eres chofer de uno de los buses"+((tipoDeUsuario!='Transportista')?" (en tu caso no lo eres)":"")+", incluso cuando la app está cerrada o no está en uso."}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{alignContent:'center',flexDirection:'column'
                                ,backgroundColor:'#2060A5', height:42,width:'30%',marginTop:20,marginLeft:'auto', marginRight:'auto',
                                alignItems:'center', justifyContent:'center', borderRadius:10,marginBottom:10}}
                                    onPressOut={()=>{
                                        setJustificarUbicacion(false);
                                        setPedirUbicacion(true);
                                        setMensajeAlerta("A continuación podrás decidir si usar la ubicación en segundo plano");
                                        setMostrarAlerte(true);
                                        setPedirUbicacionSegundoPlano(2);
                                    }}
                                >
                        <Text style={{textAlign:'center',color:'#f1f1f1',fontSize:20,textAlignVertical:'center',height:42,
                                fontWeight:'400'}}>
                            Cerrar
                        </Text>                        
                    </TouchableOpacity>
                    </ScrollView>
            </View>
        </View>
    )
}

export default justificarUbicacion;