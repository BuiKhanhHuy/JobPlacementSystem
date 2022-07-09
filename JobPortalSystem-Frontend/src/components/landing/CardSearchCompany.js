import {
  Button,
  Fab,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

const CardSearchCompany = () => {
  const nav = useNavigate();
  const cities = useSelector((state) => state.cities.cities);

  const formOptions = {
    defaultValues: {
      keyword: "",
      city: "",
    },
  };

  const { handleSubmit, reset, control } = useForm(formOptions);

  const handleSearch = (data) => {
    nav(`/companies/?city_id=${data.city}&kw=${data.keyword}`);
  };

  const handleReset = () => {
    reset();
    nav(`/companies/`);
  };

  console.log("CardSearchCompany: render");
  return (
    <>
      <div style={{ padding: "20px 0 30px 0", backgroundColor: "#F7F7F7" }}>
        <Box sx={{ width: "90%", margin: "0 auto" }}>
          <form
            onSubmit={handleSubmit(handleSearch)}
            onReset={() => handleReset()}
          >
            <Box sx={{ p: 4, bgcolor: "primary.main", borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={7}>
                  <Controller
                    render={({ field }) => (
                      <Paper>
                        <FormControl fullWidth>
                          <OutlinedInput
                            {...field}
                            sx={{ maxHeight: 48 }}
                            startAdornment={
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            }
                            placeholder="Nhập tên công ty cần tìm ..."
                          />
                        </FormControl>
                      </Paper>
                    )}
                    id="keyword"
                    name="keyword"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Controller
                    render={({ field }) => (
                      <Paper>
                        <FormControl fullWidth>
                          <Select
                            sx={{ maxHeight: 48 }}
                            displayEmpty
                            {...field}
                          >
                            <MenuItem value="" key={0}>
                              <em>Tất cả địa điểm</em>
                            </MenuItem>
                            {cities.map((city) => (
                              <MenuItem key={city.id} value={city.id}>
                                {city.city_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Paper>
                    )}
                    name="city"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        margin: "auto 0",
                        maxHeight: 48,
                        width: { xs: "90%", sm: "90%", md: "100%", lg: "100%" },
                      }}
                      color="warning"
                      type="submit"
                    >
                      Tìm kiếm
                    </Button>
                    <Fab
                      color="primary"
                      aria-label="delete"
                      size="small"
                      type="reset"
                      sx={{ borderRadius: 1,  minWidth: 48,}}
                    >
                      <DeleteIcon />
                    </Fab>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </div>
    </>
  );
};
export default memo(CardSearchCompany);
