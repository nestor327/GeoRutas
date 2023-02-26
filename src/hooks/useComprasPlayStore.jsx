import React, { useState } from 'react';
import * as IAP from 'react-native-iap';
import {useEffect} from 'react';


const items=Platform.select({
    ios:[],
    android:['productosubcripcionchoferes']
});

let purchaseUpdateSuscription=null;
let purchaseErrorSuscription=null;

const useComprasPlayStore=({purchase, setPurchase})=>{

    
    const [productos, setProductos]=useState([]);
    useEffect(()=>{

        try{
            IAP.initConnection().catch(()=>{
                console.log("Ocurrio un error");
            }).then((res)=>{
                console.log("Los datos de la tienda son: ");
                console.log(res);
                IAP.getProducts({skus:items}).catch(()=>{
                    console.log("Ocurrio un error obteniendo los productos");
                }).then(res=>{
                    console.log(res);
                    setProductos(res);
                });
            });
        
            purchaseErrorSuscription=IAP.purchaseErrorListener((error)=>{
                if(!(error.responseCode=="1" || error.responseCode=="7" || error.responseCode=="2")){
                    setMensajeAlerta("Ocurrió un error con la transacción");
                    setMostrarAlerte(true);
                }
            });
    
            purchaseUpdateSuscription=IAP.purchaseUpdatedListener((purchase)=>{
                const reciep=purchase.transactionReceipt;
                if(reciep){
                    console.log(reciep);
                    setPurchase(true);
                    IAP.finishTransaction({purchase:purchase, isConsumable: false, developerPayloadAndroid: "" });                    
                }
            });
        }catch{

        }

        return ()=>{
            try{
                purchaseErrorSuscription.remove();
            }catch{
                
            }

            try{
                purchaseUpdateSuscription.remove();
            }catch{

            }

            try{
                IAP.endConnection();
            }catch{

            }
        }
    },[]);

    const comprarProducto=(producto)=>{
        try{
            IAP.requestPurchase({sku:producto});
        }catch{
            console.log("OCURRIO un error en la compra");
        }
    }

    return{
        comprarProducto
    }
}

export default useComprasPlayStore