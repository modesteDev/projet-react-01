"use client";
import { createContext, useState } from "react";

// 1. Créer le contexte
export const Contexte = createContext<any>(null);

// 2. Créer le provider
export function ContexteProvider({ children }: { children: React.ReactNode }) {
  const [tache, setTache] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]); // État pour gérer la liste des tâches
  const [TacheDelete, setTacheDelete] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]); // État pour gérer la liste des tâches supprimées
  const [tacheCompleted, setTacheCompleted] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]); //  État pour gérer la liste des tâches effectuées

  return (
    <Contexte.Provider
      value={{
        tache,
        setTache,
        TacheDelete,
        setTacheDelete,
        tacheCompleted,
        setTacheCompleted,
      }} // Fournir les valeurs et les fonctions de mise à jour du contexte aux composants enfants
    >
      {children}
    </Contexte.Provider>
  );
}
