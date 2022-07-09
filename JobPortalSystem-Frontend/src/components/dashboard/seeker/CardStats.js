import { Grid } from "@mui/material";
import CardTotal from "../../commons/CardTotal";
import AddTaskIcon from "@mui/icons-material/AddTask";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../configs/Api";
import { useSelector } from "react-redux";

const CardStats = (props) => {
  const [stats, setStats] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await authApi().get(
          endpoints["job-seeker-profiles-stats"](user.job_seeker_profile.id)
        );

        if (res.status === 200) {
          setStats(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadStats();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sx={12} sm={12} md={3} lg={3}>
          <CardTotal
            title="Việc làm cho bạn"
            value={stats ? stats.count_job : 0}
            icon={<CheckCircleOutlineIcon />}
            colorIcon="#ed6c02"
            discription="Số lượng việc làm có thể quan tâm"
          />
      </Grid>
      <Grid item sx={12} sm={12} md={3} lg={3}>
        <CardTotal
          title="Việc làm đã ứng tuyển"
          value={stats ? stats.count_applied_job : 0}
          icon={<AddTaskIcon />}
          colorIcon="#008000"
          discription="Số lượng việc làm bạn đã ứng tuyển"
        />
      </Grid>
      <Grid item sx={12} sm={12} md={3} lg={3}>
        <CardTotal
          title="Việc làm đã lưu"
          value={stats ? stats.count_save_job : 0}
          icon={<SaveIcon />}
          colorIcon="#1976d2"
          discription="Số lượng việc làm đã lưu"
        />
      </Grid>

      <Grid item sx={12} sm={12} md={3} lg={3}>
        <CardTotal
          title="Lượt xem hồ sơ"
          value={stats ? stats.count_view_profile : 0}
          icon={<VisibilityIcon />}
          colorIcon="#f656bc"
          discription="Số lượt xem hồ sơ của bạn"
        />
      </Grid>
    </Grid>
  );
};
export default CardStats;
