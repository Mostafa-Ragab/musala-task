import  { useEffect, useState } from 'react';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import FlightsService from "../../services/flights.service";
import { useLocation, useNavigate } from 'react-router-dom';


const useFlight = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedFlightId, setSelectedFlightId] = useState(null);
  
    const [open, setOpen] = useState(false);
    const [openPhoto, setOpenPhoto] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [selectedImg, setSelectedImg] = useState("");
  
    const location = useLocation();
  
    const searchParams = new URLSearchParams(location.search);
    const initialCode = searchParams.get('code') || '';
  
    const [code, setCode] = useState(initialCode);
    const [filteredRows, setFilteredRows] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);


      const handleModelCange = (model, details) => {
        setCurrentPage(model.page)
        setPageSize(model.pageSize)
        const current = model.page + 1
        navigate(`/flights?page=${current}&size=${model.pageSize}`);
      };
    
      const handleRowClick = (params, event) => {
        const target = event.target;
        const isActionIcon = target.classList.contains('action-icon') || target.tagName.toLowerCase() === 'a';
        if (isActionIcon) {
          // do not perform the redirect
          return;
        }
        const { code } = params.row;
        const current = currentPage + 1
        const page = pageSize
        navigate(`/flights?page=${current}&size=${page}&code=${code}`)
      };
    
      const handleSearchChange = (e) => {
        const inputCode = e.target.value;
        if (/^[a-zA-Z]*$/.test(inputCode)) {
          setCode(inputCode);
        } else {
          setCode('');
        }
      };
    
      const handleView = async (id) => {
        try {
          const response = await fetch(`http://localhost:3000/flights/${id}/photo`);
          console.log("response", response);
          if (response.ok) {
            const imgData = await response.blob();
            const imgUrl = URL.createObjectURL(imgData);
            setSelectedImg(imgUrl);
            setOpen(true);
          } else {
            console.error("Error getting image");
          }
        } catch (error) {
          console.error("Error getting image", error);
        }
      };
    
      const handleEditPhoto = async (event, id) => {
        event.stopPropagation();
        navigate(`/fligths/edit-photo/${id}`);
        console.log(id);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleClosePhoto = () => {
        setOpenPhoto(false);
      };
    
      const handleEdit = (event, id) => {
        event.stopPropagation();
        navigate(`/fligths/edit/${id}`);
        console.log(id);
      };
    
      const handleDelete = (id) => {
        setSelectedFlightId(id);
        console.log('id ===' ,id,openDeleteDialog)
        setOpenDeleteDialog(true);
      };
    
      const confirmDelete = async () => {
        console.log("delete image using ID:", selectedFlightId);
        setOpenDeleteDialog(false);
        deleteFlight(selectedFlightId);
      };
    
      const cancelDelete = () => {
        setOpenDeleteDialog(false);
      };
    
      const deleteFlight = async (id) => {
        await FlightsService.deleteFlight(id).then(
          (response) => {
            setFlights(
              flights.filter(
                (el) => el.id !== id
              )
            );
          }
        );
      };

       
  const getFlights = async () => {
    const response = await FlightsService.getFlights().catch((err) => console.log("Error", err));
    if (response && response.data) {
      setFlights(response.data.resources);
    }
  };

  const handleAddFlightClick = () => {
    navigate('/flights/add-flights', { replace: true })
  }
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      const filteredRows = flights.filter(row => row.code.toLowerCase().includes(code.toLowerCase()));
      setFilteredRows(filteredRows);

      const params = new URLSearchParams();
      if (code) {
        params.set('code', code);
      } else {
        params.delete('code');
      }
      navigate({ search: params.toString() });
    }, 500); // wait 500 milliseconds after the user finishes typing

    setTimeoutId(id);

    return () => {
      clearTimeout(id);
    };
  }, [code, navigate, flights]);


  useEffect(() => {
    getFlights();
  }, [])

  return {
    handleAddFlightClick,
    getFlights,
    deleteFlight,
    open,
    setOpen,
    openPhoto,
    selectedImg,
    openDeleteDialog,
    cancelDelete,
    handleDelete,
    handleEdit,
    handleView,
    confirmDelete,
    handleEditPhoto,
    imageURL,
    theme,
     colors,
     filteredRows,
     code,
     handleSearchChange,
     handleRowClick,handleModelCange,
     handleClose,
     handleClosePhoto,
     setImageURL

  }
}

export default useFlight