import { Alert, Box, Button, Stack } from "@mui/material";
import { Formik } from "formik";

import Header from "../../components/Header";

import CircularProgress from "@mui/material/CircularProgress";

import { Card, CardContent, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/system";
import { Helmet } from "react-helmet";
import usePhoto from "./usePhoto";

const StyledAddIcon = styled(AddPhotoAlternateIcon)({
  fontSize: "2em",
  color: "#fff",
  cursor: "pointer",
});

const Photo = () => {
  const {
    initialValues,
    checkoutSchema,
    showCameraIcon,
    message,
    handleChoosePhoto,
    loading,
    flightPhoto,
    isNonMobile,
    handleRemoveImage,
    handleFormSubmit,
  } = usePhoto();
  return (
    <>
      <Helmet>
        <title>Edit photo</title>
      </Helmet>
      <Box m="20px">
        <Header title="Edit photo" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          enableReinitialize={!flightPhoto}
        >
          {({
            handleSubmit,

            isSubmitting,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <Card sx={{ width: 300, bgcolor: "background.default" }}>
                    <CardContent
                      style={{
                        height: 300,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#ccc",
                        position: "relative",
                      }}
                    >
                      {loading ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 300,
                          }}
                        >
                          <CircularProgress />
                        </div>
                      ) : flightPhoto ? (
                        <>
                          <img
                            src={flightPhoto}
                            alt="Flight"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          {showCameraIcon && (
                            <IconButton
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                              }}
                              onClick={handleChoosePhoto}
                            >
                              <PhotoCameraIcon style={{ color: "#fff" }} />
                            </IconButton>
                          )}
                        </>
                      ) : (
                        <IconButton
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                          }}
                          onClick={handleChoosePhoto}
                        >
                          <StyledAddIcon />
                        </IconButton>
                      )}
                    </CardContent>
                  </Card>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  mt="20px"
                  sx={{ width: 300 }}
                >
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Editing..." : "Edit"}
                  </Button>
                </Box>
                {flightPhoto && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    mt="20px"
                    sx={{ width: 300 }}
                  >
                    <Button
                      fullWidth
                      size="large"
                      color="secondary"
                      variant="contained"
                      disabled={isSubmitting}
                      onClick={handleRemoveImage}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
                <Box sx={{ mt: 2 }}>
                  {message && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert variant="filled" severity="error">
                        {message}
                      </Alert>
                    </Stack>
                  )}
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default Photo;
