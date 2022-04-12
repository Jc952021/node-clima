const fs = require("fs")
const axios = require("axios");
require("dotenv").config();


class Busquedas {
//ruta
path = "./db/db.json"
historial = []

  constructor() {
    this.leerDb()
  }

  get paramsMapbox() {
    return {
      language: "es",
      access_token: process.env.MAPBOX || "",
      limit: 5,
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPEN_WEATHER_TOKEN,
      lang: "es",
      units: "metric",
    };
  }

  get historialCapitalizado(){
    return this.historial.map(lugar=>{
      let palabras = lugar.split(" ") //separamos cada palabra desde un espacio,este devuelve un arreglo [ "algo","otro"]
      palabras = palabras.map(palabra=>palabra[0].toUpperCase()+palabra.substring(1) )//que retorne de la 1 palabra que sera mayuscula concatenado con las demas palabras
      return palabras.join(" ") //el join separa cada palabra del arreglo con un espacio, seria algo otro
    })
  }

  //funcion donde me llegara un lugar para buscar
  async ciudad(lugar = "") {
    try {
      console.log(`Ciudad : ${lugar}`);
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
   
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        name: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {}
  }
  //funcion para buscar mas info de un lugar
  async climaLugar(long, lat) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`,
        params: this.paramsWeather,
      });
      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
//funcion para guardar en el historial
agregarHistorial(lugar=""){
  //sin repeticion
  if(this.historial.includes(lugar.toLowerCase())){ // si el historial incluye el lugar que hemos pasado
    return //entonces que acabe la funcion
  }
  this.historial = this.historial.splice(0,5) //desde la pos 0 elimina los 5 primeros,quedandose con este arreglo de los 5 primeros eliminados
  console.log(this.historial)

this.historial.unshift(lugar.toLowerCase())//guardar el lugar en minusculas
console.log(this.historial)
this.guardarDb()
}

guardarDb(){
const payload ={ //se crea un obj si queremos guardar otras cosas mas
  historial:this.historial
}

fs.writeFileSync(this.path,JSON.stringify(payload))
}

leerDb(){
  if(!fs.existsSync(this.path)){
    return null
  }
  const info = fs.readFileSync(this.path,{encoding:"utf-8"})
  const data = JSON.parse(info)
  this.historial = [...data.historial]
}
}

module.exports = Busquedas;

//vid11
//el axios puedes usar un create ,este Puede crear una nueva instancia de axios con una configuración personalizada.
//https://axios-http.com/docs/instance
//separarlo en base y params,recordar que los params son despues de un ? que esta en la url
//ya que params se va a utilizar muy seguido, entonces se crear paramsMap en una funcion get

//vid13
//al hacer un get buscando los lugares parecidos al nombre que puse
//este debe retornar un arreglo de objetos con algunas props-regresar al ind

//vid16
//crear una funcion donde se hara una consulta con los params long y lat
//donde me traera info de una ciudad y retornar un obj con algunas props
//se creara un axios create donde se separara los param con get
//se podria solo con un axios.get pero seria una url muy larga


//vid17
//para persistir los nombres de lo que buscamos,debemos guardarlo en el historial
//crear una funcion para guardarlo en el historial y este debe recibir el lugar.name en el case 1,despues de encontrar un lugar
//en el case 2 ,traer el historial y mostrarlo con console.log-probar poniendo algunos strings en el historial
//cuando agregamos historial,hacer una condicion para que no se repita el mismo nombre
//ahora crear otra funcion para guardarlo en la db-cerra una carp db y guardar el historial en json en uno de sus archivos
//en guardar historial despues de hacer el unshift.guardar la db

//vid19
//hacer una funcion para leer la db
//tarnsformarlo en parse y pasarlo a la historial
//en constructor inicializarlo para que el historial verifique si tiene datos
//como todo me llega en minusculas ,debemos pasar cada letra incial a mayusculas
//crear un get 
//al agregar al historial debemos eliminar los primeros 5 con splice
//ir a index