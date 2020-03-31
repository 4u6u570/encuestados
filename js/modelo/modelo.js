/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.borrarPreguntas = new Evento(this);
  this.inicializarLocalStorage();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function () {
    /*set item de local storage*/
  },

  borrarPregunta: function(id) {
    this.preguntas = this.preguntas.filter(function (pregunta) {
      return pregunta.id != id;
    });
    this.preguntaEliminada.notificar();
  },
  editarPregunta: function(id) {
    var edicion = prompt("Editar Pregunta");
    var pregunta = this.preguntas.filter(function (pregunta) {
      return pregunta.id === id;
    });
    pregunta.textoPregunta = edicion;
    this.guardar();
    this.preguntaEditada.notificar();
  },
  borrarTodo: function() {
    this.preguntas = [];
    this.guardar();
    this.borrarPreguntas.notificar();
  },
  sumarVoto: function(pregunta,respuesta){
    for (let i = 0; i < this.preguntas.length ; i++) {
        if (this.preguntas[i].textoPregunta === pregunta) {
          for (let j = 0; j < this.preguntas[i].cantidadPorRespuesta.length; j++) {
            if (this.preguntas[i].cantidadPorRespuesta[j].textoRespuesta === respuesta) {
              this.preguntas[i].cantidadPorRespuesta[j].cantidad++;        
            }
          }
        }
      }
  
    this.guardar();
    this.votoAgregado.notificar();
  },
  inicializarLocalStorage: function(){

  },

  borrarLocalStorage: function(){

  }

};


