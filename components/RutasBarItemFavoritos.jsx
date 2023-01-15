
import * as react from 'react'
import { View,Image,Text,TouchableOpacity } from 'react-native'
import styles from '../componentStyles/rutasBarItemStyles.js'

const RutasBarItemFavoritos=({numeroDeRuta,color,estado})=>{

    const [mostrar,setMostrar]=react.useState(false);
    react.useEffect(()=>{
        if(estado==true || estado==false){
            setMostrar(estado);
        }else{
            setMostrar(false);
        }

    },[])
    
    return(
        <View style={{flexDirection:"row",alignItems:'center',margin:10}}>
        <TouchableOpacity style={{marginTop:5,marginLeft:'6%'}}
        onPress={()=>{
            setMostrar(!mostrar);            
        }}
        >
            
            {mostrar==true && <Text style={{color:'#f1f1f1',height:32,fontSize:20,textAlign:'center',width:32,borderColor:'white',borderWidth:2}}>
                    {"✓"}
            </Text>}

            {mostrar==false && <Text style={{height:32,fontSize:20,textAlign:'center',width:32,borderColor:'white',borderWidth:2}}>
                    {""}
            </Text>}

        </TouchableOpacity>

        <TouchableOpacity style={[styles.conteiner,{marginTop:0}]}
            onPress={()=>{
                setMostrar(!mostrar);            
            }}
        >
            <View style={[styles.iconoAppBar,{backgroundColor:color,width:'85%',justifyContent:'space-evenly'}]}>
                <Image source={require('../assets/busesIcon.png')} style={{width:32,height:32,borderRadius:16}}/>
                <Text style={{color:'white', fontSize:17, fontWeight:'500'}}>
                    {numeroDeRuta}
                </Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}
export default RutasBarItemFavoritos