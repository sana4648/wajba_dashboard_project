import React, { useState, useEffect } from 'react';
import './Recepydata.css'; // Import the CSS file
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { styled } from '@mui/material/styles';
import LanguageIcon from '@mui/icons-material/Language';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Grid from '@mui/material/Grid';

const user = {
  email: 'example@example.com',
  password: '********', // You should never display passwords like this in a real app
  lastLogin: '2023-09-01 14:30:00',
  lastLogout: '2023-09-02 09:15:00',
};

const Buttons = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  color: 'orange',
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: 'orange',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: 'orange',
    borderColor: 'orange',
    color: 'white',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowX: 'hidden',
  marginLeft: '240px', // Adjust this value based on your sidebar width
  padding: theme.spacing(2), // Add padding for content
  backgroundColor: theme.palette.background.default, // Set background color
  marginTop: '64px', // Adjust this value to remove space between top bar and content
}));

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '64px', // Adjust this value to match the top bar's height
  left: 0,
  width: '240px', // Set the width of your sidebar
  height: '100%',
  backgroundColor: theme.palette.background.default, // Set the sidebar's background color
  zIndex: 1,
  overflowY: 'auto', // Enable vertical scrolling
}));

export default function Admin() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleProfileClick = () => {
    // Handle the profile menu item click logic here
    // For example, redirect to the profile page
    navigate('/profile');
    handleClose();
  };





  const handleSettingsClick = () => {
    // Handle the settings menu item click logic here
    // For example, open a settings modal
    // You can add your own logic for handling settings
    handleClose();
  };

  const handleLogoutClick = () => {
    // Handle the logout menu item click logic here
    // For example, log the user out and redirect to the login page
    // You can add your own logout logic
    navigate('/');
    handleClose();
  };
  const [userData, setUserData] = useState(user);

  // Simulate fetching user data from a backend
  useEffect(() => {
    // In a real application, you would make an API call to fetch user data
    // For this example, we use the hardcoded user data
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  // Simulate fetching user data from a backend
  useEffect(() => {
    // In a real application, you would make an API call to fetch user data
    // For this example, we use the hardcoded user data
  }, []);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [instructions, setInstructions] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [editingRecipeIndex, setEditingRecipeIndex] = useState(-1);

  const handleAddIngredient = () => {
    if (ingredient && quantity && !isNaN(quantity) && parseInt(quantity) > 0) {
      const newIngredient = {
        ingredient: ingredient,
        quantity: parseInt(quantity),
        id: Date.now(), // Add a unique ID for each ingredient
      };
      setSelectedIngredients([...selectedIngredients, newIngredient]);
      setIngredient('');
      setQuantity('');
    } else {
      alert('Please select a valid ingredient and quantity.');
    }
  };

  const handleDeleteIngredient = (id) => {
    const updatedIngredients = selectedIngredients.filter((ingredient) => ingredient.id !== id);
    setSelectedIngredients(updatedIngredients);
  };

  const handleSaveRecipe = () => {
    if (selectedIngredients.length > 0 && instructions && recipeName) {
      const newRecipe = {
        name: recipeName,
        ingredients: selectedIngredients,
        instructions: instructions,
        id: Date.now(), // Add a unique ID for each recipe
      };

      if (editingRecipeIndex === -1) {
        // Add a new recipe
        setRecipes([...recipes, newRecipe]);
      } else {
        // Edit an existing recipe
        const updatedRecipes = [...recipes];
        updatedRecipes[editingRecipeIndex] = newRecipe;
        setRecipes(updatedRecipes);
        setEditingRecipeIndex(-1); // Reset editing state
      }

      setSelectedIngredients([]);
      setInstructions('');
      setRecipeName('');
    } else {
      alert('Please add recipe name, ingredients, and instructions to save the recipe.');
    }
  };

  const handleEditRecipe = (index) => {
    const editingRecipe = recipes[index];
    setRecipeName(editingRecipe.name);
    setSelectedIngredients(editingRecipe.ingredients);
    setInstructions(editingRecipe.instructions);
    setEditingRecipeIndex(index);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  return (
    <div>
      <div className='topbar'>
        <div className='topbarwrapper'>
          <div className='topLeft'></div>

          <Stack direction='row' spacing={2}>
            <Buttons className='boxStyling' variant='outlined' onClick={() => navigate('/posinvoicetopbar')}>
              Pos Invoice
            </Buttons>
            <Buttons
              className='boxStyling'
              variant='outlined'
              onClick={() => navigate('/orderlist')}
            >
              Order list
            </Buttons>
            <Buttons
              className='boxStyling'
              variant='outlined'
              onClick={() => navigate('/kitchen')}
            >
              Kitchen dashboard
            </Buttons>
            <Buttons
              className='boxStyling'
              variant='outlined'
              onClick={() => navigate('/counter')}
            >
              Counter dashboard
            </Buttons>
          </Stack>

          <div className='topRight'>
            <div className='topbarIconContainer'>
              <NotificationsNoneIcon />
              <span className='topIconBadge'>2</span>
            </div>
            <div className='topbarIconContainer'>
              <LanguageIcon />
              <span className='topIconBadge'>2</span>
            </div>
            <React.Fragment>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title='Account settings'>
                  <IconButton
                    onClick={handleClick}
                    size='small'
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32, color: 'white', backgroundColor: 'orange' }}>N</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <Avatar
                    onClick={() => navigate('/profile')}
                  /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                  handleSettingsClick();
                  navigate('/setting');
                }}>
                  <ListItemIcon>
                    <Settings fontSize='small' />
                  </ListItemIcon>
                  Settings
                </MenuItem>

                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        </div>
      </div>

      <ContentWrapper>
        <Grid container spacing={2} columns={16} paddingLeft={2} paddingRight={2} paddingTop={3}>
          <Grid item xs={16}>
            <section className='content-header'>
              <div className='header-icon'><i className='bi bi-house'></i></div>
              <div className='header-title'>
                <h1>Recipe Form</h1>
                <small>Recipe Form</small>
              </div>
            </section>
          </Grid>
          <div class="col-sm-12 col-md-8">
            <div class="panel panel-bd">
              <div class="panel-heading">
                <div class="panel-title">
                  <h4 > Recipe Form</h4>
                </div>
              </div>
              <div className='content'>

                <div className='form-group'>
                  <label>Recipe Name:</label>
                  <input
                    type='text'
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    placeholder='Enter recipe name'
                  />
                </div>
                <div className='form-group'>
                  <label>Add Ingredient:</label>
                  <input
                    type='text'
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    placeholder='Add ingredient'
                  />
                </div>
                <div className='form-group'>
  <label>Enter Quantity (in grams):</label>
  <input
    type='number'
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    placeholder='Enter quantity in grams'
  />
</div>

                <button className='add-button' onClick={handleAddIngredient}>
                  Add Ingredient
                </button>

                {selectedIngredients.length > 0 && (
                  <div className='ingredient-list'>
                    <h2>Selected Ingredients:</h2>
                    <table>
                      <thead>
                        <tr>
                          <th>Ingredient</th>
                          <th>Quantity</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedIngredients.map((ingredient) => (
                          <tr key={ingredient.id}>
                            <td>{ingredient.ingredient}</td>
                            <td>{ingredient.quantity}</td>
                            <td>
                              <button onClick={() => handleDeleteIngredient(ingredient.id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className='form-group'>
                  <label>Enter Instructions:</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder='Enter instructions'
                  />
                </div>
                <button className='save-button' onClick={handleSaveRecipe}>
                  {editingRecipeIndex === -1 ? 'Save Recipe' : 'Update Recipe'}
                </button>

                {recipes.length > 0 && (
                  <div className='recipe-list'>
                    <h2>Recipe List:</h2>
                    <table>
                      <thead>
                        <tr>
                          <th>Recipe Name</th>
                          <th>Ingredients</th>
                          <th>Instructions</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recipes.map((recipe, index) => (
                          <tr key={recipe.id}>
                            <td>{recipe.name}</td>
                            <td>
                              <ul>
                                {recipe.ingredients.map((ingredient) => (
                                  <li key={ingredient.id}>
                                    {ingredient.ingredient} - {ingredient.quantity}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td>{recipe.instructions}</td>
                            <td>
                              <button onClick={() => handleEditRecipe(index)}>Edit</button>
                              <button onClick={() => handleDeleteRecipe(index)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>

            </div>
          </div>
        </Grid>

      </ContentWrapper>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </div>
  );
}









