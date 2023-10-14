import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../providers/auth_provider";
import "./Dashboardhome.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Dashboardhome() {
  const { restaurant } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        columns={16}
        paddingLeft={2}
        paddingRight={2}
        paddingTop={3}
      >
        <Grid item xs={16}>
          <section class="content-header">
            <div class="header-icon">
              <i class="bi bi-house"></i>
            </div>
            <div class="header-title">
              <h1>{restaurant?.name}</h1>
              <small>Home</small>
            </div>
          </section>
        </Grid>
      </Grid>
    </Box>
  );
}
