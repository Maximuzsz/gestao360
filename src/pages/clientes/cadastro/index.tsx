import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Cliente } from '../../../types/clientes';

interface ClienteModalProps {
  visible: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  onSave: (id: string, cliente: Cliente) => void;
}

const ClienteModal: React.FC<ClienteModalProps> = ({ visible, onClose, cliente, onSave }) => {
  const [id, setId] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [cpfCnpj, setCpfCnpj] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');

  useEffect(() => {
    if (cliente) {
      setId(cliente.cliente_id || '');
      setNome(cliente.nome);
      setCpfCnpj(cliente.cpf || '');
      setTelefone(cliente.telefone || '');
      setEndereco(cliente.endereco || '');
    } else {
      setNome('');
      setCpfCnpj('');
      setTelefone('');
      setEndereco('');
    }
  }, [cliente]);

  const handleSave = () => {
    if (!nome.trim()) {
      alert('Nome é obrigatório');
      return;
    }

    const clienteData: Cliente = {
      nome,
      cpf: cpfCnpj,
      telefone,
      endereco,
      usuario_id: cliente?.usuario_id || '', // Para adicionar um novo cliente, o usuario_id será necessário
    };

    onSave(cliente?.cliente_id || '', clienteData);
  };

  // Determine the mask based on the length of CPF/CNPJ
  const getCpfCnpjMask = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.length <= 11 ? 'cpf' : 'cnpj';
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{cliente ? 'Atualizar Cliente' : 'Adicionar Cliente'}</Text>
          <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />
          <TextInputMask
            type={getCpfCnpjMask(cpfCnpj)}
            placeholder="CPF/CNPJ"
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
            style={styles.input}
          />
          <TextInputMask
            type={'custom'}
            options={{
              mask: '(99) 99999-9999',
            }}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
          />
          <TextInput
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
            style={styles.input}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
            <Text style={styles.modalButtonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButtonCancelar} onPress={onClose} >
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonCancelar: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ClienteModal;
