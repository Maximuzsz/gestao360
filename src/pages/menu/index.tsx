import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Menu(){
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} >
        <Icon name="cash-register" size={40} color="#000" />
        <Text style={styles.menuText}>Controle de Caixa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="account-multiple" size={40} color="#000" />
        <Text style={styles.menuText}>Controle de Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="sale" size={40} color="#000" />
        <Text style={styles.menuText}>Vendas Diárias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} >
        <Icon name="package-variant" size={40} color="#000" />
        <Text style={styles.menuText}>Produtos Cadastrados</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    width: '80%',
    borderRadius: 10,
    elevation: 5,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 18,
    color: '#000',
  },
});
