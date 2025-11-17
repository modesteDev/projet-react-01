"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { Contexte } from "../contexte/page";
import { FaTrash, FaCheck } from "react-icons/fa";

export default function PageHistorique() {
  type listeTache = { id: number; text: string; completed: boolean };
  const [activeTab, setActiveTab] = useState<"done" | "deleted">("done");
  const { tacheCompleted, TacheDelete } = useContext(Contexte);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 flex items-center justify-center">
      <div className="flex flex-col sm:flex-row items-start sm:items-top gap-6 w-full max-w-3xl">
        <div className="w-full sm:w-auto flex-shrink-0">
          <Link href={"/"}>
            <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md">
              <GoArrowLeft className="text-lg text-black" />
            </button>
          </Link>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full">
          <h1 className="text-2xl sm:text-2xl font-[cursive] font-bold uppercase text-center mb-4">
            MON HISTORIQUE DE TÂCHE
          </h1>

          <div className="flex gap-2 mb-4 justify-center">
            <button
              onClick={() => setActiveTab("done")}
              className={`font-black cursor-pointer text-gray-700 px-4 py-2 rounded-lg w-full sm:w-auto ${
                activeTab === "done" ? "bg-gray-700 text-white" : "bg-gray-200"
              }`}
            >
              Effectuées
            </button>
            <button
              onClick={() => setActiveTab("deleted")}
              className={`font-black cursor-pointer text-gray-700 px-4 py-2 rounded-lg w-full sm:w-auto ${
                activeTab === "deleted"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              Supprimées
            </button>
          </div>

          <div className="max-h-64 overflow-auto">
            {activeTab === "done" ? (
              <ul className="space-y-2">
                {(!tacheCompleted || tacheCompleted.length === 0) && (
                  <li className="text-gray-500">Aucune tâche effectuée.</li>
                )}
                {tacheCompleted &&
                  tacheCompleted.map((t: listeTache, index: number) => (
                    <li
                      key={t.id}
                      className="flex items-center space-x-2 justify-between p-2 border border-gray-300 rounded"
                    >
                      <span className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded text-sm">
                        {index + 1}
                      </span>
                      <span className="flex-1  space-x-2 min-w-0 truncate">
                        {t.text}
                      </span>
                      <span className="ml-3 text-sm text-gray-500">
                        <button className="bg-green-600 text-white p-1 rounded">
                          <FaCheck />
                        </button>
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <ul className="space-y-2">
                {(!TacheDelete || TacheDelete.length === 0) && (
                  <li className="text-gray-500">Aucune tâche supprimée.</li>
                )}
                {TacheDelete &&
                  TacheDelete.map((t: listeTache, index: number) => (
                    <li
                      key={t.id}
                      className="flex items-center space-x-2 border-gray-300  justify-between p-2 border rounded"
                    >
                      <span className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded text-sm">
                        {index + 1}
                      </span>
                      <span className="flex-1 min-w-0 space-x-2 truncate">
                        {t.text}
                      </span>
                      <span className="ml-3 text-sm text-gray-500">
                        <button className="bg-red-600 text-white p-1 rounded ">
                          <FaTrash />
                        </button>
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
