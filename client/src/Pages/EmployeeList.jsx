import { useEffect, useState, useRef } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";


const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const searchedRef = useRef(null);
  const filterRef = useRef(null);
  const [searched, setSearched] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      setEmployees(employees);
      setSearched(employees);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const searchBy = () => {
    if (
      searchedRef.current.value.length > 0 &&
      filterRef.current.value === "position"
    ) {
      const filtered = employees.filter((employee) =>
        employee.position
          .toLowerCase()
          .includes(searchedRef.current.value.toLowerCase())
      );
      setSearched(filtered);
    }
     else if (
      searchedRef.current.value.length > 0 &&
      filterRef.current.value === "level"
    ) {
      const filtered = employees.filter((employee) =>
        employee.level
          .toLowerCase()
          .includes(searchedRef.current.value.toLowerCase())
      );
      setSearched(filtered);
    } else if (
      searchedRef.current.value.length > 0 &&
      filterRef.current.value === "firstN"
    ) {
      const filtered = employees.filter((employee) =>
        employee.name
          .split(" ")[0]
          .toLowerCase()
          .includes(searchedRef.current.value.toLowerCase())
      );
      setSearched(filtered);
    } else if (
      searchedRef.current.value.length > 0 &&
      filterRef.current.value === "lastN"
    ) {
      const filtered = employees.filter((employee) => {
        if (employee.name.split(" ").length > 2) {
          return employee.name
            .split(" ")[2]
            .toLowerCase()
            .includes(searchedRef.current.value.toLowerCase());
        } else {
          return employee.name
            .split(" ")[1]
            .toLowerCase()
            .includes(searchedRef.current.value.toLowerCase());
        }
      });
      setSearched(filtered);
    } else if (
      searchedRef.current.value.length > 0 &&
      filterRef.current.value === "midN"
    ) {
      const filtered = employees.filter((employee) => {
        if (employee.name.split(" ").length > 2) {
          return employee.name
            .split(" ")[1]
            .toLowerCase()
            .includes(searchedRef.current.value.toLowerCase());
        }
        return null;
      });
      setSearched(filtered);
    } else if (
      searchedRef.current.value.length > 0 &&
      filterRef.current.value === "default"
    ) {
      const filtered = employees.filter((employee) =>
        employee.name
          .split(" ")[0]
          .toLowerCase()
          .includes(searchedRef.current.value.toLowerCase())
      );
      setSearched(filtered);
    } else {
      setSearched(employees);
    }
  };

  return (
    <div>
      <select name="options" id="options" ref={filterRef}>
        <option value="default" disabled>
          Filter the Search
        </option>
        <option value="position">Position</option>
        <option value="level">Level</option>
        <option value="firstN">First Name</option>
        <option value="lastN">Last Name</option>
        <option value="midN">Middle Name</option>
      </select>
      <input
        placeholder="Search..."
        ref={searchedRef}
        onChange={() => searchBy()}
      ></input>
      <EmployeeTable employees={searched} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeList;
