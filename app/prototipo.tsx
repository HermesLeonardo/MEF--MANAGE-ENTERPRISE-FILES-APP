import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';

const FileManagementScreen = () => {
  const handlePress = (item) => {
    console.log(`Clicked on ${item}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Arquivos</Text>
      <ScrollView>
        <TouchableOpacity style={styles.item} onPress={() => handlePress('Contratos Sociais e Documentos Societários')}>
          <Text style={styles.itemText}>CONTRATOS SOCIAIS E DOCUMENTOS SOCIETÁRIOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => handlePress('Documentos Pessoais')}>
          <Text style={styles.itemText}>DOCUMENTOS PESSOAIS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => handlePress('Alvarás de Licença de Funcionamento')}>
          <Text style={styles.itemText}>ALVARÁS DE LICENÇA DE FUNCIONAMENTO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => handlePress('Certificado Digital')}>
          <Text style={styles.itemText}>CERTIFICADO DIGITAL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => handlePress('Folha de Pagamento')}>
          <Text style={styles.itemText}>FOLHA DE PAGAMENTO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => handlePress('Honorários Contábeis')}>
          <Text style={styles.itemText}>HONORÁRIOS CONTÁBEIS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => handlePress('Contrato de Prestação de Serviços')}>
          <Text style={styles.itemText}>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff', // Cor principal azul
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#007bff', // Cor principal azul
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FileManagementScreen;
