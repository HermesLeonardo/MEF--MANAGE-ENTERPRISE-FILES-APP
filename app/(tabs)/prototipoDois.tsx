import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const pastasData = [
  { id: '1', title: 'CONTRATOS SOCIAIS E DOCUMENTOS SOCIETÁRIOS', color: '#4CAF50' },
  { id: '2', title: 'DOCUMENTOS PESSOAIS', color: '#2196F3' },
  { id: '3', title: 'ALVARÁS DE LICENÇA DE FUNCIONAMENTO', color: '#FFC107' },
  { id: '4', title: 'CERTIFICADO DIGITAL', color: '#F44336' },
  { id: '5', title: 'FOLHA DE PAGAMENTO', color: '#FF9800' },
  { id: '6', title: 'HONORÁRIOS CONTÁBEIS', color: '#00BCD4' },
  { id: '7', title: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS', color: '#9C27B0' },
];

const PrototipoDois = () => {
  const [searchText, setSearchText] = useState(''); 
  const [filteredPastas, setFilteredPastas] = useState(pastasData); 

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = pastasData.filter((pasta) =>
      pasta.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPastas(filtered);
  };

  const handleSelectPasta = (pasta: string) => {
    if (pasta === 'CONTRATOS SOCIAIS E DOCUMENTOS SOCIETÁRIOS') {
      router.push('/arquivosEmpresa'); 
    } else {
      Alert.alert(`Você selecionou a pasta: ${pasta}`);
    }
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pastas</Text>

      {/* Campo de pesquisa */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar pasta"
          value={searchText}
          onChangeText={handleSearch} 
        />
      </View>

      <FlatList
        data={filteredPastas}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.pastaButton, { backgroundColor: item.color }]}
            onPress={() => handleSelectPasta(item.title)}
          >
            <Icon name="folder" size={40} color="#FFF" style={styles.icon} /> {/*Icones pasta*/}
            <Text style={styles.pastaText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pastaButton: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  icon: {
    marginBottom: 10,
  },
  pastaText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PrototipoDois;
