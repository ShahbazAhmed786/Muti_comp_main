import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { Edit, Delete, Search, Visibility, Print } from '@mui/icons-material';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  IconButton,
  DialogContentText,
} from '@mui/material';

const OrderManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);

  // Dummy data for orders
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
        { name: 'Phone', carton: 100, pieces: 2, price: 50000, discount: 10 },
        { name: 'Laptop', carton: 200, pieces: 1, price: 120000, discount: 5 },
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
        { name: 'T-Shirt', carton: 50, pieces: 3, price: 2000, discount: 5 },
        { name: 'Jeans', carton: 120, pieces: 2, price: 4000, discount: 10 },
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
        { name: 'Milk', carton: 20, pieces: 5, price: 150, discount: 0 },
        { name: 'Bread', carton: 30, pieces: 2, price: 100, discount: 5 },
      ],
    },
  ];

  useEffect(() => {
    setOrders(dummyOrders);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredOrders = orders.filter(
    (order) =>
      order.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.salesman.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (order) => {
    setSelectedOrder({ ...order });
    setEditModalOpen(true);
  };

  const handleEditChange = (e, index) => {
    const { name, value } = e.target;

    if (name.includes('item')) {
      const updatedItems = [...selectedOrder.items];
      updatedItems[index][name] = value;
      setSelectedOrder((prev) => ({ ...prev, items: updatedItems }));
    } else {
      setSelectedOrder((prev) => ({ ...prev, [name]: value }));
    }
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

  const handlePrintInvoice = (order) => {
    const invoiceContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .invoice-container {
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              background-color: #f9f9f9;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              font-size: 36px;
              margin: 0;
            }
            .header p {
              font-size: 14px;
              margin: 5px 0;
            }
            .invoice-details {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .invoice-details .info {
              width: 45%;
            }
            .invoice-details .info p {
              margin: 5px 0;
              font-size: 14px;
            }
            .invoice-details .info .title {
              font-weight: bold;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            table th, table td {
              padding: 8px;
              border: 1px solid #ddd;
              text-align: left;
            }
            table th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            table td {
              font-size: 14px;
            }
            .total {
              text-align: right;
              font-size: 16px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <h1>Invoice</h1>
              <p><strong>Company Name</strong></p>
              <p>123 Business Street, City, Country</p>
              <p>Email: info@company.com | Phone: (123) 456-7890</p>
            </div>
  
            <div class="invoice-details">
              <div class="info">
                <p class="title">Shop:</p>
                <p>${order.shop}</p>
                <p class="title">Salesman:</p>
                <p>${order.salesman}</p>
                <p class="title">Sector:</p>
                <p>${order.sector}</p>
              </div>
  
              <div class="info">
                <p class="title">Invoice Date:</p>
                <p>${order.date}</p>
                <p class="title">Time:</p>
                <p>${order.time}</p>
                <p class="title">Status:</p>
                <p>${order.status}</p>
              </div>
            </div>
  
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cotton</th>
                  <th>Pieces</th>
                  <th>Price (₨)</th>
                  <th>Discount (%)</th>
                  <th>Total (₨)</th>
                </tr>
              </thead>
              <tbody>
                ${order.items
                  .map(
                    (item) =>
                      `<tr>
                        <td>${item.name}</td>
                        <td>${item.cotton}</td>
                        <td>${item.pieces}</td>
                        <td>${item.price.toLocaleString()}</td>
                        <td>${item.discount}</td>
                        <td>${(
                          item.price * item.pieces * (1 - item.discount / 100)
                        ).toLocaleString()}</td>
                      </tr>`
                  )
                  .join('')}
              </tbody>
            </table>
  
            <div class="total">
              <p>Total: ${order.items.reduce(
                (total, item) =>
                  total +
                  item.price * item.pieces * (1 - item.discount / 100),
                0
              ).toLocaleString()}</p>
            </div>
  
            <div class="footer">
              <p>Thank you for doing business with us!</p>
            </div>
          </div>
        </body>
      </html>
    `;
  
    const printWindow = window.open('', '', 'width=600,height=800');
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
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
                        <IconButton color="default" onClick={() => handlePrintInvoice(order)}>
                          <Print />
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

        {/* Edit Modal */}
        {isEditModalOpen && selectedOrder && (
          <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogContent>
              <TextField
                label="Shop"
                name="shop"
                value={selectedOrder.shop}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Salesman"
                name="salesman"
                value={selectedOrder.salesman}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Sector"
                name="sector"
                value={selectedOrder.sector}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={selectedOrder.date}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Time"
                name="time"
                type="time"
                value={selectedOrder.time}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Status"
                name="status"
                value={selectedOrder.status}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />

              <h3 className="mt-4">Items</h3>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex space-x-4 mb-4">
                  <TextField
                    label="Item Name"
                    name={`item${index}-name`}
                    value={item.name}
                    onChange={(e) => handleEditChange(e, index)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Cotton"
                    name={`item${index}-cotton`}
                    value={item.carton}
                    onChange={(e) => handleEditChange(e, index)}
                    fullWidth
                    margin="normal"
                    type="number"
                  />
                  <TextField
                    label="Pieces"
                    name={`item${index}-pieces`}
                    value={item.pieces}
                    onChange={(e) => handleEditChange(e, index)}
                    fullWidth
                    margin="normal"
                    type="number"
                  />
                  <TextField
                    label="Price (₨)"
                    name={`item${index}-price`}
                    value={item.price}
                    onChange={(e) => handleEditChange(e, index)}
                    fullWidth
                    margin="normal"
                    type="number"
                  />
                  <TextField
                    label="Discount (%)"
                    name={`item${index}-discount`}
                    value={item.discount}
                    onChange={(e) => handleEditChange(e, index)}
                    fullWidth
                    margin="normal"
                    type="number"
                  />
                </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditModalOpen(false)} color="default">
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedOrder && (
          <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the order for {selectedOrder.shop}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteModalOpen(false)} color="default">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* View Order Modal */}
        {isViewModalOpen && selectedOrder && (
          <Dialog open={isViewModalOpen} onClose={() => setViewModalOpen(false)}>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
              <div className="space-y-4">
                <p><strong>Shop:</strong> {selectedOrder.shop}</p>
                <p><strong>Salesman:</strong> {selectedOrder.salesman}</p>
                <p><strong>Sector:</strong> {selectedOrder.sector}</p>
                <p><strong>Date:</strong> {selectedOrder.date}</p>
                <p><strong>Time:</strong> {selectedOrder.time}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>

                <h3 className="mt-4">Items</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index}>
                    <p><strong>Item:</strong> {item.name}</p>
                    <p><strong>Carton:</strong> {item.carton}</p>
                    <p><strong>Pieces:</strong> {item.pieces}</p>
                    <p><strong>Price (₨):</strong> {item.price}</p>
                    <p><strong>Discount (%):</strong> {item.discount}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewModalOpen(false)} color="default">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
