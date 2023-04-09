import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";


const AlertComponet=({width,urlDeLaAplicacion,AlerMensaje,height,tipoDeAlert,setMostrarAlerte,setTipoDeAlerta})=>{

    const funcionRedirige=async ()=>{
        let url='https://www.facebook.com/profile.php?id=100089700816836';
        if(url!='' && url!=null){
            url=urlDeLaAplicacion;
        }
        
        await Linking.openURL(url);
    }

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:240,backgroundColor:'#00000045'}}>
            <View style={{backgroundColor:'#101038',height:(height>width)?'20%':'40%',
                    width:(height>width)?'88%':'50%',position:'absolute',top:(height>width)?'40%':'25%',left:(height>width)?'6%':'25%'
                    ,zIndex:190,borderWidth:0.4,borderColor:'#f1f1f1'}}>
                
                <View style={{marginTop:'5%',marginLeft:'10%', alignItems:'flex-start',marginRight:'10%'}}>
                    <Text style={{color:'#f1f1f1',fontSize:17}}>{(tipoDeAlert=='E')?"Alerta":"Alerta"}</Text>
                </View>
                <View style={{marginTop:'1%',marginLeft:'10%', alignItems:'flex-start',marginRight:'10%',height:'45%',justifyContent:'center'}}>
                    <Text style={{color:'#f1f1f1',fontSize:14.5}}>{AlerMensaje}</Text>
                </View>

                <View style={{marginTop:'2%',flexDirection:'row',width:'100%',height:'100%'}}>
                    <View style={{marginLeft:'62%',width:'50%',flexDirection:'row'}}>
                        {tipoDeAlert=='E'  && <TouchableOpacity style={{marginRight:30}}
                            onPressOut={()=>{
                                setMostrarAlerte(false);
                            }}
                        >
                            <Text style={{color:"#f1f1f1"}}>Cancelar</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity
                            onPressOut={()=>{
                                if(tipoDeAlert=='F' || tipoDeAlert=='E'){
                                    setTipoDeAlerta('C');
                                    funcionRedirige();
                                }
                                setMostrarAlerte(false);
                            }}
                            style={{height:40}}
                        >
                            <Text style={[(tipoDeAlert!='E')?{marginLeft:'67%'}:{},{fontSize:14,color:'#f1f1f1'}]}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AlertComponet