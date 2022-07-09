import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const actions = [
  { icon: <FacebookIcon />, name: "Facebook" },
  { icon: <YouTubeIcon />, name: "Youtube" },
  { icon: <LinkedInIcon />, name: "Linkedin" },
  { icon: <EmailIcon />, name: "Email" },
];

const CardHelp = () => {
  return (
    <Box
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 70, right: 16 }}
        icon={<QuestionMarkIcon />}
        FabProps={{
          sx: {
            bgcolor: "#00B4D8",
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default CardHelp