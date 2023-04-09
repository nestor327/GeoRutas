
import react, { useEffect, useState } from 'react';
import { ScrollView,View,TouchableOpacity,Text } from 'react-native';
import RutasBarItemFavoritos from './RutasBarItemFavoritos.jsx';


const ParadasFavoritas=({setArregloDeValores,todasLasRutasCompetencia,arregloDeValores
    ,setMensajeAlerta,setMostrarAlerte})=>{

    const [estadoDeTodosLosElemntos, setEstadoDeTodosLosRElemento]=useState(true);

    useEffect(()=>{
        console.log("El valor es: ");
        console.log(arregloDeValores);
        console.log("El valor es: ");
        if(arregloDeValores.filter(elem => elem=='✓').length>=9){
            setEstadoDeTodosLosRElemento(false);
        }else{
            setEstadoDeTodosLosRElemento(true);
        }
    },[arregloDeValores])

    return(
        <ScrollView>
                {todasLasRutasCompetencia.map((item,i)=>{
                        
                    return(                            
                        <View key={i} 
                        style={{flexDirection:'column',alignItems:'center'}}                        
                        >

                        <View style={{width:'80%'}}
                            onTouchEnd={()=>{
                                // let arregloSecundario=arregloDeValores;
                                // if(arregloSecundario[i]=="✓"){
                                //     arregloSecundario[i]="";
                                // }else if(arregloDeValores.filter(elem => elem=="✓").length<10){
                                //     arregloSecundario[i]="✓";
                                // }else{
                                //     setMensajeAlerta("Solo puede seleccionar 10 rutas favoritas");
                                //     setMostrarAlerte(true);
                                // }
                                // setArregloDeValores(arregloSecundario);
                        }}
                        >
                            <RutasBarItemFavoritos estado={(estadoDeTodosLosElemntos==true && arregloDeValores[i]=='✓')?true:(arregloDeValores[i]=='✓')?true:false} color={item.color} numeroDeRuta={(item.nombre)} 
                                setArregloDeValores={setArregloDeValores} arregloDeValores={arregloDeValores} posicionMap={i}
                                setMensajeAlerta={setMensajeAlerta} setMostrarAlerte={setMostrarAlerte}></RutasBarItemFavoritos>
                        </View>
                        </View>
                    )})}
        </ScrollView>
    )
}

export default ParadasFavoritas