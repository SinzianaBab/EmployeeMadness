import { useState } from "react";

const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  equipment,
  brand,
  color,
}) => {
  const [employeeLevel, setEmployeeLevel] = useState(
    employee ? employee.level : null
  );


  function chooseLevel(e) {
    const salary = e.target.value;
    // if (!salary) {
    //   setEmployeeLevel(employee ? employee.level : null)
    // } else if (salary) {
    if (salary <= 100) {
      setEmployeeLevel("Junior");
    } else if (100 < salary && salary <= 300) {
      setEmployeeLevel("Medior");
    } else if (300 < salary && salary <= 400) {
      setEmployeeLevel("Senior");
    } else if (400 < salary && salary <= 800) {
      setEmployeeLevel("Expert");
    } else if (salary > 800) {
      setEmployeeLevel("Godlike");
    }
    // }
  }


  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };



  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          // defaultValue={employee ? employee.level : null}
        value={employeeLevel}
          name="level" id="level" disabled />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          defaultValue={employee ? employee.salary : null}
          name="salary"
          id="salary"
          onChange={chooseLevel}
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select
          name="equipment"
          id="equipment"
          defaultValue={employee?.equipment}
        >
          <option value="" disabled>
            Select an equipment
          </option>
          {equipment?.map((eq) => (
            <option
              selected={employee?.equipment === eq.id}
              key={eq._id}
              value={eq._id}
            >
              {eq.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="brand">Favorite Brand:</label>
        <select name="brand" id="brand">
          <option value="" disabled="disabled" defaultValue={employee?.brand}>
            Select a brand
          </option>
          {brand?.map((br) => (
            <option
              selected={employee?.brand === br._id}
              key={br._id}
              value={br._id}
            >
              {br.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="color">Favorite Color:</label>
        <select name="color" id="color">
          <option value="" disabled defaultValue={employee?.color}>
            Select a color
          </option>
          {color?.map((co) => (
            <option
              selected={employee?.color === co._id}
              key={co._id}
              value={co._id}
            >
              {co.name}
            </option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
