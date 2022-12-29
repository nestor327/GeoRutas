
import react, { useEffect, useState } from 'react';
import { ScrollView,View,TouchableOpacity,Text } from 'react-native';
import RutasBarItemFavoritos from './RutasBarItemFavoritos.jsx';
import { getRutasFavoritas,setRutasFavoritas } from '../data/asyncStorageData.js';


const ParadasFavoritas=({setArregloDeValores,todasLasRutasCompetencia,arregloDeValores})=>{



    useEffect(()=>{
        console.log("El valor es: ");
        console.log(arregloDeValores);
        console.log("El valor es: ");
    },[])

    return(
        <ScrollView>
                {todasLasRutasCompetencia.map((item,i)=>{
                        
                    return(                            
                        <View key={i} 
                        style={{flexDirection:'column',alignItems:'center'}}                        
                        >

                        <View style={{width:'80%'}}
                            onTouchEnd={()=>{
                                let arregloSecundario=arregloDeValores;
                                if(arregloSecundario[i]=="✓"){
                                    arregloSecundario[i]="";
                                }else{
                                    arregloSecundario[i]="✓";
                                }
                                setArregloDeValores(arregloSecundario);
                        }}
                        >
                            <RutasBarItemFavoritos estado={(arregloDeValores[i]=='✓')?true:false} color={item.color} numeroDeRuta={(item.nombre)} 
                                setArregloDeValores={setArregloDeValores}></RutasBarItemFavoritos>
                        </View>
                        </View>
                    )})}
        </ScrollView>
    )
}

export default ParadasFavoritas