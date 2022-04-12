const inquirer = require('inquirer');
require("colors")

const preguntas=[
  {
    type:"list",
    name:"opcion",
    message:"¿Que desea hacer?\n",
    choices :[ //aca estaran las opciones a escoger
      { 
      value:1, //se debe poner un valor para saber que opcion hemos elegido
      name:`${"1.".green} Buscar ciudad`
      },
      { 
      value:2,
      name:`${"2.".green} Historial`
      },
      { 
      value:0,
      name:`${"0.".green} Salir`
      },
  
    ] 
  }
]

const inquirerMenu=async()=>{
  console.clear()
  console.log("=======================".green)
  console.log("Seleccione una opción".green)
  console.log("=======================\n".green)

//este crearia una interfaz y al seleccionar algo nos trae un objeto con el nombre de la pregunta y su value
const {opcion} = await inquirer.prompt(preguntas) 
//el de arriba trae { opcion: '0' } - pero destructuramos la opcion que tendra solo el valor
return opcion
}

const inquirerPausa=async()=>{
//crear una pregunta para el prompt
const question = [ {
  type:"input",
  name:"pausa",
  message:`Presione ${"enter".green} para continuar`
}]

await inquirer.prompt(question) //no hay que retornar nada
}
//leerinput opcion 1 al crear una tarea,funcion para leer lo que puso el usuario
const leerInput=async(message)=>{
  const question = [ {
    type:"input",
    name:"desc",
    message, //este sera el mismo mensaje que llego en el param
  validate(value){ //con esto se valida que el usuario lo que escriba en el input no sea 0
    if(value.length === 0){
      return "Por favor ingrese un valor"
    }
    return true  //sig que lo que puso es valido
  }
  }]
const {desc} = await inquirer.prompt(question) //solo quiero la des del objeto
return desc
}
//funcion para mostrar el nombre de los lugares
const listadoLugares=async(lugares)=>{
//construir una pregunta pero 1 se hara las choices(este debe ser un arreglo de obj para mostrar su valor)
const choices = lugares.map((lugar,i)=>{
  const idx = `${i+1}.`.green
  return{
    value:lugar.id,
    name:`${idx} ${lugar.name}`
  }
})
//agregar al comienzo una nueva opcion
choices.unshift({
  value:"0",
  name:"0.".green + " Cancelar"
})
//ya con el choices armar la pregunta
const question =[
  {
    type:"list",
    name:"id",
    message:"Seleccione lugar:",
    choices
  }
]
const {id} =  await inquirer.prompt(question)
return id //que retorne el id,que seria el value de un lugar al escogerla
}

//funcion de confimrar
const confirmar=async(message)=>{
  const question =[
    {
      type :"confirm", //es otro metodo donde te saldra (y/n)
      name : "ok",
      message
    }
  ]
const {ok} = await inquirer.prompt(question)
return ok  //este devuelve true o false

}
//funcion para mostrar un listado de tareas con check , es como la funcion listadotareasborrar
const mostrarListadoChecklist=async(tareas)=>{
  const choices = tareas.map((tarea,i)=>{
    const idx = `${i+1}.`.green
    return{
      value:tarea.id,
      name:`${idx} ${tarea.desc}`,
      checked:tarea.completadoEn ? true:false //el check muestra un boton verde si esta en true
    }
  })
  
  //ya con el choices armar la pregunta
  const question =[
    {
      type:"checkbox", //ahora sera de tipo checbox
      name:"ids", //este te traera un arreglo con los id que estan en true
      message:"Seleccione",
      choices
    }
  ]

  const {ids} =  await inquirer.prompt(question)
  return ids //que retorne el arreglo de ids
}

module.exports={
  inquirerMenu,
  inquirerPausa,
  leerInput,
  listadoLugares,
  confirmar,
  mostrarListadoChecklist
}


//vid13
//para mostrar la lista de lugares,crear la funcion donde te debe mostar una lista de lugares