import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { Edit, Delete, Search, Visibility } from '@mui/icons-material';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  IconButton,
} from '@mui/material';

const OrderManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);

  // Dummy data
  const dummyOrders = [
    {
      id: 1,
      shop: 'Shop A',
      salesman: 'John Doe',
      sector: 'Electronics',
      date: '2024-12-20',
      time: '14:30',
      status: 'Delivered',
      items: [
        { name: 'Phone', quantity: 2, price: 500 },
        { name: 'Laptop', quantity: 1, price: 1200 },
      ],
    },
    {
      id: 2,
      shop: 'Shop B',
      salesman: 'Jane Smith',
      sector: 'Clothing',
      date: '2024-12-19',
      time: '10:00',
      status: 'Pending',
      items: [
        { name: 'T-Shirt', quantity: 3, price: 20 },
        { name: 'Jeans', quantity: 2, price: 40 },
      ],
    },
    {
      id: 3,
      shop: 'Shop C',
      salesman: 'Mike Johnson',
      sector: 'Grocery',
      date: '2024-12-18',
      time: '16:15',
      status: 'Cancelled',
      items: [
        { name: 'Milk', quantity: 5, price: 3 },
        { name: 'Bread', quantity: 2, price: 2 },
      ],
    },
  ];

  useEffect(() => {
    // Simulating API call with dummy data
    setOrders(dummyOrders);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.salesman.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setOrders((prev) =>
      prev.map((order) => (order.id === selectedOrder.id ? selectedOrder : order))
    );
    setEditModalOpen(false);
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id));
    setDeleteModalOpen(false);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewModalOpen(true);
  };

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`flex-1 bg-gray-100 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold">Order Management</h1>
            <TextField
              placeholder="Search by shop or salesman..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3">Shop</th>
                  <th className="px-6 py-3">Salesman</th>
                  <th className="px-6 py-3">Sector</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4">{order.shop}</td>
                      <td className="px-6 py-4">{order.salesman}</td>
                      <td className="px-6 py-4">{order.sector}</td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4">{order.time}</td>
                      <td className="px-6 py-4">{order.status}</td>
                      <td className="px-6 py-4 text-center">
                        <IconButton color="primary" onClick={() => handleView(order)}>
                          <Visibility />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleEdit(order)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(order)}>
                          <Delete />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
        {/* Modals */}
        {/* View Modal */}
        {isViewModalOpen && selectedOrder && (
          <Dialog open={isViewModalOpen} onClose={() => setViewModalOpen(false)}>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
              <p><strong>Shop:</strong> {selectedOrder.shop}</p>
              <p><strong>Salesman:</strong> {selectedOrder.salesman}</p>
              <p><strong>Sector:</strong> {selectedOrder.sector}</p>
              <p><strong>Date:</strong> {selectedOrder.date}</p>
              <p><strong>Time:</strong> {selectedOrder.time}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>{item.name} - {item.quantity} x ${item.price}</li>
                ))}
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewModalOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
        {/* Edit Modal */}
        {isEditModalOpen && selectedOrder && (
          <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogContent>
              <TextField
                label="Shop"
                fullWidth
                margin="normal"
                name="shop"
                value={selectedOrder.shop}
                onChange={handleEditChange}
              />
              <TextField
                label="Salesman"
                fullWidth
                margin="normal"
                name="salesman"
                value={selectedOrder.salesman}
                onChange={handleEditChange}
              />
              {/* Add fields for other properties as needed */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSaveEdit}>Save</Button>
              <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        )}
        {/* Delete Modal */}
        {isDeleteModalOpen && selectedOrder && (
          <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete this order?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={confirmDelete} color="error">
                Delete
              </Button>
              <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
