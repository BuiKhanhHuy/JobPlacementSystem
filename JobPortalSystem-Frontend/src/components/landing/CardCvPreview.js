import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

// style
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Api, { endpoints } from "../../configs/Api";
import { Box, Toolbar } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import Loading from "../commons/Loading";
import CardSearchNoReasult from "../commons/CardSearchNoResult";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const CardCvPreview = ({
  openCvPreview,
  setOpenCvPreview,
  jobSeekerProfileId,
}) => {
  const getFilePluginInstance = getFilePlugin();
  const scrollModePluginInstance = scrollModePlugin();
  const { Download } = getFilePluginInstance;
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const [isLoadingCv, setIsLoadingCv] = React.useState(true);
  const [cv, setCv] = React.useState(null);

  React.useEffect(() => {
    const loadCv = async () => {
      try {
        const res = await Api.get(
          endpoints["job-seeker-profile-cv"](jobSeekerProfileId)
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
  }, []);

  const handleClose = () => {
    setOpenCvPreview(false);
  };

  console.log("pdf review: render");
  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
        <Dialog
          maxWidth={"md"}
          fullWidth={true}
          sx={{ minHeight: "80%" }}
          open={openCvPreview}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"CV của ứng viên"}
          </DialogTitle>
          <DialogContent dividers sx={{ overflow: "hidden" }}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              {isLoadingCv && cv === null ? (
                <Loading />
              ) : cv === null ? (
                <CardSearchNoReasult description={"CV chưa được cập nhật"} />
              ) : (
                <>
                  <Toolbar
                    variant="dense"
                    sx={{ margin: "0 auto", justifyContent: "center" }}
                  >
                    <ZoomOutButton />
                    <ZoomPopover />
                    <ZoomInButton />
                  </Toolbar>
                  <Box
                    sx={
                      cv && {
                        height: "70vh",
                      }
                    }
                  >
                    <Viewer
                      fileUrl={cv.url_cv}
                      plugins={[
                        getFilePluginInstance,
                        scrollModePluginInstance,
                        zoomPluginInstance,
                      ]}
                    />
                  </Box>
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Download>
              {(RenderDownloadProps) => (
                <Button
                  color="success"
                  variant="contained"
                  onClick={RenderDownloadProps.onClick}
                  startIcon={<FileDownloadIcon />}
                  size="small"
                  disabled={cv === null}
                >
                  Tải về
                </Button>
              )}
            </Download>
            <Button
              onClick={handleClose}
              size="small"
              variant="outlined"
              autoFocus
            >
              Thoát
            </Button>
          </DialogActions>
        </Dialog>
      </Worker>
    </div>
  );
};

export default React.memo(CardCvPreview);
