import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";

const useUserData = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  //Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);

  const handleCloseBackdrop = () => {
    if (!isLoadingBackdrop) {
      setOpenBackdrop(false);
    }
  };
  const createUser = async (values, setSubmitting) => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    await UserService.addUser(user)
      .then(() => {
        navigate("/flights", { replace: true });
      })
      .catch((error) => {
        if (error.response) {
          const resMessage = "The data provided is incorrect. Please try again";
          setMessage(resMessage);
        } else if (error.request) {
          const resMessage = "Connection error";
          setMessage(resMessage);
        } else {
          const resMessage = "Error sending request";
          setMessage(resMessage);
        }
        setSubmitting(false);
      });
  };

  const handleFormSubmit = (values, { setStatus, setSubmitting }) => {
    setStatus();
    createUser(values, setSubmitting);
  };

  return {
    handleCloseBackdrop,
    handleFormSubmit,
    initialValues,
    isNonMobile,
    message,
  };
};

export default useUserData;
