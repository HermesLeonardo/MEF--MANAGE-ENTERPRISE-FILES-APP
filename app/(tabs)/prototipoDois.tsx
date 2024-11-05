import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Linking, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Substitui react-native-linear-gradient pelo expo-linear-gradient
import FileController from '@/controller/file-controller';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from 'projetointegrador/service/connection';

interface RequestDeletionResponse {
  success: boolean;
  message: string;
}

interface Folder {
  name: string;
  color: string;
  storagePath: string;
}

const PrototipoDois = () => {
  const [folders] = useState<Folder[]>([
    { name: 'ALVARÁS DE LICENÇA DE FUNCIONAMENTO', color: '#4CAF50', storagePath: 'gs://testeleo-593ef.appspot.com/ALVARÁS DE LICENÇA DE FUNCIONAMENTO' },
    { name: 'Documentos Pessoais', color: '#2196F3', storagePath: 'caminho/para/pasta2' },
  ]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<{ name: string, url: string }[]>([]);
  const [search, setSearch] = useState('');
  const [scale] = useState(new Animated.Value(1));

  const loadFilesFromFolder = async (folderPath: string) => {
    try {
      const fetchedFiles = await FileController.listFilesInFolder(folderPath);
      setFiles(fetchedFiles);
    } catch (error) {
      console.error("Erro ao carregar arquivos: ", error);
      Alert.alert("Erro", "Erro ao carregar arquivos.");
    }
  };

  const handleSelectFolder = (folder: Folder) => {
    setCurrentFolder(folder.name);
    loadFilesFromFolder(folder.storagePath);
  };

  const handleDownloadFile = (fileUrl: string) => {
    Linking.openURL(fileUrl).catch(err => {
      console.error("Erro ao abrir o URL", err);
      Alert.alert("Erro", "Não foi possível abrir o arquivo.");
    });
  };

  const handleRequestFileDeletion = async (fileName: string) => {
    const functions = getFunctions(app);
    const requestFileDeletion = httpsCallable(functions, 'requestFileDeletion');
    const filePath = `gs://testeleo-593ef.appspot.com/${fileName}`;
    const userEmail = 'leohermescarvalho18@gmail.com';

    try {
      const result = await requestFileDeletion({ filePath, userEmail });
      const { success, message } = result.data as RequestDeletionResponse;
      Alert.alert(success ? "Sucesso" : "Erro", message);
    } catch (error) {
      console.error('Erro ao chamar função de exclusão:', error);
      Alert.alert("Erro", "Erro ao processar a solicitação de exclusão.");
    }
  };

  const renderFolders = () => (
    folders
      .filter(folder => folder.name.toLowerCase().includes(search.toLowerCase()))
      .map((folder, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.folderButton, { backgroundColor: folder.color }]}
          onPress={() => handleSelectFolder(folder)}
          activeOpacity={0.8}
        >
          <Text style={styles.folderText}>{folder.name}</Text>
        </TouchableOpacity>
      ))
  );

  const renderFiles = () => (
    <FlatList
      data={files}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.fileItem}>
          <TouchableOpacity
            style={styles.fileButton}
            onPress={() => handleDownloadFile(item.url)}
          >
            <Text style={styles.fileText}>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleRequestFileDeletion(item.name)}
          >
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );

  return (
    <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>
      <View style={styles.innerContainer}>
        {!currentFolder ? (
          <>
            <TextInput
              style={styles.searchBar}
              placeholder="Pesquisar pasta"
              placeholderTextColor="#888"
              value={search}
              onChangeText={setSearch}
            />
            <View style={styles.folderContainer}>{renderFolders()}</View>
          </>
        ) : (
          <View style={styles.fileContainer}>
            <Text style={styles.title}>Arquivos em: {currentFolder}</Text>
            {renderFiles()}
            <TouchableOpacity onPress={() => setCurrentFolder(null)} style={styles.backButton}>
              <Text style={styles.backButtonText}>Voltar para Pastas</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  searchBar: {
    height: 45,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  folderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  folderButton: {
    width: '48%',
    padding: 25,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  folderText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fileContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#444',
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  fileButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fileText: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 15,
    backgroundColor: '#9C27B0',
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrototipoDois;
