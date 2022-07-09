import Picture from "../../../assets/picture.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Button,
  CardMedia,
  Divider,
  Fab,
  Fade,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { PhotoCamera } from "@mui/icons-material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../configs/Api";
import alertOpen from "../../../store/actions/AlertCreator";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

const Input = styled("input")({
  display: "none",
});

const CompnanyImage = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [changeFlag, setChangeFlag] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [companyImages, setCompanyImage] = useState([]);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    } else {
      setImageUrl(null);
    }
  }, [selectedImage]);

  useEffect(() => {
    const loadCompaniesImage = async () => {
      try {
        const res = await authApi().get(
          endpoints["company-images"](user.company)
        );

        if (res.status === 200) {
          setCompanyImage(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user.company !== null) {
      loadCompaniesImage();
    }
  }, [changeFlag]);

  const OnUploadImage = () => {
    setIsLoadingSave(true);

    const upLoadImage = async () => {
      var formData = new FormData();
      formData.append("image_url", selectedImage);

      try {
        const res = await authApi().post(
          endpoints["company-image"](user.company),
          formData
        );

        if (res.status === 201) {
          // thong bao them thanh cong
          dispatch(alertOpen("success", "Thêm hình ảnh công ty thành công"));
          setChangeFlag(!changeFlag);
          setSelectedImage(null);
          setIsLoadingSave(false);
        }
      } catch (err) {
        // thong bao them that bai
        dispatch(alertOpen("error", "Thêm hình ảnh công ty không thành công"));
        setIsLoadingSave(false);
        console.error(err);
      }
    };

    if (user.company !== null) {
      upLoadImage();
    }
  };

  const OndeleteCompanyImage = (imageCompanyId) => {
    const deleteCompanyImage = async () => {
      try {
        const res = await authApi().delete(
          endpoints["image-companies"](imageCompanyId)
        );

        if (res.status === 204) {
          // thong bao xoa thanh cong
          dispatch(alertOpen("success", "Đã xóa thành công 1 ảnh"));
          setChangeFlag(!changeFlag);
        }
      } catch (err) {
        // thong bao xoa khong thanh cong
        dispatch(alertOpen("error", "Xóa ảnh không thành công"));
        console.error(err);
      }
    };

    if (imageCompanyId !== null && imageCompanyId !== undefined) {
      confirm({
        title: "Bạn có chắc chắn xóa hình ảnh này?",
        description: "Hình ảnh này sẽ được xóa vĩnh viễn",
        confirmationText: "Có",
        cancellationText: "Không",
      })
        .then(() => deleteCompanyImage())
        .catch((err) => console.error(err));
    }
  };

  let progressUploading = isLoadingSave ? (
    <LinearProgress color="primary" />
  ) : (
    ""
  );

  console.log("CompanyImage: render");

  return (
    <>
      <Typography variant="h6" pb={1} gutterBottom component="div">
        || Hình ảnh về công ty
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: "32px",
          boxShadow: 3,
        }}
      >
        <Box sx={{ p: 2, border: 1, borderColor: "grey.200", borderRadius: 1 }}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Tooltip title="Hủy bỏ hình đã chọn" placement="bottom">
              <Fab
                aria-label="delete"
                color="error"
                disabled={isLoadingSave || selectedImage === null}
                size="small"
                sx={{ mb: -3, ml: -2 }}
                onClick={() => setSelectedImage(null)}
              >
                <ClearIcon />
              </Fab>
            </Tooltip>
          </Stack>
          <Box
            sx={{
              width: 300,
              height: 300,
              border: 1,
              borderColor: "grey.500",
              borderRadius: 1,
              backgroundImage: `url(${Picture})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {imageUrl && selectedImage && (
              <Avatar
                variant="square"
                src={imageUrl}
                sx={{ width: "100%", height: "100%" }}
              />
            )}
            {progressUploading}
          </Box>
          <Box
            sx={{
              display: "flex",
              my: 2,
            }}
          >
            <label htmlFor="contained-button-file" sx={{ mr: 1 }}>
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<PhotoCamera />}
                disabled={isLoadingSave}
              >
                Chọn ảnh
              </Button>
            </label>
            <LoadingButton
              sx={{ ml: 1 }}
              color="primary"
              onClick={OnUploadImage}
              loading={isLoadingSave}
              loadingPosition="start"
              startIcon={<FileUploadIcon />}
              variant="contained"
              disabled={selectedImage ? false : true}
            >
              Tải lên
            </LoadingButton>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ mb: 2 }}
          color="grey.600"
        >
          Danh sách hình ảnh đã tải lên
        </Typography>
        <Grid container spacing={2}>
          {companyImages.map((companyImage) => (
            <Grid item xs={12} sm={12} md={3} key={companyImage.id}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Tooltip title="Xóa ảnh" placement="bottom">
                  <Fab
                    color="error"
                    aria-label="edit"
                    size="small"
                    sx={{ mb: -4, mr: -1 }}
                    onClick={() => OndeleteCompanyImage(companyImage.id)}
                  >
                    <DeleteIcon />
                  </Fab>
                </Tooltip>
              </Stack>
              <Box sx={{ border: 1, borderColor: "grey.300", p: 1 }}>
                <Fade in={true} timeout={3500}>
                  <CardMedia
                    component="img"
                    sx={{ width: "100%", height: "200px" }}
                    image={companyImage.image_url}
                    alt="image"
                    style={{ animationDelay: "5s" }}
                  />
                </Fade>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default CompnanyImage;
