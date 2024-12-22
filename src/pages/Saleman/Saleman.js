import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { Edit, Delete, Visibility, Search } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';

// Dummy Data for Salesmen
const dummySalesmen = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
];

const SalesmanManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [salesmen, setSalesmen] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSalesman, setSelectedSalesman] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fetch salesmen or use dummy data
  useEffect(() => {
    const fetchSalesmen = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setSalesmen(dummySalesmen); // Use dummy data
      } catch (error) {
        console.error('Error fetching salesmen. Using dummy data.', error);
        setSalesmen(dummySalesmen);
      }
    };
    fetchSalesmen();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleEditSalesman = () => {
    setSalesmen(
      salesmen.map((s) => (s.id === selectedSalesman.id ? selectedSalesman : s))
    );
    setEditModalOpen(false);
  };

  const handleDeleteSalesman = () => {
    setSalesmen(salesmen.filter((s) => s.id !== selectedSalesman.id));
    setDeleteModalOpen(false);
  };

  const filteredSalesmen = salesmen.filter((salesman) =>
    salesman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salesman.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={`flex-1 bg-gray-100 transition-transform duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Salesman Management</h1>
            <TextField
              placeholder="Search Salesmen..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSalesmen.length > 0 ? (
                  filteredSalesmen.map((salesman) => (
                    <tr key={salesman.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{salesman.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{salesman.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{salesman.phone}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-4">
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setSelectedSalesman(salesman);
                              setViewModalOpen(true);
                            }}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => {
                              setSelectedSalesman(salesman);
                              setEditModalOpen(true);
                            }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setSelectedSalesman(salesman);
                              setDeleteModalOpen(true);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* View Modal */}
        <Dialog open={isViewModalOpen} onClose={() => setViewModalOpen(false)}>
          <DialogTitle>Salesman Details</DialogTitle>
          <DialogContent>
            {selectedSalesman && (
              <div>
                <p><strong>Name:</strong> {selectedSalesman.name}</p>
                <p><strong>Email:</strong> {selectedSalesman.email}</p>
                <p><strong>Phone:</strong> {selectedSalesman.phone}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewModalOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <DialogTitle>Edit Salesman</DialogTitle>
          <DialogContent>
            {selectedSalesman && (
              <form className="space-y-4">
                <TextField
                  label="Name"
                  fullWidth
                  variant="outlined"
                  value={selectedSalesman.name}
                  onChange={(e) =>
                    setSelectedSalesman({ ...selectedSalesman, name: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={selectedSalesman.email}
                  onChange={(e) =>
                    setSelectedSalesman({ ...selectedSalesman, email: e.target.value })
                  }
                />
                <TextField
                  label="Phone"
                  fullWidth
                  variant="outlined"
                  value={selectedSalesman.phone}
                  onChange={(e) =>
                    setSelectedSalesman({ ...selectedSalesman, phone: e.target.value })
                  }
                />
              </form>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditSalesman} color="primary">
              Save
            </Button>
            <Button onClick={() => setEditModalOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            {selectedSalesman && (
              <p>
                Are you sure you want to delete <strong>{selectedSalesman.name}</strong>?
              </p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteSalesman} color="error">
              Delete
            </Button>
            <Button onClick={() => setDeleteModalOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default SalesmanManagement;
