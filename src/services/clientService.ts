import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cliente } from '../types/clientes';

export const clientService = {
  cadastrarCliente: async (cliente: Omit<Cliente, 'usuario_id'>): Promise<boolean> => {
    try {
      // Recupera o usuario_id do AsyncStorage
      const usuarioId = await AsyncStorage.getItem('@userId');
      // Recupera o token do AsyncStorage
      const token = await AsyncStorage.getItem('@token');

      if (!usuarioId) {
        throw new Error('Usuário não autenticado.');
      }

      // Valida se o nome foi preenchido
      if (!cliente.nome.trim()) {
        throw new Error('O nome é obrigatório.');
      }


      const clienteData: Cliente = {
        ...cliente,
        usuario_id: usuarioId,
      };
      console.log(clienteData);

      const response = await fetch('http://localhost:3000/cliente', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
      });

      if (response.ok) {
        return true;
      } else {
        console.error('Erro ao cadastrar cliente:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Erro ao tentar cadastrar o cliente:', error);
      return false;
    }
  },

  buscarClientes: async (): Promise<Cliente[] | null> => {
    try {
      // Recupera o token do AsyncStorage
      const token = await AsyncStorage.getItem('@token');

      if (!token) {
        throw new Error('Token não encontrado. Usuário não autenticado.');
      }

      const response = await fetch('http://localhost:3000/cliente', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const clientes: Cliente[] = await response.json();
        return clientes;
      } else {
        console.error('Erro ao buscar clientes:', await response.text());
        return null;
      }
    } catch (error) {
      console.error('Erro ao tentar buscar clientes:', error);
      return null;
    }
  },
};
