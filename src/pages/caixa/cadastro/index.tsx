import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Caixa } from '../../../types/caixa';

interface CaixaModalProps {
  visible: boolean;
  onClose: () => void;
  caixa: Caixa | null;
  onSave: (id: string, caixa: Caixa) => void;
}


const CaixaModal: React.FC<CaixaModalProps> = ({ visible, onClose, caixa, onSave }) => {

    const [id, setId] = useState<string>('');
    const [valorCartaoMaquina1, setValorCartaoMaquina1] = useState<number>();
    const [valorCartaoMaquina2, setValorCartaoMaquina2] = useState<number>();
    const [valorDinheiro, setValorDinheiro] = useState<number>();
    const [valorPix, setValorPix] = useState<number>();
    const [valorEntrada, setValorEntrada] = useState<number>();
    const [valorFinal, setValorFinal] = useState<number>();
    const [totalDiario, setTotalDiario] = useState<number>();
    const [dataLancamento, setDataLancamento] = useState<string>('');
    const [empresa_id, setEmpresaId] = useState<string>('');
    const [usuario_id, setUsuario_id] = useState<string>('');
    useEffect(() => {

      }, [caixa]);

    return(
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{caixa ? 'Atualizar Caixa' : 'Abrir Caixa'}</Text>
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