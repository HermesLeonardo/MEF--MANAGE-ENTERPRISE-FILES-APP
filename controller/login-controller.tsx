import { loginRepository } from '@/repository/login-repository';

export class LoginController {
  async login(cnpj: string, senha: string) {
    try {
      const user = await loginRepository.fetchUserByCnpj(cnpj); // Obtém o usuário pelo CNPJ

      if (!user) {
        return {
          success: false,
          message: 'Usuário não encontrado.'
        };
      }

      // Verifica se a senha está correta
      if (user.senha === senha) {
        return {
          success: true,
          message: 'Login realizado com sucesso!',
          user: user
        };
      } else {
        return {
          success: false,
          message: 'CNPJ ou senha incorretos.'
        };
      }
    } catch (error) {
      console.error("Erro no login", error);
      return {
        success: false,
        message: 'Erro ao tentar realizar o login.'
      };
    }
  }
}

export const loginController = new LoginController();
