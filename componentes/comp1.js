import React from 'react';
import {View, Text, StyleSheet}from 'react-native';
import Estilos from '../estilos/Estilos.tsx';

export default function(props){
    return(
        <View style ={Estilos.container}> 
        <Text style={Estilos.textoExercicios}> {props.exercicio}: Serie = {props.serie}| Repetição = {props.repeticao} | Carga: {props.carga}</Text>
    </View>
    )
};
