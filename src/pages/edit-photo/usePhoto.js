
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import FlightsService from "../../services/flights.service";
import { useNavigate, useParams } from 'react-router-dom';

const usePhoto = () => {
    const checkoutSchema = yup.object().shape({
        photo: yup.mixed().test('fileType', 'Only images allowed', (value) => {
          if (value) {
            return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
          }
          return true;
        })
      });
    
      const [initialValues,setInitialValues] = useState({ 
        code: "",
       capacity: 0,
       departureDate: "",
       photo: ""}) 
      const { id } = useParams();
    
      const [message, setMessage] = useState('');
      const [loadingForm, setLoadingForm] = useState(false);
    
      const isNonMobile = useMediaQuery("(min-width:600px)");
    
      const [fileIn, setFileIn] = useState("");
      const [photo, setPhoto] = useState([]);
    
      let navigate = useNavigate();
   
 
  
    
      const [flightPhoto, setFlightPhoto] = useState(null);
      const [loading, setLoading] = useState(false);
      const [showCameraIcon, setCameraIcon] = useState(false);
    
      useEffect(() => {
        const fetchFlightPhoto = async () => {
          try {
            setLoading(true);
            const response = await FlightsService.getPhoto(id).catch((err) => console.log("Error", err));
            if (response.data.type === 'text/xml') {
              const response = await fetch(`http://localhost:3000/flights/${id}/photo`);
              const data = await response.blob();
              console.log("url", URL.createObjectURL(data));
              setFlightPhoto(URL.createObjectURL(data));
              setCameraIcon(true);
            } else {
              setCameraIcon(false);
            }
          } catch (error) {
            console.error('Error grtting image', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFlightPhoto();
      }, [id]);
    
      const handleChoosePhoto = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name = 'photo';
        fileInput.accept = 'image/*';
        setFileIn(fileInput)
        fileInput.addEventListener('change', (e) => {
          const file = e.currentTarget.files[0];
          const imgURL = URL.createObjectURL(file);
          setFlightPhoto(imgURL);
          setPhoto(file);
          setCameraIcon(true);
        });
    
        fileInput.click();
      };
    
      const [isDelete, setIsDelete] = useState(false);
    
      const handleRemoveImage = () => {
        setCameraIcon(false);
        setFileIn("")
        setPhoto([]);
        setFlightPhoto(null);
        setIsDelete(true)
      };
    
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
        const formData = new FormData();
        formData.append("code", values.code);
        formData.append("capacity", values.capacity);
        formData.append("departureDate", values.departureDate);
        formData.append("photo", values.img);
    
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
    
      const updateFlightWithPhoto1 = async (id, values, setSubmitting) => {
        const formData = new FormData();
        formData.append("code", values.code);
        formData.append("capacity", values.capacity);
        formData.append("departureDate", values.departureDate);
        // formData.append("photo", values.img);
        formData.append("photo", photo);
    
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
   
    
        if (fileIn === "") {
          if (values.img != "") {
            if (photo.length === 0 && isDelete) {
              updateFlight(id, values, setSubmitting);
            }
            else {
              updateFlightWithPhoto(id, values, setSubmitting);
            }
          } else {
            console.log("updateFlight", values);
            updateFlight(id, values, setSubmitting);
          }
        } else {
          console.log("updateFlightWithPhoto1", values);
          updateFlightWithPhoto1(id, values, setSubmitting);
        }
    
  
      };
    
      useEffect(() => {
        // get flight and set form fields
        let objeto = new Object()
        let img = new String()
        FlightsService.getFlightById(id).then(f => {
          setInitialValues( {
            code: f?.data?.code,
            capacity:  f?.data?.capacity,
            departureDate: f?.data?.departureDate,
            img: f?.data?.img
          })
                objeto.id = f.data.id
          objeto.img = f.data.img
          objeto.status = f.data.status
          objeto.code = f.data.code
          objeto.capacity = f.data.capacity
          objeto.departureDate = f.data.departureDate
          img = f.data.img
    
          if (img.trim().length !== 0) {
            fetch(`http://localhost:3000/flights/${id}/photo`)
              .then((response) => response.blob())
              .then((imageBlob) => {
                // Create a File object from the received Blob
                const imageFile = new File([imageBlob], objeto.code + '.png', { type: 'image/*' });
                setInitialValues( {
                  ...objeto, // Keep other properties the same
                  img: imageFile, // Update only the 'photo' field with the new image path
                })
               
              })
              .catch((error) => {
                console.error('Error to get image:', error);
              });
          }
        });
      }, []);

      return {
        handleRemoveImage,
        checkoutSchema,
        showCameraIcon,
        loadingForm,
        message,
        handleChoosePhoto,
        loading,
        flightPhoto,
        isNonMobile,
        handleFormSubmit,
        initialValues,
        setInitialValues

      }

}

export default usePhoto

