// repository/register-repository.tsx
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../service/connection";


type FormData = {
  nome: string;
  cnpj: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

class RegisterRepository {
  collectionRef = collection(db, "Cadastro");

  async create(data: FormData) {
    try {
      const docRef = await addDoc(collection(db, 'Cadastro'), {
        nome: data.nome,
        cnpj: data.cnpj,
        email: data.email,
        senha: data.senha,
        confirmarSenha: data.confirmarSenha,

      });
      console.log("Documento adicionado com ID: ", docRef.id);
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error);
    }
  }


  async readAll() {
    const snapshot = await getDocs(this.collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  }

  async update(id: string, data: any) {
    const docRef = doc(db, "Cadastro", id);
    await updateDoc(docRef, data);
  }

  async delete(id: string) {
    const docRef = doc(db, "Cadastro", id);
    await deleteDoc(docRef);
  }
}


export const registerRepository = new RegisterRepository();
