export default function EmployeeTable({ employees, deleteEmployee, editEmployee }) {
  return (
    <div className="p-6 mb-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Employees Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-center">ID</th>
              <th className="px-4 py-2 text-center">Full Name</th>
              <th className="px-4 py-2 text-center">Job Title</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Employment Type</th>
              <th className="px-4 py-2 text-center">Salary</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (//index + 1 for displaying the id (akid we will not display the date in the table)
              <tr key={emp.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{emp.fullName}</td>
                <td className="px-4 py-2 text-center">{emp.jobTitle}</td>
                <td className="px-4 py-2 text-center">{emp.email}</td>
                <td className="px-4 py-2 text-center">{emp.employmentType}</td>
                <td className="px-4 py-2 text-center">${emp.salary}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => editEmployee(emp.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
