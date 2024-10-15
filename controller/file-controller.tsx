import fileRepository from "@/repository/file-repository";


class FileController {
  static async listFilesInFolder(folderPath: string): Promise<{ name: string, url: string }[]> {
    try {
      const files = await fileRepository.listFiles(folderPath);
      
      const filesWithUrl = await Promise.all(
        files.map(async (file) => {
          const url = await fileRepository.getFileUrl(file.fullPath);
          return {
            name: file.name,
            url: url
          };
        })
      );

      return filesWithUrl;
    } catch (error) {
      console.error("Erro ao listar arquivos na pasta: ", error);
      throw new Error("Não foi possível listar os arquivos da pasta.");
    }
  }

  static async getFileUrl(filePath: string): Promise<string> {
    try {
      return await fileRepository.getFileUrl(filePath);
    } catch (error) {
      console.error("Erro ao obter URL de download: ", error);
      throw new Error("Não foi possível obter o link de download.");
    }
  }
}

export default FileController;
