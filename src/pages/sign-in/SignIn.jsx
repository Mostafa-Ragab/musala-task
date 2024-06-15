import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from 'formik';
import { Card } from '@mui/material';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet';
import useSignIn from './useSignIn';
const defaultTheme = createTheme();

const SignIn = () => {
const {open,message,checkoutSchema,loading,initialValues,handleFormSubmit,setOpen} = useSignIn()
 
  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <ThemeProvider  theme={defaultTheme}  className="login-background">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            
            }}
          >
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
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Grid
                      container
                      spacing={2}>
                      <Grid item xs={12}>
                        <Card sx={{ boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)", borderRadius: '14px', bgcolor: "#ffffff", maxHeight: '100%', maxWidth: '100%', p: 8 }}>
                          <Typography sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} component="h1" variant="h3">
                            Welcome
                          </Typography>
                          <Box sx={{ mt: 1 }}>

                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email"
                              value={values.email}
                              name="email"
                              error={!!touched.email && !!errors.email}
                              helperText={touched.email && errors.email}
                              autoComplete="email"
                              autoFocus
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              value={values.password}
                              name="password"
                              error={!!touched.password && !!errors.password}
                              helperText={touched.password && errors.password}
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                   
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              size="large"
                              disabled={loading}
                              sx={{ mt: 3, mb: 2, height: '45px' }}
                            >
                              Sign In
                            </Button>
                            <Box sx={{ mt: 2 }}>
                              {message && (
                                <Collapse in={open}>
                                  <Alert variant="filled" severity="error"
                                    action={
                                      <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                          setOpen(false);
                                        }}
                                      >
                                        <CloseIcon fontSize="inherit" />
                                      </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                  >
                                    {message}
                                  </Alert>
                                </Collapse>
                              )}
                            </Box>
                            <Grid container>
                      <Grid item>
                        <Link href="/sign-up"  variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </form>
                )
              }
              }
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default SignIn;