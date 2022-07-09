import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";

const mainFeaturedPost = {
  title:
    "JobLink - Tuyển Dụng, Việc Làm 24H Từ 50.000+ Công Ty Uy Tín Hàng Đầu Tại Việt Nam",
  description:
    "JobLink website tuyển dụng, việc làm 24h hàng đầu việt nam với hơn 200.000 cơ hội Việc Làm Tốt - Lương Cao, được tin dùng bởi hơn 50.000 doanh nghiệp hàng đầu tại Việt Nam. Khám phá ngay!.",
  image:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
  imageText: "main image description",
};

const featuredPosts = [
  {
    title: "Trang tin việc làm chất lượng cao",
    urlImage: "screen-01.png",
    description:
      "Kênh tìm việc chất lượng, uy tín hàng đầu Việt Nam với 30.000+ việc làm được cập nhật mỗi ngày từ 110.000+ doanh nghiệp đã được xác thực.",
  },
  {
    title: "Ứng dụng tìm việc thông minh",
    urlImage: "screen-02.png",
    description:
      "Nền tảng ứng dụng trí tuệ nhân tạo (AI) giúp ứng viên tìm việc dễ dàng, nhanh chóng và phù hợp nhất.",
  },
];

const sidebar = {
  title: "Sứ mệnh",
  description:
    "Quan niệm của JobLink.vn là luôn mang cho mình một sứ mệnh giúp đỡ hết lòng đến cho những ai cần chúng tôi và chúng tôi đã và đang trên con đường thực hiện sứ mệnh đó..",
  social: [
    { name: "LinkedIn", icon: LinkedInIcon },
    { name: "Youtube", icon: YouTubeIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main
              title="Về JobLink chúng tôi"
              content={`
               <p>T&igrave;m việc với sự trợ gi&uacute;p của Internet đ&atilde; được biết đến từ hơn 20 năm trước, nhưng khi đ&oacute; tuyển dụng trực tuyến vẫn c&ograve;n bị b&oacute; hẹp trong phạm vi c&aacute;c bảng th&ocirc;ng tin v&agrave; gần như l&agrave; độc quyền của giới IT &ndash; những người th&ocirc;ng thạo về mạng điện tử. Tốc độ ph&aacute;t triển của m&aacute;y t&iacute;nh c&aacute; nh&acirc;n c&ugrave;ng với sự phổ biến của Internet v&agrave;o những năm 1990 đ&atilde; trở th&agrave;nh c&uacute; h&iacute;ch cho việc ra đời những trang web tuyển dụng c&oacute; t&iacute;nh đại ch&uacute;ng v&agrave; thương mại hơn.</p>
               <p>&nbsp;</p>
               <p>Ng&agrave;y nay sự ph&aacute;t triển kh&ocirc;ng ngừng của khoa học c&ocirc;ng nghệ, đặc biệt l&agrave; sự ph&aacute;t triển mạnh mẽ của c&ocirc;ng nghệ th&ocirc;ng tin đ&atilde; khiến cho internet trở th&agrave;nh một c&ocirc;ng cụ hữu &iacute;ch kh&ocirc;ng thể thiếu được trong đời sống x&atilde; hội. Internet x&acirc;m nhập v&agrave;o từng lĩnh vực trở th&agrave;nh một c&ocirc;ng cụ đắc lực trong việc giải quyết nhanh ch&oacute;ng mọi thao t&aacute;c v&agrave; vấn đề trong c&aacute;c c&ocirc;ng việc hằng ng&agrave;y. Đặc biệt, trong giai đoạn CNH-HĐH ở nước ta hiện nay, khi nhu cầu t&igrave;m việc v&agrave; tuyển dụng ng&agrave;y c&agrave;ng cao th&igrave; Internet cũng v&agrave;o cuộc, trang web việc l&agrave;m timviecnhanh.com ra đời v&agrave; trở th&agrave;nh một k&ecirc;nh th&ocirc;ng tin hữu hiệu đối với cả nh&agrave; tuyển dụng v&agrave; người t&igrave;m việc.</p>
               <p>Với h&agrave;ng chục ng&agrave;n đầu việc được đăng tải tr&ecirc;n c&aacute;c trang Web tuyển dụng timviecnhanh.com&nbsp; mỗi ng&agrave;y, c&ugrave;ng với c&aacute;c tiện &iacute;ch như đăng tải hồ sơ ngay tr&ecirc;n trang Web để c&aacute;c nh&agrave; tuyển dụng c&oacute; thể xem x&eacute;t, nộp hồ sơ trực tuyến hay tham khảo c&aacute;c th&ocirc;ng tin tư vấn trong qu&aacute; tr&igrave;nh t&igrave;m việc đ&atilde; khiến t&igrave;m việc trực tuyến trở th&agrave;nh một xu thế mới tr&ecirc;n thị trường lao động tại Tp HCM, H&agrave; Nội v&agrave; trải ruộng hơn 61 tỉnh th&agrave;nh c&ograve;n lại.</p>
               <p>Kh&ocirc;ng cần bước ch&acirc;n ra khỏi nh&agrave;, chỉ cần v&agrave;i c&aacute;i click chuột, v&agrave;i thao t&aacute;c điền th&ocirc;ng tin c&aacute; nh&acirc;n v&agrave;o bảng mẫu y&ecirc;u cầu c&oacute; sẵn l&agrave; bạn đ&atilde; c&oacute; thể c&oacute; được việc l&agrave;m&hellip; Bộ hồ sơ ho&agrave;n chỉnh của bạn c&oacute; thể gửi c&ugrave;ng một l&uacute;c đến nhiều c&ocirc;ng ty. Do đ&oacute;, ngo&agrave;i lựa chọn c&ocirc;ng việc th&iacute;ch hợp, bạn c&ograve;n c&oacute; cơ hội t&igrave;m cho m&igrave;nh một việc l&agrave;m tốt hơn c&ocirc;ng việc hiện tại. Bằng phương ph&aacute;p lưu v&agrave; nộp hồ sơ trực tuyến, khi muốn thay đổi việc l&agrave;m, ứng vi&ecirc;n chỉ cần gửi hồ sơ đến nh&agrave; tuyển dụng m&agrave; kh&ocirc;ng phải mất thời gian chuẩn bị. Đ&acirc;y cũng l&agrave; điều kh&aacute;c biệt giữa t&igrave;m việc tr&ecirc;n mạng v&agrave; t&igrave;m việc tr&ecirc;n c&aacute;c phương tiện kh&aacute;c.<br />Khi v&agrave;o c&aacute;c trang web việc l&agrave;m, người t&igrave;m việc kh&ocirc;ng chỉ được cập nhật những th&ocirc;ng tin việc l&agrave;m &ldquo;mới nhất&rdquo;, &ldquo;n&oacute;ng nhất&rdquo; m&agrave; c&ograve;n c&oacute; cơ hội học hỏi những kinh nghiệm, những th&ocirc;ng tin bổ &iacute;ch nhờ mục &ldquo;cẩm nang hướng nghiệp&rdquo; với những b&agrave;i viết nhằm khắc phục v&agrave; hạn chế lỗi thường gặp của ứng vi&ecirc;n, gi&uacute;p ứng vi&ecirc;n tự tin hơn trước nh&agrave; tuyển dụng.</p>
               <p>Đối với c&aacute;c nh&agrave; tuyển dụng th&igrave; việc tuyển nh&acirc;n sự qua mạng gi&uacute;p nh&agrave; tuyển dụng t&igrave;m kiếm những ứng vi&ecirc;n đạt ti&ecirc;u chuẩn m&agrave; kh&ocirc;ng tốn nhiều thời gian lẫn chi ph&iacute;. V&agrave; tiện &iacute;ch hơn cả l&agrave; họ c&oacute; được một nguồn ứng vi&ecirc;n phong ph&uacute; về chất lượng v&agrave; số lượng, nhờ vậy sẽ dễ d&agrave;ng tuyển được ứng vi&ecirc;n đ&uacute;ng như m&igrave;nh mong muốn&rdquo;.<br />Trước nhu cầu việc l&agrave;m s&ocirc;i động như hiện nay, trang&nbsp; web tuyển dụng timviecnhanh.com một trong hai giải ph&aacute;p h&agrave;ng đầu tại Việt Nam&nbsp; v&agrave; đứng đầu trong ph&acirc;n kh&uacute;c thị trường của m&igrave;nh đ&atilde; trở th&agrave;nh người bạn đồng h&agrave;nh với nh&agrave; tuyển dụng cũng như với người t&igrave;m việc. Hy vọng trong tương lai, timviecnhanh.com sẽ được quảng b&aacute; rộng r&atilde;i hơn nữa đến mọi tầng lớp nh&acirc;n d&acirc;n v&agrave; sẽ ph&aacute;t huy hơn nữa những mặt t&iacute;ch cực, để nơi đ&acirc;y thực sự trở th&agrave;nh cầu nối giữa lao động t&igrave;m việc v&agrave; nh&agrave; tuyển dụng.<br />www.JobLink.com</p>
                               `}
            />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}
