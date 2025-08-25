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
          emp.id === editingEmployee.id ? { ...employee, id: emp.id } : emp //or return the same object as it is
        )                                             //id stays the same
      );
      setEditingEmployee(null); // reseting editing state
    } else {
      // Add new employee if editingEmployee is null
      setEmployees([...employees, { ...employee, id: Date.now() + Math.random() }]);
    }
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id)); //leaves everything except for the emp with matching id
    if (editingEmployee && editingEmployee.id === id) setEditingEmployee(null); //eza kena 3am na3mol edit la employee w 3melna delete b nafs l wa2et byen3amal reset lal editing state
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
