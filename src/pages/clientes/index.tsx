import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { clientService } from '../../services/clientService';
import { Cliente } from '../../types/clientes';
import ClienteModal from './cadastro';
import Header from '../../components/header';

const MinhasEmpresas = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [clienteEdit, setClienteEdit] = useState<Cliente | null>(null);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesData = await clientService.buscarClientes();
        if (clientesData) {
          setClientes(clientesData);
        } else {
          Alert.alert('Erro', 'Não foi possível buscar os clientes.');
        }
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os clientes.');
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert('Ação não implementada', 'A funcionalidade de exclusão ainda não foi implementada.');
  };

  const handleEdit = (id: string) => {
    Alert.alert('Editar Cliente', `Você clicou em editar o cliente com ID: ${id}`);
  };

  const handleAddOrUpdateCliente = async (id: string, cliente: Cliente) => {
    if (id === '') {
      const success = clienteEdit
        ? await clientService.cadastrarCliente({ ...cliente, usuario_id: clienteEdit.usuario_id })
        : await clientService.cadastrarCliente(cliente);
      if (success) {
        Alert.alert('Sucesso', 'Cliente salvo com sucesso!');
        setIsModalVisible(false);
        setClienteEdit(null);
        const resultado = await clientService.buscarClientes();
        if (resultado) {
          setClientes(resultado);
        }
      } else {
        Alert.alert('Erro', 'Não foi possível salvar o cliente.');
      }
    } else {
      const success = await clientService.atualizarCliente(id, cliente);
      if (success) {
        Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
        setIsModalVisible(false);
        setClienteEdit(null);
        const resultado = await clientService.buscarClientes();
        if (resultado) {
          setClientes(resultado);
        }
      } else {
        Alert.alert('Erro', 'Não foi possível salvar o cliente.');
      }
    }
  };

  const renderCliente = ({ item }: { item: Cliente }) => (
    <View style={styles.clienteContainer}>
      <Text style={styles.clienteNome}>{item.nome}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => {
            setClienteEdit(item);
            setIsModalVisible(true);
          }}
          style={styles.iconButton}
        >
          <Icon name="edit" size={24} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.cliente_id || '')}
          style={styles.iconButton}
        >
          <Icon name="delete" size={24} color="#ff5733" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.headerText}>Meus Clientes</Text>
      <View style={styles.menuContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar pelo nome do cliente"
          value={busca}
          onChangeText={setBusca}
        />
        <FlatList
          data={clientes.filter(cliente => cliente.nome.toLowerCase().includes(busca.toLowerCase()))}
          keyExtractor={item => item.cliente_id}
          renderItem={renderCliente}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setClienteEdit(null);
            setIsModalVisible(true);
          }}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
        <ClienteModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          cliente={clienteEdit}
          onSave={handleAddOrUpdateCliente}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  menuContainer: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  clienteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  clienteNome: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#28a745', // Cor verde do botão
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default MinhasEmpresas;
