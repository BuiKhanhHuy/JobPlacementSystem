import * as React from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Avatar, Fab, Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
  display: "none",
});

const CardUploadAvatar = ({ url, onChangeImage, label }) => {
  return (
    <>
      <Box>
      <Box sx={{ p: 2 }}>
          <Avatar
            src={url}
            sx={{
              width: 120,
              height: 120,
              margin: "0 auto",
              border: 1,
              borderColor: "grey.300",
            }}
          />
          <Box>
            <div style={{ textAlign: "center" }}>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  sx={{ mt: -2, mr: -10 }}
                  onChange={(event) => onChangeImage(event)}
                />
                <Fab
                  aria-label="upload-avt"
                  color="primary"
                  component="div"
                  size="small"
                  sx={{ mt: -8, mr: -8 }}
                >
                  <PhotoCamera />
                </Fab>
              </label>
              <Typography variant="body1" gutterBottom sx={{ mt: -1.5 }}>
                {label}
              </Typography>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CardUploadAvatar;
