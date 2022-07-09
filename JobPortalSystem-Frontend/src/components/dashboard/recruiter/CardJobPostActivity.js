import * as React from "react";
import Paper from "@mui/material/Paper";
import { authApi, endpoints } from "../../../configs/Api";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import {
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CardJobSeekerApplied from "./CardSeekerApplied";

const CardJobPostActivity = () => {
  const user = useSelector((state) => state.user);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [selectJobPost, setSelectJobPost] = React.useState({
    id: null,
    jobName: "",
  });

  React.useEffect(() => {
    const loadJobPosts = async () => {
      try {
        const res = await authApi().get(endpoints["post-of-user"](user.id));

        if (res.status === 200) {
          setJobPosts(res.data);
          if (res.data.length > 0) {
            setSelectJobPost({
              ...selectJobPost,
              id: res.data[0].id,
              jobName: "",
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadJobPosts();
  }, []);

  return (
    <>
      <Paper
        sx={{ width: "100%", overflow: "hidden", boxShadow: 0, border: 0 }}
      >
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ fontWeight: "bold", fontSize: 18 }}
          >
            {selectJobPost.jobName}
          </Typography>
        </Box>
        <Box sx={{ py: 1.5 }}>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography
                variant="body1"
                gutterBottom
                color={"grey.600"}
                sx={{ mr: 1, mt: 1 }}
              >
                Lọc vị trí:
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <FormControl size="small" sx={{ width: "60%" }}>
                <Select
                  value={selectJobPost.id}
                  onChange={(event) =>
                    setSelectJobPost({
                      id: event.target.value,
                      jobName: ""
                    })
                  }
                  displayEmpty
                >
                  {jobPosts.map((jobPost) => (
                    <MenuItem value={jobPost.id}>{jobPost.job_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ border: 1, borderColor: "grey.200" }} />
        <Box sx={{ mt: 2 }}>
          <CardJobSeekerApplied idJobPost={selectJobPost.id} />
        </Box>
      </Paper>
    </>
  );
};

export default CardJobPostActivity;
