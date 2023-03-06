import React, { useState } from 'react';
import * as IAP from 'react-native-iap';
import {useEffect} from 'react';


const useComprasPlayStore=(emailState,purchase, setPurchase,setMensajeAlerta,setMostrarAlerte,setTiempoDesdeLaUltimaSuscripcion,setMostrarInformacion,datosDelUsuarioSinSuscripcion,secionIniciada)=>{

    const items=Platform.select({
        ios:[],
        //android:['productosubcripcionchoferes']
        android:['suscripcionchofer','suscripcionpasajero','suscripcionpremiun']
    });
    
    let purchaseUpdateSuscription=null;
    let purchaseErrorSuscription=null;

    const [productos, setProductos]=useState([]);
    const [historial, setHistorial]=useState("");
    const [purchaseTxt, setPurchaseTxt]=useState("");
    const [idFacturaOApellidos, setIdFacturaOApellidos]=useState("GPA.4394-0891-5913-27372");
    useEffect(()=>{

        try{            
            IAP.initConnection().catch(()=>{
                console.log("Ocurrio un error");
            }).then((res)=>{
                console.log("Los datos de la tienda son: ");
                console.log(res);
                IAP.getSubscriptions({skus:items}).catch(()=>{
                    console.log("Ocurrio un error obteniendo los productos");
                }).then(res=>{
                    console.log("LAS SUSCRIPCIONES FUERON: ");
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
    
            purchaseUpdateSuscription=IAP.purchaseUpdatedListener((purchaseEvent)=>{
                const reciep=purchaseEvent.transactionReceipt;
                if(reciep){
                    IAP.finishTransaction({purchase:purchaseEvent, isConsumable: false, developerPayloadAndroid: emailState});
                    console.log("EL SUPUESTO PURCHASE DE LA VENTA ES: ");
                    console.log(purchaseEvent);
                    setIdFacturaOApellidos("GPA.3394-0891-5913-27372");
                    setPurchaseTxt(JSON.stringify(purchaseEvent));
                    setMostrarInformacion(true);

                    let month=(new Date()).getMonth();
                    let fechaHoy=new Date();
                    fechaHoy.setMonth(month+1);
                    let tiempo=(Date.parse(fechaHoy)+(1000*60*60*24)).toString();
                    setTiempoDesdeLaUltimaSuscripcion(tiempo);
                    setPurchase(true);                    
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

    const refrescarHistorial=async()=>{
        try{
            const info=await IAP.getPurchaseHistory().then((res)=>{
                setHistorial(JSON.stringify(res));
            });
        }catch{

        }
    }

    const comprarProducto=async(producto)=>{
        try{            
            //IAP.requestSubscription({sku:producto});
            console.log("lA MIERDA ES: ");
            //console.log(productos);
            let subscriptionOffers = [];
            if(producto==productos[0].productId){
                subscriptionOffers={subscriptionOffers:[{sku:producto,offerToken:(productos[0].subscriptionOfferDetails[0].offerToken),}]};
            }else if(producto==productos[1].productId){
                //console.log("la mierda llego hasta aqui ");                
                subscriptionOffers={subscriptionOffers:[{sku:producto,offerToken:(productos[1].subscriptionOfferDetails[0].offerToken),}]};
                //console.log(subscriptionOffers);
            }else if(producto==productos[2].productId){
                subscriptionOffers={subscriptionOffers:[{sku:producto,offerToken:(productos[2].subscriptionOfferDetails[0].offerToken),}]};
            }else if(producto==productos[3].productId){
                subscriptionOffers={subscriptionOffers:[{sku:producto,offerToken:(productos[3].subscriptionOfferDetails[0].offerToken),}]};
            }
            console.log("la mierda llego hasta aqui ");
            console.log(subscriptionOffers);

            let posicion=-1;
            
            try{
                
                const info=await IAP.getPurchaseHistory().then((res)=>{
                    console.log(res);                
                    
                    
                    for(let y=0;y<JSON.parse(JSON.stringify(res)).length;y++){
                        // console.log(JSON.parse(JSON.parse(JSON.stringify(res))[y].dataAndroid).productId);
                        // console.log("la comparacion es: ");
                        // console.log(producto);
                        // console.log(JSON.parse(JSON.parse(JSON.stringify(res))[y].dataAndroid).productId);
                        if(JSON.parse(JSON.parse(JSON.stringify(res))[y].dataAndroid).productId==producto){
                            posicion=y;
                        }
                    }
                    // console.log("La posicion es: "+posicion);
                    // console.log("Los datos del  usuario transportista son: ");
                    // console.log(datosDelUsuarioSinSuscripcion);
            
                    console.log("Salio hasta aqui con la posicion "+posicion);
                    if(posicion>0){
                        let tiempo=JSON.parse(JSON.parse(JSON.stringify(res))[posicion].dataAndroid).purchaseTime;                   
                        let cantidadComprada=JSON.parse(JSON.parse(JSON.stringify(res))[posicion].dataAndroid).quantity;
                        console.log(cantidadComprada);
                        let fecha=new Date(1970,0,1);
                        fecha.setMilliseconds((parseInt(tiempo)));

                        let fechaActual= new Date();
                        let mes=fecha.getMonth();
                        fecha.setMonth(mes+1);
                        // fecha.setHours(24);

                        let tiempoDos=(fecha.getTime()+1000*3600*24);


                        if((fecha>fechaActual && parseInt(cantidadComprada)>=1 && posicion>=0 && datosDelUsuarioSinSuscripcion.apellidos.includes('GPA') && datosDelUsuarioSinSuscripcion.apellidos.length>21 && secionIniciada==false) || secionIniciada==true){
                            
                            console.log("Los datos del usuario son: ");

                            let tiempoDesdeLaVenta=tiempo;
                            let tiempoDeLaVentaActual=(new Date).getTime();
                            
                            console.log("Los tiempos son: ");
                            console.log(tiempoDesdeLaVenta);
                            console.log(tiempoDeLaVentaActual);
                            console.log((tiempoDesdeLaVenta-tiempoDeLaVentaActual));

                            if(fecha>fechaActual && parseInt(cantidadComprada)>=1 && Math.abs((tiempoDesdeLaVenta-tiempoDeLaVentaActual))>=345600000){
                                console.log("LA SUSCRIPCION YA ESTA COMPRADA");
                                setTiempoDesdeLaUltimaSuscripcion((tiempoDos).toString());
                                setPurchase(true);    
                                return;                        
                            }
                        }else if(posicion>=0 && secionIniciada==false && fecha>fechaActual && parseInt(cantidadComprada)>=1){
                            setMensajeAlerta("Otro usuario compró esta suscripción, acceda desde otro dispositivo y compre una");
                            setMostrarAlerte(true);
                        }
                    }

                });
                console.log("HASTA AQUI NO LLEGO");
                var purchase = await IAP.requestSubscription(subscriptionOffers);

            }catch{
                console.log("OCURRIO UN ERROR EN EL PRIMER TRY");
            }

        }catch{
           console.log("OCURRIO un error en la compra");
        }
    }

    return{
        comprarProducto,
        refrescarHistorial,
        purchaseTxt,
        historial,
        idFacturaOApellidos
    }
}

export default useComprasPlayStore