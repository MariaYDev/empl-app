import { useState, useEffect } from "react";

export default function EmployeeForm({ addEmployee, editingEmployee }) {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [employmentType, setEmploymentType] = useState("full-time");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (editingEmployee) {
      setFullName(editingEmployee.fullName);
      setJobTitle(editingEmployee.jobTitle);
      setEmail(editingEmployee.email);
      setEmploymentType(editingEmployee.employmentType);
      setSalary(editingEmployee.salary);
    } else {
      // Clear form when not editing
      setFullName("");
      setJobTitle("");
      setEmail("");
      setEmploymentType("full-time");
      setSalary("");
    }
  }, [editingEmployee]);// useeffect runs everytime editingEmloyee changes

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { fullName, jobTitle, email, employmentType, salary };
    addEmployee(employeeData);

    // Clear form
    setFullName("");
    setJobTitle("");
    setEmail("");
    setEmploymentType("full-time");
    setSalary("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mb-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {editingEmployee ? "Edit Employee" : "Add Employee"}
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="textField"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Job Title"
          className="textField"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="textField"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          className="border px-3 py-2 rounded w-full"
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contractor">Contractor</option>
        </select>
        <input
          type="number"
          placeholder="Salary"
          className="textField"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          {editingEmployee ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );//if editing employee == true then display update employee, else display add employee
}
