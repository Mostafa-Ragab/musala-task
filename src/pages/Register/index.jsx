import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/Header";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {checkoutSchema} from '../../constants'
import useUserData from './useRegister'
const Register = () => {

  const {handleFormSubmit,initialValues,message,handleCloseBackdrop,isNonMobile}  = useUserData()

  return (
    <Box m="20px">
      <Header title='CREATE USER' />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          
          isSubmitting
        }) => {

          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />

              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar"}
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isSubmitting}
                    onClick={handleCloseBackdrop}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Button>
              </Box>
              <Box sx={{ mt: 2 }}>
                {message && (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="error">
                      {message}
                    </Alert>
                  </Stack>
                )}
              </Box>

            </form>
          )
        }
        }
      </Formik>
    </Box>
  );
};

export default Register;