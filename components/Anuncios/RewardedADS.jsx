import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState,useEffect} from 'react';
  import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

  const adUnitId =  TestIds.REWARDED;

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });
  
  const RewardedADS = ({setMostrarAnuncioRewarded,enviarTiempoDesdeElUltimoAnuncio,setMostrarComprasPasajeros}) => {
  
    const [anuncioCargado, setAnuncioCargado]=useState(false);
    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setAnuncioCargado(true);          
            setMostrarComprasPasajeros(false);  
            //rewarded.show();
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            console.log('User earned reward of ', reward);
            setAnuncioCargado(false);
            setMostrarAnuncioRewarded(false);
            enviarTiempoDesdeElUltimoAnuncio();            
          },
        );
    
        // Start loading the rewarded ad straight away
        rewarded.load();
    
        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };
      }, []);

      if(anuncioCargado==false){
        //setMostrarAnuncioRewarded(false);
        console.log("No se puede cargar la mierda");
        return (
          <View></View>
        );
      }else{
        rewarded.show();
      }
  };
  
  export default RewardedADS;