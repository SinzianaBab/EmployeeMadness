import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, onSort, onAbsent }) => {
  console.log(employees);
  return(
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Present</th>
          <th>
            <button onClick={() => onSort()}>Name</button>
          </th>
          <th>Level</th>
          <th>Position</th>
          <th>Equipment</th>
          <th>Favourite Brand</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
              <tr key={employee._id}>
                <th>
                  <input
                    defaultChecked={employee.present}
                    type="checkbox"
                    id="myCheck"
                    onClick={() => onAbsent(employee)}
                  />
                </th>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
            <td>{employee.equipment.name}</td>
                <td>{employee.brand.name}</td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
        ))}
      </tbody>
    </table>
  </div>
);}

export default EmployeeTable;
