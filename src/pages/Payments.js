import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import { Search, AttachMoney, Cancel } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PaymentManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    shopId: '',
    amount: '',
    method: '',
    note: '',
  });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Dummy data for shops and payment logs
  const dummyShops = [
    { id: 1, name: 'Shop A', outstanding: 5000, balance: 10000 },
    { id: 2, name: 'Shop B', outstanding: 2000, balance: 6000 },
    { id: 3, name: 'Shop C', outstanding: 1500, balance: 4500 },
    { id: 4, name: 'Shop D', outstanding: 3000, balance: 7000 },
  ];

  const dummyPaymentLogs = [
    {
      id: 1,
      shopName: 'Shop A',
      amount: 1000,
      method: 'Cash',
      note: 'Monthly payment',
      date: '2024-12-01 10:00:00',
    },
    {
      id: 2,
      shopName: 'Shop B',
      amount: 500,
      method: 'Cheque',
      note: 'Payment for goods',
      date: '2024-12-05 12:00:00',
    },
    {
      id: 3,
      shopName: 'Shop C',
      amount: 700,
      method: 'Credit',
      note: 'Late payment',
      date: '2024-12-10 14:00:00',
    },
  ];

  useEffect(() => {
    // Replace API calls with dummy data
    setShops(dummyShops);
    setPaymentLogs(dummyPaymentLogs);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openPaymentModal = (shopId) => {
    setPaymentDetails({ shopId, amount: '', method: '', note: '' });
    setModalOpen(true);
  };

  const recordPayment = () => {
    const { shopId, amount, method, note } = paymentDetails;
    const parsedAmount = parseFloat(amount);

    if (!shopId || !parsedAmount || !method) {
      alert('Please fill in all fields.');
      return;
    }

    // Update shops and payment logs with dummy data (simulating a successful payment)
    setShops((prev) =>
      prev.map((shop) =>
        shop.id === parseInt(shopId)
          ? { ...shop, outstanding: Math.max(shop.outstanding - parsedAmount, 0) }
          : shop
      )
    );

    setPaymentLogs((prev) => [
      ...prev,
      {
        id: paymentLogs.length + 1,
        shopName: shops.find((shop) => shop.id === parseInt(shopId)).name,
        amount: parsedAmount,
        method,
        note,
        date: new Date().toLocaleString(),
      },
    ]);

    alert('Payment recorded successfully!');
    setModalOpen(false);
  };

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeSidebar = () => setSidebarOpen(false);

  const handleNavigation = (href) => {
    console.log(`Navigating to: ${href}`);
    closeSidebar();
  };

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} onNavigate={handleNavigation} />

      <div
        className={`flex-1 bg-gray-100 transition-transform duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : ''
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Payment Management</h1>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search by shop name..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <Search className="text-gray-500" />
                  </IconButton>
                ),
              }}
            />
          </div>

          {/* Outstanding Balances */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Outstanding Balances</h2>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Shop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Outstanding Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShops.map((shop) => (
                  <tr key={shop.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{shop.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Rs.{shop.outstanding}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Rs.{shop.balance}</td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<AttachMoney />}
                        onClick={() => openPaymentModal(shop.id)}
                      >
                        Record Payment
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Payment Logs */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Logs</h2>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Shop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{log.shopName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Rs.{log.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{log.method}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{log.note}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Payment Modal */}
          <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                variant="outlined"
                label="Amount"
                type="number"
                name="amount"
                value={paymentDetails.amount}
                onChange={handleFormChange}
                className="mb-4"
              />
              <FormControl fullWidth variant="outlined" className="mb-4">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="method"
                  value={paymentDetails.method}
                  onChange={handleFormChange}
                  label="Payment Method"
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="cheque">Cheque</MenuItem>
                  <MenuItem value="credit">Credit</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="outlined"
                label="Note"
                name="note"
                value={paymentDetails.note}
                onChange={handleFormChange}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={recordPayment}>
                Record Payment
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setModalOpen(false)}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default PaymentManagement;
