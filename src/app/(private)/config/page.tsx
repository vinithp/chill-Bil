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

export default function ConfigPage() {
  const [showPop, setShowPop] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [configItme, setConfigItem] = useState<any>([]);
  const [configValue, setConfigValue] = useState<any>("");
  const [isConfigActive, setIsConfigActive] = useState(false);
  const [dbpDay, setDbpDay] = useState("");
  const [dbpItem, setDbpItem] = useState(["one", "two"]);
  const [dbpValue, setDbpValue] = useState<any>({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });
  const [test, setTest] = useState("");
  const [dapItem, setDapItem] = useState(["one", "two"]);
  const [dapValue, setDapValue] = useState<any>([]);

  const [tmfItem, setTmfItem] = useState(["one", "two"]);
  const [tmfValue, setTmfValue] = useState<any>([]);

  const [wcItem, setWcItem] = useState(["one", "two"]);
  const [wcValue, setWcValue] = useState<any>([]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPrice());
    dispatch(fetchConfig());
  }, []);
  const config: any = useAppSelector(getConfigState);
  const prices: any = useAppSelector(getPriceState);
  useEffect(() => {
    setDbpItem(Object.keys(prices.dbp));
    setDapItem(Object.keys(prices.dap));
    setTmfItem(Object.keys(prices.tmf));
    setWcItem(Object.keys(prices.wc));
  }, [prices, config]);

  useEffect(() => {
    setConfigItem(Object.keys(config.config));
  }, [config]);

  const onSave = async () => {
    await axios.post("/api/config", {
      id: configValue && configValue != "new" ? configValue : null,
      dbp: {
        monday: {
          dbpId: prices["dbp"][dbpValue.monday],
          value: dbpValue.monday,
        },
        tuesday: {
          dbpId: prices["dbp"][dbpValue.tuesday],
          value: dbpValue.tuesday,
        },
        wednesday: {
          dbpId: prices["dbp"][dbpValue.wednesday],
          value: dbpValue.wednesday,
        },
        thursday: {
          dbpId: prices["dbp"][dbpValue.thursday],
          value: dbpValue.thursday,
        },
        friday: {
          dbpId: prices["dbp"][dbpValue.friday],
          value: dbpValue.friday,
        },
        saturday: {
          dbpId: prices["dbp"][dbpValue.saturday],
          value: dbpValue.saturday,
        },
        sunday: {
          dbpId: prices["dbp"][dbpValue.sunday],
          value: dbpValue.sunday,
        },
      },
      dap: dapValue.map((item: any) => {
        return { dapId: prices["dap"][item], value: item };
      }),
      tmf: tmfValue.map((item: any) => {
        return { tmfId: prices["tmf"][item], value: item };
      }),
      wc: wcValue.map((item: any) => {
        return { wcId: prices["wc"][item], value: item };
      }),
    });
    dispatch(fetchConfig());
  };
  useEffect(() => {
    if (configValue === "new") {
      setDbpValue({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      });
      setDapValue([]);
      setTmfValue([]);
      setWcValue([]);
      setDbpDay("");
      setTest("");
      setIsConfigActive(false);
    } else if (configValue) {
      setDbpValue({
        monday: config.config[configValue].dbp.monday.value,
        tuesday: config.config[configValue].dbp.tuesday.value,
        wednesday: config.config[configValue].dbp.wednesday.value,
        thursday: config.config[configValue].dbp.thursday.value,
        friday: config.config[configValue].dbp.friday.value,
        saturday: config.config[configValue].dbp.saturday.value,
        sunday: config.config[configValue].dbp.sunday.value,
      });
      setDapValue(
        config.config[configValue].dap.map((item: any) => item.value)
      );
      setTmfValue(
        config.config[configValue].tmf.map((item: any) => item.value)
      );
      setWcValue(config.config[configValue].wc.map((item: any) => item.value));
      setIsConfigActive(config.config[configValue].status == "active");
      setDbpDay("monday");
      setTest(config.config[configValue].dbp.monday.value);
    }
  }, [configValue]);

  const ontoggle = async () => {
    if (configValue && configValue !== "new") {
      await axios.patch("/api/config", {
        id: configValue,
        status: isConfigActive ? "inActive" : "active",
      });
      setIsConfigActive(!isConfigActive);
      dispatch(fetchConfig());
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
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                alignItems="center"
                sx={{ m: 1 }}
              >
                <Typography>config List</Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={configValue}
                  label="Day"
                  onChange={(e) => {
                    setConfigValue(e.target.value);
                  }}
                  sx={{ width: 150 }}
                >
                  {configItme.map((item: any) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                  <MenuItem key={"new"} value={"new"}>
                    {"new"}
                  </MenuItem>
                </Select>
                <Switch
                  checked={isConfigActive}
                  onChange={() => {
                    ontoggle();
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ margin: { xs: 1, sm: 2 } }}>
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
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dbpDay}
                  label="Day"
                  onChange={(e) => {
                    setDbpDay(e.target.value);
                    setTest(dbpValue[e.target.value]);
                  }}
                  sx={{ width: 150 }}
                >
                  <MenuItem value={"monday"}>monday</MenuItem>
                  <MenuItem value={"tuesday"}>tuesday</MenuItem>
                  <MenuItem value={"wednesday"}>wednesday</MenuItem>
                  <MenuItem value={"thursday"}>thursday</MenuItem>
                  <MenuItem value={"friday"}>friday</MenuItem>
                  <MenuItem value={"saturday"}>saturday</MenuItem>
                  <MenuItem value={"sunday"}>sunday</MenuItem>
                </Select>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={test}
                  label="Age"
                  onChange={(e) => {
                    setDbpValue((prev: any) => {
                      return {
                        ...prev,
                        [dbpDay]: e.target.value,
                      };
                    });
                    setTest(e.target.value);
                  }}
                  sx={{ width: 150 }}
                >
                  {dbpItem.map((item: any) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
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
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={dapValue}
                  onChange={(e) => {
                    setDapValue(e.target.value);
                  }}
                  input={<OutlinedInput />}
                  sx={{ width: 150 }}
                >
                  {dapItem.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
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
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={tmfValue}
                  onChange={(e) => {
                    setTmfValue(e.target.value);
                  }}
                  input={<OutlinedInput />}
                  sx={{ width: 150 }}
                >
                  {tmfItem.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
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
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={wcValue}
                  onChange={(e) => {
                    setWcValue(e.target.value);
                  }}
                  input={<OutlinedInput />}
                  sx={{ width: 150 }}
                >
                  {wcItem.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              <Divider />
            </Grid>
            <Grid item xs={12} sx={{}}>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                alignItems="center"
                sx={{ m: 1 }}
                justifyContent="flex-end"
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    onSave();
                  }}
                >
                  Save
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
