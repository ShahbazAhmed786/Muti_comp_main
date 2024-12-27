import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const TotalRecoveryReport = () => {
  const [recoveryDateRange, setRecoveryDateRange] = useState({ start: '', end: '' });
  const [totalRecovery, setTotalRecovery] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sampleRecoveryData = [
    { date: '2024-12-20', recoveryAmount: 5000 },
    { date: '2024-12-21', recoveryAmount: 3000 },
  ];

  const calculateTotalRecovery = () => {
    const filteredRecovery = sampleRecoveryData.filter(
      (recovery) =>
        new Date(recovery.date) >= new Date(recoveryDateRange.start) &&
        new Date(recovery.date) <= new Date(recoveryDateRange.end)
    );
    setTotalRecovery(filteredRecovery.reduce((total, recovery) => total + recovery.recoveryAmount, 0));
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
            <h1 className="text-3xl font-semibold text-gray-800">Total Recovery Report</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => downloadExcel(sampleRecoveryData, 'Total Recovery Report')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <span className="material-icons mr-2">table_view</span>
                Export to Excel
              </button>
              <button
                onClick={() =>
                  downloadPDF(sampleRecoveryData, 'Total Recovery Report', [
                    ['Date', 'Recovery Amount (₨)'],
                  ])
                }
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <span className="material-icons mr-2">picture_as_pdf</span>
                Export to PDF
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex space-x-4 mb-4">
              <input
                type="date"
                name="start"
                value={recoveryDateRange.start}
                onChange={(e) => setRecoveryDateRange({ ...recoveryDateRange, start: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                name="end"
                value={recoveryDateRange.end}
                onChange={(e) => setRecoveryDateRange({ ...recoveryDateRange, end: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
              <button
                onClick={calculateTotalRecovery}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Generate Report
              </button>
            </div>
            <h3 className="text-lg font-medium text-gray-700">Total Recovery: ₨{totalRecovery}</h3>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Recovery Amount (₨)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleRecoveryData.map((recovery, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{recovery.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{recovery.recoveryAmount}</td>
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

export default TotalRecoveryReport;
