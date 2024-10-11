import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import CaixaModal from './cadastro';

interface Caixa {
  caixa_id: string;
  valorCartaoMaquina1: number;
  valorCartaoMaquina2: number;
  valorDinheiro: number;
  valorPix: number;
  valorentrada: number;
  valorFinal: number;
  saida: number;
  totalDiario: number;
  dataLancamento: string;
}

const CaixaDiario = () => {
  const [caixas, setCaixas] = useState<Caixa[]>([]);
  const [filteredCaixas, setFilteredCaixas] = useState<Caixa[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newCaixa, setNewCaixa] = useState<Partial<Caixa>>({});
  const [busca, setBusca] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [caixaEdit, setCaixaEdit] = useState<Caixa | null>(null);

  useEffect(() => {
    // Simulação de dados de caixas
    const fetchCaixas = async () => {
      const sampleData: Caixa[] = [
        {
          caixa_id: 'cfe5ad27-8363-4928-83e8-03bb2d96c105',
          valorCartaoMaquina1: 12.78,
          valorCartaoMaquina2: 12.78,
          valorDinheiro: 12.78,
          valorPix: 12.78,
          valorentrada: 12.78,
          valorFinal: 12.78,
          saida: 12.78,
          totalDiario: 12.78,
          dataLancamento: '2024-10-11T14:10:06.109Z',
        },
      ];
      setCaixas(sampleData);
      setFilteredCaixas(sampleData);
    };

    fetchCaixas();
  }, []);

  const handleFilterByDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const filtered = caixas.filter(caixa =>
        format(new Date(caixa.dataLancamento), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      );
      setFilteredCaixas(filtered);
    } else {
      setFilteredCaixas(caixas); // Mostrar todos se a data for removida
    }
  };
  const handleAddOrUpdateCaixa = async (id: string, caixa: Caixa) => {
    if (id === '') {
      const success = caixaEdit
        ? await clientService.cadastrarCliente({ ...caixa, usuario_id: caixaEdit.usuario_id })
        : await clientService.cadastrarCliente(caixa);
      if (success) {
        Alert.alert('Sucesso', 'Cliente salvo com sucesso!');
        setIsModalVisible(false);
        setCaixaEdit(null);
        const resultado = await clientService.buscarClientes();
        if (resultado) {
          setCaixas(resultado);
        }
      } else {
        Alert.alert('Erro', 'Não foi possível salvar o cliente.');
      }
    } else {
      const success = await clientService.atualizarCliente(id, cliente);
      if (success) {
        Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
        setIsModalVisible(false);
        setCaixaEdit(null);
        const resultado = await clientService.buscarClientes();
        if (resultado) {
          setCaixas(resultado);
        }
      } else {
        Alert.alert('Erro', 'Não foi possível salvar o cliente.');
      }
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    handleFilterByDate(selectedDate);
  };

  const handleAddOrUpdateCaixa = () => {
    if (newCaixa) {
      setCaixas([...caixas, newCaixa as Caixa]);
      setFilteredCaixas([...filteredCaixas, newCaixa as Caixa]);
      setIsModalVisible(false);
      setNewCaixa({});
      Alert.alert('Sucesso', 'Caixa cadastrado com sucesso!');
    }
  };

  const renderCaixaItem = ({ item }: { item: Caixa }) => (
    <View style={styles.caixaContainer}>
      <Text style={styles.caixaText}>Data: {format(new Date(item.dataLancamento), 'dd/MM/yyyy')}</Text>
      <Text style={styles.caixaText}>Cartão Máquina 1: {item.valorCartaoMaquina1}</Text>
      <Text style={styles.caixaText}>Dinheiro: {item.valorDinheiro}</Text>
      <Text style={styles.caixaText}>Pix: {item.valorPix}</Text>
      <Text style={styles.caixaText}>Total Diário: {item.totalDiario}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Caixa Diário</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Buscar pelo valor do total diário"
        value={busca}
        onChangeText={setBusca}
      />

      <TouchableOpacity
        style={styles.dateFilterButton}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateFilterText}>
          Filtrar por data: {date ? format(date, 'dd/MM/yyyy') : 'Selecionar data'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <FlatList
        data={filteredCaixas.filter(caixa => caixa.totalDiario.toString().includes(busca))}
        keyExtractor={item => item.caixa_id}
        renderItem={renderCaixaItem}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <CaixaModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          caixa={caixaEdit}
          onSave={handleAddOrUpdateCaixa}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  dateFilterButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateFilterText: {
    color: '#fff',
    textAlign: 'center',
  },
  caixaContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  caixaText: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#28a745',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CaixaDiario;
