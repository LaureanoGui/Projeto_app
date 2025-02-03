import React, { createContext, useState, useContext, useEffect } from 'react';

type Usuario = {
  nome: string;
  senha: string;
  ultimoTreino?: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  login: (nome: string, senha: string) => boolean;
  logout: () => void;
  atualizarUltimoTreino: () => void;
  key: number; // Adicionado para forçar recarregamento
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [key, setKey] = useState(0); // Adicionado para forçar re-render

  const usuarios: Usuario[] = [
    { nome: 'Admin', senha: 'admin123' },
    { nome: 'usuario1', senha: 'senha1' },
    { nome: 'usuario2', senha: 'senha2' },
    { nome: 'Gui', senha: '123' },
    { nome: 'Ana', senha: '456' }
  ];

  const login = (nome: string, senha: string) => {
    const usuarioEncontrado = usuarios.find(user => user.nome === nome && user.senha === senha);
    if (usuarioEncontrado) {
      setUsuario({ ...usuarioEncontrado, ultimoTreino: usuario?.ultimoTreino || 'Nenhum treino registrado' });
      setKey(prevKey => prevKey + 1); // Força recarregamento
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    setKey(prevKey => prevKey + 1); // Força recarregamento
  };

  const atualizarUltimoTreino = () => {
    if (!usuario) return;

    const agora = new Date();
    agora.setHours(agora.getHours() - 3); // Ajuste de fuso horário

    const dataFormatada = `${agora.getDate().toString().padStart(2, '0')}/${(agora.getMonth() + 1).toString().padStart(2, '0')}/${agora.getFullYear().toString().slice(-2)}`;
    const horaFormatada = `${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;
    
    setUsuario({ ...usuario, ultimoTreino: `Último Treino: ${dataFormatada} às ${horaFormatada}` });
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, atualizarUltimoTreino, key }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
