
import {View,Text,Image} from 'react-native'
import { TouchableOpacity } from 'react-native';

const BVAplicacion=({setDarBienvenida,width,height})=>{

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:240,backgroundColor:'#00000065'}}>
            <View style={{backgroundColor:'#101038',height:(height>width)?'90%':'100%',
                    width:(height>width)?'90%':'50%',position:'absolute',top:(height>width)?'5%':'0%',
                    left:(height>width)?'5%':'25%',zIndex:190}}>

                    <View style={{marginTop:40,alignItems:'center'}}>
                        <Text style={{fontWeight:'700',color:'#ffffff95',fontSize:45,fontFamily:'Bevan',textAlign:'center'}}>Bienvenido a GeoRutas</Text>
                    </View>                      

                    <View>
                        <Text style={{textAlign:'center',color:'#ffffff95',marginTop:20,fontSize:14.5}}>
                            Viaja por la ciudad con la app
                        </Text>                        
                    </View>

                    <View style={{width:height*0.4,height:height*0.4,marginLeft:(height>width)?(width*0.45-height*0.2):(width*0.25-height*0.2),marginTop:20}}>
                        <Image source={require('../assets/bienvenida.jpg')}
                            style={{width:'100%',height:'100%',borderRadius:height*0.2}}
                        >

                        </Image>
                    </View>

                    <View>
                        <Text style={{textAlign:'center',color:'#ffffff95',marginTop:20,fontSize:14.5}}>
                            Regístrate o inicia sesión para acceder
                        </Text>                        
                    </View>

                    <TouchableOpacity style={{backgroundColor:'#457634',alignContent:'center',marginTop:20,height:40,width:'38%'
                                ,alignItems:'center',flexDirection:'column',alignSelf:'center',borderRadius:10
                                ,backgroundColor:'#2060A5', height:45,width:'40%',marginTop:30,marginLeft:'auto', marginRight:'auto',
                                alignItems:'center', justifyContent:'center', borderRadius:10}}
                                    onPressOut={()=>{
                                        setDarBienvenida(false);
                                    }}
                                >
                        <Text style={{textAlign:'center',color:'#f1f1f1',fontSize:20,textAlignVertical:'center',height:45,
                                fontWeight:'400'}}>
                            Continuar
                        </Text>                        
                    </TouchableOpacity>



            </View>
        </View>
    )
}

export default BVAplicacion;