
import { useQuery,queryKey } from "react-query";

const getAllRutas=()=>{

    const {data,error,isLoading}=useQuery(['obtenerRutas'],async({queryKey})=>{
        return await fetch('https://georutas.somee.com/api/rutas').then(res=>datos=res.json()).catch(error => datos=[]);
    },{
        staleTime:86400000
    })


if(isLoading || error){
    return [];
}else if(!isLoading){
    //console.log("La puta data es: ");
    //console.log(data);
   return(data);
}
else{
    return []
// return([{id_Ruta:1,nombre:"6",color:"green",cantidad:33,capacidad:60},
//         {id_Ruta:2,nombre:"101",color:"blue",cantidad:33,capacidad:60},
//         {id_Ruta:3,nombre:"102",color:"red",cantidad:33,capacidad:60},
//         {id_Ruta:4,nombre:"103",color:"#42E014",cantidad:33,capacidad:60},
//         {id_Ruta:5,nombre:"104",color:"#C21230",cantidad:33,capacidad:60},
        // {id_Ruta:6,nombre:"105",color:"#183EAD",cantidad:33,capacidad:60},
        // {id_Ruta:7,nombre:"106",color:"#C25106",cantidad:33,capacidad:60},
        // {id_Ruta:8,nombre:"107",color:"#15B320",cantidad:33,capacidad:60},
        // {id_Ruta:9,nombre:"108",color:"#C20631",cantidad:33,capacidad:60},
        // {id_Ruta:10,nombre:"109",color:"#197F1B",cantidad:33,capacidad:60},
        // {id_Ruta:11,nombre:"110",color:"#42DA00",cantidad:33,capacidad:60},
        // {id_Ruta:12,nombre:"111",color:"#1A52B9",cantidad:33,capacidad:60},
        // {id_Ruta:13,nombre:"112",color:"#C00B38",cantidad:33,capacidad:60},
        // {id_Ruta:14,nombre:"113",color:"#BCCC20",cantidad:33,capacidad:60},
        // {id_Ruta:15,nombre:"114",color:"#F53325",cantidad:33,capacidad:60},
        // {id_Ruta:16,nombre:"115",color:"#2F61DE",cantidad:33,capacidad:60},
        // {id_Ruta:17,nombre:"116",color:"#F1AA09",cantidad:33,capacidad:60},
        // {id_Ruta:18,nombre:"117",color:"#22F55D",cantidad:33,capacidad:60},
        // {id_Ruta:19,nombre:"118",color:"#F51028",cantidad:33,capacidad:60},
        // {id_Ruta:20,nombre:"119",color:"#964C19",cantidad:33,capacidad:60},
        // {id_Ruta:21,nombre:"120",color:"#6AD213",cantidad:33,capacidad:60},
        // {id_Ruta:22,nombre:"123",color:"#E9ED34",cantidad:33,capacidad:60},
        // {id_Ruta:23,nombre:"125",color:"#45A2E9",cantidad:33,capacidad:60},
        // {id_Ruta:24,nombre:"133",color:"#D80F3A",cantidad:33,capacidad:60},
        // {id_Ruta:25,nombre:"125CS",color:"#092894",cantidad:33,capacidad:60},
        // {id_Ruta:26,nombre:"154",color:"#DE0B34",cantidad:33,capacidad:60},
        // {id_Ruta:27,nombre:"158",color:"#0FE7B3",cantidad:33,capacidad:60},
        // {id_Ruta:28,nombre:"159",color:"#A46235",cantidad:33,capacidad:60},
        // {id_Ruta:29,nombre:"163",color:"#F4E929",cantidad:33,capacidad:60},
        // {id_Ruta:30,nombre:"164",color:"#2994F4",cantidad:33,capacidad:60},
        // {id_Ruta:31,nombre:"165",color:"#71DD1C",cantidad:33,capacidad:60},
        // {id_Ruta:32,nombre:"167",color:"#961CDD",cantidad:33,capacidad:60},
        // {id_Ruta:33,nombre:"168",color:"#DD631C",cantidad:33,capacidad:60},
        // {id_Ruta:34,nombre:"169",color:"#3C5BC0",cantidad:33,capacidad:60},
        // {id_Ruta:35,nombre:"170",color:"#18899D",cantidad:33,capacidad:60},
        // {id_Ruta:36,nombre:"172",color:"#CF8C0B",cantidad:33,capacidad:60},
        // {id_Ruta:37,nombre:"175",color:"#115FAB",cantidad:33,capacidad:60},
        // {id_Ruta:38,nombre:"195",color:"#16AB11",cantidad:33,capacidad:60},
        // {id_Ruta:39,nombre:"210",color:"#E13535",cantidad:33,capacidad:60},
        // {id_Ruta:40,nombre:"262",color:"#0CA622",cantidad:33,capacidad:60},
        // {id_Ruta:41,nombre:"266",color:"#0E9FBC",cantidad:33,capacidad:60},
        // {id_Ruta:42,nombre:"MR4",color:"#C83C23",cantidad:33,capacidad:60},
        // {id_Ruta:43,nombre:"VAN",color:"#D65D27",cantidad:33,capacidad:60},
        // {id_Ruta:44,nombre:"ESQ",color:"#27A5D6",cantidad:33,capacidad:60},
        // {id_Ruta:45,nombre:"SIS",color:"#6AB019",cantidad:33,capacidad:60}
        // ]);
    }
}
export default getAllRutas