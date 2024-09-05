import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import { clientService } from '../../services/clientService'; 
import { Cliente } from '../../types/clientes';// Supondo que você tenha um arquivo types.ts para tipos
import ClienteModal from './cadastro';

const ClientesScreen: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [clienteEdit, setClienteEdit] = useState<Cliente | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      const resultado = await clientService.buscarClientes();
      if (resultado) {
        setClientes(resultado);
      } else {
        Alert.alert('Erro', 'Não foi possível buscar a lista de clientes.');
      }
    };

    fetchClientes();
  }, []);

  const handleAddOrUpdateCliente = async (cliente: Cliente) => {
    const success = clienteEdit
      ? await clientService.cadastrarCliente({ ...cliente, usuario_id: clienteEdit.usuario_id })
      : await clientService.cadastrarCliente(cliente);

    if (success) {
      Alert.alert('Sucesso', 'Cliente salvo com sucesso!');
      setIsModalVisible(false);
      setClienteEdit(null);
      // Atualiza a lista de clientes após a adição/atualização
      const resultado = await clientService.buscarClientes();
      if (resultado) {
        setClientes(resultado);
      }
    } else {
      Alert.alert('Erro', 'Não foi possível salvar o cliente.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.nome} // Aqui, nome é usado como chave, considere usar um identificador único
        renderItem={({ item }) => (
          <View style={styles.clientItem}>
            <Text>{item.nome}</Text>
            <Button title="Editar" onPress={() => {
              setClienteEdit(item);
              setIsModalVisible(true);
            }} />
          </View>
        )}
        ListHeaderComponent={<Text style={styles.headerText}>Clientes</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum cliente cadastrado.</Text>}
      />

      <Button title="Adicionar Cliente" onPress={() => {
        setClienteEdit(null);
        setIsModalVisible(true);
      }} />
      <ClienteModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        cliente={clienteEdit}
        onSave={handleAddOrUpdateCliente}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  clientItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#999',
  },
});

export default ClientesScreen;
