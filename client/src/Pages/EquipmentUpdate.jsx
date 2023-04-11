import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";
import Loading from "../Components/Loading";

const updatequipment = (equipment) => {
  return fetch(`/api/equipments/${equipment._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const fetchEquipment = (id) => {
  return fetch(`/api/equipments/${id}`).then((res) => res.json());
};

// const fetchEquipments = () => {
//   return fetch("/api/equipment").then((res) => res.json());
// };

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(true);
//   const [equipments, setEquipments] = useState(null);

  useEffect(() => {
    setEquipmentLoading(true);
    fetchEquipment(id)
      .then((equipment) => {
        setEquipment(equipment);
        setEquipmentLoading(false);
      })
      .catch((err) => {
        throw err;
      });

//     fetchEquipments()
//       .then((equipments) => {
//         setEquipments(equipments);
//         setEmployeeLoading(false);
//       })
//       .catch((err) => {
//         throw err;
//       });
  }, [id]);

  const handleUpdateEquipment = (equipment) => {
    setUpdateLoading(true);
    updatequipment(equipment).then(() => {
      setUpdateLoading(false);
      navigate("/EquipmentList");
    });
  };

  if (equipmentLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipment}
      //   equipments={equipments}
      onSave={handleUpdateEquipment}
      disabled={updateLoading}
      onCancel={() => navigate("/EquipmentList")}
    />
  );
};

export default EquipmentUpdater;
