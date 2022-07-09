import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardExperienceDetail from "./CardExperienceDetail";
import { authApi, endpoints } from "../../../configs/Api";
import Loading from "../../commons/Loading";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CardExperienceDetailList = () => {
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.user);
  const [isLoadingExperieceList, setIsLoadingExperieceList] = useState(true);
  const [flag, setFlag] = useState(false);
  const [experienceDetailList, setExperienceDetailList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadExperienceDetailList = async () => {
      try {
        const res = await authApi().get(
          endpoints["experience-detail"](user.job_seeker_profile.id)
        );

        if (res.status === 200) {
          setExperienceDetailList(res.data);
          setIsLoadingExperieceList(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadExperienceDetailList();
    console.log("Load: loadExperienceDetailList");
  }, [flag]);

  // update khi thay doi du lieu
  const updateExperienceDetailList = () => {
    setFlag(!flag);
  };

  console.log("ExperienceDetailList: render");

  return (
    <Box sx={{ width: "100%" }}>
      {isLoadingExperieceList && experienceDetailList.length === 0 ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              {experienceDetailList.map((ex, index) => (
                <Tab label={`Kinh nghiệm ${index + 1}`} {...a11yProps(index)} />
              ))}
              <Tab
                label={`+ Thêm mới`}
                {...a11yProps(experienceDetailList.length)}
              />
            </Tabs>
          </Box>
          {experienceDetailList.map((experience, idx) => (
            <TabPanel value={value} index={idx}>
              <CardExperienceDetail
                index={idx}
                experienceDetail={experience}
                handleUpdate={updateExperienceDetailList}
              />
            </TabPanel>
          ))}
          <TabPanel value={value} index={experienceDetailList.length}>
            <CardExperienceDetail
              index={experienceDetailList.length}
              experienceDetail={{
                id: "",
                job_name: "",
                job_position: "",
                start_date: "",
                end_date: "",
                company_name: "",
                description: "",
              }}
              handleUpdate={updateExperienceDetailList}
              type="add"
              jobSeekerProfileId={user.job_seeker_profile.id}
            />
          </TabPanel>
        </>
      )}
    </Box>
  );
};

export default CardExperienceDetailList;
