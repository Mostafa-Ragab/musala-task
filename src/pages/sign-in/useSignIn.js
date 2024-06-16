import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/user.service'
import { useEffect } from "react";
import {loginCheckoutSchema} from '../../constants/'

const useSignIn = () => {

  const initialValues = {
    email: "",
    password: ""
  };

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);
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


useEffect(() => {
  const checkTokenValidity = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/flights");
      return;
    }

   
  
  };
  checkTokenValidity();
}, []);
      return {
        loginCheckoutSchema,
        message,
        loading,
        open,
        initialValues,
        handleFormSubmit,
        setOpen,
      }
    
}

export default useSignIn