import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import {
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const AddOrder = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    shop: '',
    salesman: '',
    sector: '',
    date: '',
    time: '',
    status: 'Pending',
    items: [{ name: '', corton: '', pieces: '', price: '', discount: '' }],
  });
  const [stockData, setStockData] = useState([
    { name: 'Item A', stock: 50 },
    { name: 'Item B', stock: 30 },
    { name: 'Item C', stock: 70 },
    { name: 'Item D', stock: 20 },
  ]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = newOrder.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setNewOrder((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setNewOrder((prev) => ({
      ...prev,
      items: [...prev.items, { name: '', corton: '', pieces: '', price: '', discount: '' }],
    }));
  };

  const removeItem = (index) => {
    setNewOrder((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/orders', newOrder);

      alert('Order saved successfully!');
      console.log('Saved Order:', response.data);

      setNewOrder({
        shop: '',
        salesman: '',
        sector: '',
        date: '',
        time: '',
        status: 'Pending',
        items: [{ name: '', corton: '', pieces: '', price: '', discount: '' }],
      });
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order. Please try again.');
    }
  };

  const filteredStock = stockData.filter((stock) =>
    newOrder.items.some((item) => item.name && stock.name.toLowerCase().includes(item.name.toLowerCase()))
  );

  return (
    <div className="flex  h-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={`flex-1 bg-gray-100 transition-transform duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : ''
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />

        <main className="p-8 flex md:flex-row flex-col">
          {/* Order Form */}
          <div className="flex-1 bg-white rounded-lg shadow p-6 mr-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add New Order</h1>

            <form>
              <TextField
                label="Shop"
                fullWidth
                margin="normal"
                name="shop"
                value={newOrder.shop}
                onChange={handleInputChange}
              />
              <TextField
                label="Salesman"
                fullWidth
                margin="normal"
                name="salesman"
                value={newOrder.salesman}
                onChange={handleInputChange}
              />
              <TextField
                label="Sector"
                fullWidth
                margin="normal"
                name="sector"
                value={newOrder.sector}
                onChange={handleInputChange}
              />
              <TextField
                label="Date"
                fullWidth
                margin="normal"
                name="date"
                type="date"
                value={newOrder.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Time"
                fullWidth
                margin="normal"
                name="time"
                type="time"
                value={newOrder.time}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={newOrder.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>

              <h3 className="text-lg font-semibold mt-6 mb-4">Items</h3>
              {newOrder.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <TextField
                    label="Item Name"
                    fullWidth
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  />
                  <TextField
                    label="Corton"
                    type="number"
                    value={item.corton}
                    onChange={(e) => handleItemChange(index, 'corton', e.target.value)}
                  />
                  <TextField
                    label="Pieces"
                    type="number"
                    value={item.pieces}
                    onChange={(e) => handleItemChange(index, 'pieces', e.target.value)}
                  />
                  <TextField
                    label="Price"
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                  />
                  <TextField
                    label="Discount (%)"
                    type="number"
                    value={item.discount}
                    onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                  />
                  <IconButton color="error" onClick={() => removeItem(index)}>
                    <Remove />
                  </IconButton>
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={addItem}
              >
                Add Item
              </Button>

              <div className="mt-6 flex justify-end space-x-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save Order
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => console.log('Cancel Adding Order')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Stock Report */}
          <div className="md:w-1/3 md:mt-0 mt-8 bg-gray-50 rounded-lg shadow p-6">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stock Report</h2>
  
  {/* Table Layout */}
  <div className="overflow-x-auto">
    <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="px-4 py-2 text-sm font-semibold text-gray-600">Product Name</th>
          <th className="px-3 py-2 text-sm font-semibold text-gray-600">Current Qty</th>
        </tr>
      </thead>
      <tbody>
        {filteredStock.map((stock, index) => (
          <tr key={index} className="border-b border-gray-200">
            <td className="px-4 py-2 text-gray-700">{stock.name}</td>
            <td className="px-6 py-2 text-gray-700 font-bold">{stock.stock}</td>
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
};

export default AddOrder;
