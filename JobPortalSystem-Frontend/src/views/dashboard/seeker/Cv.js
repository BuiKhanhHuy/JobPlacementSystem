import { Box } from "@mui/system";
import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CardSearchNoReasult from "../../../components/commons/CardSearchNoResult";
import PublishIcon from "@mui/icons-material/Publish";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";

// style
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import { styled } from "@mui/material/styles";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";
import Api, { authApi, endpoints } from "../../../configs/Api";
import { useSelector } from "react-redux";
import Loading from "../../../components/commons/Loading";
import alertOpen from "../../../store/actions/AlertCreator";
import { useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { LoadingButton } from "@mui/lab";

const Input = styled("input")({
  display: "none",
});

const Cv = () => {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const user = useSelector((state) => state.user);
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: (OpenFile) => {
      const fileName = user.username;
      const id = user.job_seeker_profile.id;
      return `cv-ung-vien-${fileName}-${id}`;
    },
  });
  const scrollModePluginInstance = scrollModePlugin();
  const { Download } = getFilePluginInstance;
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const [isLoadingCv, setIsLoadingCv] = useState(true);
  const fullScreenPluginInstance = fullScreenPlugin();
  const { EnterFullScreenButton } = fullScreenPluginInstance;
  const [cv, setCv] = useState(null);
  const [flag, setFlag] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [cvName, setCvName] = useState();
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    if (cvFile) {
      setCvName(cvFile.name);
    } else {
      setCvName("");
    }
  }, [cvFile]);

  useEffect(() => {
    const loadCv = async () => {
      try {
        const res = await Api.get(
          endpoints["job-seeker-profile-cv"](user.job_seeker_profile.id)
        );

        if (res.status === 200 && res.data["id"] !== undefined) {
          setCv(res.data);
        } else {
          setCv(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingCv(false);
      }
    };

    loadCv();
  }, [flag]);

  const onUploadCv = () => {
    console.log(cvFile);
    setIsUpload(true);
    const uploadCv = async () => {
      try {
        const res = await authApi().post(
          endpoints["job-seeker-profile-cv"](user.job_seeker_profile.id),
          { url_cv: cvFile }
        );

        if (res.status === 200) {
          setFlag(!flag);
          setCvFile(null);
          dispatch(alertOpen("success", "Tải cv lên thành công"));
          // thong bao tai cv len thanh cong
        }
      } catch (err) {
        // thong bao tai cv len that bai
        dispatch(alertOpen("error", "Tải cv lên thất bại"));
        console.error(err);
      } finally {
        setIsUpload(false);
      }
    };

    uploadCv();
  };

  const onDeleteCv = (cvId) => {
    const deleteCv = async () => {
      const res = await authApi().delete(endpoints["curriculum-vitae"](cvId));

      if (res.status === 204) {
        setFlag(!flag);
        // thong bao xoa thanh cong
        dispatch(alertOpen("success", "Xóa thành công cv của bạn"));
      }
      try {
      } catch (err) {
        // thong bao xoa khong thanh cong
        dispatch(alertOpen("error", "Xóa cv thất bại"));
        console.error(err);
      }
    };

    confirm({
      title: "Bạn có chắc chắn xóa cv này không?",
      description: "Cv này sẽ được xóa vĩnh viễn",
      confirmationText: "Có",
      cancellationText: "Không",
    })
      .then(() => deleteCv())
      .catch((err) => console.error(err));
  };

  let uploading = isUpload === true ? <LinearProgress sx={{ mt: 1 }} /> : "";

  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
        <Typography variant="h6" pb={1} gutterBottom component="div">
          || Cv của tôi
        </Typography>
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "100%",
            padding: "32px",
            boxShadow: 3,
          }}
        >
          <Box>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                disabled={cv === null}
                onClick={() => onDeleteCv(cv.id)}
              >
                Xóa cv
              </Button>
              <Download>
                {(RenderDownloadProps) => (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={RenderDownloadProps.onClick}
                    startIcon={<FileDownloadIcon />}
                    disabled={cv === null}
                  >
                    Tải về
                  </Button>
                )}
              </Download>
              <LoadingButton
                startIcon={<PublishIcon />}
                loading={isUpload}
                loadingPosition="start"
                variant="contained"
                color="success"
                disabled={cv !== null || cvName === ""}
                onClick={() => onUploadCv()}
              >
                Tải cv lên
              </LoadingButton>
              <Divider orientation="vertical" variant="middle" flexItem />
              <label htmlFor="icon-button-file">
                <Input
                  accept="application/pdf"
                  id="icon-button-file"
                  type="file"
                  disabled={cv !== null}
                  onChange={(event) => setCvFile(event.target.files[0])}
                />
                <IconButton
                  disabled={cv !== null}
                  color="primary"
                  aria-label="upload cv"
                  component="span"
                >
                  <AttachFileIcon />
                </IconButton>
              </label>
              <Typography variant="body1" gutterBottom color={"grey.600"}>
                {cvName}
              </Typography>
            </Stack>
          </Box>
          {uploading}
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ fontSize: 18, fontWeight: "bold", mb: 2 }}
              color="grey.700"
            >
              | Bản xem trước CV của bạn
            </Typography>
          </Box>

          <Box>
            {isLoadingCv && cv === null ? (
              <Loading />
            ) : cv === null ? (
              <CardSearchNoReasult
                description={"Bạn chưa có CV nào được tải lên."}
              />
            ) : (
              <>
                <Toolbar
                  variant="dense"
                  sx={{ margin: "0 auto", justifyContent: "center" }}
                >
                  <ZoomOutButton />
                  <ZoomPopover />
                  <ZoomInButton />
                  <EnterFullScreenButton />
                </Toolbar>
                <Box
                  sx={
                    cv && {
                      height: "120vh",
                    }
                  }
                >
                  <Viewer
                    fileUrl={cv.url_cv}
                    plugins={[
                      getFilePluginInstance,
                      scrollModePluginInstance,
                      zoomPluginInstance,
                      fullScreenPluginInstance,
                    ]}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Worker>
    </>
  );
};

export default Cv;
