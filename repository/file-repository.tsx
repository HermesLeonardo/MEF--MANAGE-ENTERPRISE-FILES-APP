import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../service/connection"; 

class FileRepository {
  // Upload de arquivo
  async uploadFile(file: Blob, filePath: string): Promise<void> {
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file);
  }

  // Pegar a URL de download do arquivo
  async getFileUrl(filePath: string): Promise<string> {
    const fileRef = ref(storage, filePath);
    return await getDownloadURL(fileRef);
  }
  
  // Listar todos os arquivos em uma pasta
  async listFiles(folderPath: string): Promise<{ name: string, fullPath: string }[]> {
    const folderRef = ref(storage, folderPath);
    const fileList = await listAll(folderRef);
    
    return fileList.items.map((itemRef) => ({
      name: itemRef.name,
      fullPath: itemRef.fullPath
    }));
  }
}

export default new FileRepository();
