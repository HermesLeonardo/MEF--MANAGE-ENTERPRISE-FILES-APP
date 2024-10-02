import express, { Request, Response } from 'express';
import { db } from 'projetointegrador/service/connection'; // Ajuste o caminho conforme necessário
import RegisterRepository from 'projetointegrador/repository/register-repository'; 
import { collection, addDoc, getDocs, doc,getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


const router = express.Router();

// Criar um novo usuário
router.post('/users', async (req: Request, res: Response) => {
  try {
    const userId = await RegisterRepository.createUser(req.body);
    res.status(201).json({ id: userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Obter um usuário por ID
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const userDoc = doc(db, 'users', req.params.id);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      res.status(200).json({
        id: docSnap.id,
        ...docSnap.data()
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Atualizar um usuário por ID
router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    await RegisterRepository.updateUser(req.params.id, req.body);
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Excluir um usuário por ID
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    await RegisterRepository.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
