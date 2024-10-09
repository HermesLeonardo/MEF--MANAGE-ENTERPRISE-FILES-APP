import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../service/connection";

interface User {
  id: string;
  cnpj: string;
  senha: string;
  [key: string]: any;
}

export class LoginRepository {
  async fetchUserByCnpj(cnpj: string): Promise<User | null> {
    try {
      const usuariosCollection = collection(db, "Cadastro");
      const q = query(usuariosCollection, where("cnpj", "==", cnpj));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      let user: User | null = null;
      querySnapshot.forEach((doc) => {
        user = { id: doc.id, ...doc.data() } as User;
      });

      return user;
    } catch (error) {
      console.error("Erro ao buscar o usuário no Firestore", error);
      throw error;
    }
  }
}

export const loginRepository = new LoginRepository();
