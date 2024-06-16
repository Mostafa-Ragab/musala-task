import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/Header";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { Card, CardContent, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/system";
import { Helmet } from "react-helmet";
import useForm from "./useForm";
const StyledAddIcon = styled(AddPhotoAlternateIcon)({
  fontSize: "2em",
  color: "#fff",
  cursor: "pointer",
});

const Form = () => {
  const {
    initialValues,
    checkoutSchema,
    showCameraIcon,
    handleCloseBackdrop,
    message,
    handleChoosePhoto,
    loading,
    flightPhoto,
    isNonMobile,
    handleFormSubmit,
    isAddMode,
  } = useForm();

  return (
    <>
      <Helmet>
        <title>{isAddMode ? "Create Flight" : "Edit Flight"}</title>
      </Helmet>
      <Box m="20px">
        <Header
          title={isAddMode ? "CREATE FLIGHT" : "EDIT FLIGHT"}
          subtitle={isAddMode ? "Create a new flight" : "Edit a flight"}
        />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          enableReinitialize={!isAddMode}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
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
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.code}
                    name="code"
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Capacity"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.capacity}
                    name="capacity"
                    error={!!touched.capacity && !!errors.capacity}
                    helperText={touched.capacity && errors.capacity}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Departure of Date"
                    InputLabelProps={{ shrink: true, required: true }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.departureDate}
                    name="departureDate"
                    error={!!touched.departureDate && !!errors.departureDate}
                    helperText={touched.departureDate && errors.departureDate}
                    sx={{ gridColumn: "span 4" }}
                  />

                  {isAddMode && (
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
                  )}
                </Box>
                <Box display="flex" justifyContent="start" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={isSubmitting}
                      onClick={handleCloseBackdrop}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  </Button>
                </Box>
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

export default Form;
