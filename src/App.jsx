import { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // fetch employees from localStorage on load and then using set employees to redisplay them
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employees")) || [];// ||[] incase the local storage is empty it will return an empty array to avoid errors
    setEmployees(stored);
  }, []);

  // Save employees to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);// employees is a dependency so it will run whenever employees changes

  const addOrUpdateEmployee = (employee) => {
    if (editingEmployee) { //check the editingEmployee usestate to see if we're editing or adding an employee
      // Update existing employee
      setEmployees(
        employees.map((emp) =>//loop through each employee object
          emp.id === editingEmployee.id ? { ...employee, id: emp.id } : emp
        )                                             //id stays the same
      );
      setEditingEmployee(null); // reseting editing state
    } else {
      // Add new employee
      setEmployees([...employees, { ...employee, id: Date.now() }]);
    }
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
    if (editingEmployee && editingEmployee.id === id) setEditingEmployee(null);
  };

  const editEmployee = (id) => {
    const emp = employees.find((e) => e.id === id);
    setEditingEmployee(emp);
  };

  return (
    <>
      <EmployeeForm
        addEmployee={addOrUpdateEmployee}
        editingEmployee={editingEmployee}
      />
      <EmployeeTable
        employees={employees}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />
    </>
  );
}

export default App;
