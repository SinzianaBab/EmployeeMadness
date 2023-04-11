import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";


const fetchEquipments = () => {
  return fetch("/api/equipments").then((res) => res.json());
};

const deleteEquipments = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentsList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);
  const [inputText, setInputText] = useState("");
  const [CopyEquipments, setCopyEquipments] = useState(null);

  const handleDelete = (id) => {
    deleteEquipments(id);

    setEquipments((equipments) => {
      return equipments.filter((equipments) => equipments._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipments().then((equipments) => {
      setLoading(false);
      setEquipments(equipments);
      setCopyEquipments(equipments);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const searchEquipments = (e) => {
    setInputText(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const filteredEquipments = CopyEquipments.filter(
      (equip) =>
        equip.name.toLowerCase().includes(searchTerm) ||
        equip.type.toLowerCase().includes(searchTerm)
    );
    setEquipments(filteredEquipments);
  };

  const filteredSelect = (e) => {
    const option = e.target.value;
    if (option === "Type") {
      setEquipments((previous) =>
        [...previous].sort((a, b) => a.type.localeCompare(b.type))
      );
    } else if (option === "Name") {
      setEquipments((previous) =>
        [...previous].sort((a, b) => a.name.localeCompare(b.name))
      );
    }else if(option === "Amount"){
      setEquipments((previous) =>
        [...previous].sort((a, b) => a.amount - b.amount)
      );
    }
  };

  return (
    <div>
      <select onChange={filteredSelect}>
        <option disabled selected>
          Sort by:
        </option>
        <option>Name</option>
        <option>Type</option>
        <option>Amount</option>
      </select>
      <input
        type="text"
        placeholder="Search by Name or Type"
        value={inputText}
        onChange={searchEquipments}
      />
      <EquipmentTable equipments={equipments} onDelete={handleDelete} />;
    </div>
  );
};

export default EquipmentsList;
