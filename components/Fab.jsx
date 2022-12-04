import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Fab=({onPres, style,imagen})=>{
    return(
        <View style={[styles.boton,{...style}]}>
            <TouchableOpacity
            activeOpacity={0.8}
            style={style}
            onPress={onPres}
            >
                <Image source={imagen} style={{width:28,height:28, borderRadius:15,borderRadius:15, borderColor:'white', borderWidth:2}}/>
            </TouchableOpacity>
        </View>
    )
}

export default Fab;
const styles=StyleSheet.create({
    boton:{
        height:31, 
        width:31,
        marginTop:8,
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center',
        borderColor:'black', 
        borderWidth:2,
        borderRadius:16
    }
})