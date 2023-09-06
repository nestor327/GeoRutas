

const obtenerTodasLasCoordenadas=(longitudeArriba, longitudeAbajo, latitudeDerecha, latitudeIzquierda)=>{

    let datos=[
        {id_Coordenada:1,id_Ruta:1,longitude:12.156879,latitude:-86.1988633,direccion:'I'},
        {id_Coordenada:2,id_Ruta:1,longitude:12.1559195,latitude:-86.1989501,direccion:'I'},
        {id_Coordenada:3,id_Ruta:1,longitude:12.1556001,latitude:-86.1989783,direccion:'I'},
        {id_Coordenada:4,id_Ruta:1,longitude:12.1550779,latitude:-86.1990472,direccion:'I'},
        {id_Coordenada:5,id_Ruta:1,longitude:12.1547938,latitude:-86.1990783,direccion:'I'},
        {id_Coordenada:6,id_Ruta:1,longitude:12.1545022,latitude:-86.1990996,direccion:'I'},
        {id_Coordenada:7,id_Ruta:1,longitude:12.1544575,latitude:-86.1991029,direccion:'I'},
        {id_Coordenada:8,id_Ruta:1,longitude:12.1543771,latitude:-86.1991087,direccion:'I'},
        {id_Coordenada:9,id_Ruta:1,longitude:12.1536145,latitude:-86.1991713,direccion:'I'},
        {id_Coordenada:10,id_Ruta:1,longitude:12.1533675,latitude:-86.199197,direccion:'I'},
        {id_Coordenada:11,id_Ruta:1,longitude:12.1530715,latitude:-86.1992157,direccion:'I'}
        ,{id_Coordenada:12,id_Ruta:1,longitude:12.1529994,latitude:-86.1992185,direccion:'I'},
]

    return datos.filter(elem => elem.longitude<=longitudeArriba && elem.longitude>=longitudeAbajo && elem.latitude<=latitudeDerecha && elem.latitude>=latitudeIzquierda);

}


export default obtenerTodasLasCoordenadas