import React from "react";
import { View, Text, FlatList } from 'react-native';
import Estilos from "../estilos/Estilos";

const treinoA = [
    { id: "001", exercicio: "Puxada Pulley Supinado", serie: "4", repeticao: "12", carga: "35kg" },
    { id: "002", exercicio: "Barra Graviton Supinada", serie: "4", repeticao: "12", carga: "45kg" },
    { id: "003", exercicio: "Remada Curvada Unilateral", serie: "4", repeticao: "12", carga: "10kg" },
    { id: "004", exercicio: "Remada Máquina Sentada", serie: "4", repeticao: "12", carga: "20kg" },
    { id: "005", exercicio: "Rosca Direta Pronada", serie: "3", repeticao: "12", carga: "15kg" },
    { id: "006", exercicio: "Rosca Direta W", serie: "4", repeticao: "12", carga: "20kg" },
    { id: "007", exercicio: "Rosca Scott", serie: "4", repeticao: "12", carga: "20kg" },
    { id: "008", exercicio: "Abdomen Máquina", serie: "4", repeticao: "20", carga: "45kg" }
];

const treinoB = [
    { id: "010", exercicio: "Pullover", serie: "4", repeticao: "12", carga: "35 kg" },
    { id: "011", exercicio: "Voador Peitoral", serie: "4", repeticao: "12", carga: "40 kg" },
    { id: "012", exercicio: "Supino Inclinado", serie: "4", repeticao: "12", carga: "25 kg" },
    { id: "013", exercicio: "Triceps Pulley", serie: "4", repeticao: "12", carga: "25 kg" }, 
    { id: "014", exercicio: "Triceps Invertido", serie: "4", repeticao: "12", carga: "25 kg" },
    { id: "015", exercicio: "Triceps Testa", serie: "4", repeticao: "12", carga: "10 kg" },
    { id: "016", exercicio: "Abdomen Prancha Frontal", serie: "4", repeticao: " 30s ", carga: " "},
    { id: "017", exercicio: "Flexão Braço Aberta", serie: "3", repeticao: "15", carga: " " }
];

const treinoC = [
    { id: "018", exercicio: "Agachamento Livre", serie: "3", repeticao: "15", carga: "10 kg" },
    { id: "019", exercicio: "Cadeira Abdutora", serie: "3", repeticao: "15", carga: "35 kg" },
    { id: "020", exercicio: "Cadeira Adutora", serie: "3", repeticao: "15", carga: "35 kg" },
    { id: "021", exercicio: "Cadeira Extensora", serie: "3", repeticao: "15", carga: "45 kg" },
    { id: "022", exercicio: "Cadeira Flexora", serie: "3", repeticao: "15", carga: "45 kg" },
    { id: "023", exercicio: "Leg Press Horizontal", serie: "3", repeticao: "15", carga: "50 kg" },
    { id: "024", exercicio: "Panturrilha Leg Horizontal", serie: "3", repeticao: "15", carga: "30 kg" }
];

export default function({ treino }) {
    let treinoSelecionado;

    // Usando if para selecionar o treino
    if (treino === 'A') {
        treinoSelecionado = treinoA;
    }  if (treino === 'B') {
        treinoSelecionado = treinoB;
    } else if (treino === 'C') {
        treinoSelecionado = treinoC;
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
