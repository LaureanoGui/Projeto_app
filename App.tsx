import React, { useEffect, useState, useCallback } from 'react';
import { CommonActions, NavigationContainer, useNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Estilos from './estilos/Estilos.tsx';
import Lp from './componentes/ListaPlana.tsx';
import Lp2 from './componentes/Lista2.tsx';
import Lp3 from './componentes/ListaL3.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from './AuthContext';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import {
  Text,
  View,
  Image,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

const Guias = createBottomTabNavigator();

const usuarios = [
  { nome: 'Admin', senha: 'admin123' },
  { nome: 'Ana', senha: '456' },
  { nome: 'Gui', senha: '123' },
  { nome: 'usuario1', senha: 'senha1' },
  { nome: 'usuario2', senha: 'senha2' },
];

const atividades : { [key: string]: string[] } = {
  '2025-02-01': ['Dança', 'Pilates'],
  '2025-02-03': ['Musculação', 'Spinning'],
  '2025-02-04': ['Dança', 'Pilates'],
  '2025-02-05': ['Funcional', 'Yoga'],
  '2025-02-06': ['Musculação', 'Spinning'],
  '2025-02-08': ['Funcional', 'Yoga'],
  '2025-02-09': ['Musculação', 'Spinning'],
  '2025-02-11': ['Dança', 'Pilates'],
  '2025-02-14': ['Musculação', 'Spinning'],
  '2025-02-15': ['Dança', 'Pilates'],
  '2025-02-18': ['Dança', 'Pilates']
};

let usuarioP;

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

function TelaHome() {
  const [ultimoTreino, setUltimoTreino] = useState('Nenhum treino registrado');
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
        carregarUltimoTreino();
}, []);

const carregarUltimoTreino = async () => {
  try {
    const usuarioAtual = await AsyncStorage.getItem('usuarioLogado');
     usuarioP = usuarioAtual;
    if (usuarioAtual) {
      const treinoSalvo = await AsyncStorage.getItem(`ultimoTreino_${usuarioAtual}`);
      if (treinoSalvo) {
        setUltimoTreino(treinoSalvo);
      } else {
        setUltimoTreino('Nenhum treino registrado');
      }
    }
  } catch (error) {
    console.error('Erro ao carregar o último treino:', error);
  }
};

useEffect(() => {
  carregarUltimoTreino();
}, []);
const atualizarUltimoTreino = async () => {
  try {
      const usuarioAtual = await AsyncStorage.getItem('usuarioLogado');
      if (!usuarioAtual) {
        Alert.alert('Não há usuário logado!');
        const treinoTexto = `Faça Login para verificar último treino`;
        setUltimoTreino(treinoTexto);
        return
      };
      const agora = new Date();
      agora.setHours(agora.getHours());

      const dataFormatada = `${agora.getDate().toString().padStart(2, '0')}/${(agora.getMonth() + 1).toString().padStart(2, '0')}/${agora.getFullYear().toString().slice(-2)}`;
      const horaFormatada = `${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;
      const treinoTexto = `Último Treino:\n ${dataFormatada} às ${horaFormatada}`;
      Alert.alert('Treino salvo com Sucesso');
      await AsyncStorage.setItem(`ultimoTreino_${usuarioAtual}`, treinoTexto);
      setUltimoTreino(treinoTexto);
  } catch (error) {
      console.error('Erro ao salvar o último treino:', error);
  }
};

  return (
    <View style={Estilos.container}>
      <Text style={Estilos.txt0}>{ultimoTreino}</Text>
      <Image source={require('./assets/imagens/Academia_mainLogoType.png')} style={Estilos.logoPrincipal} />
      <Text style={Estilos.txtLogo}>Bem-vindo à One Strong!</Text>
      <Text style={Estilos.txt0}>Academia</Text>
      <TouchableOpacity style={Estilos.botaoTreino} onPress={atualizarUltimoTreino}>
        <Text style={Estilos.textoExercicios}>Confirmar Presença</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaTreino() {
  const [treino, setTreino] = useState('A');
  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);

  useEffect(() => {
    verificarUsuarioLogado();
  }, []);

  const verificarUsuarioLogado = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioSalvo) {
        setUsuarioLogado(usuarioSalvo);
      }
    } catch (error) {
      console.error('Erro ao verificar usuário logado:', error);
    }
  };

  const renderTreino = () => {
    if (usuarioLogado == 'Admin'){
      return (
        <>
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
          {treino === 'A' && <Lp2 treino="A" />}
          {treino === 'B' && <Lp2 treino="B" />}
        </>
      );
    }
    if (usuarioLogado == 'Ana'){
        return (
          <>
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
              <TouchableOpacity
                style={[Estilos.botaoTreino, treino === 'C' && Estilos.botaoTreinoPress]}
                onPress={() => setTreino('C')}
              >
                <Text style={Estilos.textoExercicios}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[Estilos.botaoTreino, treino === 'D' && Estilos.botaoTreinoPress]}
                onPress={() => setTreino('D')}
              >
                <Text style={Estilos.textoExercicios}>D</Text>
              </TouchableOpacity>
            </View>
            {treino === 'A' && <Lp3 treino="A" />}
            {treino === 'B' && <Lp3 treino="B" />}
            {treino === 'C' && <Lp3 treino="C" />}
            {treino === 'D' && <Lp3 treino="D" />}
          </>
        );
    }
    if (usuarioLogado == 'Gui') {
      return (
        <>
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
            <TouchableOpacity
              style={[Estilos.botaoTreino, treino === 'C' && Estilos.botaoTreinoPress]}
              onPress={() => setTreino('C')}
            >
              <Text style={Estilos.textoExercicios}>C</Text>
            </TouchableOpacity>
          </View>
          {treino === 'A' && <Lp treino="A" />}
          {treino === 'B' && <Lp treino="B" />}
          {treino === 'C' && <Lp treino="C" />}
        </>
      );
    }
  };
  return (
    <View style={Estilos.container}>
      <ImageBackground source={require('./assets/imagens/background-image.png')} style={Estilos.imagemFundo}>
        <Text style={Estilos.txtLogo}>ONE STRONG</Text>
        <Text style={{ color: '#E0E0E0', textAlign: 'center' }}>Be the one, be strong</Text>
        {renderTreino()}
      </ImageBackground>
    </View>
  );
}

function TelaLogin() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState<{ nome: string; senha?: string } | null>(null);

  useEffect(() => {
    verificarUsuarioLogado();
  }, []);

  const verificarUsuarioLogado = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioSalvo) {
        const usuarioEncontrado = usuarios.find((user) => user.nome === usuarioSalvo);
        if (usuarioEncontrado) {
          setUsuarioLogado(usuarioEncontrado);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar usuário logado:', error);
    }
  };

  const verificarLogin = async () => {
    const usuarioEncontrado = usuarios.find((user) => user.nome === nome && user.senha === senha);

    if (usuarioEncontrado) {
      await AsyncStorage.setItem('usuarioLogado', usuarioEncontrado.nome);
      setUsuarioLogado(usuarioEncontrado);
      await carregarUltimoTreino();  // Carregar o último treino após login
      Alert.alert('Login Efetuado com Sucesso!!!', `Olá, ${usuarioEncontrado.nome}!`);
    } else {
      Alert.alert('Erro', 'Nome de usuário ou senha incorretos.');
    }
  };

  const sair = async () => {
    await AsyncStorage.removeItem('usuarioLogado');
    setUsuarioLogado(null);
    setNome('');
    setSenha('');
    carregarUltimoTreino();
  };
  const navigation = useNavigation(); // Obtém o objeto navigation
  
  const resetarApp = (navigation: any) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }], // Muda para a tela inicial
      })
    );
  };

  const executarTodas = () => {
    verificarLogin();
    resetarApp(navigation);
  };
  
  const executarTodaSair = () => {
    sair();
    resetarApp(navigation);
  };

  return (
    <View style={Estilos.container}>
      {usuarioLogado ? (
        <View>
          <Text style={Estilos.txtLogo}>Bem-vindo, {usuarioLogado.nome}!</Text>
          <TouchableOpacity style={Estilos.botaologin} onPress={executarTodaSair}>
            <Text style={Estilos.textobotao}>Deslogar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={Estilos.txtLogo}>Login</Text>
          <TextInput
            style={Estilos.input}
            placeholder="Nome de usuário"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={Estilos.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity style={Estilos.botaologin} onPress={executarTodas}>
            <Text style={Estilos.textobotao}>Entrar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

//-----------------Teste
function TelaPersonalizado() {
  const [treino, setTreino] = useState('A');
  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);
  const [exercicios, setExercicios] = useState<{ 
    id: string; 
    nome: string; 
    serie: string; 
    repeticao: string; 
    carga?: string; 
  }[]>([]);
  const [nome, setNome] = useState('');
  const [serie, setSerie] = useState('');
  const [repeticao, setRepeticao] = useState('');
  const [carga, setCarga] = useState<string | undefined>('');

  useEffect(() => {
    verificarUsuarioLogado();
  }, []);

  const verificarUsuarioLogado = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioSalvo) {
        setUsuarioLogado(usuarioSalvo);
        carregarExercicios(usuarioSalvo); // Agora chamamos a função passando o usuário
      }
    } catch (error) {
      console.error('Erro ao verificar usuário logado:', error);
    }
  };

  const carregarExercicios = async (usuario: string) => {
    try {
      const exerciciosSalvos = await AsyncStorage.getItem(`exercicios_${usuario}`);
      if (exerciciosSalvos) {
        setExercicios(JSON.parse(exerciciosSalvos));
      }
    } catch (error) {
      console.error('Erro ao carregar os exercícios:', error);
    }
  };

  const salvarExercicios = async (usuario: string, novosExercicios: any) => {
    try {
      await AsyncStorage.setItem(`exercicios_${usuario}`, JSON.stringify(novosExercicios));
    } catch (error) {
      console.error('Erro ao salvar os exercícios:', error);
    }
  };

  const adicionarExercicio = () => {
    if (!nome || !serie || !repeticao) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    const novoExercicio = {
      id: Date.now().toString(),
      nome,
      serie,
      repeticao,
      carga: carga || 'Sem carga',
    };

    const novosExercicios = [...exercicios, novoExercicio];
    setExercicios(novosExercicios);
    
    if (usuarioLogado) {
      salvarExercicios(usuarioLogado, novosExercicios);
    }

    setNome('');
    setSerie('');
    setRepeticao('');
    setCarga('');
  };

  const removerExercicio = (id: string | number) => {
    const novosExercicios = exercicios.filter(exercicio => exercicio.id !== id);
    setExercicios(novosExercicios);
    
    if (usuarioLogado) {
      salvarExercicios(usuarioLogado, novosExercicios);
    }
  };

  if (!usuarioLogado) {
    return (
      <View style={Estilos.container}>
        <Text style={Estilos.txtLogo}>Faça login para </Text>
        <Text style={Estilos.txt0}> Montar Treino</Text>
      </View>
    ); 
  }

  return (
    <View style={Estilos.container}>
      <TextInput
        style={Estilos.input2}
        placeholder="Nome do exercício"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="sentences"
        keyboardType="default" 
      />
      <TextInput
        style={Estilos.input2}
        placeholder="Série"
        keyboardType="numeric"
        value={serie}
        onChangeText={setSerie}
      />
      <TextInput
        style={Estilos.input2}
        placeholder="Repetições"
        keyboardType="numeric"
        value={repeticao}
        onChangeText={setRepeticao}
      />
      <TextInput
        style={Estilos.input2}
        placeholder="Carga"
        value={carga}
        onChangeText={setCarga}
      />
      
      <TouchableOpacity style={Estilos.botaoTreino} onPress={adicionarExercicio}>
        <Text style={Estilos.textobotao}>Adicionar Exercício</Text>
      </TouchableOpacity>
      
      <FlatList
        data={exercicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={Estilos.item}>
            <Text style={Estilos.textoExercicios}>
              {item.nome} - {item.serie} séries x {item.repeticao} repetições ({item.carga})
            </Text>
            <TouchableOpacity onPress={() => removerExercicio(item.id)}>
              <Text style={Estilos.botaoTreinoPress}> Remover </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// FIM TESTE

function TelaAgenda() {
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [atividadesDoDia, setAtividadesDoDia] = useState<string[]>([]);

  useEffect(() => {
    const hoje = new Date().toISOString().split('T')[0];
    setDataSelecionada(hoje);
    setAtividadesDoDia(atividades[hoje] || []);
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    setDataSelecionada(day.dateString);
    setAtividadesDoDia(atividades[day.dateString] || []);
  };

  return (
    <View style={Estilos.container}>
      <Text style={Estilos.txtLogo}>Agenda</Text>
      <Calendar
       locale="pt-br"
        onDayPress={handleDayPress}
        markedDates={dataSelecionada ? { [dataSelecionada]: { selected: true, marked: true, selectedColor: 'red' } } : {}}
        style={{
          backgroundColor: 'black', // Fundo preto para o calendário
        }}
        theme={{
          backgroundColor: 'black', // Fundo preto
          selectedDayBackgroundColor: 'red', // Cor de fundo do dia selecionado
          dotColor: 'red', // Cor dos pontos de eventos
          arrowColor: 'red', // Cor das setas de navegação
          monthTextColor: 'white', // Cor do texto do mês
        }}
      />
      <Text style={Estilos.txt1}>Atividades do dia:</Text>
      {atividadesDoDia.length > 0 ? (
        <FlatList
          data={atividadesDoDia}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={Estilos.textoExercicios}>{item}</Text>}
        />
      ) : (
        <Text style={Estilos.textoExercicios}>Nenhuma atividade programada.</Text>
      )}
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Guias.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: 'black' },
          tabBarLabelStyle: { color: 'red' },
        }}
      >
        <Guias.Screen name="Home" component={TelaHome} options={{ headerStyle: { backgroundColor: '#8B0000' }, headerTintColor: 'white', tabBarIcon: ({ focused }) => (<Image source={require('./assets/imagens/home.png')} style={{ width: 20, height: 20, tintColor: focused ? 'red' : 'white' }} />), }} />
        <Guias.Screen name="Treino" component={TelaTreino} options={{ headerStyle: { backgroundColor: '#8B0000' }, headerTintColor: 'white', tabBarIcon: ({ focused }) => (<Image source={require('./assets/imagens/halter.png')} style={{ width: 20, height: 20, tintColor: focused ? 'red' : 'white' }} />), }} />
        <Guias.Screen name="Personalizado" component={TelaPersonalizado} options={{ headerStyle: { backgroundColor: '#8B0000' }, headerTintColor: 'white', tabBarIcon: ({ focused }) => (<Image source={require('./assets/imagens/personalizado.png')} style={{ width: 20, height: 20, tintColor: focused ? 'red' : 'white' }} />), }} />
        <Guias.Screen name="Agenda" component={TelaAgenda} options={{ headerStyle: { backgroundColor: '#8B0000' }, headerTintColor: 'white', tabBarIcon: ({ focused }) => (<Image source={require('./assets/imagens/agenda.png')} style={{ width: 20, height: 20, tintColor: focused ? 'red' : 'white' }} />), }} />
        <Guias.Screen name="Perfil" component={TelaLogin} options={{ headerStyle: { backgroundColor: '#8B0000' }, headerTintColor: 'white', tabBarIcon: ({ focused }) => (<Image source={require('./assets/imagens/user.png')} style={{ width: 20, height: 20, tintColor: focused ? 'red' : 'white' }} />), }} />
      </Guias.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
function carregarUltimoTreino() {
  throw new Error('Function not implemented.');
}

function useFocusEffect(arg0: () => void) {
  throw new Error('Function not implemented.');
}

