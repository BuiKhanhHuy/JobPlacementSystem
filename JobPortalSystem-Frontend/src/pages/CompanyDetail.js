import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConstructionIcon from "@mui/icons-material/Construction";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import NumbersIcon from "@mui/icons-material/Numbers";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { BackdropLoading } from "../components/commons/Loading";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api, { authApi, endpoints } from "../configs/Api";
import CardJobPostOfCompany from "../components/landing/CardJobPostOfCompany";
import CardSearchNoResult from "../components/commons/CardSearchNoResult";
import CardCompanyImage from "../components/landing/CardCompanyImage";
import CardCommentOfCompany from "../components/landing/CardCommentOfCompany";
import { useSelector } from "react-redux";
import checkPermission from "../permissions/CheckPermission";
import UserRole from "../permissions/UserRole";
import { useConfirm } from "material-ui-confirm";

const CompanyDetail = () => {
  const confirm = useConfirm();
  const { companyId } = useParams();
  const user = useSelector((state) => state.user);
  const [isLoadingCompanyDetail, setIsLoadingCompanyDetail] = useState(true);
  const [companyDetail, setCompanyDetail] = useState(null);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const addViewComapny = async () => {
      try {
        Api.post(endpoints["company-view"](companyId));
      } catch (err) {
        console.error(err);
      }
    };

    addViewComapny();
  }, []);

  useEffect(() => {
    const loadCompanyDetail = async () => {
      try {
        const res = await authApi().get(endpoints["company-detail"](companyId));

        if (res.status === 200) {
          setCompanyDetail(res.data);
          console.warn(res.data);
          setRate(res.data.rate);
          setIsLoadingCompanyDetail(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadCompanyDetail();
  }, [companyId]);

  const onRating = (rate) => {
    const rating = async () => {
      try {
        const res = await authApi().post(
          endpoints["company-rating"](companyId),
          {
            rating: rate,
          }
        );

        if (res.status === 200) {
          setRate(res.data.rating);
        }
      } catch (err) {
        console.error(err);
      }
    };

    confirm({
      description: `Đánh giá ${rate} sao cho công ty này`,
      title: `Bạn có chắc chắn đánh giá ${rate} sao?`,
      confirmationText: "Có",
      cancellationText: "Không",
    })
      .then(() => rating())
      .catch(() => console.log("Error."));
  };

  console.log("CompanyDetail: render");
  return (
    <>
      <section>
        {isLoadingCompanyDetail && companyDetail === null ? (
          <BackdropLoading />
        ) : companyDetail === null ? (
          <CardSearchNoResult description="Không tìm thấy thông tin công ty. " />
        ) : (
          <>
            <Box sx={{ width: "90%", margin: "0 auto", borderRadius: 3 }}>
              <Card
                sx={{
                  height: "18rem",
                  backgroundImage: `url(${companyDetail.company_cover_image})`,

                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "80%", sm: "80%", md: "70%", lg: "70%" },
                margin: "0 auto",
              }}
            >
              <Box
                sx={{
                  display: { xs: "block", sm: "block", md: "flex", lg: "flex" },
                  justifyContent: "flex-start",
                }}
              >
                <Box
                  sx={{
                    boxShadow: 3,
                    width: 150,
                    height: 150,
                    margin: { xs: "0 auto", sm: "0 auto", md: "auto" },
                  }}
                  style={{ marginTop: -30 }}
                >
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "white",
                    }}
                    variant="rounded"
                    src={companyDetail.recruiter.avatar}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          textAlign: {
                            xs: "center",
                            sm: "center",
                            md: "left",
                            lg: "left",
                          },
                        }}
                        variant="h5"
                        component="h5"
                      >
                        {companyDetail.company_name}
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: {
                            xs: "center",
                            sm: "center",
                            md: "left",
                            lg: "left",
                          },
                        }}
                      >
                        <LocationOnIcon
                          color="primary"
                          sx={{
                            mb: -0.5,
                            ml: 0,
                          }}
                        />
                        {companyDetail.city.city_name} | Lượt xem:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {companyDetail.view ? companyDetail.view.view : 1}
                        </span>{" "}
                        |
                        <IconButton aria-label="chat" size="large">
                          <ChatIcon fontSize="inherit" />
                        </IconButton>
                      </Typography>
                      {checkPermission(user, UserRole.SEEKER) && (
                        <Stack
                          direction="row"
                          justifyContent={{
                            xs: "center",
                            sm: "center",
                            md: "left",
                            lg: "left",
                          }}
                        >
                          <Rating
                            name="size-large"
                            precision={1}
                            size="large"
                            value={rate}
                            onChange={(event, newValue) => onRating(newValue)}
                          />
                        </Stack>
                      )}
                    </CardContent>
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}></Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: "80%", sm: "80%", md: "70%", lg: "70%" },
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginTop: 2 }}
                gutterBottom
                component="div"
              >
                Giới thiệu doanh nghiệp
              </Typography>
              <Box>
                {companyDetail.company_description === "" ? (
                  <Typography variant="body1" gutterBottom color="grey.600">
                    Chưa cập nhật
                  </Typography>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: companyDetail.company_description,
                    }}
                  />
                )}
              </Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginTop: 2 }}
                gutterBottom
                component="div"
              >
                Liên hệ
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Stack direction="column">
                    <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                      <LocationOnIcon
                        color="disabled"
                        sx={{ mb: -0.6, ml: 0 }}
                      />
                      <span style={{ color: "gray", marginLeft: 2 }}>
                        Lĩnh vực hoạt động:
                      </span>{" "}
                      {companyDetail.field_operation}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                      <GroupsIcon color="disabled" sx={{ mb: -0.6, ml: 0 }} />
                      <span style={{ color: "gray", marginLeft: 2 }}>
                        Quy mô công ty:
                      </span>{" "}
                      {companyDetail.company_size}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                      <ConstructionIcon
                        color="disabled"
                        sx={{ mb: -0.6, ml: 0 }}
                      />
                      <span style={{ color: "gray", marginLeft: 2 }}>
                        Địa chỉ:
                      </span>{" "}
                      {companyDetail.address}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item md={6}>
                  <Stack direction="column">
                    <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                      <NumbersIcon color="disabled" sx={{ mb: -0.6, ml: 0 }} />
                      <span style={{ color: "gray", marginLeft: 2 }}>
                        Mã số thuế:
                      </span>{" "}
                      {companyDetail.tax_id_number === ""
                        ? "Chưa cập nhật"
                        : companyDetail.tax_id_number}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                      <InsertLinkIcon
                        color="disabled"
                        sx={{ mb: -0.6, ml: 0 }}
                      />
                      <span style={{ color: "gray", marginLeft: 2 }}>
                        URL website:
                      </span>{" "}
                      {companyDetail.company_website_url === "" ? (
                        "Chưa cập nhật"
                      ) : (
                        <Link
                          href={companyDetail.company_website_url}
                          underline="none"
                          target="_blank"
                        >
                          {companyDetail.company_website_url}
                        </Link>
                      )}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginTop: 2 }}
                gutterBottom
                component="div"
              >
                Hình ảnh
              </Typography>
              <Box>
                {/* company image  */}
                <CardCompanyImage companyId={companyDetail.id} />
              </Box>
              {checkPermission(user, UserRole.SEEKER) && (
                <>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginTop: 2 }}
                    gutterBottom
                    component="div"
                  >
                    Bình luận
                  </Typography>
                  <Box>
                    {/* comments of company  */}
                    <CardCommentOfCompany companyId={companyDetail.id} />
                  </Box>
                </>
              )}
              {/*There is CardJobPostCompany */}
              <CardJobPostOfCompany recruiterId={companyDetail.recruiter.id} />
            </Box>
          </>
        )}
      </section>
    </>
  );
};
export default CompanyDetail;
