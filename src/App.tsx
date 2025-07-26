import { useEffect } from "react";
import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";
import useHabitStore from "./store/store";
import { Box, Container, Typography } from "@mui/material";

const App = () => {
  const {fetchHabits} = useHabitStore();
  
  useEffect(() => {
    fetchHabits()
  },[])

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
