import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Chart from 'react-apexcharts';
import {
  AttachMoney,
  ShoppingCart,
  People,
  PeopleAlt,
} from '@mui/icons-material'; // Import Material Icons

function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [salesData, setSalesData] = useState(null);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleNavigation = (href) => {
    console.log(`Navigating to: ${href}`);
    closeSidebar();
  };

  // Dummy Data
  const dummySalesData = {
    totalSales: 150000,
    totalProductsSold: 350,
    activeCustomers: 1200,
    revenue: 200000,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    sales: [10000, 15000, 20000, 25000, 30000, 35000],
  };

  const dummyTopSellingProducts = [
    { name: 'Product 1', unitsSold: 100, revenue: 5000 },
    { name: 'Product 2', unitsSold: 80, revenue: 4000 },
    { name: 'Product 3', unitsSold: 60, revenue: 3000 },
    { name: 'Product 4', unitsSold: 50, revenue: 2500 },
  ];

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setSalesData(dummySalesData);
      setTopSellingProducts(dummyTopSellingProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle chart data structure
  const chartOptions = {
    chart: {
      id: 'sales-chart',
      type: 'line',
    },
    xaxis: {
      categories: salesData ? salesData.months : [], // Dynamically use months from dummy data
    },
  };

  const chartSeries = salesData
    ? [
        {
          name: 'Product Sales',
          data: salesData.sales, // Dynamically use sales data from dummy data
        },
      ]
    : [];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} onNavigate={handleNavigation} />

      {/* Main Content */}
      <div
        className={`flex-1 bg-gray-100 transition-transform duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to My Dashboard</h2>

          {/* Loading State */}
          {loading && <p>Loading...</p>}

          {/* Error Message */}
          {error && <p className="text-red-600">{error}</p>}

          {/* Statistics Boxes with Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white shadow rounded-lg p-4 flex items-center">
              <AttachMoney className="h-8 w-8 text-blue-600 mr-2" />
              <div>
                <h3 className="text-lg font-medium">Total Sales</h3>
                <p className="text-2xl font-bold">{salesData ? salesData.totalSales : 'Loading'}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 flex items-center">
              <ShoppingCart className="h-8 w-8 text-green-600 mr-2" />
              <div>
                <h3 className="text-lg font-medium">Products Sold</h3>
                <p className="text-2xl font-bold">{salesData ? salesData.totalProductsSold : 'Loading'}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 flex items-center">
              <PeopleAlt className="h-8 w-8 text-purple-600 mr-2" />
              <div>
                <h3 className="text-lg font-medium">Active Customers</h3>
                <p className="text-2xl font-bold">{salesData ? salesData.activeCustomers : 'Loading'}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 flex items-center">
              <People className="h-8 w-8 text-yellow-600 mr-2" />
              <div>
                <h3 className="text-lg font-medium">Revenue</h3>
                <p className="text-2xl font-bold">{salesData ? salesData.revenue : 'Loading'}</p>
              </div>
            </div>
          </div>

          {/* Chart and Top Selling Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Product Sales Over Time</h3>
              {salesData ? (
                <Chart options={chartOptions} series={chartSeries} type="line" height={300} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>

            {/* Top Selling Products */}
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Top Selling Products</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2">Product Name</th>
                    <th className="border-b p-2">Units Sold</th>
                    <th className="border-b p-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.unitsSold}</td>
                      <td className="p-2">{product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;