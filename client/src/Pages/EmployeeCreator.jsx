import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEquipments = () => {
  return fetch("/api/equipments").then((res) => res.json());
};

const fetchBrands = () => {
  return fetch("/api/brands").then((res) => res.json());
};

const fetchColors = () => {
  return fetch("/api/colors").then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState(null);
  const [brands, setBrands] = useState(null);
  const [colors, setColors] = useState(null);
  
  useEffect(()=> {
  fetchEquipments().then((equipment) => {
    setEquipment(equipment);
    setLoading(false);
  });

  fetchBrands().then((brands) => {
    setBrands(brands);
    setLoading(false);
  });

  fetchColors().then((colors) => {
    setColors(colors);
    setLoading(false);
  });
}, [])
  

  const handleCreateEmployee = (employee) => {
    setLoading(true);
    createEmployee(employee).then(() => {
      setLoading(false);
      navigate("/");
    });
  };

  return (
    <EmployeeForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
      equipment={equipment}
      brand={brands}
      color={colors}
    />
  );
};

export default EmployeeCreator;
