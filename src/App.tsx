import AddHabitForm from "./components/add-habit-form";
import useHabitStore from "./store/store";
import { Box, Container, Typography } from "@mui/material";

const App = () => {
  const store = useHabitStore();
  console.log(store);

  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit
        </Typography>
        <AddHabitForm />
      </Box>
    </Container>
  );
};

export default App;
