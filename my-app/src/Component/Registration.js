// import * as React from 'react';
// import './Registration.css';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import bgimg from "./bg/background1.jpg";
// import bg from "./bg/Interactive.svg";
// import { Container } from '@mui/material';
// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Registration() {
//   const [formData, setFormData] = useState({
//     RestaurantName: '',
//     FirstName: '',
//     email: '',
//     password: '',

//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleMouseDown = () => {
//     setShowPassword(true);
//   };

//   const handleMouseUp = () => {
//     setShowPassword(false);
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim()) {
//       newErrors.firstName = 'Restaurant name is required';
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = 'User name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!isValidEmail(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters long';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isValidEmail = (email) => {
//     return email.includes('@');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       axios.post('http://localhost:8081/registration', formData)
//         .then(res => {
//           navigate('/');
//         })
//         .catch(err => console.log(err));
//     }
//   }

//   const navigate = useNavigate();

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${bgimg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         height: '100vh',
//         opacity: 1.0,
//       }}
//     >
//       <Box
//         sx={{
//           width: '75%',
//           height: '80%',
//           backgroundColor: 'background.paper',
//           position: 'absolute',
//           top: '10%',
//           left: '10%',
//         }}
//       >
//         <Grid container>
//           <Grid item xs={12} sm={12} lg={6}>
//             <Box
//               style={{
//                 backgroundImage: `url(${bg})`,
//                 backgroundSize: 'cover',
//                 marginTop: '40px',
//                 marginLeft: '15px',
//                 marginRight: '15px',
//                 height: '63vh',
//               }}
//             ></Box>
//           </Grid>
//           <Grid item xs={12} sm={12} lg={6}>
//             <Box
//               style={{
//                 backgroundSize: 'cover',
//                 height: '70vh',
//                 backgroundColor: 'navy blue',
//               }}
//             >
//               <Container>
//                 <Box
//                   sx={{
//                     position: 'relative',
//                     top: '50%',
//                     textAlign: 'center',
//                   }}
//                 >
//                   <h1>Registration</h1>
//                 </Box>
//                 <Grid container spacing={1}>
//                   <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
//                     <form onSubmit={handleSubmit}>
//                       <div className="form-group">
//                         <label>Restaurant Name</label>
//                         <input
//                           type="text"
//                           name="restaurantname"
//                           value={formData.name="restaurantname"
//                         }
//                           onChange={handleChange}
//                         />
//                         {errors.firstName && <p className="error">{errors.restaurantname}</p>}
//                       </div>
//                       <div className="form-group">
//                         <label>User Name</label>
//                         <input
//                           type="text"
//                           name="userName"
//                           value={formData.userName}
//                           onChange={handleChange}
//                         />
//                         {errors.lastName && <p className="error">{errors.userName}</p>}
//                       </div>
//                       <div className="form-group">
//                         <label>Email</label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                         />
//                         {errors.email && <p className="error">{errors.email}</p>}
//                       </div>
//                       <div className="form-group">
//                         <label>Password</label>
//                         <div className="password-input">
//                           <input
//                             type={showPassword ? 'text' : 'password'}
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             onMouseDown={handleMouseDown}
//                             onMouseUp={handleMouseUp}
//                             onMouseOut={handleMouseUp}
//                           />
//                         </div>
//                         {errors.password && <p className="error">{errors.password}</p>}
//                       </div>

//                       <button type="submit">Register</button>
//                     </form>
//                   </Grid>
//                 </Grid>
//               </Container>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </div>
//   );
// }

import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import { register } from "../services/auth_services";
import "./Registration.css";
import bg from "./bg/Interactive.svg";
import bgimg from "./bg/background1.jpg";

export default function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "", // Updated property name
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      // Updated property name
      newErrors.userName = "User name is required"; // Updated property name
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    return email.includes("@");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      const { data, error } = await register({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        console.log(error);
        setIsLoading(false);
        if (error.message === "User already registered") {
          toast.error("User already registered");
        } else {
          toast.error("Failed to register");
        }
      } else {
        if (data.user != null) {
          console.log(data);
          await supabase.from("admins").insert({
            id: data.user.id,
            email: data.user.email,
            name: formData.userName.trim(),
          });
          setIsLoading(false);
          navigate("/addRestaurant", { state: { id: data.user.id } });
        }
      }
    }
  };

  const navigate = useNavigate();

  return (
    // ... rest of your component code
    <div
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        opacity: 1.0,
      }}
    >
      <Box
        sx={{
          width: "75%",
          height: "80%",
          backgroundColor: "background.paper",
          position: "absolute",
          top: "10%",
          left: "10%",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                marginTop: "40px",
                marginLeft: "15px",
                marginRight: "15px",
                height: "63vh",
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundSize: "cover",
                height: "70vh",
                backgroundColor: "navy blue",
              }}
            >
              <Container>
                <Box
                  sx={{
                    position: "relative",
                    top: "50%",
                    textAlign: "center",
                  }}
                >
                  <h1>Registration</h1>
                </Box>
                <Grid container spacing={1}>
                  <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                    <form onSubmit={handleSubmit}>
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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseOut={handleMouseUp}
                          />
                        </div>
                        {errors.password && (
                          <p className="error">{errors.password}</p>
                        )}
                      </div>

                      <button type="submit" disabled={isLoading}>
                        {isLoading ? "Loading" : "Register"}
                      </button>
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
