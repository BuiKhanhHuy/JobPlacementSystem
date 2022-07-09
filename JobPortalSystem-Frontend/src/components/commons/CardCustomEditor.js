import { Editor } from "@tinymce/tinymce-react";

const CardCustomeEditor = ({  value, handleChange }) => {
  return (
    <Editor
      // initialValue={initValue}
      value={value}
      onEditorChange={handleChange}
      init={{
        height: "250",
        width: "100%",
        menubar: false,
        plugins: "lists",
        toolbar:
          "undo redo | " +
          "bold italic underline| alignleft aligncenter " +
          "alignright alignjustify |numlist bullist outdent indent | " +
          "superscript subscript |" +
          "removeformat",
        lists_indent_on_tab: true,
        content_style:
          "body { font-family:Roboto,Helvetica,Arial,sans-serif; font-size:1rem;  }",
      }}
    />
  );
};

export default CardCustomeEditor;
