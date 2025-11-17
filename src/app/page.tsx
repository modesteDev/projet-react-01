"use client";

import { FaTrash, FaAlignRight } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { Contexte } from "./compenents/contexte/page";
import AlertLimite from "./compenents/alert/page";
import Link from "next/link";

export default function HomePage() {
  const {
    tache,
    setTache,
    TacheDelete,
    setTacheDelete,
    tacheCompleted,
    setTacheCompleted,
  } = useContext(Contexte);
  const [tacheInput, setTacheInput] = useState("");
  type tachesType = { id: number; text: string; completed: boolean };

  //chargement depuis localStorage (si besoin)
  useEffect(() => {
    const storedTaches = localStorage.getItem("taches");
    const storedTacheDelete = localStorage.getItem("tacheDelete");
    const storedTacheCompleted = localStorage.getItem("tacheCompleted");
    if (storedTacheCompleted)
      setTacheCompleted(JSON.parse(storedTacheCompleted));
    if (storedTaches) setTache(JSON.parse(storedTaches));
    if (storedTacheDelete) setTacheDelete(JSON.parse(storedTacheDelete));
  }, []);

  //sauvegarde dans localStorage (si besoin)
  useEffect(() => {
    localStorage.setItem("taches", JSON.stringify(tache));
    localStorage.setItem("tacheDelete", JSON.stringify(TacheDelete));
    localStorage.setItem("tacheCompleted", JSON.stringify(tacheCompleted));
  }, [tache, TacheDelete, tacheCompleted]);

  const handleAddTache = async () => {
    if (tache.length >= 5) return;
    if (tacheInput.trim() === "") return;
    setTache([
      ...tache,
      { id: Date.now(), text: tacheInput, completed: false },
    ]);
    setTacheInput("");
  };

  const handleToggleComplete = (id: number) => {
    const newTache = tache.map((taches: tachesType) =>
      taches.id === id ? { ...taches, completed: !taches.completed } : taches
    );
    setTache(newTache);
    const tachesEffectue = newTache.find(
      (taches: tachesType) => taches.completed === true && taches.id === id
    );
    const dejaDone = tacheCompleted.some(
      (taches: tachesType) => taches.id === id
    );
    if (dejaDone) return;
    if (tachesEffectue) setTacheCompleted([...tacheCompleted, tachesEffectue]);
  };

  const handleDeleteTache = (id: number) => {
    setTache(tache.filter((taches: tachesType) => taches.id !== id));
    const tacheToRestore = tache.find((taches: tachesType) => taches.id === id);
    if (tacheToRestore) {
      setTacheDelete([...TacheDelete, tacheToRestore]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 flex items-center justify-center">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-xl">
        <h1 className="text-3xl sm:text-2xl font-[cursive] font-bold text-center uppercase mb-6">
          Ma to-do liste
        </h1>

        <div className="flex flex-col-reverse sm:flex-row mb-4 gap-2">
          <button
            onClick={handleAddTache}
            className="bg-gray-700 font-black cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-gray-900 w-full sm:w-auto"
            disabled={tache.length >= 5}
          >
            VALIDER
          </button>
          <input
            type="text"
            placeholder="Nouvelle tâche à effectuer...!"
            value={tacheInput}
            onChange={(e) => setTacheInput(e.target.value)}
            className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <p className="mb-3">La liste de mes tâches</p>
          <div className="w-full">
            <ul className="space-y-2 transition-opacity duration-150 opacity-100 max-h-64 overflow-auto">
              {tache.length === 0 && (
                <li className="text-gray-500">Aucune tâche pour le moment.</li>
              )}
              {tache.length === 5 && <AlertLimite />}
              {tache.map((taches: tachesType, index: number) => (
                <li
                  key={taches.id}
                  className="flex items-center justify-between space-x-2 border border-gray-300 rounded-md p-2 flex-wrap"
                >
                  <span className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded text-sm">
                    {index + 1}
                  </span>
                  <span className="flex-1 min-w-0 truncate">{taches.text}</span>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <input
                      className="rounded w-6 h-6 border border-gray-400 accent-green-600"
                      type="checkbox"
                      checked={taches.completed}
                      onChange={() => handleToggleComplete(taches.id)}
                    />
                    <button
                      onClick={() => handleDeleteTache(taches.id)}
                      className="bg-red-600 text-white p-1 rounded hover:bg-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href="/compenents/pageHistorique"
            className="text-blue-400 font-black hover:underline inline-flex items-center"
          >
            <FaAlignRight className="inline mr-1" />
            Historique
          </Link>
          <p className="text-xs text-gray-400 ml-2">V-0.01</p>
        </div>
      </div>
    </div>
  );
}
