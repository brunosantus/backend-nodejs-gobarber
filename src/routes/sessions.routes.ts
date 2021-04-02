import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

// SoC:
// Responsabilidade da Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta.

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  // Com a atualização do TypeScript, isso se faz necessário
  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ userWithoutPassword, token });
});

export default sessionRouter;
