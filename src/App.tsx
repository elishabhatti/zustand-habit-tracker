import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";
import { Box, Container, Typography } from "@mui/material";

const App = () => {
  
  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit
        </Typography>
        <AddHabitForm />
        <HabitList />
      </Box>
    </Container>
  );
};

export default App;
