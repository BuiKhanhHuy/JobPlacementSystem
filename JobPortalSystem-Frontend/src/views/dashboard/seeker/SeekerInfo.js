import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, Divider, Grid, Stack } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
// components
import CardJobSeekerProfile from "../../../components/dashboard/seeker/CardJobSeekerProfile";
import CardDisiredJob from "../../../components/dashboard/seeker/CardDesiredJob";
import CardEducationDetail from "../../../components/dashboard/seeker/CardEducationDetail";
import CardExperienceDetailList from "../../../components/dashboard/seeker/CardExperienceDetailList";
import { useSelector } from "react-redux";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  console.log("SeekerInfo: render");

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const SeekerInfo = () => {
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Hồ sơ xin việc online
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          width: "100%",
          boxShadow: 2,
        }}
      >
        <Grid container>
          <Grid item md={2} sm={12} xs={12}>
            <Box style={{ padding: "25px" }}>
              <Typography
                style={{ fontSize: "1rem", textAlign: "center" }}
                variant="subtitle2"
                gutterBottom
                component="div"
              >
                Hồ sơ của bạn
              </Typography>
              <Stack
                direction="row-reverse"
                spacing={2}
                sx={{ margin: "auto" }}
                justifyContent="center"
              >
                <Avatar
                  src={user.avatar ? user.avatar : user.username}
                  sx={{
                    width: 120,
                    height: 120,
                    backgroundColor: "grey.100",
                  }}
                />
              </Stack>
              <Divider style={{ marginTop: "20px" }} />
            </Box>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab
                style={{
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "normal",
                }}
                component="h1"
                label="Thông tin hồ sơ"
                {...a11yProps(0)}
              />
              <Tab
                style={{
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "normal",
                }}
                component="h1"
                label="Công việc mong muốn"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "normal",
                }}
                component="h1"
                label="Bằng cấp học vấn"
                {...a11yProps(2)}
              />
              <Tab
                style={{
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "normal",
                }}
                component="h1"
                label="Kinh nghiệm làm việc"
                {...a11yProps(3)}
              />
            </Tabs>
          </Grid>
          <Grid item md={10} sm={12} xs={12}>
            <TabPanel value={value} index={0}>
              <div
                style={{
                  fontWeight: "bold",
                  color: "#0000ee",
                  marginBottom: "32px",
                }}
              >
                | Thông tin hồ sơ
              </div>
              <CardJobSeekerProfile />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div
                style={{
                  fontWeight: "bold",
                  color: "#0000ee",
                  marginBottom: "32px",
                }}
              >
                | Công việc mong muốn
              </div>
              <CardDisiredJob />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div
                style={{
                  fontWeight: "bold",
                  color: "#0000ee",
                  marginBottom: "32px",
                }}
              >
                | Bằng cấp học vấn
              </div>
              <CardEducationDetail />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <div
                style={{
                  fontWeight: "bold",
                  color: "#0000ee",
                  marginBottom: "32px",
                }}
              >
                | Kinh nghiệm làm việc
              </div>
              <CardExperienceDetailList />
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SeekerInfo;
