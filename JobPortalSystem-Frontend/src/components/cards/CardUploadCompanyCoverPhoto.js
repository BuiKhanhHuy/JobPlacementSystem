import * as React from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Avatar, Button} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
  display: "none",
});

const CardUploadCompanyCoverPhoto = ({ url, onChangeImage }) => {
  return (
    <>
      <Box>
        <Box sx={{ pt: 1 }}>
          <Avatar
            src={url}
            variant="square"
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%", lg: "50%" },
              height: 250,
              border: 1,
              borderColor: "grey.300",
            }}
          />
          <Box>
            <div>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  sx={{ mt: -2, mr: -10 }}
                  onChange={(event) => onChangeImage(event)}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  component="span"
                  sx={{ mt: 1 }}
                  startIcon={<PhotoCamera />}
                >
                  Chọn ảnh bìa
                </Button>
              </label>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CardUploadCompanyCoverPhoto;
