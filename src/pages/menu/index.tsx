import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Caixa: undefined;
    Clientes: undefined;
    Vendas: undefined;
    Produtos: undefined;
};

const Menu = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [usuario, setUsuario] = useState<string>();
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                setUsuario(await AsyncStorage.getItem('@nome') || '')
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao buscar os clientes.');
            }
        };

        fetchClientes();
    }, []);


    return (
        <View style={styles.container}>
            <Header name={usuario} />
            
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Caixa')}>
                    <Icon name="cash-register" size={40} color="#000" />
                    <Text style={styles.menuText}>Controle de Caixa</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Clientes')}>
                    <Icon name="account-multiple" size={40} color="#000" />
                    <Text style={styles.menuText}>Controle de Clientes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Vendas')}>
                    <Icon name="sale" size={40} color="#000" />
                    <Text style={styles.menuText}>Vendas Diárias</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Produtos')}>
                    <Icon name="package-variant" size={40} color="#000" />
                    <Text style={styles.menuText}>Produtos Cadastrados</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    menuContainer: {
        width: '100%', // Ocupa toda a largura disponível
        alignItems: 'center', // Centraliza os itens horizontalmente
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
export default Menu;
