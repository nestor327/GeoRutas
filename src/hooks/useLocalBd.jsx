import { useState } from 'react';
import SQLite from 'react-native-sqlite-2';


const useLocalBd=()=>{

    const [usuarioRegistrado, setUsuarioRegistrado]=useState({name: "nestordgt27@gmail.com", user_id: 1});
    
    const verificarCualEsElUsuarioDeLaCompra=(tipoDeVerificacion, emailState)=>{
        const db = SQLite.openDatabase('georutasdatabasesacb.db', '1.0', '', 1);

        //Verificando si existe el usuario
        if(tipoDeVerificacion==1){

            let respuesta="2";
            db.transaction(function(txn) {

                txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(250))',
                    []
                )

                txn.executeSql('SELECT * FROM `users`', [], function(tx, res) {
                    for (let i = 0; i < res.rows.length; i++) {
                      console.log('item:'+i);
                      console.log(res.rows.item(i));
                      setUsuarioRegistrado(JSON.parse(res.rows.item(i)));
                    }                 
                  }) 
            });
        }else if(tipoDeVerificacion==2){
            db.transaction(function(txn) {

                txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(250))',
                    []
                )

                txn.executeSql('DELETE FROM Users', []);

                txn.executeSql('INSERT INTO Users (name) VALUES (:name)', [emailState])

                setUsuarioRegistrado({name: emailState, user_id: 1});

            });
            return "2";
        }
    }

    
    return{
        verificarCualEsElUsuarioDeLaCompra,
        usuarioRegistrado
    }
}


export default useLocalBd;


