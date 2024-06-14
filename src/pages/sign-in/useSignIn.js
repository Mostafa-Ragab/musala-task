import { useState } from 'react';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/user.service'


const useSignIn = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);
    const initialValues = {
        email: "",
        password: ""
      };

      const checkoutSchema = yup.object().shape({
        email: yup
          .string()
          .required("Email is required")
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
    
      let navigate = useNavigate();  


      const handleFormSubmit = async (values, { setStatus, setSubmitting, resetForm }) => {
        setStatus()
        const user = {
          email: values.email,
          password: values.password,
        };
        await UserService.login(user.email, user.password)
          .then(() => {
            navigate('/flights', { replace: true });
          })
          .catch((error) => {
            if (error.response) {
              const resMessage = 'Incorrect credentials. The username or password is not correct';
              resetForm();
              setMessage(resMessage);
              setOpen(true);
            } else if (error.request) {
              const resMessage = 'Connection error';
              resetForm();
              setMessage(resMessage);
              setOpen(true);
            } else {
              const resMessage = 'Error sending request';
              resetForm();
              setMessage(resMessage);
              setOpen(true);
            }
            setLoading(false);
            setSubmitting(false);
          });
      };

      return {
        checkoutSchema,
        message,
        loading,
        open,
        initialValues,
        handleFormSubmit,
        setOpen,
      }
    
}

export default useSignIn