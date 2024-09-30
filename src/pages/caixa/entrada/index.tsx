import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Caixa } from '../../../types/caixa';

interface CaixaModalProps {
  visible: boolean;
  onClose: () => void;
  caixa: Caixa | null;
  onSave: (caixa_id: string, caixa: Caixa) => void;
}

const CaixaModal: React.FC<CaixaModalProps> = ({ visible, onClose, caixa, onSave }) => {
  const [caixa_id, setCaixa_Id] = useState<string>();
  const [valorCartaoMaquina1, setValorCartaoMaquina1] = useState<number>();
  const [valorCartaoMaquina2, setValorCartaoMaquina2] = useState<number>();
  const [valorDinheiro, setValorDinheiro] = useState<number>();
  const [valorPix, setValorPix] = useState<number>();
  const [valorEntrada, setValorEntrada] = useState<number>();
  const [valorFinal, setValorFinal] = useState<number>();
  const [saida, setSaida] = useState<number>();
  const [totalDiario, setTotalDiario] = useState<number>();
  const [dataLancamento, setDataLancamento] = useState<string>();
  const [empresa_id, setEmpresa_id] = useState<string>();
  const [usuario_id, setUsuario_id] = useState<string>();
  


  useEffect(() => {
    if (caixa) {
      setCaixa_Id(caixa.caixa_id);
      setValorCartaoMaquina1(caixa.valorCartaoMaquina1);
      setValorCartaoMaquina2(caixa.valorCartaoMaquina2);
      setValorDinheiro(caixa.valorDinheiro);
      setValorPix(caixa.valorPix);
      setValorEntrada(caixa.valorEntrada);
      setValorFinal(caixa.valorFinal);
      setSaida(caixa.saida);
      setTotalDiario(caixa.totalDiario);
      setDataLancamento(caixa.dataLancamento);
      setEmpresa_id(caixa.empresa_id);
      setUsuario_id(caixa.usuario_id);
    } else {
        setValorCartaoMaquina1(0);
        setValorCartaoMaquina2(0);
        setValorDinheiro(0);
        setValorPix(0);
        setValorEntrada(0);
        setValorFinal(0);
        setSaida(0);
        setTotalDiario(0);
        setDataLancamento('');
        setEmpresa_id('');
        setUsuario_id('');
    }
  }, [caixa]);

  const handleSave = () => {
    if (valorEntrada == 0 ) {
      alert('Valor de entrada é obrigatório');
      return;
    }

    const caixaData: Caixa = {
        caixa_id,
        valorCartaoMaquina1,
        valorCartaoMaquina2,
        valorDinheiro,
        valorPix,
        valorEntrada,
        valorFinal,
        saida,
        totalDiario,
        dataLancamento,
        empresa_id,
        usuario_id: usuario_id || '', // Para adicionar um novo caixa, o usuario_id será necessário
    };

    onSave(caixa?.caixa_id || '', caixaData);
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
          <Text style={styles.modalTitle}>{caixa ? 'Atualizar caixa' : 'Adicionar caixa'}</Text>
          <TextInputMask
            dataDetectorTypes={Number}
            placeholder="Valor de Entrada"
            value={valorEntrada}
            onChangeText={setValorEntrada}
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

export default CaixaModal;
