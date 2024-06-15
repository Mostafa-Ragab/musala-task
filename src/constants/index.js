import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import * as yup from "yup";

const usuario = JSON.parse(localStorage.getItem('user'));

export const user = {
    avatar: PersonOutlinedIcon,
    email: usuario ? usuario.email : '',
    id: usuario ? usuario.id : '',
    name: usuario ? usuario.name : '',
    refreshToken: usuario ? usuario.passsword : '',
    token: usuario ? usuario.token : ''
  };


  export const checkoutSchema = yup.object().shape({
    name: yup
      .string()
      .required("The name is required"),
    email: yup
      .string()
      .required("The email is required")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
  });