// controller/register-controller.tsx
import { registerRepository } from "@/repository/register-repository";
import { RegisterFormData } from "@/app/(tabs)/cadastro"


class RegisterController {
  async createRegister(data: RegisterFormData) {
    await registerRepository.create(data)
  }


  async getRegisters() {
    const registers = await registerRepository.readAll();
    return registers;
  }

  async updateRegister(id: string, data: any) {
    await registerRepository.update(id, data);
  }

  async deleteRegister(id: string) {
    await registerRepository.delete(id);
  }
}

export const registerController = new RegisterController();
