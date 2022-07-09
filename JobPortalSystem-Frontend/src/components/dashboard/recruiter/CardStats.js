import { Grid } from "@mui/material";
import CardTotal from "../../commons/CardTotal";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TodayIcon from "@mui/icons-material/Today";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authApi, endpoints } from "../../../configs/Api";

const CardStats = (props) => {
  const [stats, setStats] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadStats = async () => {

      try {
        const res = await authApi().get(
          endpoints["company-stats"](user.company)
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
    <Grid container spacing={3}>
      <Grid item sx={12} sm={12} md={3}>
        <CardTotal
          title="Ứng viên cho bạn"
          value={stats ? stats.count_job_seeker_profile : 0}
          icon={<TodayIcon />}
          colorIcon="#ed6c02"
          discription="Số lượng ứng viên"
        />
      </Grid>
      <Grid item sx={12} sm={12} md={3}>
        <CardTotal
          title="Tin tuyển dụng còn hạn"
          value={stats ? stats.count_job_post_due : 0}
          icon={<AssignmentTurnedInIcon />}
          colorIcon="#008000"
          discription="Số lượng tin tuyển dụng còn hạn"
        />
      </Grid>
      <Grid item sx={12} sm={12} md={3}>
        <CardTotal
          title="Tin đã đăng"
          value={stats ? stats.count_job_post : 0}
          icon={<AssignmentIcon />}
          colorIcon="#1976d2"
          discription="Số lượng tin đã đăng"
        />
      </Grid>

      <Grid item sx={12} sm={12} md={3}>
        <CardTotal
          title="Lượt xem hồ sơ"
          value={stats ? stats.count_view_company_profile : 0}
          icon={<VisibilityIcon />}
          colorIcon="#f656bc"
          discription="Số lượt xem hồ sơ công ty của bạn"
        />
      </Grid>
    </Grid>
  );
};
export default CardStats;
