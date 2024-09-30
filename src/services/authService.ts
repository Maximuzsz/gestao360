import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResponse {
    token: string;
    id: string;
    nome: string;
    empresa_id: string;
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
      console.log(response)

      if (response.ok) {
        const data: LoginResponse = await response.json();
        console.log('data');
        await authService.storeUserData(data.token, data.id, data.nome,data.empresa_id);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      return false;
    }
  },

  storeUserData: async (token: string, userId: string, nome: string, empresaId:string) => {
    try {
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@userId', userId);
      await AsyncStorage.setItem('@nome', nome);
      await AsyncStorage.setItem('@empresaId', empresaId);
    } catch (error) {
      console.error('Erro ao salvar os dados do usuário:', error);
    }
  },

  getUserData: async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const userId = await AsyncStorage.getItem('@userId');
      const nome = await AsyncStorage.getItem('@nome');
      const empresaId = await AsyncStorage.getItem('@empresaId')

      if (token && userId && nome && empresaId) {
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
      await AsyncStorage.removeItem('@empresaId');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  },
};
