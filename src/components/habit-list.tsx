import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import useHabitStore from "../store/store";

const HabitList = () => {
  const { habits, removeHabit, toggleHabit } = useHabitStore();
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ mt: 2, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={8}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                  gap: 1,
                  mt: { xs: 1, md: 0 },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => toggleHabit(habit.id, today)}
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircleOutline />}
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Completed"}
                </Button>
                <Button
                  onClick={() => removeHabit(habit.id)}
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  color="error"
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography>Current Streak : </Typography>
            <LinearProgress variant="determinate" value={10} />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
