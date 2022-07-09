import { Fade, ImageList, ImageListItem, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import Api, { endpoints } from "../../configs/Api";
import Loading from "../commons/Loading";

const CardCompanyImage = ({ companyId }) => {
  console.log("companyIdddddd", companyId);
  const [isLoadingComapanyImage, setIsloadingCompanyImage] = useState(true);
  const [companyImages, setCompanyImage] = useState([]);

  useEffect(() => {
    const loadCompaniesImage = async () => {
      try {
        const res = await Api.get(endpoints["company-images"](companyId));

        if (res.status === 200) {
          setCompanyImage(res.data);
          setIsloadingCompanyImage(false);
          console.log(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (companyId !== null && companyId !== undefined) {
      loadCompaniesImage();
    }
  }, []);

  return isLoadingComapanyImage && companyImages.length === 0 ? (
    <Loading />
  ) : companyImages.length === 0 ? (
    <Typography variant="body1" gutterBottom color="grey.600">
      Chưa có hình ảnh nào được tải lên.
    </Typography>
  ) : (
    <ImageList
      variant="woven"
      cols={4}
      gap={8}
      sx={{ width: "100%", height: "100%" }}
    >
      {companyImages.map((companyImage, index) => (
        <Fade in={true} timeout={4000}>
          <ImageListItem key={companyImage.id}>
            <img
              src={`${companyImage.image_url}?w=161&fit=crop&auto=format`}
              srcSet={`${companyImage.image_url}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={companyImage.id}
              loading="lazy"
            />
          </ImageListItem>
        </Fade>
      ))}
    </ImageList>
  );
};

export default memo(CardCompanyImage);
