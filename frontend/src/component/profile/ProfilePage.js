import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Avatar,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../home/components/AppAppBar';

const ProfilePage = (props) => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
        withCredentials: true,
      });
      setProfileData(response.data);
      setEditedData(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('You must be logged in to view this page.');
        // Optionally redirect to login page
        // window.location.href = '/signin';
      } else {
        setError('Failed to fetch profile data.');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    // Reset editedData to current profileData when exiting edit mode without saving
    if (editMode) {
      setEditedData(profileData);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleImageChange = (event) => {
    setEditedData(prevData => ({
        ...prevData,
        image: event.target.files[0]
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    
    // We only append fields that have changed to avoid sending unnecessary data.
    Object.keys(editedData).forEach(key => {
        // If the field is the image and it's a file, it has been changed.
        if (key === 'image' && editedData.image instanceof File) {
            formData.append(key, editedData.image, editedData.image.name);
        } 
        // For other fields, we check if they are different from the original profile data.
        else if (profileData[key] !== editedData[key] && key !== 'image') {
            formData.append(key, editedData[key]);
        }
    });

    // If no data has changed, we can just exit edit mode.
    if (formData.entries().next().done) {
        setEditMode(false);
        return;
    }


    try {
        const response = await axios.put('http://127.0.0.1:8000/api/user/profile/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        setProfileData(response.data);
        setEditMode(false);
        setSuccess('Profile updated successfully!');
        setError('');
    } catch (err) {
        setError('Failed to update profile.');
        setSuccess('');
        console.error(err.response || err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AppTheme {...props}>
      <AppAppBar />
      <Container maxWidth="md" sx={{ mt: 12, py: 4 }}>
        <Card raised sx={{ p: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
              User Profile
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            
            {profileData ? (
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4} textAlign="center">
                  <Avatar
                    src={`http://127.0.0.1:8000${profileData.image}`}
                    sx={{ width: 150, height: 150, margin: 'auto' }}
                  />
                   {editMode && (
                        <Button variant="contained" component="label" sx={{ mt: 2 }}>
                            Upload Image
                            <input type="file" hidden name="image" onChange={handleImageChange} />
                        </Button>
                    )}
                </Grid>
                <Grid item xs={12} md={8}>
                  {editMode ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Username" name="username" value={editedData.username || ''} onChange={handleChange} disabled />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Phone" name="phone" value={editedData.phone || ''} onChange={handleChange} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Aadhar Number" name="aadhar_number" value={editedData.aadhar_number || ''} onChange={handleChange} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Location" name="location" value={editedData.location || ''} onChange={handleChange} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Birth Date" name="birth_date" type="date" value={editedData.birth_date || ''} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                      </Grid>
                    </Grid>
                  ) : (
                    <Box>
                      <Typography variant="h6"><strong>Username:</strong> {profileData.username}</Typography>
                      <Typography variant="body1"><strong>Phone:</strong> {profileData.phone || 'N/A'}</Typography>
                      <Typography variant="body1"><strong>Aadhar Number:</strong> {profileData.aadhar_number || 'N/A'}</Typography>
                      <Typography variant="body1"><strong>Location:</strong> {profileData.location || 'N/A'}</Typography>
                      <Typography variant="body1"><strong>Birth Date:</strong> {profileData.birth_date || 'N/A'}</Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                  {editMode ? (
                    <>
                      <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                      </Button>
                      <Button variant="outlined" onClick={handleEditToggle}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" onClick={handleEditToggle}>
                      Edit Profile
                    </Button>
                  )}
                </Grid>
              </Grid>
            ) : !error && (
              <Typography textAlign="center">No profile data found.</Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </AppTheme>
  );
};

export default ProfilePage;
