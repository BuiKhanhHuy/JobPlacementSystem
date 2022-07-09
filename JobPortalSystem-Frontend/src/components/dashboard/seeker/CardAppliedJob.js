import * as React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarExport,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { authApi, endpoints } from "../../../configs/Api";
import { useNavigate } from "react-router-dom";
import { Chip, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import renderCellExpand from "../../commons/CustomDataGridCard/RenderCellExpand";
import CustomPagination from "../../commons/CustomDataGridCard/CustomPagination";
import CustomNoRowsOverlay from "../../commons/CustomDataGridCard/CustomNoRowsOverlay";

const RenderStatus = (props) => {
  const { value } = props;

  return (
    <strong>
      <Chip
        variant="filled"
        color={value === 0 ? "warning" : value === 1 ? "success" : "error"}
        size="small"
        label={
          value === 0
            ? "Chưa xác nhận"
            : value === 1
            ? "Đạt yêu cầu"
            : "Chưa đạt yêu cầu"
        }
        sx={{ fontSize: 11, fontStyle: "normal" }}
      />
    </strong>
  );
};

const CardAppliedJob = () => {
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const [isLoadingApplyJobPosts, setIsLoadingApplyJobPosts] =
    React.useState(true);
  const [appliedJobPost, setAppliedJobPost] = React.useState([]);

  React.useEffect(() => {
    const loadAppliedJobPosts = async () => {
      setIsLoadingApplyJobPosts(true);

      try {
        const res = await authApi().get(
          endpoints["user-applied-job-posts"](user.id)
        );

        if (res.status === 200) {
          let datas = [];
          res.data.forEach((d) => {
            datas.push({
              id: d.id,
              job_post_id: d.job_post.id,
              job_name: d.job_post ? d.job_post.job_name : "Không có dữ liệu",
              company_name: d.job_post.recruiter.company.company_name,
              city: d.job_post.city.city_name,
              salary: d.job_post.salary.salary_name,
              deadline: d.job_post.deadline,
              applied_date: d.apply_date,
              status: d.status,
            });
          });
          setAppliedJobPost(datas);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingApplyJobPosts(false);
      }
    };

    loadAppliedJobPosts();
  }, [user]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ mb: 1 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport
          csvOptions={{
            fileName: "Danh-sach-viec-lam-da-ung-tuyen",
            utf8WithBom: true,
          }}
        />
        <GridToolbarQuickFilter
          sx={{ marginLeft: "auto" }}
          placeholder="Tìm kiếm..."
        />
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "job_name",
      headerName: "Tên công việc",
      width: 250,
      renderHeader: () => <strong>{"Tên công việc"}</strong>,
      renderCell: renderCellExpand,
    },
    {
      field: "company_name",
      headerName: "Tên công ty",
      width: 200,
      renderHeader: () => <strong>{"Tên công ty"}</strong>,
      renderCell: renderCellExpand,
    },
    {
      field: "city",
      headerName: "Địa điểm",
      width: 120,
      renderHeader: () => <strong>{"Địa điểm"}</strong>,
    },
    {
      field: "salary",
      headerName: "Mức lương",
      width: 100,
      renderHeader: () => <strong>{"Mức lương"}</strong>,
    },
    {
      field: "deadline",
      headerName: "Hạn nộp",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      width: 90,
      renderHeader: () => <strong>{"Hạn nộp"}</strong>,
    },
    {
      field: "applied_date",
      headerName: "Ngày ứng tuyển",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      width: 130,
      renderHeader: () => <strong>{"Ngày ứng tuyển"}</strong>,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      renderCell: RenderStatus,
      renderHeader: () => <strong>{"Trạng thái"}</strong>,
    },
    {
      field: "actions",
      headerName: "Hành động",
      type: "actions",
      width: 100,
      renderHeader: () => <strong>{"Hành động"}</strong>,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Xem chi tiết tin tuyển dụng" arrow>
              <RemoveRedEyeIcon color="primary" />
            </Tooltip>
          }
          label="View"
          onClick={() => nav(`/job-posts/${params.row.job_post_id}/`)}
        />,
      ],
    },
  ];

  return (
    <div style={{ height: 480, width: "100%" }}>
      <DataGrid
        rows={appliedJobPost}
        columns={columns}
        sx={{
          "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
            py: 1,
          },
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
            py: "15px",
          },
          "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
            py: "22px",
          },
        }}
        loading={isLoadingApplyJobPosts}
        checkboxSelection={false}
        components={{
          Toolbar: CustomToolbar,
          Pagination: CustomPagination,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        density="standard"
        pageSize={6}
      />
    </div>
  );
};

export default CardAppliedJob;
