import { Box, Grid, Stack, Typography, Pagination } from "@mui/material";
import CardSearchCompany from "../components/landing/CardSearchCompany";
import CardItemCompany from "../components/cards/CardItemCompany";
import { useEffect, useState } from "react";
import Api, { endpoints } from "../configs/Api";
import { useSearchParams } from "react-router-dom";
import CardSearchNoResult from "../components/commons/CardSearchNoResult";
import CardItemCompanyLoading from "../components/cards/CardItemCompanyLoading";

const Company = () => {
  const [q] = useSearchParams();
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    let query = `${q}&page_size=${pageSize}&page=${page}`;

    const loadCompanies = async () => {
      setIsLoadingCompanies(true);
      try {
        const res = await Api.get(`${endpoints["companies"]}?${query}`);
        if (res.status === 200) {
          const data = res.data;

          setCompanies(data.results);
          setPagination({
            count: data.count,
            sizeNumber: Math.ceil(data.count / pageSize),
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingCompanies(false);
      }
    };

    loadCompanies();
  }, [page, q]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  console.log("Company: render");
  return (
    <>
      <CardSearchCompany />
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          border: 1,
          borderColor: "grey.200",
          borderRadius: 2,
          mt: 4,
          mb: 2,
          p: 3,
        }}
      >
        <Box>
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{
              marginBottom: 0,
              fontWeight: "bold",
              fontSize: { xs: 24, sm: 30, md: 30 },
            }}
          >
            Công ty
          </Typography>
          <div
            style={{
              backgroundColor: "#1565c0",
              height: 5,
              width: 130,
              margin: "0 auto",
              marginTop: "5px",
              marginBottom: "25px",
            }}
          ></div>
          <Box>
            {isLoadingCompanies ? (
              <Grid container spacing={4}>
                {Array.from({ length: pageSize }, (_, i) => i + 1).map(
                  (value) => (
                    <CardItemCompanyLoading />
                  )
                )}
              </Grid>
            ) : companies.length === 0 ? (
              <CardSearchNoResult description="Không tìm thấy công ty nào." />
            ) : (
              <>
                <Box>
                  <Grid container spacing={4}>
                    {companies.map((company) => (
                      <CardItemCompany
                        key={company.id}
                        id={company.id}
                        companyName={company.company_name}
                        cityName={company.city.city_name}
                        fieldOperation={company.field_operation}
                        company_cover_image={company.company_cover_image}
                        avatar={company.recruiter.avatar}
                        rate={company.rate}
                      />
                    ))}
                  </Grid>
                </Box>
                {pagination.sizeNumber >= 2 && (
                  <Box sx={{ pt: 5, pb: 2 }}>
                    <Stack>
                      <Pagination
                        count={pagination.sizeNumber}
                        color="primary"
                        size="large"
                        variant="outlined"
                        sx={{ margin: "0 auto" }}
                        page={page}
                        onChange={handleChangePage}
                      />
                    </Stack>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Company;
