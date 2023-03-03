
import react from 'react'
import {View,StatusBar,Text,ScrollView,TouchableOpacity} from 'react-native';

const MostrarInformacion=({height,width, historial, purchase,setMostrarInformacion,refrescarHistorial})=>{


    return(
        <View style={{backgroundColor:'#103070',position:'absolute',zIndex:260, height:height+StatusBar.currentHeight, width:width}}>
            <View style={{height:'80%', width:'95%', marginTop:20, alignItems:'center', marginLef:'2.5%'}}>
                <ScrollView>
                    <Text style={{fontSize:20}}>Primera Informacion, hitorial</Text>
                    <Text>{historial}</Text>
                    <Text style={{fontSize:20}}>Segunda Informacion, venta</Text>
                    <Text>{purchase}</Text>
                </ScrollView>
            </View>
            <TouchableOpacity onPressOut={()=>{
                refrescarHistorial();
            }} style={{height:40, width:'40%', backgroundColor:'red', marginHorizontal:'30%'}}>
                <Text style={{textAlign:'center'}}>Refrescar Informacion</Text>
            </TouchableOpacity>

            <TouchableOpacity onPressOut={()=>{
                setMostrarInformacion(false);
            }} style={{height:40, width:'40%', backgroundColor:'green', marginHorizontal:'30%'}}>
                <Text>Salir</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MostrarInformacion