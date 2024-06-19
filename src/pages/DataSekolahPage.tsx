import React, { useState } from "react";
import SekolahAddForm from "../components/sekolah/SekolahAddFormComponent";
import SekolahEditForm from "../components/sekolah/SekolahEditFormComponent";
import SekolahList from "../components/sekolah/SekolahListComponent";
import KompetensiAddForm from "../components/sekolah/KompetensiAddComponent";
import KompetensiEditForm from "../components/sekolah/KompetensiEditFormComponent";
import KompetensiList from "../components/sekolah/KompetensiListFormComponent";
import useIsDesktop from "../hooks/useIsDesktop"; // untuk handle layout

const DataSekolahPage: React.FC = () => {
  const [selectedSekolahId, setSelectedSekolahId] = useState<string | null>(null);
  const [editingSekolahId, setEditingSekolahId] = useState<string | null>(null);
  const [editingKompetensi, setEditingKompetensi] = useState<{
    id: string;
    kode: string;
  } | null>(null);
  const [refresh, setRefresh] = useState(false);
  const isDesktop = useIsDesktop();

  const handleSuccess = (updated: boolean) => {
    if (updated) {
      console.log("Kompetensi updated. Refreshing list...");
      handleRefresh();
    } else {
      console.log("Failed to update kompetensi.");
    }
  };

  const handleRefresh = () => {
    setRefresh(!refresh); // tambah redirect jika diperlukan
  };

  const handleEditKompetensi = (unitId: string, initialKode: string) => {
    setEditingKompetensi({ id: unitId, kode: initialKode });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4 pt-8">
          Data Sekolah
        </h1>
        <div className={`flex ${isDesktop ? "flex-row" : "flex-col"} gap-4`}>
          <div className="flex-1">
            {!editingSekolahId && !selectedSekolahId && (
              <SekolahAddForm onAddSuccess={handleRefresh} />
            )}
            {editingSekolahId && (
              <>
                <button
                  onClick={() => setEditingSekolahId(null)}
                  className="flex items-center text-red-500 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  Back
                </button>
                <SekolahEditForm
                  id={editingSekolahId}
                  onSuccess={() => {
                    setEditingSekolahId(null);
                    handleRefresh();
                  }}
                />
              </>
            )}
            {selectedSekolahId && !editingKompetensi && (
              <>
                <button
                  onClick={() => setSelectedSekolahId(null)}
                  className="flex items-center text-red-500 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  Back
                </button>
              </>
            )}
          </div>
          <div className="flex-1">
            {!selectedSekolahId && (
              <SekolahList
                onEdit={setEditingSekolahId}
                onViewKompetensi={setSelectedSekolahId}
                refresh={refresh}
                editingId={editingSekolahId}
              />
            )}
            {selectedSekolahId && (
              <>
                <KompetensiList
                  sekolahId={selectedSekolahId}
                  onEdit={handleEditKompetensi}
                  refresh={refresh} 
                />
                {editingKompetensi && (
                  <>
                    <button
                      onClick={() => setEditingKompetensi(null)}
                      className="flex items-center text-red-500 mb-2"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                      Back
                    </button>
                    <KompetensiEditForm
                      sekolahId={selectedSekolahId}
                      unitId={editingKompetensi.id}
                      initialKode={editingKompetensi.kode}
                      initialUnitKompetensi={[{ id: editingKompetensi.id }]}
                      onSuccess={handleSuccess} 
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSekolahPage;
