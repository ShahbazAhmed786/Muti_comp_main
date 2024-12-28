import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { TextField, Button, TextareaAutosize, Snackbar, Alert, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Person, Email, Phone, Home, Event } from '@mui/icons-material';

const AddSupervisorForm = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    joiningDate: '',
    sectors: [],
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const availableSectors = ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4']; // Replace with dynamic data if needed

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSectorChange = (e) => {
    setFormData({ ...formData, sectors: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/supervisors', formData); // Replace with your actual API endpoint
      setNotification({ open: true, message: 'Supervisor added successfully!', severity: 'success' });
      setFormData({ name: '', email: '', phone: '', address: '', joiningDate: '', sectors: [] });
    } catch (error) {
      setNotification({ open: true, message: 'Failed to add supervisor. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

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

        <div className="flex justify-center items-start flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Supervisor</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Person fontSize="small" className="mr-2 text-gray-500" />,
                }}
                placeholder="Enter supervisor's name"
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Email fontSize="small" className="mr-2 text-gray-500" />,
                }}
                placeholder="Enter supervisor's email"
                required
              />
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Phone fontSize="small" className="mr-2 text-gray-500" />,
                }}
                placeholder="Enter supervisor's phone number"
                required
              />
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <TextareaAutosize
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  minRows={3}
                  placeholder="Enter supervisor's address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                />
              </div>
              <TextField
                label="Joining Date"
                variant="outlined"
                fullWidth
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Event fontSize="small" className="mr-2 text-gray-500" />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="sector-label">Assign Sector</InputLabel>
                <Select
                  labelId="sector-label"
                  id="sectors"
                  name="sectors"
                  multiple
                  value={formData.sectors}
                  onChange={handleSectorChange}
                >
                  {availableSectors.map((sector) => (
                    <MenuItem key={sector} value={sector}>
                      {sector}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                className="py-3 text-lg font-medium"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddSupervisorForm;
