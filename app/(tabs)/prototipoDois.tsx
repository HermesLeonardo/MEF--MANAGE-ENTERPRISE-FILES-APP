import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const data = [
  {
    id: '1',
    empresa: 'Empresa SJRJ',
    pastas: ['Documentos Legais', 'Faturas', 'Contratos'],
  },
  {
    id: '2',
    empresa: 'Projeto Integrador LTDA',
    pastas: ['Relatórios Financeiros', 'Recibos', 'Folha de Pagamento'],
  },
  {
    id: '3',
    empresa: 'Notion',
    pastas: ['Planejamento', 'Impostos', 'Propostas'],
  },
/*
  {
    id: '4',
    empresa: 'Teste',
    pastas: ['Planejamento', 'Imposto', 'Holerites']
  }
*/
];

const PrototipoDois = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState<string | null>(null);

  const handleSelectEmpresa = (empresa: string) => {
    if (selectedEmpresa === empresa) {
      setSelectedEmpresa(null);
    } else {
      setSelectedEmpresa(empresa);
    }
  };

  const handleSelectPasta = (pasta: string) => {
    Alert.alert('Você selecionou a pasta: ${pasta}');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arquivos</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.empresaContainer}>
            <TouchableOpacity
              style={styles.empresaButton}
              onPress={() => handleSelectEmpresa(item.empresa)}
            >
              <Text style={styles.empresaText}>{item.empresa}</Text>
            </TouchableOpacity>

            <View></View>

            {selectedEmpresa === item.empresa && (
              <View style={styles.pastaContainer}>
                {item.pastas.map((pasta, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.pastaButton}
                    onPress={() => handleSelectPasta(pasta)}
                  >
                    <Text style={styles.pastaText}>{pasta}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
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
  empresaContainer: {
    marginBottom: 15,
  },
  empresaButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  empresaText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  pastaContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  pastaButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 5,
  },
  pastaText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PrototipoDois;