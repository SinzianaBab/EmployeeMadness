import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
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


const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};


const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
   const [equipment, setEquipment] = useState(null);
  const [brands, setBrands] = useState(null);
  const [colors, setColors] = useState(null);


  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      })
      .catch((err) => {
        throw err;
      });
    
    fetchEquipments()
      .then((equipment) => {
        setEquipment(equipment);
        setEmployeeLoading(false);
      })
      .catch((err) => {
        throw err;
      });
    
      fetchBrands().then((brands) => {
    setBrands(brands);
        setEmployeeLoading(false);
      }).catch((err) => {
        throw err;
      });
    
  fetchColors().then((colors) => {
    setColors(colors);
        setEmployeeLoading(false);
      }).catch((err) => {
        throw err;
      });
    
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee)
      .then(() => {
        setUpdateLoading(false);
        navigate("/");
      });
  };

  
  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      equipment={equipment}
      brand={brands}
      color={colors}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;

