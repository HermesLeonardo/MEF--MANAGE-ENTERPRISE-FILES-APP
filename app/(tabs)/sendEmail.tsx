/*
import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
import nodemailer from 'nodemailer';

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Define o serviço usado
  auth: {
    user: 'leohermescarvalho18@gmail.com', // O e-mail de onde os pedidos de exclusão serão enviados
    pass: 'hbqsqeckgzzmegnq' // Senha ou chave de aplicação gerada
  }
});

interface RequestDeletionData {
  filePath: string;
  userEmail: string;
}

export const requestFileDeletion = functions.https.onCall(async (request: functions.https.CallableRequest<RequestDeletionData>) => {
  const { filePath, userEmail } = request.data; // Acessa os dados corretamente a partir de request.data

  // Configuração do e-mail
  const mailOptions = {
    from: 'leohermescarvalho18@gmail.com',
    to: userEmail,
    subject: 'Solicitação de exclusão de arquivo',
    text: `Um usuário solicitou a exclusão do arquivo localizado em: ${filePath}. Por favor, processe a requisição.`
  };

  try {
    // Envia o e-mail usando o Nodemailer
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'E-mail enviado com sucesso!' }; // Aqui está dentro da função corretamente
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return { success: false, message: 'Erro ao enviar o e-mail.' };
  }
});
*/