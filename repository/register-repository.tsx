import { db } from 'projetointegrador/service/connection'; // Ajuste o caminho conforme necessário
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

class UserRepository {
  private collectionRef = collection(db, 'users');

  async createUser(data: object) {
    const docRef = await addDoc(this.collectionRef, data);
    return docRef.id;
  }


  async getUser(id: string) {
    const userDoc = doc(db, 'users', id);
    const docSnap = await getDocs(userDoc);
    return docSnap.data();
  }


  async updateUser(id: string, data: object) {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, data);
  }

  async deleteUser(id: string) {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  }
}

export default new UserRepository();
