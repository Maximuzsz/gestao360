import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import Home from '../pages/home';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import Menu from '../pages/menu';
import Clientes from '../pages/clientes';
import CaixaDiario from '../pages/caixa';

// Defina o tipo de parâmetro para as rotas disponíveis na navegação
type RootStackParamList = {
  Home: undefined; // Se a tela não receber parâmetros, use 'undefined'
  Login: undefined;
  Cadastro: undefined;
  Menu: undefined;
  Clientes: undefined;
  CaixaDiario: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Clientes"
        component={Clientes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CaixaDiario"
        component={CaixaDiario}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
