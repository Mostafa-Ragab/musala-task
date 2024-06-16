import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  useMediaQuery,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { IconButton } from "@mui/material";
import CardSmallScreen from "./Card/CardSmallScreen";
import CardMediumScreen from "./Card/CardMediumScreen";
import Columns from './Card/Cardscolumns'

const FlightItems = ({ handleRowClick,handleModelCange,filteredRows,handleEdit, handleDelete, theme, handleEditPhoto, handleView }) => {

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <>
    <Grid container spacing={2} alignItems="center">
      {filteredRows.map((item) => (
        <>
          {isSmallScreen && (
            <CardSmallScreen
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleEditPhoto={handleEditPhoto}
              handleView={handleView}
              PhotoCameraIcon={PhotoCameraIcon}
              SearchIcon={SearchIcon}
              IconButton={IconButton}
              AddPhotoAlternateIcon={AddPhotoAlternateIcon}
              EditIcon={EditIcon}
              DeleteIcon={DeleteIcon}
              Grid={Grid}
              CardContent={CardContent}
              Card={Card}
              Box={Box}
              Typography={Typography}
              item={item}
              CardHeader
            />
          )}
          
          {
            isMediumScreen &&
            (
                <CardMediumScreen
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleEditPhoto={handleEditPhoto}
              handleView={handleView}
              PhotoCameraIcon={PhotoCameraIcon}
              SearchIcon={SearchIcon}
              IconButton={IconButton}
              AddPhotoAlternateIcon={AddPhotoAlternateIcon}
              EditIcon={EditIcon}
              DeleteIcon={DeleteIcon}
              Grid={Grid}
              CardContent={CardContent}
              Card={Card}
              Box={Box}
              Typography={Typography}
              item={item}
              CardHeader={CardHeader}
            />
            )
          }
        </>
      ))}
    </Grid>
    {
            (!isSmallScreen && !isMediumScreen) &&
            (
             <Columns filteredRows={filteredRows} handleRowClick={handleRowClick} handleModelCange={handleModelCange} handleEdit={handleEdit} handleDelete={handleDelete} theme={theme} handleEditPhoto={handleEditPhoto} handleView={handleView} />
            )
    }
    </>
  );
};

export default FlightItems;
