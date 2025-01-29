import React from "react";
import { View, Text, FlatList } from 'react-native';
import Estilos from "../estilos/Estilos";

const treinoA = [
    { id: "001", exercicio: "Puxada Pulley Supinado", serie: "4", repeticao: "12", carga: "35kg" },
    { id: "002", exercicio: "Barra Graviton Supinada", serie: "4", repeticao: "12", carga: "45kg" },
    { id: "003", exercicio: "Remada Curvada Unilateral", serie: "4", repeticao: "12", carga: "10kg" },
    { id: "004", exercicio: "Remada Máquina Sentada", serie: "4", repeticao: "12", carga: "20kg" }
];

const treinoB = [
    { id: "010", exercicio: "Pullover", serie: "4", repeticao: "12", carga: "35 kg" },
    { id: "011", exercicio: "Voador Peitoral", serie: "4", repeticao: "12", carga: "40 kg" },
    { id: "012", exercicio: "Supino Inclinado", serie: "4", repeticao: "12", carga: "25 kg" },
    { id: "013", exercicio: "Triceps Pulley", serie: "4", repeticao: "12", carga: "25 kg" }
];

export default function({ treino }) {
    let treinoSelecionado;

    // Usando if para selecionar o treino
    if (treino === 'A') {
        treinoSelecionado = treinoA;
    } else if (treino === 'B') {
        treinoSelecionado = treinoB;
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={treinoSelecionado} 
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <View style={Estilos.item}>
                        <Text style={Estilos.textoExercicios}>
                            {item.exercicio}
                            {"\n"}Série: {item.serie}
                            {"\n"}Repetição: {item.repeticao}
                            {"\n"}Carga: {item.carga}
                        </Text>
                    </View>
                }
            />
        </View>
    );
}
