import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Avatar, Container, Grid, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import Api, { endpoints } from "../../configs/Api";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ConvertOneArrToTwoArr = (arr) => {
  let twoArr = [];
  while (arr.length) twoArr.push(arr.splice(0, 4));

  return twoArr;
};

const CardTopRecruiter = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const [topCompanies, setTopCompanies] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const loadTopCompanies = async () => {
      try {
        const res = await Api.get(endpoints["top-companies"]);

        const data = ConvertOneArrToTwoArr(res.data);

        setTopCompanies(data);
        setMaxSteps(data.length);

      } catch (err) {
        console.error(err);
      }
    };

    loadTopCompanies();
  }, []);

  return (
    <Box
      sx={{
        width: "90%",
        margin: "0 auto",
        p: 3,
        mt: 4,
        mb: 2,
      }}
    >
      <Box>
        <Typography
          component="h4"
          align="center"
          gutterBottom
          color="text.primary"
          sx={{ fontWeight: "bold", fontSize: { xs: 24, sm: 30, md: 30 } }}
        >
          Top 20 công ty nổi bậc
        </Typography>
        <Box sx={{ flexGrow: 1, margin: "0 auto" }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {topCompanies.map((companiesDetails, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Container maxWidth="md">
                    <Box pt={8} pb={6} textAlign="center">
                      <Grid
                        container
                        spacing={8}
                        style={{ justifyContent: "center" }}
                      >
                        {companiesDetails.map((company, index) => (
                          <Grid item xs={6} md={3} key={index}>
                            <Avatar
                              src={
                                company.recruiter && company.recruiter.avatar
                              }
                              sx={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: theme.spacing(10),
                                height: theme.spacing(10),
                                marginBottom: theme.spacing(2),
                                backgroundColor: "grey.100",
                                border: 1,
                                borderColor: "grey.300",
                              }}
                            />
                            <Typography
                              variant="h6"
                              component="h4"
                              gutterBottom={true}
                            >
                              <Rating
                                name="read-only"
                                precision={0.1}
                                value={company.avg_rating}
                                readOnly
                              />
                            </Typography>
                            <Typography
                              variant="body1"
                              color="grey.700"
                              component="span"
                            >
                              {company.company_name}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Container>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            sx={{
              width: { sx: "50%", sm: "50%", md: "30%" },
              margin: "0 auto",
              backgroundColor: "white",
            }}
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                TIẾP THEO
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                QUAY LẠI
              </Button>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
export default CardTopRecruiter;
