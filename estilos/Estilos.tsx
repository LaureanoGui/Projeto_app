import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: '#121212', 
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    textoExercicios:{
        color: '#E0E0E0',
        fontSize:20
    },
      txtLogo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#f00', // Cor do texto
        textAlign: 'center', 
      },
      txt0 : {
        fontSize: 25, 
        fontWeight: 'bold',
        color: '#E0E0E0',
        textAlign: 'center', 
      },
      logoPrincipal: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center'
      },
      item: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1, 
        borderColor: 'red', 
        borderRadius: 20, 
      },
      imagemFundo: {
        flex: 1,
        resizeMode: 'cover', 
        width: '100%',
        justifyContent: 'center'
      },
      botaoTreino:{
        marginVertical: 8,
        marginHorizontal: 2,
        padding: 8,
        borderRadius: 10, 
        borderColor: 'red',
        borderWidth: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
      botaoTreinoPress:{
        backgroundColor: '#FF0000', // Cor diferente para o botão selecionado
      },
})