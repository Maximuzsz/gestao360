import { Feather } from '@expo/vector-icons';
import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authService } from '../../services/authService';
import { NavigationProp, useNavigation } from '@react-navigation/native';


// Obtenção da altura da StatusBar
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

type RootStackParamList = {
  Home: undefined;
};

const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleExit = async () => {
    await authService.logout;
    navigation.navigate('Home')
  };


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.userName}>Gestão 360</Text>

        <TouchableOpacity activeOpacity={0.9} style={styles.bottonUser} onPress={handleExit}>
          <Icon name="logout" size={27} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#38a69d',
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  bottonUser: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44 / 2,
  },
});
