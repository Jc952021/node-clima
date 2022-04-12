require("colors")
const {
  leerInput,
  inquirerPausa,
  inquirerMenu,
  listadoLugares
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt;

  const busquedas = new Busquedas()


  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //leer input
       const termino = await leerInput("Ciudad: ");
       //buscar los lugares parecidos de la ciudad que puso el usuario
      const lugares = await busquedas.ciudad(termino)
      //mostrar listado de lugares a escoger y seleccionarlo
      const id = await listadoLugares(lugares)
      if(id==="0") continue //si es 0 entonces que continue en la condicion acabando el switch
      //traer el lugar que ha escogido segun el id
      const lugar = lugares.find(l=>l.id===id)
      //guardar en la db
      busquedas.agregarHistorial(lugar.name) //lugar es un obj
      //traer el clima del lugar seleccionado
      const clima = await busquedas.climaLugar(lugar.lng,lugar.lat)
       //mostrar los resultados
      console.log("\n Informacion de la ciudad\n".green)
      console.log(`Ciudad : ${(lugar.name).green} `,)
      console.log(`Lat : ${lugar.lat} `,)
      console.log(`Lng : ${lugar.lng} `,)
      console.log(`Temperatura: ${clima.temp}`,)
      console.log(`Temperatura min: ${clima.min}`,)
      console.log(`Temperatura máxima: ${clima.max}`,)
      console.log(`Como esta el clima: ${(clima.desc).green}`,)
        break;
      case 2:
      //traer el historial y mostrarlo con console.log
      busquedas.historialCapitalizado.forEach((lugar,i)=>{
        const index = `${i+1}`.green
        console.log(`${index}. ${lugar}`)
      })
      break
      default:
        break;
    }
    if (opt !== 0) await inquirerPausa();
  } while (opt !== 0);
};

main();

//vid4
//crear el init , npm i colors inquirer
//crer carp helpers - del proyect anterior, copiar su inquirer y traerlo a este proyect
//en el pkjson agregar el script start - node index.js - ejecutar la funcion main

//vid5
//en inquirer, en la funcion leerinput cambiar las preguntas y traerlo aca para que sea un ciclo con do-while-los values ahoran sera un entero
//de paso poner el inquirer pausa

//vid6
//crear un modelo busquedas-donde esa clase tendra una funcion async para buscar la ciudad
//ejecutar la clase busqueda antes del do while 
//crear el switch
//en la opcion 1 primero se lee el input,es decir lo que pone el usuario.llenar los resultados con algunos console.log

//vid8
//instalar npm i axios
//probar el axios en busquedas haciendo un axios get de la pag https://reqres.in/
//cuando se hace una peticion es bueno poner el try y catch

//vid10
//ir a mapbox y crear una cuenta-crear tu token-escoger unas 5 opciones 
//https://docs.mapbox.com/api/search/geocoding/ - click playground - limit 5 - buscar un lugar y copiar el reequest
//en mapbox -ponerlo en español-quitar el type filtering
//probarlo en una app para hacer post--guardar el token en un txt -despues de preparar el get-copiar ese get y pegarlo en la busqueda
//donde se hace el get de axios - ir a busquedad

//vid12
//instalar npm i dotenv
//al guardar ahi en .env, siempre lo guarda en un string
//usar el require para traer el dotenv
// para traer lo que guardaste, se pone process.env."la const con lo que guardaste"
// normalmente en arch .env cuando lo subas a produccion,este debe estar en el gitignore
// y se debe subir una copia del .env donde en sus valores se pondra TOKEN= "Poner aqui tu token"

//vid13
//cuando ejecuto la funcion busqueda.ciudad, quiero que me traiga un arreglo de objetos con prop construidas-ir a busqueda

//ya con los lugares se debe ir al inquirer para mostrar una lista al usuario

//video14
//entrar a openweather 
//crear un token y ponerlo en el env
//entrar en api - current- https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} - 
//probarlo con un get en una app-en lat,lon poner los valores de que pais vas a buscar,en key tu key
//agregar lang es y units metric para que venga en grados

//vid16
//ir a busquedas

//vid17
//ahora trabajar con el case 2 que es ver el historial
//pero primero al seleccionar el llistado de lugares si le damos a cancelar
//que seria el value "0"n entonces debemos para el switch-while- esto se para con continue donde ira a la condicion del while
//ir a busquedas

//vid19
//hacer una funcion para leer la db - ir a busq

//traer el historial con el getcapitalizado par mostrarlo
