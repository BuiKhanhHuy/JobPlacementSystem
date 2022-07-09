import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { Button, Tooltip } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useDispatch, useSelector } from "react-redux";
import { authApi, endpoints } from "../../../configs/Api";
import { useNavigate } from "react-router-dom";
import alertOpen from "../../../store/actions/AlertCreator";
import renderCellExpand from "../../commons/CustomDataGridCard/RenderCellExpand";
import CustomPagination from "../../commons/CustomDataGridCard/CustomPagination";
import CustomNoRowsOverlay from "../../commons/CustomDataGridCard/CustomNoRowsOverlay";

const CardSaveJobPost = () => {
  const nav = useNavigate();
  const [selectionModel, setSelectionModel] = React.useState([]);
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [flag, setFlag] = React.useState(false);
  const user = useSelector((state) => state.user);
  const [isLoadingSaveJobPosts, setIsLoadingSaveJobPosts] =
    React.useState(true);
  const [saveJobPosts, setSaveJobPosts] = React.useState([]);

  React.useEffect(() => {
    const loadSaveJobPosts = async () => {
      setIsLoadingSaveJobPosts(true);

      try {
        const res = await authApi().get(
          endpoints["user-save-job-posts"](user.id)
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
              saved_date: d.updated_date,
            });
          });
          setSaveJobPosts(datas);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingSaveJobPosts(false);
      }
    };

    loadSaveJobPosts();
  }, [user, flag]);

  // xoa tat ca bai dang dang chon
  const onDeleteAllSavedPostes = () => {
    var formData = new FormData();
    formData.append("save_job_posts_id_del", selectionModel);

    const deleteSaveJobPosts = async () => {
      try {
        const res = await authApi().post(
          endpoints["user-save-job-posted"](user.id),
          formData
        );

        if (res.status === 204) {
          // thong bao xoa thanh cong
          dispatch(alertOpen("success", "Đã xóa thành công"));
          setFlag(!flag);
        }
      } catch (err) {
        // thong bao xoa that bai
        dispatch(alertOpen("error", "Xóa tin tuyển dụng đã lưu thất bại"));
      }
    };

    confirm({
      title: "Bạn có chắc chắn muốn xóa những tin tuyển dụng đã lưu này không?",
      description: "Dữ liệu các tin tuyển dụng đã lưu này sẽ được xóa vĩnh viễn",
      confirmationText: "Có",
      cancellationText: "Không",
    })
      .then(() => deleteSaveJobPosts())
      .catch((err) => console.error(err));
  };

  // xoa bai dang
  const onDeleteSavedPosts = React.useCallback(
    (id) => () => {
      const deleteSavedPosts = async () => {
        setIsLoadingSaveJobPosts(true);

        try {
          const res = await authApi().delete(endpoints["save-job-posts"](id));

          if (res.status === 204) {
            // thong bao xoa thanh cong
            dispatch(
              alertOpen("success", "Đã xóa thành công tin tuyển dụng đã lưu")
            );
            setFlag(!flag);
          }
        } catch (err) {
          // thong bao xoa khong thanh cong
          dispatch(alertOpen("error", "Xóa tin tuyển dụng đã lưu thất bại"));
          console.error(err);
        } finally {
          setIsLoadingSaveJobPosts(false);
        }
      };

      confirm({
        title: "Bạn có chắn chắc xóa tin tuyển dụng đã lưu này?",
        description: "Tin tuyển dụng đã lưu này sẽ được xóa vĩnh viễn",
        confirmationText: "Có",
        cancellationText: "Không",
      })
        .then(() => deleteSavedPosts())
        .catch((err) => console.error(err));
      //   };
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
            fileName: "Danh-sach-tin-tuyen-dung-da-luu",
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
          onClick={onDeleteAllSavedPostes}
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
        width: 200,
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
        width: 140,
        renderHeader: () => <strong>{"Địa điểm"}</strong>,
      },
      {
        field: "salary",
        headerName: "Mức lương",
        width: 130,
        renderHeader: () => <strong>{"Mức lương"}</strong>,
      },
      {
        field: "deadline",
        headerName: "Hạn nộp",
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
        width: 130,
        renderHeader: () => <strong>{"Hạn nộp"}</strong>,
      },
      {
        field: "saved_date",
        headerName: "Ngày lưu",
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
        width: 130,
        renderHeader: () => <strong>{"Ngày lưu"}</strong>,
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
              <Tooltip title="Xem chi tiết tin tuyển dụng" arrow>
                <RemoveRedEyeIcon color="primary" />
              </Tooltip>
            }
            label="View"
            onClick={() => nav(`/job-posts/${params.row.job_post_id}/`)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Xóa tin tuyển dụng đã lưu" arrow>
                <DeleteIcon color="error" />
              </Tooltip>
            }
            label="Delete"
            onClick={onDeleteSavedPosts(params.id)}
          />,
        ],
      },
    ],
    [onDeleteSavedPosts]
  );

  return (
    <div style={{ height: 480, width: "100%" }}>
      <DataGrid
        rows={saveJobPosts}
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
        loading={isLoadingSaveJobPosts}
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
  );
};

export default CardSaveJobPost;
