import React from "react";
import { View, Text, FlatList } from 'react-native';
import Estilos from "../estilos/Estilos";

const treinoA = [
    { id: "001", exercicio: "Agachamento Livre", serie: "3", repeticao: "12", carga: "15kg" },
    { id: "002", exercicio: "Cadeira Extensora", serie: "3", repeticao: "12", carga: "30kg" },
    { id: "003", exercicio: "Cadeira Flexora", serie: "3", repeticao: "12", carga: "30kg" },
    { id: "004", exercicio: "Glúteo Máquina", serie: "3", repeticao: "12", carga: "25kg" },
    { id: "005", exercicio: "Elevação Pélvica", serie: "3", repeticao: "12", carga: "20kg" },
    { id: "006", exercicio: "Panturrilha Sentada", serie: "3", repeticao: "15", carga: "20kg" }
];

const treinoB = [
    { id: "007", exercicio: "Remada Baixa", serie: "3", repeticao: "12", carga: "20kg" },
    { id: "008", exercicio: "Puxada Frontal", serie: "3", repeticao: "12", carga: "25kg" },
    { id: "009", exercicio: "Desenvolvimento Ombros", serie: "3", repeticao: "12", carga: "10kg" },
    { id: "010", exercicio: "Elevação Lateral", serie: "3", repeticao: "12", carga: "5kg" },
    { id: "011", exercicio: "Tríceps Pulley", serie: "3", repeticao: "12", carga: "15kg" },
    { id: "012", exercicio: "Prancha Abdominal", serie: "3", repeticao: "30s", carga: "" }
];

const treinoC = [
    { id: "013", exercicio: "Leg Press 45°", serie: "3", repeticao: "12", carga: "40kg" },
    { id: "014", exercicio: "Afundo com Halteres", serie: "3", repeticao: "12", carga: "10kg" },
    { id: "015", exercicio: "Cadeira Abdutora", serie: "3", repeticao: "12", carga: "25kg" },
    { id: "016", exercicio: "Cadeira Adutora", serie: "3", repeticao: "12", carga: "25kg" },
    { id: "017", exercicio: "Glúteo no Cross", serie: "3", repeticao: "12", carga: "15kg" },
    { id: "018", exercicio: "Panturrilha no Leg Press", serie: "3", repeticao: "15", carga: "20kg" }
];

const treinoD = [
    { id: "019", exercicio: "Esteira Caminhada Rápida", serie: "1", repeticao: "20min", carga: "" },
    { id: "020", exercicio: "Elíptico", serie: "1", repeticao: "15min", carga: "" },
    { id: "021", exercicio: "Abdominal Supra", serie: "3", repeticao: "15", carga: "" },
    { id: "022", exercicio: "Abdominal Infra", serie: "3", repeticao: "15", carga: "" },
    { id: "023", exercicio: "Prancha Lateral", serie: "3", repeticao: "30s", carga: "" }
];

export default function({ treino }) {
    let treinoSelecionado;

    if (treino === 'A') {
        treinoSelecionado = treinoA;
    } else if (treino === 'B') {
        treinoSelecionado = treinoB;
    } else if (treino === 'C') {
        treinoSelecionado = treinoC;
    } else if (treino === 'D') {
        treinoSelecionado = treinoD;
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
