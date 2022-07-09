import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import CardCustomeEditor from "../commons/CardCustomEditor";
import SendIcon from "@mui/icons-material/Send";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { authApi, endpoints } from "../../configs/Api";
import { BackdropLoading } from "../commons/Loading";

const FormSendMailToAppliedSeeker = ({
  onCancel,
  onSucces,
  selectJobPostsActivityId,
}) => {
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoadingSendMail, setIsLoadingSendMail] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Tiêu đề mail không được để trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleSubmitSendMail = (data) => {
    setIsSubmit(true);

    // data.title and content
    var formData = new FormData();
    formData.append(
      "url_web",
      "https://buikhanhhuy.github.io/JobPortalSystem-UI/"
    );
    formData.append(
      "url_logo",
      "https://res.cloudinary.com/dtnpj540t/image/upload/v1655732060/JobPortalSystemImages/logo/job-link-icon_b0d1jo.png"
    );
    formData.append(
      "url_company_detail",
      `${window.location.origin}/companies/${user.company}/`
    );
    formData.append("title", data.title);
    formData.append("content", content);
    formData.append("user_id", user.id);
    formData.append("job_posts_activity_id", selectJobPostsActivityId);

    const sendMailToSeekers = async () => {
      setIsLoadingSendMail(true);

      try {
        const res = await authApi().post(
          endpoints["reply-to-seeker"],
          formData
        );

        if (res.status === 200) {
          onCancel();
          onSucces();
        }
      } catch (err) {
      } finally {
        setIsLoadingSendMail(false);
      }
    };

    if (content !== "") sendMailToSeekers();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitSendMail)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "8px",
          padding: "18px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Gửi mail đến ứng viên
        </Typography>
        <Typography color="textSecondary">Tiêu đề (*)</Typography>
        <TextField
          placeholder="Nhập tiêu đề email"
          fullWidth
          id="title"
          name="title"
          size="small"
          type="text"
          error={errors.title}
          helperText={errors.title ? errors.title.message : ""}
          {...register("title")}
          InputLabelProps={{ shrink: true }}
        />
        <Typography color="textSecondary" sx={{ mt: 1 }}>
          Nội dung (*)
        </Typography>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <CardCustomeEditor
            value={content}
            handleChange={(value) => setContent(value)}
          />
        </div>
        <div style={{ paddingLeft: "15px" }}>
          {content === "" && isSubmit && (
            <FormHelperText sx={{ color: "red" }}>
              Nội dung không được để trống
            </FormHelperText>
          )}
        </div>

        <div
          style={{
            alignSelf: "end",
            display: "flex",
            gap: "16px",
            marginTop: 4,
          }}
        >
          <Button onClick={onCancel}>Hủy gửi</Button>
          <Button variant="contained" type="submit" startIcon={<SendIcon />}>
            Gửi đi
          </Button>
        </div>
      </form>
      {isLoadingSendMail && <BackdropLoading />}
    </>
  );
};

export default memo(FormSendMailToAppliedSeeker);
