
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import bgimg from "./bg/background1.jpg";
import bg from "./bg/Interactive.svg";
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    
    const [remember, setRemember] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8081/Api/login', formData);
          const data = response.data; // Decoded JSON response from the server
      
          if (data.status === "Success") {
            // Save the data in a variable or state if needed
            // For example, if using React state:
            // setData(data);
            navigate('/admin');
          } else {
            alert(data.Error); // Assuming the server sends an error message in the 'message' field
          }
        } catch (error) {
          console.error('Error during login:', error);
          // Handle error here, for example, show an error message to the user
        }
      };
      
    

    const handleRegisterRestaurant = () => {
        // Navigate to the restaurant registration page
        navigate('/restaurant-registration');
    };

    const handleAddRestaurant = () => {
        // Add logic to handle adding a restaurant here
        // You can navigate to the restaurant add page or show a modal, etc.
        // For example:
        alert("Add Restaurant button clicked");
    };

    return (
        <>
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
                        height: '80%',
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
                                    height: '63vh',
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
                                        <h1>Login</h1>
                                        <h4>Admin Panel</h4>
                                    </Box>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                            <form onSubmit={handleSubmit}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id='email'
                                                    label='Email Address'
                                                    name='email'
                                                    autoComplete='email'
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    error={Boolean(errors.email)}
                                                    helperText={errors.email}
                                                    sx={{
                                                        mt: "10px",
                                                        color: "white",
                                                    }}
                                                />
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id='password'
                                                    label='Password'
                                                    name='password'
                                                    type='password'
                                                    autoComplete='new-password'
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    error={Boolean(errors.password)}
                                                    helperText={errors.password}
                                                    sx={{
                                                        mt: "10px",
                                                        color: "white",
                                                    }}
                                                />
                                                <FormControlLabel
                                                    sx={{ mt: "10px", color: "black" }}
                                                    control={<Checkbox checked={remember} onChange={() => setRemember(!remember)} />}
                                                    label="Remember me"
                                                />
                                                <Button
                                                    type='submit'
                                                    variant='contained'
                                                    fullWidth
                                                    size='large'
                                                    sx={{
                                                        mt: "10px",
                                                        borderRadius: 28,
                                                        color: "white",
                                                        backgroundColor: "black",
                                                        '&:hover': {
                                                            backgroundColor: 'black',
                                                        },
                                                    }}
                                                    
                                                >
                                                    Login
                                                </Button>
                                                <a
                                                    href="/registration"
                                                    style={{
                                                        color: 'black',
                                                        textDecoration: 'underline',
                                                        marginTop: '10px',
                                                        display: 'block',
                                                    }}
                                                >
                                                    Don't have an account? Register here.
                                                </a>
                                                <Button
                                                    variant="text"
                                                    fullWidth
                                                    sx={{
                                                        color: "white",
                                                        marginTop: "10px",
                                                        backgroundColor:'navy',
                                                        '&:hover': {
                                                            
                                                            backgroundColor: 'navy',
                                                        },
                                                    }}
                                                    
                                                    // onClick={handleRegisterRestaurant}  onClick={() =>
                                                    //     navigate('/Addrestaurants')}
                                                    onClick={handleRegisterRestaurant =>
                                                        navigate('/Addrestaurants')}
                                                >
                                                    Register a Restaurant
                                                </Button>
                                                
                                            </form>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    )
}
