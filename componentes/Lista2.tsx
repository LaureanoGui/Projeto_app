import React from "react";
import { View, Text, FlatList } from 'react-native';
import Estilos from "../estilos/Estilos";

const treinoA = [
    { id: "120", exercicio: "Levantamento Terra", serie: "4", repeticao: "10", carga: "50kg" },
    { id: "121", exercicio: "Barra Fixa", serie: "4", repeticao: "10", carga: "Peso Corporal" },
    { id: "122", exercicio: "Remada Curvada", serie: "4", repeticao: "12", carga: "20kg" },
    { id: "123", exercicio: "Face Pull", serie: "4", repeticao: "12", carga: "15kg" }
];

const treinoB = [
    { id: "130", exercicio: "Crucifixo Inclinado", serie: "4", repeticao: "12", carga: "20kg" },
    { id: "131", exercicio: "Desenvolvimento Militar", serie: "4", repeticao: "12", carga: "25kg" },
    { id: "132", exercicio: "Paralelas", serie: "4", repeticao: "10", carga: "Peso Corporal" },
    { id: "133", exercicio: "Rosca Direta", serie: "4", repeticao: "12", carga: "15kg" }
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
