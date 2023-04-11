import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";

const createEquipment = (equipment) => {
  return fetch("/api/equipments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const EquipmentCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEmployee = (equipment) => {
    setLoading(true);

    createEquipment(equipment).then(() => {
      setLoading(false);
      navigate("/");
    });
  };

  return (
    <EquipmentForm
      onCancel={() => navigate("/EquipmentList")}
      disabled={loading}
      onSave={handleCreateEmployee}
    />
  );
};

export default EquipmentCreator;
