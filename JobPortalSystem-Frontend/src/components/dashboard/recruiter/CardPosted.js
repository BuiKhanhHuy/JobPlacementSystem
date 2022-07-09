import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarExport,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Button, Chip, Tooltip } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useDispatch, useSelector } from "react-redux";
import { authApi, endpoints } from "../../../configs/Api";
import alertOpen from "../../../store/actions/AlertCreator";
import EditJobPost from "./EditJobPost";
import ViewJobPost from "./ViewJobPost";
import CustomPagination from "../../commons/CustomDataGridCard/CustomPagination";
import renderCellExpand from "../../commons/CustomDataGridCard/RenderCellExpand";
import CustomNoRowsOverlay from "../../commons/CustomDataGridCard/CustomNoRowsOverlay";

const RenderDate = (props) => {
  const { value } = props;

  return (
    <strong>
      {value && (
        <Chip
          variant="filled"
          color="error"
          size="small"
          label="Tuyển gấp"
          icon={<ElectricBoltIcon />}
          sx={{ fontSize: 11 }}
        />
      )}
    </strong>
  );
};

const CardPosted = () => {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [openViewJobPost, setOpenViewJobPost] = React.useState({
    isOpen: false,
    jobPostId: null,
  });
  const [openEditJobPost, setOpenEditJobPost] = React.useState({
    isOpen: false,
  });
  const [flag, setFlag] = React.useState(false);
  const user = useSelector((state) => state.user);
  const [isloadingJobPosted, setIsLoadingJobPosted] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);

  React.useEffect(() => {
    const loadJobPosts = async () => {
      setIsLoadingJobPosted(true);
      try {
        const res = await authApi().get(endpoints["post-of-user"](user.id));

        if (res.status === 200) {
          setJobPosts(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingJobPosted(false);
      }
    };

    loadJobPosts();
  }, [user, flag]);

  // xoa tat ca bai dang dang chon
  const onDeleteAllPosted = () => {
    var formData = new FormData();
    formData.append("job_posts_id_del", selectionModel);

    const deleteJobPosts = async () => {
      try {
        const res = await authApi().post(
          endpoints["posted-of-user"](user.id),
          formData
        );

        if (res.status === 204) {
          // thong bao xoa thanh cong
          dispatch(alertOpen("success", "Đã xóa thành công"));
          setFlag(!flag);
        }
      } catch (err) {
        // thong bao xoa that bai
        dispatch(alertOpen("error", "Xóa tin tuyển dụng thất bại"));
      }
    };

    confirm({
      title: "Bạn có chắc chắn muốn xóa những tin tuyển dụng này không?",
      description: "Dữ liệu các tin tuyển dụng này sẽ được xóa vĩnh viễn",
      confirmationText: "Có",
      cancellationText: "Không",
    })
      .then(() => deleteJobPosts())
      .catch((err) => console.error(err));
  };

  // xoa bai dang
  const onDeletePosted = React.useCallback(
    (id) => () => {
      const deleteposted = async () => {
        try {
          const res = await authApi().delete(
            endpoints["job-posts-retrieve"](id)
          );

          if (res.status === 204) {
            // thong bao xoa thanh cong
            dispatch(
              alertOpen("success", "Đã xóa thành công tin tuyển dụng này")
            );
            setFlag(!flag);
          }
        } catch (err) {
          // thong bao xoa khong thanh cong
          dispatch(alertOpen("error", "Xóa tin tuyển dụng thất bại"));
          console.error(err);
        }
      };

      confirm({
        title: "Bạn có chắc chắn muốn xóa tin tuyển dụng này không?",
        description: "Dữ liệu tin tuyển dụng này sẽ được xóa vĩnh viễn",
        confirmationText: "Có",
        cancellationText: "Không",
      })
        .then(() => deleteposted())
        .catch((err) => console.error(err));
    },
    [flag]
  );

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ mb: 1 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport
          csvOptions={{
            fileName: "Danh-sach-tin-tuyen-dung",
            utf8WithBom: true,
          }}
        />
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          variant="outlined"
          sx={{ ml: 2 }}
          disabled={selectionModel.length === 0}
          onClick={onDeleteAllPosted}
        >
          Xóa tất cả
        </Button>
        <GridToolbarQuickFilter
          sx={{ marginLeft: "auto" }}
          placeholder="Tìm kiếm..."
        />
      </GridToolbarContainer>
    );
  }

  const columns = React.useMemo(
    () => [
      {
        field: "job_name",
        headerName: "Tên công việc",
        width: 360,
        renderHeader: () => <strong>{"Tên công việc"}</strong>,
        renderCell: renderCellExpand,
      },
      {
        field: "created_date",
        headerName: "Ngày đăng",
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
        width: 130,
        renderHeader: () => <strong>{"Ngày đăng"}</strong>,
      },
      {
        field: "updated_date",
        headerName: "Ngày cập nhật",
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
        width: 130,
        renderHeader: () => <strong>{"Ngày cập nhật"}</strong>,
      },
      {
        field: "deadline",
        headerName: "Hạn nộp",
        valueGetter: ({ value }) => value && new Date(value),
        type: "date",
        width: 100,
        renderHeader: () => <strong>{"Hạn nộp"}</strong>,
      },
      {
        field: "view",
        headerName: "Lượt xem",
        width: 100,
        renderHeader: () => <strong>{"Lượt xem"}</strong>,
      },
      {
        field: "is_urgent_job",
        headerName: "Trạng thái",
        renderCell: RenderDate,
        type: "boolean",
        width: 100,
        renderHeader: () => <strong>{"Trạng thái"}</strong>,
      },
      {
        field: "actions",
        headerName: "Hành động",
        type: "actions",
        width: 150,
        renderHeader: () => <strong>{"Hành động"}</strong>,
        getActions: (params) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Xem chi tiết bài đăng" arrow>
                <RemoveRedEyeIcon color="primary" />
              </Tooltip>
            }
            label="View"
            onClick={() =>
              setOpenViewJobPost({
                ...openViewJobPost,
                isOpen: true,
                jobPostId: params.id,
              })
            }
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Chỉnh sửa bài đăng" arrow>
                <EditIcon color="secondary" />
              </Tooltip>
            }
            label="Edit"
            onClick={() =>
              setOpenEditJobPost({
                ...openEditJobPost,
                isOpen: true,
                jobPostId: params.id,
              })
            }
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Xóa bài đăng" arrow>
                <DeleteIcon color="error" />
              </Tooltip>
            }
            label="Delete"
            onClick={onDeletePosted(params.id)}
          />,
        ],
      },
    ],
    [onDeletePosted]
  );

  return (
    <div style={{ height: 480, width: "100%" }}>
      <DataGrid
        rows={jobPosts}
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
        loading={isloadingJobPosted}
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
      {/* View  */}
      <ViewJobPost
        openViewJobPost={openViewJobPost}
        setOpenViewJobPost={setOpenViewJobPost}
      />
      {/* Edit */}
      <EditJobPost
        openEditJobPost={openEditJobPost}
        setOpenEditJobPost={setOpenEditJobPost}
      />
    </div>
  );
};

export default CardPosted;
