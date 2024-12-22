import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { Edit, Delete, Search } from '@mui/icons-material';
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

const InventoryManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Item A', quantity: 10, price: 25.0 },
    { id: 2, name: 'Item B', quantity: 5, price: 15.0 },
    { id: 3, name: 'Item C', quantity: 20, price: 10.0 },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === selectedItem.id ? { ...item, ...selectedItem } : item
      )
    );
    setEditModalOpen(false);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== selectedItem.id)
    );
    setDeleteModalOpen(false);
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`flex-1 bg-gray-100 transition-transform ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold">Inventory Management</h1>
            <TextField
              placeholder="Search inventory..."
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
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <IconButton color="primary" onClick={() => handleEdit(item)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(item)}>
                          <Delete />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* Edit Modal */}
        {isEditModalOpen && selectedItem && (
          <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                name="name"
                value={selectedItem.name}
                onChange={handleEditChange}
              />
              <TextField
                label="Quantity"
                fullWidth
                margin="normal"
                name="quantity"
                type="number"
                value={selectedItem.quantity}
                onChange={handleEditChange}
              />
              <TextField
                label="Price"
                fullWidth
                margin="normal"
                name="price"
                type="number"
                value={selectedItem.price}
                onChange={handleEditChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
              <Button onClick={() => setEditModalOpen(false)} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && selectedItem && (
          <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete {selectedItem.name}?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={confirmDelete} color="error">
                Delete
              </Button>
              <Button onClick={() => setDeleteModalOpen(false)} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;
