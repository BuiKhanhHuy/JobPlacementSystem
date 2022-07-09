import {
  Button,
  Fab,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Stack
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";

const CardSearch = ({ type }) => {
  const nav = useNavigate();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const careers = useSelector((state) => state.careers.careers);
  const cities = useSelector((state) => state.cities.cities);
  const experiences = useSelector((state) => state.experiences.experiences);
  const salaries = useSelector((state) => state.salaries.salaries);
  const positions = useSelector((state) => state.positions.positions);
  const workingForms = useSelector((state) => state.workingForms.workingForms);

  const formOptions = {
    defaultValues: {
      keyword: "",
      city: "",
      career: "",
      salary: "",
      position: "",
      experience: "",
      workingForm: "",
    },
  };

  const { handleSubmit, reset, control } = useForm(formOptions);

  const handleSearch = (data) => {
    if (type === "typeSearchPosts") {
      nav(
        `/?career_id=${data.career}&city_id=${data.city}&experience_id=${data.experience}&salary_id=${data.salary}&position_id=${data.position}&working_form_id=${data.workingForm}&kw=${data.keyword}`
      );
    } else if (type === "typeSearchJobSeekers") {
      nav(
        `/job-seeker-profiles/?career_id=${data.career}&city_id=${data.city}&experience_id=${data.experience}&salary_id=${data.salary}&position_id=${data.position}&working_form_id=${data.workingForm}&kw=${data.keyword}`
      );
    }
    console.log(data);
  };

  const handleReset = () => {
    reset();
    if (type === "typeSearchPosts") {
      nav(
        `/?career_id=&city_id=&experience_id=&salary_id=&position_id=&working_form_id=&kw=`
      );
    } else if (type === "typeSearchJobSeekers") {
      nav(
        `/job-seeker-profiles/?career_id=&city_id=&experience_id=&salary_id=&position_id=&working_form_id=&kw=`
      );
    }
  };

  const handleShowAndHide = () => {
    setAdvancedSearch(!advancedSearch);
  };

  console.log("CardSearch: render");
  return (
    <>
      <div style={{ padding: "20px 0 30px 0", backgroundColor: "#F7F7F7" }}>
        <form onSubmit={handleSubmit(handleSearch)} onReset={handleReset}>
          <Box sx={{ width: "90%", margin: "0 auto" }}>
            <Box sx={{ p: 4, bgcolor: "primary.main", borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
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
                            placeholder="Tìm kiếm ..."
                          />
                        </FormControl>
                      </Paper>
                    )}
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
                            displayEmpty
                            sx={{ maxHeight: 48 }}
                            {...field}
                          >
                            <MenuItem value="" key={0}>
                              <em>Tất cả ngành nghề</em>
                            </MenuItem>
                            {careers.map((career) => (
                              <MenuItem key={career.id} value={career.id}>
                                {career.career_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Paper>
                    )}
                    name="career"
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
                <Grid item xs={12} sm={12} md={2} align="center">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        margin: "auto",
                        maxHeight: 48,
                        width: { xs: "90%", sm: "90%", md: "100%", lg: "100%" },
                      }}
                      color="warning"
                      type="submit"
                    >
                      Tìm kiếm
                    </Button>
                    <Fab
                      size="medium"
                      sx={{
                        margin: "auto",
                        textAlign: "center",
                        maxHeight: 48,
                        maxWidth: 48,
                        borderRadius: 1,
                      }}
                      variant="extended"
                      color="info"
                      aria-label="filter"
                      onClick={handleShowAndHide}
                    >
                      {advancedSearch ? (
                        <FilterAltOffIcon sx={{ color: "background.paper" }} />
                      ) : (
                        <FilterAltIcon sx={{ color: "background.paper" }} />
                      )}
                    </Fab>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {advancedSearch && (
            <Box sx={{ width: "90%", margin: "0 auto" }}>
              <Box
                sx={{
                  p: 2,
                  mt: -2,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2}
                    sx={{ p: 1, my: "auto" }}
                    align="center"
                  >
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="GrayText"
                    >
                      Tìm kiếm nâng cao:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} sx={{ p: 1 }}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="standard"
                          id="experience"
                          select
                          size="small"
                          fullWidth
                          label="Kinh nghiệm"
                          defaultValue=""
                        >
                          <MenuItem value="" key={-1}>
                            Tất cả kinh nghiệm
                          </MenuItem>
                          {experiences.map((experience) => (
                            <MenuItem value={experience.id} key={experience.id}>
                              {experience.experience_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                      name="experience"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} sx={{ p: 1 }}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="standard"
                          id="salary"
                          select
                          size="small"
                          fullWidth
                          label="Mức lương"
                          defaultValue=""
                        >
                          <MenuItem value="" key={-1}>
                            Tất cả mức lương
                          </MenuItem>
                          {salaries.map((salary) => (
                            <MenuItem value={salary.id} key={salary.id}>
                              {salary.salary_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                      name="salary"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} sx={{ p: 1 }}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="standard"
                          id="position"
                          select
                          size="small"
                          fullWidth
                          label="Cấp bậc"
                          defaultValue=""
                        >
                          <MenuItem value="" key={-1}>
                            Tất cả cấp bậc
                          </MenuItem>
                          {positions.map((position) => (
                            <MenuItem value={position.id} key={position.id}>
                              {position.position_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                      name="position"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} sx={{ p: 1 }}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          variant="standard"
                          id="workingForm"
                          select
                          size="small"
                          fullWidth
                          label="Hình thức làm việc"
                          defaultValue=""
                        >
                          <MenuItem value="" key={-1}>
                            Tất cả hình thức làm việc
                          </MenuItem>
                          {workingForms.map((workingForm) => (
                            <MenuItem
                              value={workingForm.id}
                              key={workingForm.id}
                            >
                              {workingForm.working_form_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                      name="workingForm"
                      control={control}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2}
                    sx={{ p: 1, my: "auto" }}
                    align="center"
                  >
                    <Button size="small" type="reset">
                      Xóa chọn
                    </Button>{" "}
                    |
                    <Button
                      size="small"
                      color="error"
                      onClick={handleShowAndHide}
                    >
                      Đóng
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </form>
      </div>
    </>
  );
};
export default memo(CardSearch);
