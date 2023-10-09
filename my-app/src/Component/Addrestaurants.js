
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import bgimg from "./bg/background1.jpg";
import bg from "./bg/Interactive.svg";
import { Container } from '@mui/material';
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './RgistrationVarification.css';
import axios from "axios";
export default function Registration() {
    const [formData, setFormData] = useState({
        restaurantName: '',
        restaurantAddress: '',
        restaurantImage: '',
        restaurantContact: '',
        selectedCountry: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'restaurantImage') {
            // Extracting only the file name
            const fileName = e.target.files[0].name;
            setFormData({ ...formData, restaurantImage: fileName });
        } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }
    };
    

    const handlePhoneChange = (phone, country) => {
        setFormData({ ...formData, restaurantContact: phone, selectedCountry: country });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.restaurantName.trim()) {
            newErrors.restaurantName = 'Restaurant name is required';
        }

        if (!formData.restaurantAddress.trim()) {
            newErrors.restaurantAddress = 'Restaurant address is required';
        }

        if (!formData.restaurantContact.trim()) {
            newErrors.restaurantContact = 'Restaurant contact number is required';
        }

        if (!formData.restaurantImage) {
            newErrors.restaurantImage = 'Restaurant image is required';
        }

        if (!formData.selectedCountry) {
            newErrors.selectedCountry = 'Country is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("I am here 2");

    //     try {
    //     //   const formDataToSend = new FormData();
    //     //   formDataToSend.append('restaurant_name', formData.restaurant_name);
    //     //   formDataToSend.append('restaurant_address', formData.restaurant_address);
    //     //   formDataToSend.append('restaurant_contact', formData.restaurant_contact);
    //     //   formDataToSend.append('restaurant_image', formData.restaurant_image);

    //     const formDataToSend  = {
    //         restaurant_name: formData.restaurantName,
    //         restaurant_address: formData.restaurantAddress,
    //         restaurant_contact: formData.restaurantContact,
    //         restaurantImage: formData.restaurantImage,
    //       };
    //       console.log("I am here 3");
    //       console.log(formDataToSend);
    //       const response = await axios.post('http://localhost:8081/Api/insertrestaurant', formDataToSend);
    //         console.log("I am here 1");
    //       if (response.data.message === 'Data inserted successfully') {
    //         navigate('/registration')
    //         // Handle success, e.g., show a success message to the user
    //         console.log('Data inserted successfully:', response.data);
    //         console.log("I am here 4");
    //       } else {
    //         // Handle other cases, e.g., show an error message to the user
    //         console.error('Error inserting data:', response.data.error);
    //         console.log("I am here 5");
    //       }
    //     } catch (error) {
    //       // Handle network or other errors here
    //       console.error('Error inserting data:', error);
    //     }
    //   };
    
    const handleSubmit = async (e) => {
        e.preventDefault();


        // Validate the form fields
        if (!formData.restaurantName || !formData.restaurantAddress || !formData.restaurantContact || !formData.restaurantImage) {
            // If any of the required fields are empty, show an alert to the user
            alert('Please fill out all fields.');
            return;
        }
        console.log(formData);
        // Validate the form
        if (validateForm()) {
            const formDataToSend  = {
                        restaurant_name: formData.restaurantName,
                        restaurant_address: formData.restaurantAddress,
                        restaurant_contact: formData.restaurantContact,
                       restaurant_image: formData.restaurantImage,
                      };// Add the file data to FormData
        console.log(formDataToSend);
    try {
        const response = await axios.post('http://localhost:8081/Api/insertrestaurant', formDataToSend);
        if (response.data.status === 'Success') {
            console.log('Data inserted successfully:', response.data);
            navigate('/registration');
        } else {
            console.error('Error inserting data:', response.data.error);
            // Handle other cases here
        }
    } catch (error) {
        // Handle network or other errors here
        console.error('Error inserting data:', error);
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
                    height: '68%',
                    backgroundColor: 'background.paper',
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                }}
            >
                <Grid container>
                    <Grid item xs={12} lg={6}>
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
                    <Grid item xs={12} lg={6}>
                        <Box
                            style={{
                                backgroundSize: 'cover',
                                height: '70vh',
                                backgroundColor: 'navy blue',
                            }}
                        >
                            <Container>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                        <h1>Add Restaurant</h1>
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <label>Restaurant Name:</label>
                                                <input
                                                    type="text"
                                                    name="restaurantName"
                                                    value={formData.restaurantName}
                                                    onChange={handleChange}
                                                />
                                                {errors.restaurantName && <p className="error">{errors.restaurantName}</p>}
                                            </div>

                                            <div>
                                                <label>Restaurant Address:</label>
                                                <input
                                                    type="text"
                                                    name="restaurantAddress"
                                                    value={formData.restaurantAddress}
                                                    onChange={handleChange}
                                                />
                                                {errors.restaurantAddress && <p className="error">{errors.restaurantAddress}</p>}
                                            </div>

                                            <div>
                                                <label>Restaurant Contact Number:</label>
                                                <div>
                                                    <PhoneInput
                                                        inputProps={{
                                                            name: 'restaurantContact',
                                                            required: true,
                                                        }}
                                                        country={'us'} // Default country, you can change this to any default country
                                                        value={formData.restaurantContact}
                                                        onChange={handlePhoneChange}
                                                    />
                                                </div>
                                                {errors.restaurantContact && <p className="error">{errors.restaurantContact}</p>}
                                                {errors.selectedCountry && <p className="error">{errors.selectedCountry}</p>}
                                            </div>

                                            <div>
                                                <label>Restaurant Image:</label>
                                                <input type="file" name="restaurantImage" onChange={(e) => setFormData({ ...formData, restaurantImage: e.target.files[0] })} />

                                                {errors.restaurantImage && <p className="error">{errors.restaurantImage}</p>}
                                            </div>

                                            <button type="submit">Add Restaurant</button>
                                            
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







// 


// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { Container } from '@mui/material';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import axios from 'axios';

// export default function Registration() {
//     const [formData, setFormData] = useState({
//         restaurantName: '',
//         restaurantAddress: '',
//         restaurantImage: '', // Store only the file name here
//         restaurantContact: '',
//         selectedCountry: '',
//     });

//     const [errors, setErrors] = useState({});

//     const handleImageChange = (e) => {
//         const fileName = e.target.files[0].name; // Extract only the file name
//         setFormData({ ...formData, restaurantImage: fileName });
//     };

//     const handlePhoneChange = (phone, country) => {
//         setFormData({ ...formData, restaurantContact: phone, selectedCountry: country });
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         if (!formData.restaurantName.trim()) {
//             newErrors.restaurantName = 'Restaurant name is required';
//         }

//         if (!formData.restaurantAddress.trim()) {
//             newErrors.restaurantAddress = 'Restaurant address is required';
//         }

//         if (!formData.restaurantContact.trim()) {
//             newErrors.restaurantContact = 'Restaurant contact number is required';
//         }

//         if (!formData.restaurantImage) {
//             newErrors.restaurantImage = 'Restaurant image is required';
//         }

//         if (!formData.selectedCountry) {
//             newErrors.selectedCountry = 'Country is required';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (validateForm()) {
//             try {
//                 const response = await axios.post('http://localhost:8081/Api/insertrestaurant', formData);
//                 if (response.data.status === 'Success') {
//                     console.log('Data inserted successfully:', response.data);
//                     // Handle success, navigate or show a success message to the user
//                 } else {
//                     console.error('Error inserting data:', response.data.error);
//                     // Handle other cases here, show an error message to the user
//                 }
//             } catch (error) {
//                 console.error('Error inserting data:', error);
//                 // Handle network or other errors here, show an error message to the user
//             }
//         }
//     };

//     return (
//         <div>
//             <Box
//                 sx={{
//                     width: '75%',
//                     height: '68%',
//                     backgroundColor: 'background.paper',
//                     position: 'absolute',
//                     top: '10%',
//                     left: '10%',
//                 }}
//             >
//                 <Grid container>
//                     <Grid item xs={12} lg={6}>
//                         {/* Your left side content */}
//                     </Grid>
//                     <Grid item xs={12} lg={6}>
//                         <Box
//                             style={{
//                                 backgroundSize: 'cover',
//                                 height: '70vh',
//                                 backgroundColor: 'navy blue',
//                             }}
//                         >
//                             <Container>
//                                 <Grid container spacing={1}>
//                                     <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
//                                         <h1>Add Restaurant</h1>
//                                         <form onSubmit={handleSubmit}>
//                                             <div>
//                                                 <label>Restaurant Name:</label>
//                                                 <input
//                                                     type="text"
//                                                     name="restaurantName"
//                                                     value={formData.restaurantName}
//                                                     onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
//                                                 />
//                                                 {errors.restaurantName && <p className="error">{errors.restaurantName}</p>}
//                                             </div>

//                                             <div>
//                                                 <label>Restaurant Address:</label>
//                                                 <input
//                                                     type="text"
//                                                     name="restaurantAddress"
//                                                     value={formData.restaurantAddress}
//                                                     onChange={(e) => setFormData({ ...formData, restaurantAddress: e.target.value })}
//                                                 />
//                                                 {errors.restaurantAddress && <p className="error">{errors.restaurantAddress}</p>}
//                                             </div>

//                                             <div>
//                                                 <label>Restaurant Contact Number:</label>
//                                                 <div>
//                                                     <PhoneInput
//                                                         inputProps={{
//                                                             name: 'restaurantContact',
//                                                             required: true,
//                                                         }}
//                                                         country={'us'} // Default country, you can change this to any default country
//                                                         value={formData.restaurantContact}
//                                                         onChange={handlePhoneChange}
//                                                     />
//                                                 </div>
//                                                 {errors.restaurantContact && <p className="error">{errors.restaurantContact}</p>}
//                                                 {errors.selectedCountry && <p className="error">{errors.selectedCountry}</p>}
//                                             </div>

//                                             <div>
//                                                 <label>Restaurant Image:</label>
//                                                 <input
//                                                     type="file"
//                                                     name="restaurantImage"
//                                                     onChange={handleImageChange}
//                                                 />
//                                                 {errors.restaurantImage && <p className="error">{errors.restaurantImage}</p>}
//                                             </div>

//                                             <button type="submit">Add Restaurant</button>
//                                         </form>
//                                     </Grid>
//                                 </Grid>
//                             </Container>
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </div>
//     );
// }



