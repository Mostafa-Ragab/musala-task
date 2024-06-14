import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import FlightsService from "../../services/flights.service";
import { useNavigate, useParams } from 'react-router-dom';

 const useForm = () => {
    const checkoutSchema = yup.object().shape({
        code: yup
          .string()
          .required("The code is required")
          .matches(/^[a-zA-Z]{6}$/, "The code must contain 6 uppercase or lowercase letters")
          .test('is-unique', 'This code has already been used', async function (value) {
            const res = await FlightsService.getFlights().catch((err) => console.log("Error", err));
            const tmp = res.data.resources
            for (let i = 0; i < tmp.length; i++) {
              if (isAddMode) {
                if (tmp[i].code === value) {
                  return false
                }
              } else {
                if (tmp[i].code === value && tmp[i].id === id) {
                  return true
                }
              }
            }
            return true
          }),
        capacity: yup.number()
          .required("Capacity is required")
          .min(1, "The minimum capacity is 1").max(200, "The maximum capacity is 200"),
        photo: yup.mixed().test('fileType', 'Only images allowed', (value) => {
          if (value) {
            return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
          }
          return true;
        })
      });
    
      const initialValues = {
        code: "",
        capacity: 0,
        departureDate: "",
        photo: ""
      };
    
      const { id } = useParams();
      const isAddMode = !id;
    
      const [message, setMessage] = useState('');
      const [loadingForm, setLoadingForm] = useState(false);
    
      const isNonMobile = useMediaQuery("(min-width:600px)");
    
      const [imageURL, setImageURL] = useState("");
      const [isEditPhoto, setIsEditPhoto] = useState(false);
      const [fileIn, setFileIn] = useState({});
      const [photo, setPhoto] = useState({});
      const [loadPhoto, setLoadPhoto] = useState(false);
    
      let navigate = useNavigate();
    
      //Backdrop
      const [openBackdrop, setOpenBackdrop] = useState(false);
      const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
    
      const handleCloseBackdrop = () => {
        if (!isLoadingBackdrop) {
          setOpenBackdrop(false);
        }
      };
    
      const handleOpenBackdrop = () => {
        setIsLoadingBackdrop(true);
        setOpenBackdrop(true);
      };
    
      const [flightPhoto, setFlightPhoto] = useState(null);
      const [loading, setLoading] = useState(false);
      const [showCameraIcon, setCameraIcon] = useState(false);
      useEffect(() => {
        const fetchFlightPhoto = async () => {
          try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/flights/${id}/photo`);
            if (response.ok) {
              const data = await response.blob();
              setFlightPhoto(URL.createObjectURL(data));
              setCameraIcon(true);
            }
          } catch (error) {
            console.error('Error al obtener la foto del vuelo', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (!isAddMode && id) {
          fetchFlightPhoto();
        }
      }, [isAddMode, id]);

      const handleChoosePhoto = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name = 'photo';
        fileInput.accept = 'image/*';
        setFileIn(fileInput);
        console.log("fileInput", fileInput);
    
        fileInput.addEventListener('change', (e) => {
          const file = e.currentTarget.files[0];
          const imgURL = URL.createObjectURL(file);
          setFileIn(file);
          setFlightPhoto(imgURL);
          setCameraIcon(true);
          setLoadPhoto(true);
          console.log("file", file);
        });
        fileInput.click();
      };

      const createFlight = async (values, setSubmitting) => {
        const flight = {
          code: values.code,
          capacity: values.capacity,
          departureDate: values.departureDate,
        };
        await FlightsService.addFlight(flight)
          .then(() => {
            navigate('/flights', { replace: true });
          })
          .catch((error) => {
            if (error.response) {
              const resMessage = 'The data provided is incorrect. Please try again';
              setMessage(resMessage);
            } else if (error.request) {
              const resMessage = 'Connection error';
              setMessage(resMessage);
            } else {
              const resMessage = 'Error sending request';
              setMessage(resMessage);
            }
            setLoadingForm(false);
            setSubmitting(false);
          });
      }

      const createFlightWithPhoto = async (values, setSubmitting) => {
        const formData = new FormData();
        formData.append("code", values.code);
        formData.append("capacity", values.capacity);
        formData.append("departureDate", values.departureDate);
        formData.append("photo", fileIn);
        // formData.append("photo", photo);
    
        await FlightsService.addFlightWithPhoto(formData)
          .then(() => {
            navigate('/flights', { replace: true });
          })
          .catch((error) => {
            if (error.response) {
              const resMessage = 'The data provided is incorrect. Please try again';
              setMessage(resMessage);
            } else if (error.request) {
              const resMessage = 'Connection error';
              setMessage(resMessage);
            } else {
              const resMessage = 'Error sending request';
              setMessage(resMessage);
            }
            setLoadingForm(false);
            setSubmitting(false);
          });
      }
      const updateFlight = async (id, values, setSubmitting) => {
        const flight = {
          code: values.code,
          capacity: values.capacity,
          departureDate: values.departureDate,
        };
    
        await FlightsService.updateFlight(id, flight)
          .then(() => {
            navigate('/flights', { replace: true });
          })
          .catch((error) => {
            if (error.response) {
              const resMessage = 'The data provided is incorrect. Please try again';
              setMessage(resMessage);
            } else if (error.request) {
              const resMessage = 'Connection error';
              setMessage(resMessage);
            } else {
              const resMessage = 'Error sending request';
              setMessage(resMessage);
            }
            setLoadingForm(false);
            setSubmitting(false);
          });
      }
      const updateFlightWithPhoto = async (id, values, setSubmitting) => {

        console.log("selectedImg", values);
        const formData = new FormData();
    
        formData.append("code", values.code);
        formData.append("capacity", values.capacity);
        formData.append("departureDate", values.departureDate);
    
        formData.append('photo', values.img);
    
        await FlightsService.updateFlightWithPhoto(id, formData)
          .then(() => {
            navigate('/flights', { replace: true });
          })
          .catch((error) => {
            if (error.response) {
              const resMessage = 'The data provided is incorrect. Please try again';
              setMessage(resMessage);
            } else if (error.request) {
              const resMessage = 'Connection error';
              setMessage(resMessage);
            } else {
              const resMessage = 'Error sending request';
              setMessage(resMessage);
            }
            setLoadingForm(false);
            setSubmitting(false);
          });
      }

      const handleFormSubmit = (values, { setStatus, setSubmitting }) => {
        setStatus();
        console.log("photo", photo);
        console.log("values", values);
        console.log("fileIn", fileIn);
        if (isAddMode) {
          if (loadPhoto) {
            // if (values.photo != "") {
            createFlightWithPhoto(values, setSubmitting)
          } else {
            createFlight(values, setSubmitting)
          }
        } else {
          // if (fileIn.isEmpty != {}) {
          if (values.img != "") {
            updateFlightWithPhoto(id, values, setSubmitting);
          } else {
            updateFlight(id, values, setSubmitting);
          }
        }
        // setTimeout(() => {
        //   navigate('/flights', { replace: true });
        //   setSubmitting(false);
        // }, 2000);
      };
  return {
    checkoutSchema,
    showCameraIcon,
    loadingForm,
    handleCloseBackdrop,message,handleChoosePhoto,isAddMode,loading,flightPhoto,isNonMobile,handleFormSubmit,initialValues,isAddMode
  }

}
export default useForm