import react, { useEffect, useState } from "react"
import { ScrollView, StatusBar, Text, View,Image, TouchableOpacity } from "react-native"
import { useQuery } from "react-query"
import { getNombre } from "../data/asyncStorageData"
import getAllRutas from "../data/rutasManagua"
import imagen from '../assets/x_icon_imagen.png';


const AdministrarUsuarios=({height,width,emailState,tokenState,setVerAdministrarUsuarios})=>{
    
    let datos=null;
    const [nombre,setNombre]=useState("");

    useEffect(()=>{
        getNombre(setNombre);
    },[])

    let idRuta=1;
    let todasLasRutas=getAllRutas();

    for(let t=0; t<todasLasRutas.length;t++){        
        if(nombre.includes(todasLasRutas[t].nombre)){
            idRuta=(t+1);
        }
    }


    const {data,error,isLoading}=useQuery(['obtenerUsuariosCooperativa',idRuta,emailState,tokenState],async({queryKey})=>{
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuariosCoperativas?idRuta='+queryKey[1]+'&Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
    },{
        //staleTime:Infinity,
        refetchInterval:Infinity,
        cacheTime:1500
    })

    if(isLoading==false){
        

        
        const[arregloActualizar,setArregloActualizar]=useState([]);
        

        return(
            <View style={{backgroundColor:'#103070',position:'absolute',zIndex:220, height:height+StatusBar.currentHeight, width:width}}>
                
                <View style={{position:'absolute',top:7,left:'90%',zIndex:221}} onTouchEnd={()=>{
                    setVerAdministrarUsuarios(false);
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>
                <View style={{alignItems:'center',marginTop:'20%'}}>
                    <Text style={{color:'#f1f1f1',fontSize:25}}>Administra tus usuarios</Text>
                </View>
                <View style={{marginLeft:'0%',height:'60%',marginTop:30,marginLeft:30}}>
                {data!=undefined && <ScrollView>
                    {
                        
                        data.map((item,i)=>{      
                            const [acticando,setActivando]=useState(false);
                                return(
                                    <View key={i} style={{alignItems:'center',flexDirection:'row',alignContent:'center'}}>
                                        {item.tipoSubscripcion!='B' && <View style={{borderWidth:2,borderColor:'red',height:25,width:25,alignItems:'center',marginRight:10}}
                                            onTouchEnd={()=>{
                                                if(arregloActualizar.indexOf(i)==-1){
                                                    arregloActualizar.push(i);
                                                    console.log("Agregando "+i);
                                                    console.log(arregloActualizar);
                                                    setActivando(true);
                                                }else{
                                                    arregloActualizar.splice(arregloActualizar.indexOf(i),1);
                                                    console.log("Eliminando "+i);
                                                    console.log(arregloActualizar);
                                                    setActivando(false);
                                                }
                                            }}
                                        >
                                            <Text>{(acticando)?"✓":""}</Text>
                                        </View>}
                                        {item.tipoSubscripcion=='B' && <View style={{height:25,width:25,alignItems:'center',marginRight:10}}>
                                            
                                        </View>}

                                        <View style={{height:30,width:180,backgroundColor:"#353454",margin:2}}>
                                            <Text>{item.userName}</Text>
                                        </View>
                                        <View style={[(item.tipoSubscripcion=='B')?{borderColor:'green'}:{borderColor:'red'},{borderWidth:2}]}>
                                            <Text>{(item.tipoSubscripcion=='B')?"Usuario Activo":"Usuario Inactivo"}</Text>
                                        </View>
                                    </View>
                                )  
                        })                    
                    }
                </ScrollView>}
                </View>

                <View style={{flexDirection:'row',marginTop:60,justifyContent:'center'}}>
                    <TouchableOpacity style={{marginRight:10,height:30,width:'auto',backgroundColor:'blue'}}>
                        <Text>Activar todos los Inactivos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:30,width:'auto',backgroundColor:'blue'}}>
                        <Text>Seleccionar cuales activar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )    
    }   
}

export default AdministrarUsuarios;