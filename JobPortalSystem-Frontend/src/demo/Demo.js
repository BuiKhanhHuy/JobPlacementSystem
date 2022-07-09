import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MUIRichTextEditor from "mui-rte";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { convertToRaw } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import FormNotifyDialog from "../components/forms/FormNotifyDialog";
import { Grid } from "@mui/material";
import CardItemJobSeekerProfileLoading from "../components/cards/CardItemJobSeekerProfileLoading";

const theme = createTheme({});

Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 2,
        width: "50%",
        marginBottom: 20,
        backgroundColor: "white",
        paddingBottom: 24,
        border: "2px solid #DCDCDC",
        borderRadius: "5px",
      },
      editor: {
        borderTop: "2px solid #DCDCDC",
        padding: "6px",
      },
    },
  },
});

const defaultValues = {
  RTE1: "",
};

export default function Demo() {
  const { handleSubmit, reset, register, setValue } = useForm({
    defaultValues,
  });
  const [data, setData] = useState(null);

  React.useEffect(() => {
    register("RTE1");
  }, [register]);

  return (
    <Grid container spacing={4}>
      {Array.from({ length: 16 }, (_, i) => i + 1).map((value) => (
        <Grid item key={value} xs={12} sm={6} md={4} lg={4}>
          <CardItemJobSeekerProfileLoading />
        </Grid>
      ))}
    </Grid>
  );
}
