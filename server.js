const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Dados fictícios de usuário (você pode conectar com um banco de dados)
const usuarios = [
  { username: 'usuario', password: 'senha123' },
];

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificando se o usuário e a senha estão corretos
  const usuario = usuarios.find(
    (user) => user.username === username && user.password === password
  );

  if (usuario) {
    // Gerando um token JWT
    const token = jwt.sign({ username: usuario.username }, 'secreta-chave', {
      expiresIn: '1h',
    });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
