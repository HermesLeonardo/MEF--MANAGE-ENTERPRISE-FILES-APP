import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const arquivosData = [
  { id: '1', title: 'Contrato Social.pdf', type: 'pdf' },
  { id: '2', title: 'Documento da empresa.jpg', type: 'image' },
  { id: '3', title: 'Título de Renovação Silvio Jales Rosa Junior.png', type: 'image' }
];

const ArquivosScreen = () => {
  const [searchText, setSearchText] = useState(''); 
  const [filteredArquivos, setFilteredArquivos] = useState(arquivosData); 

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = arquivosData.filter((arquivo) =>
      arquivo.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredArquivos(filtered);
  };

  const handleDownload = (file: string) => {
    Alert.alert(`Você baixou o arquivo: ${file}`);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <Icon name="file-pdf-o" size={40} color="#F44336" />;
      case 'image':
        return <Icon name="file-image-o" size={40} color="#4CAF50" />;
      default:
        return <Icon name="file-o" size={40} color="#333" />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arquivos da empresa</Text>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar arquivo"
          value={searchText}
          onChangeText={handleSearch} 
        />
      </View>

      {/* Lista de arquivos */}
      <FlatList
        data={filteredArquivos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.fileButton}
            onPress={() => handleDownload(item.title)}
          >
            {renderIcon(item.type)}
            <Text style={styles.fileText}>{item.title}</Text>
          </TouchableOpacity>
        )}
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
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#E0E0E0',
    marginBottom: 15,
    borderRadius: 8,
  },
  fileText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ArquivosScreen;
