import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";


const PerfilesDeUsuarios=({cantidadDeInactivos,item,i,arregloActualizar,setEditarInfoDelChofer,setEmailDelChoferEditar})=>{

    const [acticando,setActivando]=useState(false);

    useEffect(()=>{
        if(arregloActualizar.indexOf(i)==-1){
            setActivando(false);
        }
    },[arregloActualizar])

    return(
        <View key={i} style={{alignItems:'center',flexDirection:'row',alignContent:'center'}}>
             
            <View style={{height:25,width:25,alignItems:'center',marginRight:5}}></View>

            <View style={{height:30,width:180,backgroundColor:"#101038",margin:3,alignItems:'center',marginRight:10,alignSelf:'center'}}
                onTouchEnd={()=>{
                    setEmailDelChoferEditar(item.email);
                    setEditarInfoDelChofer(true);
                }}
            >
                <Text style={{fontSize:16,color:'#f1f1f1',textAlignVertical:'center'}}>{item.email}</Text>
            </View>
            <View style={[(item.tipoSubscripcion=='C' && cantidadDeInactivos<15)?{borderColor:'green'}:(cantidadDeInactivos>=15 && item.tipoSubscripcion=='C')?{borderColor:'yellow'}:{borderColor:'red'},{borderWidth:2},{width:'35%',alignItems:'center',borderRadius:6}]}
                onTouchEnd={()=>{
                    setEmailDelChoferEditar(item.email);
                    setEditarInfoDelChofer(true);
                }}
            >
                <Text style={{fontSize:16,fontWeight:'400',color:'#f1f1f1'}}>{(item.tipoSubscripcion!='C')?"Inactivo":(item.tipoSubscripcion=='C' && cantidadDeInactivos>=15)?"Finalizando":"Activo"}</Text>
            </View>
        </View>
    )
}

export default PerfilesDeUsuarios