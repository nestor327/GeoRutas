import * as react from 'react'
import { View,Image,Text,TouchableOpacity } from 'react-native'
import styles from '../componentStyles/rutasBarItemStyles.js'

const RutasBarItem=({numeroDeRuta,tiempoDeLlegada,color, mostrarTiempo})=>{
    return(
        <TouchableOpacity style={[styles.conteiner,{marginTop:'7.5%'}]}>

            <View style={[styles.iconoAppBar,{backgroundColor:color,width:'85%',justifyContent:'space-evenly'}]}>
                <Image source={require('../assets/busesIcon.png')} style={{width:32,height:32,borderRadius:16}}/>    
                <Text style={{color:'white', fontSize:17, fontWeight:'500'}}>
                    {numeroDeRuta}
                </Text>
            </View>
            
                {mostrarTiempo==true && <Text style={{color:'white'}}>
                    {Math.floor(tiempoDeLlegada/3600)+":"+Math.floor(((tiempoDeLlegada-3600*(Math.floor(tiempoDeLlegada/3600)))/60))+":"+tiempoDeLlegada%60}
                </Text>}
        </TouchableOpacity>
    )
}
export default RutasBarItem