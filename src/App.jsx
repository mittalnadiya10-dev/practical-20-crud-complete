import React, { useState } from 'react';

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Jaiminpuri Bava', role: 'Full Stack Engineer', department: 'IT', salary: 75000 },
    { id: 2, name: 'Patel Brijesh', role: 'UI/UX Designer', department: 'Design', salary: 55000 },
    { id: 3, name: 'Prajapati Harsh', role: 'QA Lead', department: 'Testing', salary: 50000 }
  ]);

  const [form, setForm] = useState({ name: '', role: '', department: 'IT', salary: '' });
  const [editingId, setEditingId] = useState(null);
  const [filterDept, setFilterDept] = useState('All');

  function handleSave(e) {
    e.preventDefault();
    if (!form.name || !form.role) return;

    if (editingId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId ? { ...emp, ...form, salary: Number(form.salary) || 0 } : emp
        )
      );
      setEditingId(null);
    } else {
      const newEmp = {
        id: Date.now(),
        ...form,
        salary: Number(form.salary) || 0
      };
      setEmployees([...employees, newEmp]);
    }

    setForm({ name: '', role: '', department: 'IT', salary: '' });
  }

  function handleEdit(emp) {
    setEditingId(emp.id);
    setForm({ name: emp.name, role: emp.role, department: emp.department, salary: emp.salary });
  }

  function handleDelete(id) {
    if (window.confirm('Delete this employee record?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm({ name: '', role: '', department: 'IT', salary: '' });
      }
    }
  }

  const displayedEmployees = filterDept === 'All'
    ? employees
    : employees.filter((emp) => emp.department === filterDept);

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Employee Management System</h1>
            <p className="text-xs text-indigo-200 mt-1">Comprehensive CRUD Application with State, Props & Filtering</p>
          </div>
          <span className="text-xs bg-indigo-800 text-indigo-200 px-3 py-1.5 rounded-lg border border-indigo-700 font-mono">
            Total Staff: {employees.length}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create / Update Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              {editingId ? 'Edit Employee Record' : 'Add New Employee'}
            </h2>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deep Patel"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Designation / Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React Developer"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="IT">IT</option>
                    <option value="Design">Design</option>
                    <option value="Testing">Testing</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Salary (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 60000"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 rounded-lg text-sm transition"
                >
                  {editingId ? 'Update Record' : '+ Create Record'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm({ name: '', role: '', department: 'IT', salary: '' });
                    }}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-lg text-sm font-semibold"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Read & Delete List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900">Directory Records</h2>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500 font-semibold">Filter:</span>
                <select
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  className="p-1.5 border border-slate-300 rounded bg-white text-xs"
                >
                  <option value="All">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="Design">Design</option>
                  <option value="Testing">Testing</option>
                  <option value="HR">HR</option>
                </select>
              </div>
            </div>

            {displayedEmployees.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">No employee records found in this category.</p>
            ) : (
              <div className="space-y-3">
                {displayedEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{emp.name}</h3>
                      <p className="text-xs text-slate-600 mt-0.5">{emp.role} • <span className="font-semibold text-indigo-700">{emp.department}</span></p>
                      <p className="text-xs text-slate-400 mt-0.5">Salary: ₹{emp.salary.toLocaleString()}</p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded font-semibold transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
