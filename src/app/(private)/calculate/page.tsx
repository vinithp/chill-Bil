"use client";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPrice, getPriceState } from "@/store/priceSlice";
import axios from "axios";
import { fetchConfig, getConfigState } from "@/store/configSlice";

export default function CalPage() {
  const [day, setDay] = useState("");
  const [range, setRange] = useState("");
  const [time, setTime] = useState("");
  const [waitingTime, SetWaitingTime] = useState("");
  const [finalPrice, setFinalPrice] = useState("0");
  const [showPop, setShowPop] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>("");

  const onSumbit = async () => {
    try {
      const result = await axios.post("/api/calculate", {
        day,
        range: Number(range),
        time: Number(time),
        waitingTime: Number(waitingTime),
      });
      setFinalPrice(result.data);
    } catch (error: any) {
      console.log(error);
      setShowPop(true);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ margin: { xs: 1, sm: 2 } }}>
        <Typography variant="h5" sx={{ padding: 2, pl: 3 }}>
          Config
        </Typography>
        <Box sx={{ margin: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={day}
                label="Day"
                onChange={(e) => {
                  setDay(e.target.value);
                }}
                sx={{ width: 200 }}
              >
                <MenuItem value={"monday"}>monday</MenuItem>
                <MenuItem value={"tuesday"}>tuesday</MenuItem>
                <MenuItem value={"wednesday"}>wednesday</MenuItem>
                <MenuItem value={"thursday"}>thursday</MenuItem>
                <MenuItem value={"friday"}>friday</MenuItem>
                <MenuItem value={"saturday"}>saturday</MenuItem>
                <MenuItem value={"sunday"}>sunday</MenuItem>
              </Select>
              <Divider sx={{ m: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={range}
                sx={{ width: 200 }}
                onChange={(e) => {
                  setRange(e.target.value);
                }}
                label={"KM"}
              />
              <Divider sx={{ m: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={time}
                sx={{ width: 200 }}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                label={"Time Taken"}
              />
              <Divider sx={{ m: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={waitingTime}
                sx={{ width: 200 }}
                onChange={(e) => {
                  SetWaitingTime(e.target.value);
                }}
                label={"Waiting Time"}
              />
              <Divider sx={{ m: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">{finalPrice} ₹</Typography>
              <Divider sx={{ m: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                alignItems="center"
                sx={{ m: 1 }}
                justifyContent="flex-end"
              >
                <Button variant="contained" onClick={onSumbit}>
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Snackbar
        open={showPop}
        onClose={() => {
          setShowPop(false);
        }}
        autoHideDuration={6000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
