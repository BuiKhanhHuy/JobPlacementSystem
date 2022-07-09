import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import CardSearchCareer from "./CardSeachCareer";
import CardSearchLocation from "./CardSearchLocation";
import CardSearchWorkingForm from "./CardSearchWorkingForm";

const CardSearchType = () => {
  return (
    <>
      <div>
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
            border: 1,
            borderColor: "#bbdefb",
            borderRadius: 2,
            p: 3,
            mt: 4,
            mb: 2,
            bgcolor: "#fafaff",
          }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                sx={{ textAlign: "center", px: { xs: 2, md: 2 } }}
              >
                <CardSearchCareer />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                sx={{ textAlign: "center", px: { xs: 2, md: 2 } }}
              >
                <CardSearchLocation />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                sx={{ textAlign: "center", px: { xs: 2, md: 2 } }}
              >
                <CardSearchWorkingForm />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};
export default CardSearchType;
