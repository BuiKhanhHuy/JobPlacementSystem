import * as React from "react";
import { useDialog } from "react-mui-dialog";
import { authApi, endpoints } from "../../../configs/Api";

import EmailIcon from "@mui/icons-material/Email";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarExport,
  useGridApiContext,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Chip,
  FormControl,
  MenuItem,
  Tooltip,
  Button,
} from "@mui/material";
import Select from "@mui/material/Select";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import alertOpen from "../../../store/actions/AlertCreator";
import CustomPagination from "../../commons/CustomDataGridCard/CustomPagination";
import CustomNoRowsOverlay from "../../commons/CustomDataGridCard/CustomNoRowsOverlay";
import FormSendMailToAppliedSeeker from "../../forms/FormSendMailToAppliedSeeker";
import FormNotifyDialog from "../../forms/FormNotifyDialog";

const RenderStatus = (props) => {
  const { value } = props;

  return value === 0 ? (
    <Chip
      variant="outlined"
      color="warning"
      size="small"
      label="Chưa xác nhận"
      icon={<DoNotDisturbIcon />}
    />
  ) : value === 1 ? (
    <Chip
      variant="outlined"
      color="success"
      size="small"
      label="Đạt yêu cầu"
      icon={<CheckIcon />}
    />
  ) : (
    <Chip
      variant="outlined"
      color="error"
      size="small"
      label="Chưa đạt yêu cầu"
      icon={<ClearIcon />}
    />
  );
};

function SelectEditStatus(props) {
  const dispatch = useDispatch();
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    const updateStatusAppliedJob = async () => {
      try {
        const res = await authApi().patch(endpoints["job-post-activity"](id), {
          status: event.target.value,
        });
        if (res.status === 200) {
          await apiRef.current.setEditCellValue({
            id,
            field,
            value: event.target.value,
          });
          // apiRef.current.stopCellEditMode({ id, field });
        }
      } catch (err) {
        dispatch(alertOpen("error", "Cập nhật trạng thái thất bại."));
      }
    };

    updateStatusAppliedJob();
  };

  return (
    <FormControl fullWidth>
      <Select
        id="select-status"
        value={value}
        onChange={handleChange}
        label="Trạng thái"
      >
        <MenuItem sx={{ color: "#ed6c02" }} value={0}>
          <FontAwesomeIcon icon={faBan} style={{ marginRight: 5 }} /> Chưa xác
          nhận
        </MenuItem>
        <MenuItem sx={{ color: "#2e7d32" }} value={1}>
          <FontAwesomeIcon icon={faCheck} style={{ marginRight: 5 }} />
          Đạt yêu cầu
        </MenuItem>
        <MenuItem sx={{ color: "#d32f2f" }} value={2}>
          <FontAwesomeIcon icon={faX} style={{ marginRight: 5 }} /> Chưa đạt yêu
          cầu
        </MenuItem>
      </Select>
    </FormControl>
  );
}

const renderSelectEditStatusCell = (params) => {
  return <SelectEditStatus {...params} />;
};

const CardJobSeekerApplied = (props) => {
  const { openDialog, closeDialog } = useDialog();
  const { idJobPost } = props;
  const [selectionModel, setSelectionModel] = React.useState([]);
  const nav = useNavigate();
  const [isLoadingSeeker, setIsLoadingSeeker] = React.useState(false);
  const [appliedJob, setAppliedJob] = React.useState([]);

  React.useEffect(() => {
    const loadSeekers = async () => {
      setIsLoadingSeeker(true);
      try {
        const res = await authApi().get(
          endpoints["applied-job-post"](idJobPost)
        );

        if (res.status === 200) {
          // thanh cong
          let datas = [];
          res.data.forEach((d) => {
            datas.push({
              id: d.id,
              seeker_id: d.seeker.id,
              job_seeker_profile_id: d.seeker.job_seeker_profile.id,
              full_name: d.seeker.job_seeker_profile
                ? d.seeker.job_seeker_profile.full_name
                : "Không có dữ liệu",
              phone_number: d.seeker.job_seeker_profile
                ? d.seeker.job_seeker_profile.phone_number
                : "Không có dữ liệu",
              email: d.seeker.email,
              avatar: d.seeker.avatar,
              apply_date: d.apply_date,
              status: d.status,
            });
          });
          setAppliedJob(datas);
        }
      } catch (err) {
        // that bai
        console.error(err);
      } finally {
        setIsLoadingSeeker(false);
      }
    };

    if (idJobPost !== null && idJobPost !== undefined) loadSeekers();
  }, [idJobPost]);

  // gui mail thanh cong
  const handleSuccess = () => {
    return openDialog({
      customContent: (
        <FormNotifyDialog
          onCancel={closeDialog}
          isSuccess={true}
          description="Email đã được gửi thành công đến ứng viên"
        />
      )
    });
  };

  // gui mai cho tat ca ung vien
  const onSendEmail = () => {
    return openDialog({
      customContent: (
        <FormSendMailToAppliedSeeker
          onCancel={closeDialog}
          onSucces={handleSuccess}
          selectJobPostsActivityId={selectionModel}
        />
      ),
    });
  };

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
        <Button
          size="small"
          color="secondary"
          startIcon={<EmailIcon />}
          variant="outlined"
          sx={{ ml: 2 }}
          disabled={selectionModel.length === 0}
          onClick={onSendEmail}
        >
          Gửi mail
        </Button>
        <GridToolbarQuickFilter
          sx={{ marginLeft: "auto" }}
          placeholder="Tìm kiếm..."
        />
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "avatar",
      headerName: "Hình ảnh",
      width: 80,
      renderCell: (params) => (
        <Avatar src={params.row.avatar} alt={params.row.full_name} />
      ),
    },
    {
      field: "full_name",
      headerName: "Họ và tên",
      width: 250,
      renderHeader: () => <strong>{"Họ và tên"}</strong>,
    },
    {
      field: "phone_number",
      headerName: "Số điện thoại",
      width: 120,
      renderHeader: () => <strong>{"Số điện thoại"}</strong>,
    },
    {
      field: "email",
      headerName: "Email",
      width: 240,
      renderHeader: () => <strong>{"Email"}</strong>,
    },
    {
      field: "apply_date",
      headerName: "Ngày ứng tuyển",
      width: 130,
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      renderHeader: () => <strong>{"Ngày ứng tuyển"}</strong>,
    },
    {
      field: "status",
      headerName: "Trạng thái tuyển dụng",
      width: 180,
      renderHeader: () => <strong>{"Trạng thái tuyển dụng"}</strong>,
      renderEditCell: renderSelectEditStatusCell,
      renderCell: RenderStatus,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Hành động",
      type: "actions",
      width: 90,
      renderHeader: () => <strong>{"Hành động"}</strong>,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Xem chi tiết tin tuyển dụng" arrow>
              <RemoveRedEyeIcon color="primary" />
            </Tooltip>
          }
          label="View"
          onClick={() =>
            nav(`/job-seeker-profiles/${params.row.job_seeker_profile_id}/`)
          }
        />,
      ],
    },
  ];

  return (
    <>
      <div style={{ height: 480, width: "100%" }}>
        <DataGrid
          rows={appliedJob}
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
          loading={isLoadingSeeker}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
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
    </>
  );
};

export default React.memo(CardJobSeekerApplied);
