import react, { useEffect, useState } from "react"
import { ScrollView, StatusBar, Text, View,Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { useQuery } from "react-query"
import { getNombre } from "../data/asyncStorageData"
import getAllRutas from "../data/rutasManagua"
import imagen from '../assets/x_icon_imagen.png';
import PerfilesDeUsuarios from "./ComponentesParaAdmins/PerfilesDeUsuarios"


const AdministrarUsuarios=({height,width,emailState,tokenState,setVerAdministrarUsuarios,nombre,setEditarInfoDelChofer,setEmailDelChoferEditar,setChoferAEditar
    ,refrescar,setRefrescar,setMostrarAlerte, setMensajeAlerta})=>{
    

    const [data,setData]=useState([]);
    const [seleccionar, setSeleccionar]=useState(false);
    

    const obtenerLosDatos=async()=>{

        let todasLasRutas=getAllRutas();

        for(let t=0; t<todasLasRutas.length;t++){        
            if(nombre.includes(todasLasRutas[t].nombre)){
                idRuta=(t+1);
            }
        }

        try{
            let value=null;
            value=await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuariosCoperativas?idRuta=1&Email='+emailState+'&Token='+tokenState).then(res=>datos=res.json());
            setData(value);
            console.log(value);
           }catch{
            setData([]);
           }
    }
        
        const[arregloActualizar,setArregloActualizar]=useState([]);        

        useEffect(()=>{
            obtenerLosDatos();
        },[refrescar])

        return(
            <View style={{backgroundColor:'#103070',position:'absolute',zIndex:220, height:height+StatusBar.currentHeight, width:width}}>
                
                <View style={{position:'absolute',top:7,left:'90%',zIndex:221}} onTouchEnd={()=>{
                    setVerAdministrarUsuarios(false);
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>
                <View style={{alignItems:'center',marginTop:'15%'}}>
                    <Text style={{color:'#f1f1f1',fontSize:29}}>Administra tus usuarios</Text>
                </View>
                <View style={{marginLeft:'0%',height:'60%',marginTop:30,marginLeft:20}}>
                {data!=undefined && data.length>1 && <ScrollView>
                    {                        
                        data.map((item,i)=>{      
                             
                                return(
                                    <View key={i} style={{alignItems:'center',flexDirection:'row',alignContent:'center'}}
                                    onTouchEnd={()=>{
                                        setChoferAEditar(item);
                                    }}
                                    >
                                        <PerfilesDeUsuarios setEmailDelChoferEditar={setEmailDelChoferEditar} setEditarInfoDelChofer={setEditarInfoDelChofer} seleccionar={seleccionar} arregloActualizar={arregloActualizar} item={item} i={i}></PerfilesDeUsuarios>
                                    </View>
                                )  
                        })
                    }
                </ScrollView>}
                {data==undefined || data==null && <ActivityIndicator size="large" color="#0000ff" />}
                </View>

                <View style={{flexDirection:'row',marginTop:40,justifyContent:'center'}}>
                    <TouchableOpacity style={{marginRight:10,height:40,width:'auto',borderRadius:7,backgroundColor:'blue',justifyContent:'center',paddingHorizontal:5}}>
                        <Text style={{fontSize:16, color:'white'}}>Activar todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:40,width:'auto',backgroundColor:'blue',borderRadius:7,justifyContent:'center',paddingHorizontal:5}}
                        onPressOut={()=>{
                            if(seleccionar==false){
                                setSeleccionar(!seleccionar);
                            }else if(seleccionar==true && arregloActualizar.length==0){
                                setMensajeAlerta("Seleccione cuáles usuarios activar");
                                setMostrarAlerte(true);
                            }else if(seleccionar==true && arregloActualizar.length>0){                                
                                setMensajeAlerta("Usuarios activados");
                                setMostrarAlerte(true);
                                setRefrescar(!refrescar);
                                setSeleccionar(!seleccionar);
                            }
                            
                        }}
                    >
                        <Text style={{fontSize:16, color:'white'}}>{(seleccionar==false)?"Seleccionar cuales activar":"Activar los seleccionados"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )    
    
}

export default AdministrarUsuarios;