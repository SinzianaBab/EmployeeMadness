const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  equipment,
  brand,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    const equipSelect = e.target.elements.equipment;
    const equipOption = equipSelect.options[equipSelect.selectedIndex];
    const equipValue = equipOption.value;
    employee.equipment = equipValue;

    const brandSelect = e.target.elements.brand;
    const brandOption = brandSelect.options[brandSelect.selectedIndex];
    const brandValue = brandOption.value;
    employee.brand = brandValue;
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
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>
      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>
      {equipment && employee ? (
        <div className="control">
          <label htmlFor="position">Equipment:</label>

          <select
            defaultValue={employee ? employee.equipment : null}
            name="equipment"
          >
            <option value={employee.equipment} key={employee.equipment}>
              {employee && equipment
                ? equipment.find(
                    (equipment) => equipment._id === employee.equipment
                  ).name
                : null}
            </option>

            {equipment
              ?.filter((eq) => eq._id !== employee.equipment)
              .map((equipment) => (
                <option value={equipment._id} key={equipment._id}>
                  {equipment.name}
                </option>
              ))}
          </select>
        </div>
      ) : (
        <div className="control">
          <label htmlFor="position">Equipment:</label>

          <select name="equipment">
            <option value="Select an equipment" hidden>
              Select an equipment
            </option>

            {equipment?.map((equipment) => (
              <option value={equipment._id} key={equipment._id}>
                {equipment.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {brand && employee ? (
        <div className="control">
          <label htmlFor="position">Equipment:</label>

          <select
            defaultValue={employee ? employee.equipment : null}
            name="brand"
          >
            <option value={employee.brand} key={employee.brand}>
              {employee && brand
                ? brand.find((brand) => brand._id === employee.brand).name
                : null}
            </option>

            {brand
              ?.filter((br) => br._id !== employee.brand)
              .map((brand) => (
                <option value={brand._id} key={brand._id}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
      ) : (
        <div className="control">
          <label htmlFor="position">Brand:</label>

          <select name="brand">
            <option value="Select a brand" hidden>
              Select a brand
            </option>

            {brand?.map((brand) => (
              <option value={brand._id} key={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      )}

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
