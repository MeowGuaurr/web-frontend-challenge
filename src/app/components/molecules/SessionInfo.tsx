"use client";

import React, { useEffect, useState } from "react";
import Text from "../atoms/Text";

const SessionInfo: React.FC = () => {
  const [ip, setIp] = useState<string>("—");
  const [lastAccess, setLastAccess] = useState<string>("—");

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("es-NI", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date());

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastAccess(formattedDate);

    // Obtain public IP from external website
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp("No disponible"));
  }, []);

  return (
    <div className="mt-auto p-4 bg-gray-50">
      <Text className="text-s">IP: {ip}</Text>
      <Text className="text-s block mt-1">Último acceso: {lastAccess}</Text>
    </div>
  );
};

export default SessionInfo;
