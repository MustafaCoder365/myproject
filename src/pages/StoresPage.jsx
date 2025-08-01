
import React from "react";
import { stores } from "../Data/storesData";
import StoreCard from "../components/StoreCard";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

const StoresPage = () => {
  const navigate = useNavigate();

  const handleStoreClick = (store) => {
    navigate(`/stores/${store.id}`, { state: { store } });
  };

  return (
    <div>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center hover:text-[#00b894] transition">Available Stores</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} onClick={handleStoreClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoresPage;
