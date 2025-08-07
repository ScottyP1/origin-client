import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import AlertSummary from "../components/AlertSummary";

export default function AlertsPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="opacity-0 animate-fade-in transition-opacity duration-500 ease-in">
      <AlertSummary user={user} />
    </div>
  );
}
