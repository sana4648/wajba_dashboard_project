import React, { useState, useEffect } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { styled } from "@mui/material/styles";
import LanguageIcon from "@mui/icons-material/Language";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import { getFoods } from "../../services/food_services";
import { supabase } from "../../config/supabase";
import { useAuth } from "../../providers/auth_provider";
import {
  addRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "../../services/recipe_services";
import toast from "react-hot-toast";

const user = {
  email: "example@example.com",
  password: "********", // You should never display passwords like this in a real app
  lastLogin: "2023-09-01 14:30:00",
  lastLogout: "2023-09-02 09:15:00",
};

const Buttons = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
  color: "orange",
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  borderColor: "orange",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "orange",
    borderColor: "orange",
    color: "white",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflowX: "hidden",
  marginLeft: "240px", // Adjust this value based on your sidebar width
  padding: theme.spacing(2), // Add padding for content
  backgroundColor: theme.palette.background.default, // Set background color
  marginTop: "64px", // Adjust this value to remove space between top bar and content
}));

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "64px", // Adjust this value to match the top bar's height
  left: 0,
  width: "240px", // Set the width of your sidebar
  height: "100%",
  backgroundColor: theme.palette.background.default, // Set the sidebar's background color
  zIndex: 1,
  overflowY: "auto", // Enable vertical scrolling
}));

export default function Admin() {
  const { restaurant } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState({});
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
    navigate("/profile");
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
    navigate("/");
    handleClose();
  };
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    const fetchFoods = async () => {
      const { data, error } = await supabase
        .from("foods")
        .select("id, name")
        .eq("restaurant_id", restaurant.id);
      if (error) {
        console.log(error);
      } else {
        setFoods(data);
        console.log(data);
      }
    };

    const fetchRecipes = async () => {
      const { data, error } = await getRecipes(restaurant.id);
      if (error) {
        console.log(error);
      } else {
        setRecipes(data);
        console.log(data);
      }
    };

    fetchFoods();
    fetchRecipes();
  }, [restaurant]);

  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    ingredients: "",
    instructions: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingIndex === -1) {
      // Adding a new recipe
      const { error } = await addRecipe({
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        food_id: selectedFood,
        restaurant_id: restaurant.id,
      });
      if (error) {
        console.log(error);
        toast.error("Failed to add recipe");
      } else {
        setRecipes([...recipes, recipe]);
        toast.success("Recipe added successfully");
      }
    } else {
      // Editing an existing recipe
      const { error } = await updateRecipe(recipe.id, {
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      });
      if (error) {
        console.log(error);
        toast.error("Failed to update recipe");
      } else {
        const updatedRecipes = [...recipes];
        updatedRecipes[editingIndex] = recipe;
        setRecipes(updatedRecipes);
        setEditingIndex(-1); // Reset editing state
        toast.success("Recipe updated successfully");
      }
    }
    setRecipe({
      name: "",
      ingredients: "",
      instructions: "",
    });
    setSelectedFood({});
  };

  const handleEdit = (food, index) => {
    const editingRecipe = recipes[index];
    setRecipe(editingRecipe);
    setEditingIndex(index);
    setSelectedFood(food);
  };

  const handleDelete = async (r, index) => {
    const { error } = await deleteRecipe(r.id);
    if (error) {
      console.log(error);
      toast.error("Failed to delete recipe");
    } else {
      const updatedRecipes = recipes.filter((_, i) => i !== index);
      setRecipes(updatedRecipes);
      toast.success("Recipe deleted successfully");
    }
  };

  return (
    <div>
      <div className="topbar">
        <div className="topbarwrapper">
          <div className="topLeft"></div>

          <Stack direction="row" spacing={2}>
            <Buttons
              className="boxStyling"
              variant="outlined"
              onClick={() => navigate("/posinvoicetopbar")}
            >
              Pos Invoice
            </Buttons>
            <Buttons
              className="boxStyling"
              variant="outlined"
              onClick={() => navigate("/orderlist")}
            >
              Order list
            </Buttons>
            <Buttons
              className="boxStyling"
              variant="outlined"
              onClick={() => navigate("/kitchen")}
            >
              Kitchen dashboard
            </Buttons>
            <Buttons
              className="boxStyling"
              variant="outlined"
              onClick={() => navigate("/counter")}
            >
              Counter dashboard
            </Buttons>
          </Stack>

          <div className="topRight">
            <div className="topbarIconContainer">
              <NotificationsNoneIcon />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <LanguageIcon />
              <span className="topIconBadge">2</span>
            </div>
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        color: "white",
                        backgroundColor: "orange",
                      }}
                    >
                      N
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <Avatar onClick={() => navigate("/profile")} /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSettingsClick}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        </div>
      </div>

      <ContentWrapper>
        <Grid
          container
          spacing={2}
          columns={16}
          paddingLeft={2}
          paddingRight={2}
          paddingTop={3}
        >
          <Grid item xs={16}>
            <section className="content-header">
              <div className="header-icon">
                <i className="bi bi-house"></i>
              </div>
              <div className="header-title">
                <h1>Recipe Form</h1>
                <small>Recipe Form</small>
              </div>
            </section>
          </Grid>
        </Grid>
        <div class="col-sm-12 col-md-8">
          <div class="panel panel-bd">
            <div class="panel-heading">
              <div class="panel-title">
                <h4>Recipe Form</h4>
              </div>
            </div>
            <div className="recipe-app">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="Addfooditem">
                    <label htmlFor="foods">Foods :</label>
                    <select
                      id="foods"
                      name="foods"
                      value={selectedFood}
                      onChange={(e) => setSelectedFood(e.target.value)}
                      required
                    >
                      <option value="">Select food</option>
                      {foods.map((food) => (
                        <option key={food.id} value={food.id}>
                          {food.name}
                        </option>
                      ))}
                      ;
                    </select>
                  </div>
                  <label htmlFor="name">Recipe Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={recipe.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ingredients">Ingredients:</label>
                  <textarea
                    id="ingredients"
                    name="ingredients"
                    value={recipe.ingredients}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="instructions">Instructions:</label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    value={recipe.instructions}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit">
                  {editingIndex === -1 ? "Save Recipe" : "Update Recipe"}
                </button>
              </form>
              {recipes.length > 0 && (
                <div className="recipe-list">
                  <h2>Recipe List</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Food</th>
                        <th>Name</th>
                        <th>Ingredients</th>
                        <th>Instructions</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipes.map((r, index) => (
                        <tr key={index}>
                          <td>{r.food?.name}</td>
                          <td>{r.name}</td>
                          <td>{r.ingredients}</td>
                          <td>{r.instructions}</td>
                          <td>
                            <button onClick={() => handleEdit(r?.food, index)}>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(r, index)}
                              style={{ marginLeft: "10px" }}
                            >
                              Delete
                            </button>
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
      </ContentWrapper>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </div>
  );
}
