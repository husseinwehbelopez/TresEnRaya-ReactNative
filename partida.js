import React, { Component } from 'react';
import { View , TouchableHighlight , Text , AsyncStorage } from 'react-native';
import MyButton from './src/js/MyButton';
//var TresEnRayaStore = require('./src/js/stores/TresEnRayaStore');
const Cabecera = require('./src/js/Cabecera');
const Tablero = require('./src/js/Tablero');

const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";

var moves = 0;
//const App = require('./src/js/App');
var PartidaScene = React.createClass({

  getInitialState: function () {
          return {
              turno: JUGADORX,
  valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']] };
  },

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

  resetClick: function(){
      var reinicio = confirm("¿Seguro que quieres reiniciar?");
      if (reinicio == true) {
          this.setState(this.getInitialState());
          moves = 0;
      }
  },

  hayGanador: function(valores, nuevoValor){
        var nFila, nCol;
        nFila = 0;
        nCol = 0;
        var num = 0;
        while(nFila<3){
          while(nCol<3){
            if(valores[nFila][nCol] === nuevoValor){
              num++;
            }else{
              num = 0;
            }
            nCol++;
          }
          if(num === 3) return true;
          nFila++;
          num = 0;
          nCol = 0;
        }

        nFila = 0;
        nCol = 0;
        var num = 0;
        while(nCol<3){
          while(nFila<3){
            if(valores[nFila][nCol] === nuevoValor){
              num++;
            }else{
              num = 0;
            }
            nFila++;
          }
          if(num === 3) return true;
          nCol++;
          num = 0;
          nFila = 0;
        }
        nFila = 0;
        num = 0;

        while(nFila<3){
          if(valores[nFila][nFila] === nuevoValor){
            num++;
          }else{
            num = 0;
          }
          nFila++;
        }
        if(num === 3) return true;

        nCol = 2;
        nFila = 0;
        num = 0;
        while(nCol>= 0 && nFila<3){
          if(valores[nFila][nCol] === nuevoValor){
            num++;
          }else{
            num = 0;
          }
          nFila++;
          nCol--;
        }
        if(num === 3) return true;

        return false;
  },

      hayEmpate: function(valores){
        var empate = 0;
        var nFila, nCol;
        for (nFila = 0; nFila < 3; nFila++) {
            for (nCol = 0; nCol < 3; nCol++) {
              if (valores[nFila][nCol] !== '-') {
                  empate++;
              }
          }
        }
        let cuadros = 9;
        if(empate === cuadros) return true;
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
//var state = TresEnRayaStore.getState();
var texto = "Turno del " + this.state.turno;
return (
<View style={{flex: 1, margin: 10}}>
<Cabecera texto={texto}/>
<Tablero valores={this.state.valores}  manejadorTableroClick={this.appClick} guardar={this.guardar} cargar={this.cargar}/>
<TouchableHighlight onPress={this.guardar}>
    <Text>Guardar la partida </Text>
 </TouchableHighlight>

 <TouchableHighlight onPress={this.cargar}>
    <Text>Cargar la partida </Text>
 </TouchableHighlight>
    
<MyButton onPress={this.props.onBack} text={"Volver"} />
</View>
)
}
});
export default PartidaScene;
