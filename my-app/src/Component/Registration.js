
import React, { useState } from 'react';
import './Registration.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import bgimg from './bg/background1.jpg';
import bg from './bg/Interactive.svg';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// Inside your component function



export default function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    restaurantName: '',
    userName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    restaurantName: '',
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation logic remains the same

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validate the form fields
    if (!formData.restaurantName || !formData.userName || !formData.email || !formData.password) {
      // If any of the required fields are empty, show an alert to the user
      alert('Please fill out all fields.');
      return;
    }
    // Validate the form
    if (validateForm()) {
      try {
        // Prepare the data to send to the backend
        const registrationData = {
          restaurant_name: formData.restaurantName,
          user_name: formData.userName,
          email: formData.email,
          password: formData.password,
        };

        // Make a POST request to your backend registration API
        axios
          .post('http://localhost:8081/Api/registration', registrationData)
          .then((res) => {
            if (res.data.status === 'success') {
              console.log(res)
              navigate('/');
            } else {
              // Check for specific error message indicating duplicate entry
              if (res.data.error === 'Data already exists') {
                alert('Data already exists. Please use different information.');
                console.log(res)
              } else {
                // Handle other errors here silently (without showing an alert)
                console.error('Registration failed:', res.data.error);
                console.log(res)
              }
            }
          })
          .catch((err) => {
            // Handle network or other errors here silently (without showing an alert)
            console.error('Registration error:', err);
          });

      } catch (error) {
        // Handle unexpected errors here silently (without showing an alert)
        console.error('Registration error:', error);
      }
    }


  };
  return (
    <div
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        opacity: 1.0,
      }}
    >
      <Box
        sx={{
          width: '75%',
          height: '70%',
          backgroundColor: 'background.paper',
          position: 'absolute',
          top: '10%',
          left: '10%',
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                marginTop: '40px',
                marginLeft: '15px',
                marginRight: '15px',
                height: '60vh',
                width: '73vh',
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundSize: 'cover',
                height: '70vh',
                backgroundColor: 'navy blue',
              }}
            >
              <Container>
                <Box
                  sx={{
                    position: 'relative',
                    top: '50%',
                    textAlign: 'center',
                  }}
                >
                  <h1>Registration</h1>
                </Box>
                <Grid container spacing={1}>
                  <Grid item xs={12} sx={{ ml: '3em', mr: '3em' }}>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Restaurant Name</label>
                        <input
                          type="text"
                          name="restaurantName"
                          value={formData.restaurantName}
                          onChange={handleChange}
                        />
                        {errors.restaurantName && (
                          <p className="error">{errors.restaurantName}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>User Name</label>
                        <input
                          type="text"
                          name="userName"
                          value={formData.userName}
                          onChange={handleChange}
                        />
                        {errors.userName && (
                          <p className="error">{errors.userName}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <p className="error">{errors.email}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <div className="password-input">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onClick={togglePasswordVisibility}
                            autoComplete="new-password"
                          />
                        </div>
                        {errors.password && (
                          <p className="error">{errors.password}</p>
                        )}
                      </div>
                      <button type="submit">Register</button>
                    </form>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}





