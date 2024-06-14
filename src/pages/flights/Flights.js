import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Header from "../../components/Header";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Helmet } from "react-helmet";
import useFlight from "./useFlights";
import Cards from "./flightItems/Cards";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import FlightsService from "../../services/flights.service";
import { useLocation, useNavigate } from "react-router-dom";

const Flights = () => {
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
  const initialCode = searchParams.get("code") || "";

  const [code, setCode] = useState(initialCode);
  const [filteredRows, setFilteredRows] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const {
    handleAddFlightClick,
    cancelDelete,
    confirmDelete,
    handleSearchChange,
    handleClose,
    handleClosePhoto,
  } = useFlight({
    code,
    navigate,
    openDeleteDialog,
    flights,
    setFlights,
    currentPage,
    pageSize,
    setPageSize,
    setCurrentPage,
    setOpenDeleteDialog,
    selectedFlightId,
    setSelectedFlightId,
    setOpen,
    setSelectedImg,
    setCode,
    setOpenPhoto,
    setFilteredRows,
    timeoutId,
    setTimeoutId,
  });

  return (
    <>
      <Helmet>
        <title>Flights</title>
      </Helmet>
      <Box m="20px">
        <Header title="FLIGHTS" subtitle="List of flights" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexFlow: "wrap",
            }}
          >
            <FormControl fullWidth sx={{ mb: 2, width: "20vh" }}>
              <InputLabel htmlFor="label-search">Search by code</InputLabel>
              <OutlinedInput
                error={code !== "" && filteredRows.length === 0}
                helperText={
                  code !== "" && filteredRows.length === 0
                    ? "There are no results for this code"
                    : ""
                }
                labelId="label-search"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
                label="Search by code"
                margin="normal"
                onChange={handleSearchChange}
                value={code}
                variant="outlined"
              />
              <FormHelperText error sx={{ mx: 2 }}>
                {code !== "" && filteredRows.length === 0
                  ? "There are no results for this code"
                  : ""}
              </FormHelperText>
            </FormControl>

            <Fab
              sx={{ mb: 2 }}
              color="secondary"
              aria-label="add"
              onClick={handleAddFlightClick}
            >
              <AddIcon />
            </Fab>
          </Box>

          <Cards filteredRows={filteredRows} />

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Image selected</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <img src={selectedImg} alt="selected image" />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openPhoto} onClose={handleClosePhoto}>
            <DialogTitle>Image</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div>
                  <label htmlFor="photo">Photo:</label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    onChange={(event) => {
                      setImageURL(
                        URL.createObjectURL(event.currentTarget.files[0])
                      );
                    }}
                  />

                  {imageURL && (
                    <img
                      src={imageURL}
                      alt="Image preview"
                      style={{ maxWidth: 200, maxHeight: 200 }}
                    />
                  )}
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePhoto} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openDeleteDialog} onClose={cancelDelete}>
            <DialogTitle>Delete Flight</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this flight?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="secondary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export default Flights;