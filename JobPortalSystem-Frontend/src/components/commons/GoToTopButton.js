import ScrollToTop from "react-scroll-up";
import { Fab } from "@mui/material";
import { Box } from "@mui/system";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const GoToTopButton = () => {
  return (
    <div>
      <ScrollToTop
        style={{ position: "fixed", bottom: 10, right: 20 }}
        showUnder={160}
        duration={800}
      >
        <Box>
          <Fab size="medium" color="warning" aria-label="on-top">
            <ArrowUpwardIcon />
          </Fab>
        </Box>
      </ScrollToTop>
    </div>
  );
};

export default GoToTopButton;
