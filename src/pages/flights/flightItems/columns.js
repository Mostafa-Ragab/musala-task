import { Box } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useFlight from '../useFlights'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Columns = ({handleEdit,handleDelete,handleRowClick, handleModelCange,handleEditPhoto,handleView,filteredRows}) => {
  const columns = [
    { field: "code", headerName: "Code" },
    {
      field: "capacity",
      headerName: "Capacity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "departureDate",
      headerName: "Departure of Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        if (params.row.status === "processing") {
          return (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          );
        }
      },
    },
    {
      field: "view",
      headerName: "View",
      // width: 150,
      renderCell: (params) => {
        if (params.row.img != "") {
          return (
            <div>
              <IconButton aria-label="Buscar" onClick={() => handleView(params.row.id)}>
                <SearchIcon />
              </IconButton>
            </div>
          );
        }
      },
    },
    {
      field: "Edit image",
      headerName: "Edit image",
      // width: 150,
      renderCell: (params) => {
        if (params.row.img != "") {
          return (
            <div>
              <IconButton aria-label="Edit image" onClick={(event) => handleEditPhoto(event, params.row.id)}>
                <PhotoCameraIcon />
              </IconButton>
            </div>
          );
        } else {
          return (
            <div>
              <IconButton aria-label="Add image" onClick={(event) => handleEditPhoto(event, params.row.id)}>
                <AddPhotoAlternateIcon />
              </IconButton>
            </div>
          );
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      // width: 150,
      renderCell: (params) => {
        return (
          <div>
            <IconButton className="action-icon" aria-label="Editar" onClick={(event) => handleEdit(event, params.row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton className="action-icon" aria-label="Eliminar" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <div>
    <DataGrid
      rows={filteredRows}
      columns={columns}
      components={{ Toolbar: GridToolbar }}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      pageSizeOptions={[5, 10, 25]}
      onRowClick={handleRowClick}
      onPaginationModelChange={handleModelCange}
    />
  </div>
  )


}
export default Columns