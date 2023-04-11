
import { useEffect } from 'react';
import {View,Text,Image} from 'react-native'
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const BGPermisos=({width,height,setPedirUbicacionSegundoPlano,setMostrarAlerte})=>{

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,
            zIndex:250,backgroundColor:'#00000015'}}
            onTouchEnd={()=>{
                setPedirUbicacionSegundoPlano(3);
                setMostrarAlerte(false);
            }}
            >
          
        </View>
    )
}

export default BGPermisos