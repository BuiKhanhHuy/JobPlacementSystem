import MUIRichTextEditor from "mui-rte";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { memo } from "react";

const theme = createTheme({});

Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 2,
        minHeight: "250px",
        width: "100%",
        marginBottom: 20,
        backgroundColor: "white",
        paddingBottom: 24,
        border: "1.5px solid #C8C8C8",
        borderRadius: "5px",
      },
      editor: {
        borderTop: "2px solid #C8C8C8",
        padding: "6px",
      },
    },
  },
});

const CardCustomEditorWord = ({ handleSetValue }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <section>
          <MUIRichTextEditor
            toolbarButtonSize="small"
            inlineToolbar
            label={
              <span style={{ marginLeft: "10px" }}>Viết nội dung tại đây</span>
            }
            onChange={handleSetValue}
            controls={[
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "link",
              "numberList",
              "bulletList",
              "undo",
              "redo",
              "strikethrough",
              "highlight",
              "clear",
            ]}
          />
        </section>
      </div>
    </ThemeProvider>
  );
};

export default memo(CardCustomEditorWord);
