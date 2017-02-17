import React, { Component } from 'react';
import { View , Navigator , AsyncStorage } from 'react-native';

import IndexScene from '../../inicio';
import PartidaScene from '../../partida';

const Cabecera = require('./Cabecera.js');
const Tablero = require('./Tablero.js');

const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";

var App = React.createClass({

	  appClick: function (numeroFila, numberoColumna) {
    moves++;
  let valores = this.state.valores;
  let nuevoValor = this.state.turno === JUGADORX ? 'X' : '0'; valores[numeroFila][numberoColumna] = nuevoValor; this.setState({
  turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
               valores: this.state.valores
           });
  if(this.hayGanador(valores, nuevoValor)){
          alert("Ha ganado: " + this.state.turno + ". La partida se ha resuelto en " + moves + " movimientos");
          this.setState(this.getInitialState());
          moves = 0;
        }else{
          if(this.hayEmpate(valores)){
            alert("Ha habido un empate. La partida se ha resuelto en " + moves + " movimientos");
            this.setState(this.getInitialState());
            moves = 0;
          }
        }
  },

	 guardar: async function() {
        try {
            await AsyncStorage.setItem('@Store:estado', JSON.stringify(this.state));
            alert('guardado con exito');
        } catch (error) {
            alert('fallo al guardar');
        }
    },
    cargar: async function() {
        try {
            const value = await AsyncStorage.getItem('@Store:estado');
            if (value !== null){
            // We have data!!
            var state = JSON.parse(value);
            this.setState(state);
            }
        } catch (error) {
             // Error retrieving data
             alert(error);
        }
},
	

render: function(){
const routes = [
{title: 'Index', index: 0},
{title: 'Partida', index: 1},
];
return (
<Navigator
initialRoute={routes[0]}
initialRouteStack={routes}
renderScene={(route, navigator) => {
var onForward = function(){
const nextIndex = route.index + 1;
if(typeof routes[nextIndex] == "object"){
navigator.push(routes[nextIndex])
}
}
var onBack = function(){
if (route.index > 0){
navigator.pop();
}
}
switch(route.index){
case 0:
return <IndexScene onForward={onForward} onBack={onBack} />
case 1:
return <PartidaScene onForward={onForward} onBack={onBack} state={this.state} manejadorTableroClick={this.appClick}  guardar={this.guardar} cargar={this.cargar} />
}
}}
/>
);
}
});
module.exports = App;
