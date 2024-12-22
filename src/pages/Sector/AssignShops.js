import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  Box,
  InputAdornment,
} from '@mui/material';
import { Assignment, Person, Store, LocationCity } from '@mui/icons-material';

const AssignBySalesman = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Dummy data
  const salesmen = ['John Doe', 'Jane Smith', 'Emily Davis', 'Michael Brown'];
  const shops = ['Shop 1', 'Shop 2', 'Shop 3', 'Shop 4', 'Shop 5'];
  const sectors = ['Sector A', 'Sector B', 'Sector C', 'Sector D'];

  const [selectedSalesman, setSelectedSalesman] = useState('');
  const [assignedShops, setAssignedShops] = useState([]);
  const [assignedSectors, setAssignedSectors] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleSalesmanChange = (e) => {
    setSelectedSalesman(e.target.value);
    setAssignedShops([]);
    setAssignedSectors([]);
  };

  const handleAssignChange = (e, type) => {
    const { value } = e.target;
    if (type === 'shops') setAssignedShops(value);
    if (type === 'sectors') setAssignedSectors(value);
  };

  const handleSubmit = () => {
    if (!selectedSalesman) {
      alert('Please select a salesman.');
      return;
    }

    console.log('Salesman:', selectedSalesman);
    console.log('Assigned Shops:', assignedShops);
    console.log('Assigned Sectors:', assignedSectors);
    alert(
      `Assigned ${assignedShops.length} shop(s) and ${assignedSectors.length} sector(s) to ${selectedSalesman}`
    );
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
        <main className="p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Assign Shops and Sectors by Salesman
          </h1>
          <Box className="bg-white rounded-lg shadow p-6 w-full max-w-lg mx-auto">
            <FormControl fullWidth margin="normal">
              <InputLabel id="select-salesman-label">Select Salesman</InputLabel>
              <Select
                labelId="select-salesman-label"
                value={selectedSalesman}
                onChange={handleSalesmanChange}
                label="Select Salesman"
                startAdornment={
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {salesmen.map((salesman) => (
                  <MenuItem key={salesman} value={salesman}>
                    {salesman}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="assign-shops-label">Assign Shops</InputLabel>
              <Select
                labelId="assign-shops-label"
                multiple
                value={assignedShops}
                onChange={(e) => handleAssignChange(e, 'shops')}
                renderValue={(selected) => selected.join(', ')}
                startAdornment={
                  <InputAdornment position="start">
                    <Store />
                  </InputAdornment>
                }
              >
                {shops.map((shop) => (
                  <MenuItem key={shop} value={shop}>
                    <Checkbox checked={assignedShops.includes(shop)} />
                    <ListItemText primary={shop} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="assign-sectors-label">Assign Sectors</InputLabel>
              <Select
                labelId="assign-sectors-label"
                multiple
                value={assignedSectors}
                onChange={(e) => handleAssignChange(e, 'sectors')}
                renderValue={(selected) => selected.join(', ')}
                startAdornment={
                  <InputAdornment position="start">
                    <LocationCity />
                  </InputAdornment>
                }
              >
                {sectors.map((sector) => (
                  <MenuItem key={sector} value={sector}>
                    <Checkbox checked={assignedSectors.includes(sector)} />
                    <ListItemText primary={sector} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box className="flex justify-end mt-4">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Assignment />}
                onClick={handleSubmit}
              >
                Assign
              </Button>
            </Box>
          </Box>
        </main>
      </div>
    </div>
  );
};

export default AssignBySalesman;
