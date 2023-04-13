import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees/absent").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeAbsentList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [inputText, setInputText] = useState("");
  const [copyEmployees, setCopyEmployees] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortAsc, setSortAsc] = useState(false);
  const [isPresent, setIsPresent] = useState(false);

  const handleDelete = (id) => {
    deleteEmployee(id);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleClick = () => {
    if (sortAsc === true) {
      setEmployees((previous) =>
        [...previous].sort((a, b) => b.name.localeCompare(a.name))
      );
      setSortAsc(false);
    } else if (sortAsc === false) {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.name.localeCompare(b.name))
      );
      setSortAsc(true);
    }
  };

  const handleAbsent = (employee) => {
    employee.present = !employee.present;
    setIsPresent(!isPresent);
    return fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json());
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      setEmployees(employees);
      setCopyEmployees(employees);
    });
  }, [isPresent]);

  if (loading) {
    return <Loading />;
  }

  const searchEmployee = (e) => {
    setInputText(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const filteredEmployees = copyEmployees.filter(
      (empl) =>
        empl.level.toLowerCase().includes(searchTerm) ||
        empl.position.toLowerCase().includes(searchTerm)
    );
    setEmployees(filteredEmployees);
  };

  const filteredSelect = (e) => {
    const option = e.target.value;
    if (option === "Level") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.level.localeCompare(b.level))
      );
    } else if (option === "Position") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.position.localeCompare(b.position))
      );
    } else if (option === "First name") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (option === "Last name") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => {
          const aLast = a.name.split(" ")[a.name.split(" ").length - 1];
          const bLast = b.name.split(" ")[b.name.split(" ").length - 1];
          return aLast.localeCompare(bLast);
        })
      );
    } else if (option === "Middle name") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => {
          const aMiddle =
            a.name.split(" ")[a.name.split(" ").length > 2 ? 1 : 1];
          const bMiddle =
            b.name.split(" ")[b.name.split(" ").length > 2 ? 1 : 1];
          return aMiddle.localeCompare(bMiddle);
        })
      );
    }
  };

  const incrementPage = () => {
    console.log(pageNumber);
    if (pageNumber * 10 >= employees.length) return;
    setPageNumber(pageNumber + 1);
  };

  const decrementingPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <select onChange={filteredSelect}>
        <option disabled selected>
          Sort by:
        </option>
        <option>First name</option>
        <option>Last name</option>
        <option>Middle name</option>
        <option>Level</option>
        <option>Position</option>
      </select>
      <input
        type="text"
        placeholder="Search by Level/Position"
        value={inputText}
        onChange={searchEmployee}
      />
      <EmployeeTable
        employees={employees.slice((pageNumber - 1) * 10, pageNumber * 10)}
        // employees={employees}
        onDelete={handleDelete}
        onSort={handleClick}
        // onPresent={handlePresent}
        onAbsent={handleAbsent}
      />
      ;
      <div>
        <button onClick={decrementingPage}>Previous</button>
        <p>{pageNumber}</p>
        <button onClick={incrementPage}>Next</button>
      </div>
    </div>
  );
};

export default EmployeeAbsentList;
