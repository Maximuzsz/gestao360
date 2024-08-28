import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';



type RootStackParamList = {
    Menu: undefined; // Se a tela não receber parâmetros, use 'undefined'
};


const Header: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    // Implementar a lógica de logout aqui
    console.log('Usuário saiu');
  };

  const goToMainMenu = () => {
    // Navega para o menu principal
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={goToMainMenu}>
        <Text style={styles.title}>Gestão360</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#3b5998', // Cor de fundo do header
    
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    padding: 8,
    backgroundColor: '#ff5c5c', // Cor do botão de sair
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  iconButton: { 
    padding: 8,
  },
});

export default Header;
