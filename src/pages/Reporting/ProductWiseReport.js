import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const ProductWiseReport = () => {
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sampleProductData = [
    { product: 'Product A', quantitySold: 50, totalRevenue: 5000 },
    { product: 'Product B', quantitySold: 30, totalRevenue: 3000 },
  ];

  const filteredProductReports = sampleProductData.filter((report) =>
    report.product.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

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
            <h1 className="text-3xl font-semibold text-gray-800">Product Wise Report</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => downloadExcel(filteredProductReports, 'Product Wise Report')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <span className="material-icons mr-2">table_view</span>
                Export to Excel
              </button>
              <button
                onClick={() =>
                  downloadPDF(filteredProductReports, 'Product Wise Report', [
                    ['Product', 'Quantity Sold', 'Total Revenue (₨)'],
                  ])
                }
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <span className="material-icons mr-2">picture_as_pdf</span>
                Export to PDF
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <input
              type="text"
              placeholder="Search by product name"
              value={productSearchTerm}
              onChange={(e) => setProductSearchTerm(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Quantity Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Total Revenue (₨)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProductReports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{report.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{report.quantitySold}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{report.totalRevenue}</td>
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

export default ProductWiseReport;
