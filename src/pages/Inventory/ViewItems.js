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
    {
      id: 1,
      name: 'Item A',
      corton: 5,
      pieces: 50,
      purchasePrice: 200.0,
      salePrice: 250.0,
      supplier: 'Supplier A',
      purchaseDate: '2024-01-01',
    },
    {
      id: 2,
      name: 'Item B',
      corton: 10,
      pieces: 100,
      purchasePrice: 150.0,
      salePrice: 180.0,
      supplier: 'Supplier B',
      purchaseDate: '2024-01-05',
    },
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
                  <th className="px-6 py-3 text-left">Corton</th>
                  <th className="px-6 py-3 text-left">Pieces</th>
                  <th className="px-6 py-3 text-left">Purchase Price</th>
                  <th className="px-6 py-3 text-left">Sale Price</th>
                  <th className="px-6 py-3 text-left">Supplier</th>
                  <th className="px-6 py-3 text-left">Purchase Date</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.corton}</td>
                      <td className="px-6 py-4">{item.pieces}</td>
                      <td className="px-6 py-4">Rs {item.purchasePrice.toFixed(2)}</td>
                      <td className="px-6 py-4">Rs {item.salePrice.toFixed(2)}</td>
                      <td className="px-6 py-4">{item.supplier}</td>
                      <td className="px-6 py-4">{item.purchaseDate}</td>
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
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
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
                label="Corton"
                fullWidth
                margin="normal"
                name="corton"
                type="number"
                value={selectedItem.corton}
                onChange={handleEditChange}
              />
              <TextField
                label="Pieces"
                fullWidth
                margin="normal"
                name="pieces"
                type="number"
                value={selectedItem.pieces}
                onChange={handleEditChange}
              />
              <TextField
                label="Purchase Price"
                fullWidth
                margin="normal"
                name="purchasePrice"
                type="number"
                value={selectedItem.purchasePrice}
                onChange={handleEditChange}
              />
              <TextField
                label="Sale Price"
                fullWidth
                margin="normal"
                name="salePrice"
                type="number"
                value={selectedItem.salePrice}
                onChange={handleEditChange}
              />
              <TextField
                label="Supplier"
                fullWidth
                margin="normal"
                name="supplier"
                value={selectedItem.supplier}
                onChange={handleEditChange}
              />
              <TextField
                label="Purchase Date"
                fullWidth
                margin="normal"
                name="purchaseDate"
                type="date"
                value={selectedItem.purchaseDate}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
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
