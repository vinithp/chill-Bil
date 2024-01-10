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
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPrice,
  getPriceState,
  setPriceSuccessState,
  setPricefailedState,
} from "@/store/priceSlice";
import axios from "axios";

export default function PricingPage() {
  const [dbpItem, setDbpItem] = useState(["one", "two"]);
  const [mapDbp, setMapDbp] = useState({});
  const [dbpValue, setDbpValue] = useState<string | null>("");
  const [idAddDbp, setIsAddDbp] = useState(false);
  const [newDbpDay, setNewDbpDay] = useState<string | null>("");
  const [newDbp, setNewDbp] = useState("");
  const [newDbpPrice, setNewDbpPrice] = useState("");

  const [dapItem, setDapItem] = useState(["one", "two"]);
  const [mapDap, setMapDap] = useState({});
  const [dapValue, setDapValue] = useState<string | null>("");
  const [idAddDap, setIsAddDap] = useState(false);
  const [newDap, setNewDap] = useState("");
  const [newDapPrice, setNewDapPrice] = useState("");

  const [tmfItem, setTmfItem] = useState(["one", "two"]);
  const [mapTmf, setMapTmf] = useState({});
  const [tmfValue, setTmfValue] = useState<string | null>("");
  const [idAddTmf, setIsAddTmf] = useState(false);
  const [newTmf, setNewTmf] = useState("");
  const [newTmfPrice, setNewTmfPrice] = useState("");

  const [wcItem, setWcItem] = useState(["one", "two"]);
  const [mapWc, setMapWc] = useState({});
  const [wcValue, setWcValue] = useState<string | null>("");
  const [idAddWc, setIsAddWc] = useState(false);
  const [newWc, setNewWc] = useState("");
  const [newWcPrice, setNewWcPrice] = useState("");
  const [showPop, setShowPop] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPrice());
  }, []);
  const prices: any = useAppSelector(getPriceState);
  useEffect(() => {
    setDbpItem(Object.keys(prices.dbp));
    setDapItem(Object.keys(prices.dap));
    setTmfItem(Object.keys(prices.tmf));
    setWcItem(Object.keys(prices.wc));
  }, [prices]);

  const onCreate = async (model: string, data: any) => {
    try {
      const response = await axios.post("/api/price", {
        model,
        data,
      });
      dispatch(setPriceSuccessState({ model, value: response.data.data }));
    } catch (error: any) {
      console.log(error);
      setShowPop(true);
      setErrorMsg(error.response.data.message);
    }
  };

  const onDelete = async (model: string, key: string) => {
    try {
      const id = prices[model][key];
      await axios.delete("/api/price", {
        headers: {},
        data: {
          model,
          id,
        },
      });
      dispatch(setPricefailedState({ model, key }));
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ margin: { xs: 1, sm: 2 } }}>
        <Typography variant="h5" sx={{ padding: 2, pl: 3 }}>
          pricing
        </Typography>
        <Box sx={{ margin: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                alignItems="center"
                sx={{ m: 1 }}
              >
                <Typography>DBP</Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                {!idAddDbp && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={dbpItem}
                    sx={{ width: 250 }}
                    value={dbpValue}
                    onChange={(e, v) => {
                      setDbpValue(v);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={dbpValue}
                        onChange={(e) => {
                          setDbpValue(e.target.value);
                        }}
                        label="Items"
                      />
                    )}
                  />
                )}
                {dbpValue ? (
                  <IconButton
                    onClick={(e) => {
                      onDelete("dbp", dbpValue);
                      setDbpValue("");
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                ) : (
                  ""
                )}
                {!idAddDbp && (
                  <Button
                    sx={{ float: "right" }}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setIsAddDbp(true);
                    }}
                  >
                    Add
                  </Button>
                )}
                {idAddDbp && (
                  <>
                    <TextField
                      value={newDbp}
                      sx={{ width: 100 }}
                      onChange={(e) => {
                        setNewDbp(e.target.value);
                      }}
                      label={"KM"}
                    />
                    <TextField
                      value={newDbpPrice}
                      sx={{ width: 100 }}
                      onChange={(e) => {
                        setNewDbpPrice(e.target.value);
                      }}
                      label={"Price"}
                    />
                    <IconButton
                      onClick={(e) => {
                        onCreate("dbp", {
                          range: newDbp,
                          price: newDbpPrice,
                        });
                        setIsAddDbp(false);
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setIsAddDbp(false);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </>
                )}
              </Stack>
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
              >
                <Typography>DAP</Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                {!idAddDap && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={dapItem}
                    sx={{ width: 250 }}
                    value={dapValue}
                    onChange={(e, v) => {
                      setDapValue(v);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={dapValue}
                        onChange={(e) => {
                          setDapValue(e.target.value);
                        }}
                        label="Items"
                      />
                    )}
                  />
                )}
                {dapValue ? (
                  <IconButton
                    onClick={(e) => {
                      onDelete("dap", dapValue);
                      setDapValue("");
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                ) : (
                  ""
                )}
                {!idAddDap && (
                  <Button
                    sx={{ float: "right" }}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setIsAddDap(true);
                    }}
                  >
                    Add
                  </Button>
                )}
                {idAddDap && (
                  <>
                    <TextField
                      value={newDap}
                      sx={{ width: 100 }}
                      onChange={(e) => {
                        setNewDap(e.target.value);
                      }}
                      label={"KM"}
                    />
                    <TextField
                      value={newDapPrice}
                      sx={{ width: 100 }}
                      onChange={(e) => {
                        setNewDapPrice(e.target.value);
                      }}
                      label={"Price"}
                    />
                    <IconButton
                      onClick={(e) => {
                        onCreate("dap", {
                          range: newDap,
                          price: newDapPrice,
                        });
                        setIsAddDap(false);
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setIsAddDap(false);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </>
                )}
              </Stack>
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
              >
                <Typography>TMF</Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                {!idAddTmf && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={tmfItem}
                    sx={{ width: 250 }}
                    value={tmfValue}
                    onChange={(e, v) => {
                      setTmfValue(v);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={tmfValue}
                        onChange={(e) => {
                          setTmfValue(e.target.value);
                        }}
                        label="Items"
                      />
                    )}
                  />
                )}
                {tmfValue ? (
                  <IconButton
                    onClick={(e) => {
                      onDelete("tmf", tmfValue);
                      setTmfValue("");
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                ) : (
                  ""
                )}
                {!idAddTmf && (
                  <Button
                    sx={{ float: "right" }}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setIsAddTmf(true);
                    }}
                  >
                    Add
                  </Button>
                )}
                {idAddTmf && (
                  <>
                    <TextField
                      value={newTmf}
                      sx={{ width: 100 }}
                      onChange={(e) => {
                        setNewTmf(e.target.value);
                      }}
                      label={"Min"}
                    />
                    <TextField
                      value={newTmfPrice}
                      sx={{ width: 100 }}
                      onChange={(e) => {
                        setNewTmfPrice(e.target.value);
                      }}
                      label={"Price"}
                    />
                    <IconButton
                      onClick={(e) => {
                        onCreate("tmf", {
                          time: newTmf,
                          price: newTmfPrice,
                        });
                        setIsAddTmf(false);
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setIsAddTmf(false);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </>
                )}
              </Stack>
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
              >
                <Typography>WC</Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                {!idAddWc && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={wcItem}
                    sx={{ width: 250 }}
                    value={wcValue}
                    onChange={(e, v) => {
                      setWcValue(v);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={wcValue}
                        onChange={(e) => {
                          setWcValue(e.target.value);
                        }}
                        label="Items"
                      />
                    )}
                  />
                )}
                {wcValue ? (
                  <IconButton
                    onClick={(e) => {
                      onDelete("wc", wcValue);
                      setWcValue("");
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                ) : (
                  ""
                )}
                {!idAddWc && (
                  <Button
                    sx={{ float: "right" }}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setIsAddWc(true);
                    }}
                  >
                    Add
                  </Button>
                )}
                {idAddWc && (
                  <>
                    <TextField
                      value={newWc}
                      sx={{ width: 100 }}
                      onChange={(e) => {
                        setNewWc(e.target.value);
                      }}
                      label={"Min"}
                    />
                    <TextField
                      value={newWcPrice}
                      sx={{ width: 100 }}
                      onChange={(e) => {
                        setNewWcPrice(e.target.value);
                      }}
                      label={"Price"}
                    />
                    <IconButton
                      onClick={(e) => {
                        onCreate("wc", {
                          time: newWc,
                          price: newWcPrice,
                        });
                        setIsAddWc(false);
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setIsAddWc(false);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </>
                )}
              </Stack>
              <Divider />
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
