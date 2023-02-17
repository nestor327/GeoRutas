import React, { useState } from "react";
import { Text, View } from "react-native";


const PerfilesDeUsuarios=({item,i,arregloActualizar,seleccionar,setEditarInfoDelChofer,setEmailDelChoferEditar})=>{

    const [acticando,setActivando]=useState(false);

    return(
        <View key={i} style={{alignItems:'center',flexDirection:'row',alignContent:'center'}}>
             {item.tipoSubscripcion!='C' && seleccionar==true && <View style={{borderWidth:2,borderColor:'red',height:25,width:25,alignItems:'center',marginRight:5}}
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
                <Text style={{color:'white'}}>{(acticando)?"✓":""}</Text>
            </View>}

            {(item.tipoSubscripcion=='C' || seleccionar==false) && <View style={{height:25,width:25,alignItems:'center',marginRight:5}}>
                
            </View>}

            <View style={{height:30,width:180,backgroundColor:"#101038",margin:3,alignItems:'center',marginRight:10,alignSelf:'center'}}
                onTouchEnd={()=>{
                    setEmailDelChoferEditar(item.email);
                    setEditarInfoDelChofer(true);
                }}
            >
                <Text style={{fontSize:16,color:'#f1f1f1',textAlignVertical:'center'}}>{item.email}</Text>
            </View>
            <View style={[(item.tipoSubscripcion=='C')?{borderColor:'green'}:(acticando)?{borderColor:'yellow'}:{borderColor:'red'},{borderWidth:2},{width:'35%',alignItems:'center',borderRadius:6}]}>
                <Text style={{fontSize:16,fontWeight:'400',color:'#000'}}>{(item.tipoSubscripcion!='C' && acticando==false)?"Inactivo":(acticando)?"Pendiente":"Activo"}</Text>
            </View>
        </View>
    )
}

export default PerfilesDeUsuarios