import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Estilos from './estilos/Estilos.tsx';
import Lp from './componentes/ListaPlana.tsx';
import {
  Text,
  View,
  Image,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

const Guias = createBottomTabNavigator();

function TelaHome() {
  return (
    <View style={Estilos.container}>
      <Image
        source={require('./assets/imagens/Academia_mainLogoType.png')}
        style={Estilos.logoPrincipal}
      />
      <Text style={Estilos.txtLogo}>Bem-vindo à One Strong!</Text>
      <Text style={Estilos.txt0}>Academia</Text>
    </View>
  );
}

function TelaTreino() {
  const [treino, setTreino] = useState('A');

  const renderTreino = () => {
    switch (treino) {
      case 'A':
        return <Lp treino="A" />;
      case 'B':
        return <Lp treino="B" />;
      default:
        return null;
    }
  };

  return (
    <View style={Estilos.container}>
      <ImageBackground
        source={require('./assets/imagens/background-image.png')}
        style={Estilos.imagemFundo}
      >
        <Button
          title="Mostrar mensagem"
          onPress={() => Alert.alert('Treino A', 'Texto texto texto')}
        />
        <Text style={Estilos.txtLogo}>ONE STRONG</Text>
        <Text style={{ color: '#E0E0E0', textAlign: 'center' }}>Be the one, be strong</Text>

        {/* Botões para selecionar o treino */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={[Estilos.botaoTreino, treino === 'A' && Estilos.botaoTreinoPress]}
            onPress={() => setTreino('A')}
          >
            <Text style={Estilos.textoExercicios}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Estilos.botaoTreino, treino === 'B' && Estilos.botaoTreinoPress]}
            onPress={() => setTreino('B')}
          >
            <Text style={Estilos.textoExercicios}>B</Text>
          </TouchableOpacity>
        </View>

        {renderTreino()}
      </ImageBackground>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Guias.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'black', // Cor de fundo da barra
          },
          tabBarLabelStyle: {
            color: 'red', // Cor do texto
          },
        }}
      >
        <Guias.Screen
          name="Home"
          component={TelaHome}
          options={{
            headerStyle: {
              backgroundColor: '#8B0000', // Cor de fundo do cabeçalho
            },
            headerTintColor: 'white', // Cor do texto e ícones no cabeçalho
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/imagens/home.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'red' : 'white', // Cor do ícone quando ativo
                }}
              />
            ),
          }}
        />
        <Guias.Screen
          name="Treino"
          component={TelaTreino}
          options={{
            headerStyle: {
              backgroundColor: '#8B0000', // Cor de fundo do cabeçalho
            },
            headerTintColor: 'white', // Cor do texto e ícones no cabeçalho
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/imagens/halter.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'red' : 'white', // Cor do ícone quando ativo
                }}
              />
            ),
          }}
        />
      </Guias.Navigator>
    </NavigationContainer>
  );
}
