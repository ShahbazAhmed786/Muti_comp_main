import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const SalaryReport = () => {
  const [salaryDateRange, setSalaryDateRange] = useState({ start: '', end: '' });
  const [totalSalary, setTotalSalary] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sampleSalaryData = [
    { employee: 'Employee A', salary: 15000, date: '2024-12-20' },
    { employee: 'Employee B', salary: 18000, date: '2024-12-21' },
  ];

  const calculateTotalSalary = () => {
    const filteredSalaries = sampleSalaryData.filter(
      (salary) =>
        new Date(salary.date) >= new Date(salaryDateRange.start) &&
        new Date(salary.date) <= new Date(salaryDateRange.end)
    );
    setTotalSalary(filteredSalaries.reduce((total, salary) => total + salary.salary, 0));
  };

  const downloadExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, filename);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const downloadPDF = (data, title, headers) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 14, 20);
    doc.setFontSize(12);
    const tableData = data.map((row) => Object.values(row));
    doc.autoTable({
      head: headers,
      body: tableData,
      startY: 30,
    });
    doc.save(`${title}.pdf`);
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => setSidebarOpen(false);

  const handleNavigation = (href) => {
    console.log(`Navigating to: ${href}`);
    closeSidebar();
  };

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} onNavigate={handleNavigation} />

      {/* Main Content */}
      <div className={`flex-1 bg-gray-100 transition-transform duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Salary Report</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => downloadExcel(sampleSalaryData, 'Salary Report')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <span className="material-icons mr-2">table_view</span>
                Export to Excel
              </button>
              <button
                onClick={() =>
                  downloadPDF(sampleSalaryData, 'Salary Report', [['Employee', 'Salary', 'Date']])
                }
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <span className="material-icons mr-2">picture_as_pdf</span>
                Export to PDF
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex space-x-4 mb-4">
              <input
                type="date"
                name="start"
                value={salaryDateRange.start}
                onChange={(e) => setSalaryDateRange({ ...salaryDateRange, start: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                name="end"
                value={salaryDateRange.end}
                onChange={(e) => setSalaryDateRange({ ...salaryDateRange, end: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
              <button
                onClick={calculateTotalSalary}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Generate Report
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-4">Total Salary: {totalSalary}</h3>

            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleSalaryData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{data.employee}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{data.salary}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{data.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalaryReport;
