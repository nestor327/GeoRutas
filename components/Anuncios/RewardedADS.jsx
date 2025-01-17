import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState,useEffect} from 'react';
  import { AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

  //const adUnitId = (VERSIONDELAPLICACION==1)? TestIds.REWARDED:'ca-app-pub-1889500700036964/6034338968';
  const adUnitId = 'ca-app-pub-1889500700036964/1444382919';
  //const adUnitId = TestIds.REWARDED;
  
  // const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  //     requestNonPersonalizedAdsOnly: true
  //   });
  const rewarded = RewardedAd.createForAdRequest(adUnitId,{
    requestNonPersonalizedAdsOnly: true
  });

  const RewardedADS = ({VERSIONDELAPLICACION,setMostrarAnuncioRewarded,enviarTiempoDesdeElUltimoAnuncio
                      ,setMostrarComprasPasajeros,setTiempoDeEspera,setDetenerInterval,compartiendoUbicacionComoPasajero}) => {
    
    const [anuncioCargado, setAnuncioCargado]=useState(false);
    useEffect(() => {
        // const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setAnuncioCargado(true);
            setMostrarAnuncioRewarded(false);
            enviarTiempoDesdeElUltimoAnuncio();
            console.log("se esta cargando");
            rewarded.show();
        });


        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            console.log('User earned reward of ');
            console.log(reward);
            if(reward.amount>0){
              setAnuncioCargado(false);
              setMostrarAnuncioRewarded(false);
              setMostrarComprasPasajeros(false);
              enviarTiempoDesdeElUltimoAnuncio();            
              if(compartiendoUbicacionComoPasajero==false){
                setDetenerInterval(false);
                setTiempoDeEspera(120);
              }
              console.log("El tiempo si se actualizo si no lo ves algo paso ahi");
            }else{
              console.log("No se permite el acceso");
            }
          },
        );
    
        // Start loading the rewarded ad straight away
        console.log("Intentaste inicar la vaina");
        rewarded.load();
        console.log("Intentaste inicar la vaina x2");

        // Unsubscribe from events on unmount
        // return () => {
        //   unsubscribeLoaded();
        //   unsubscribeEarned();
        // };
      }, []);

      if(anuncioCargado==false){
        //setMostrarAnuncioRewarded(false);
        console.log("Not show the adds");        
        return (
          <View></View>
        );
      }else{
        //rewarded.show();
      }
  };
  
  export default RewardedADS;