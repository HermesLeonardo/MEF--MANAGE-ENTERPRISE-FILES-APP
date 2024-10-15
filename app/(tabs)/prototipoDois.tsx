import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { Linking } from 'react-native'; 
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
  const [folders, setFolders] = useState<Folder[]>([
    { name: 'ALVARÁS DE LICENÇA DE FUNCIONAMENTO', color: '#4CAF50', storagePath: 'gs://testeleo-593ef.appspot.com/ALVARÁS DE LICENÇA DE FUNCIONAMENTO' },
    { name: 'Documentos Pessoais', color: '#2196F3', storagePath: 'caminho/para/pasta2' },
  ]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<{ name: string, url: string }[]>([]);
  const [search, setSearch] = useState('');

  // Função para carregar arquivos da pasta selecionada
  const loadFilesFromFolder = async (folderPath: string) => {
    try {
      const fetchedFiles = await FileController.listFilesInFolder(folderPath);
      setFiles(fetchedFiles);
    } catch (error) {
      console.error("Erro ao carregar arquivos: ", error);
    }
  };

  const handleSelectFolder = (folder: Folder) => {
    setCurrentFolder(folder.name);
    loadFilesFromFolder(folder.storagePath);
  };

  const handleDownloadFile = (fileUrl: string) => {
    Linking.openURL(fileUrl).catch(err => console.error("Erro ao abrir o URL", err));
  };

  const handleRequestFileDeletion = async (fileName: string) => {
    const functions = getFunctions(app);
    const requestFileDeletion = httpsCallable(functions, 'requestFileDeletion');
  
    try {
      const filePath = `gs://testeleo-593ef.appspot.com/${fileName}`; // Ajuste o caminho conforme sua estrutura
      const userEmail = 'leohermescarvalho18@gmail.com'; // Coloque aqui o e-mail do responsável pré-cadastrado
  
      const result = await requestFileDeletion({ filePath, userEmail });
      
      const { success, message } = result.data as RequestDeletionResponse;
  
      if (success) {
        console.log('Solicitação de exclusão enviada com sucesso:', message);
        alert('Solicitação de exclusão enviada com sucesso!');
      } else {
        console.error('Erro ao enviar solicitação:', message);
        alert('Erro ao enviar solicitação de exclusão.');
      }
    } catch (error) {
      console.error('Erro ao chamar função de exclusão:', error);
      alert('Erro ao processar a solicitação de exclusão.');
    }
  };
  const renderFolders = () => {
    return folders
      .filter(folder => folder.name.toLowerCase().includes(search.toLowerCase()))
      .map((folder, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.folderButton, { backgroundColor: folder.color }]}
          onPress={() => handleSelectFolder(folder)}
        >
          <Text style={styles.folderText}>{folder.name}</Text>
        </TouchableOpacity>
      ));
  };

  const renderFiles = () => {
    return (
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

            {/* Botão de solicitar exclusão */}
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
  };

  return (
    <View style={styles.container}>
      {!currentFolder ? (
        <>
          <TextInput
            style={styles.searchBar}
            placeholder="Pesquisar pasta"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  folderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  folderButton: {
    width: '48%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  fileContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  fileButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  fileText: {
    fontSize: 14,
    color: '#FFF',
  },
  deleteButton: {
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  backButton: {
    padding: 15,
    backgroundColor: '#9C27B0',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default PrototipoDois;
