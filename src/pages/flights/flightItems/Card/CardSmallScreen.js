const CardSmallScreen = (props) => {

  const {Card,CardContent,Box,Typography,Grid,item,IconButton,SearchIcon,PhotoCameraIcon,handleDelete,handleEdit,handleView,handleEditPhoto,EditIcon,DeleteIcon,
      AddPhotoAlternateIcon} = props

      
  return (
      <Grid item key={item.id} xs={12}>
      <Card sx={{ bgcolor: "##1a1818", width: "100%" }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ mb: 4 }} variant="h6" gutterBottom>Code: {item.code}</Typography>
              <Typography sx={{ mb: 4 }} variant="body1" gutterBottom>Capacity: {item.capacity}</Typography>
              <Typography sx={{ mb: 4 }} variant="body1" gutterBottom>Departure Date: {item.departureDate}</Typography>
              <Typography sx={{ mb: 4 }} variant="body1" gutterBottom>Status: {item.status}</Typography>
            </Box>
            <Box >
              <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', flexFlow: 'no wrap', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                <Grid item>
                  {
                    (item.img != '') &&
                    (<IconButton aria-label="Buscar" onClick={() => handleView(item.id)}>
                      <SearchIcon />
                    </IconButton>)
                  }
                </Grid>

                <Grid item>
                  {
                    (item.img != '') ?
                      (
                        <IconButton aria-label="Edit photo" onClick={(event) => handleEditPhoto(event, item.id)}>
                          <PhotoCameraIcon />
                        </IconButton>
                      )
                      :
                      (
                        <IconButton aria-label="Add photo" onClick={(event) => handleEditPhoto(event, item.id)}>
                          <AddPhotoAlternateIcon />
                        </IconButton>
                      )
                  }
                </Grid>
                <Grid item>
                  <IconButton>
                    <EditIcon onClick={(event) => handleEdit(event, item.id)} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <DeleteIcon onClick={() => handleDelete(item.id)} />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </CardContent>


      </Card>
    </Grid>
  )
}
export default CardSmallScreen