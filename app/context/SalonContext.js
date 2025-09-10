//app/context/SalonContext.js
"use client";

import { createContext, useState, useEffect } from "react";

export const SalonContext = createContext();

export const SalonProvider = ({ children }) => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSalons() {
      try {
        console.log("Client: Fetching from /api/salons");
        const res = await fetch("/api/salons");
        console.log("Client: Response status:", res.status);
        console.log("Client: Response ok:", res.ok);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Client: Fetched salons:", data);
        console.log("Client: Number of salons:", data.length);
        
        setSalons(data);
      } catch (err) {
        console.error("Client: Failed to fetch salons:", err);
        console.error("Client: Error details:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSalons();
  }, []);

  return (
    <SalonContext.Provider value={{ salons, setSalons, loading }}>
      {children}
    </SalonContext.Provider>
  );
};