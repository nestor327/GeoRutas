import * as react from 'react';
import { View,ActivityIndicator } from 'react-native';

 const Cargando=({height})=>{
 
    
    return(
        
         <View style={{backgroundColor:'#103070',opacity:0.7,
            position:'absolute',zIndex:240, height:'100%', width:'100%',top:0}}>
            
            <View style={{paddingTop:'85%'}}>
                {/* <ActivityIndicator />
                <ActivityIndicator size="large" />
                <ActivityIndicator size="large" color="#0000ff" /> */}
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
            
        </View>
    )
 }

 export default Cargando