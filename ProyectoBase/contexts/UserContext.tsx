import React, { ReactNode } from "react";
import { createContext, isValidElement, useContext, useState } from "react"

interface User {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    fecha: string;
}

interface UserContext {
    usuarios: User[];
    addUser: (usuario: User) => void;
}

const UsersContext = createContext<UserContext | undefined> (undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const [usuarios, setUsers] = useState<User[]>([]);
  
    const addUser = (usuario: User) => {
      setUsers([...usuarios, usuario]);
    };
  
    return (
      <UsersContext.Provider value={{ usuarios, addUser }}>
        {children}
      </UsersContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
      throw new Error("useUsers debe usarse dentro de un UsersProvider");
    }
    return context;
  };
