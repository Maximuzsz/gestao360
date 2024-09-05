import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResponse {
    token: string;
    id: string;
    nome: string;
}

export const authService = {
  login: async (userName: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        await authService.storeUserData(data.token, data.id, data.nome);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      return false;
    }
  },

  storeUserData: async (token: string, userId: string, nome: string) => {
    try {
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@userId', userId);
      await AsyncStorage.setItem('@nome', nome);
    } catch (error) {
      console.error('Erro ao salvar os dados do usuário:', error);
    }
  },

  getUserData: async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const userId = await AsyncStorage.getItem('@userId');
      const nome = await AsyncStorage.getItem('@nome');

      if (token && userId && nome) {
        return { token, userId, nome };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter os dados do usuário:', error);
      return null;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('@token');
      await AsyncStorage.removeItem('@userId');
      await AsyncStorage.removeItem('@nome');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  },
};
