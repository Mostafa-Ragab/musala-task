const CardMediumScreen = (props) => {
  const {
    Card,
    CardContent,
    CardHeader,
    Grid,
    item,
    IconButton,
    SearchIcon,
    PhotoCameraIcon,
    handleDelete,
    handleEdit,
    handleView,
    handleEditPhoto,
    EditIcon,
    DeleteIcon,
    AddPhotoAlternateIcon,
  } = props;
  return (
    <Grid item key={item.id} xs={12} md={12}>
      <Card sx={{ bgcolor: "#1a1818", width: "100%" }}>
        <CardContent
          sx={{
            color: "#ededed",
            display: "flex",
            flexFlow: "no wrap",
            justifyContent: "space-around",
            p: 2,
            mb: 2,
          }}
        >
          <CardHeader
            subheaderTypographyProps={{ color: "white" }}
            subheader={item.code}
            title="Code"
          />
          <CardHeader
            subheaderTypographyProps={{ color: "white" }}
            subheader={item.capacity}
            title="Capacity"
          />
          <CardHeader
            subheaderTypographyProps={{ color: "white" }}
            subheader={item.departureDate}
            title="Departure Date"
          />
          <CardHeader
            subheaderTypographyProps={{ color: "white" }}
            subheader={item.status}
            title="Status"
          />
          <Grid item>
            {item.img != "" && (
              <IconButton
                sx={{ color: "#ededed" }}
                aria-label="view"
                onClick={() => handleView(item.id)}
              >
                <SearchIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item>
            {item.img != "" ? (
              <IconButton
                sx={{ color: "#ededed" }}
                aria-label="Edit photo"
                onClick={(event) => handleEditPhoto(event, item.id)}
              >
                <PhotoCameraIcon />
              </IconButton>
            ) : (
              <IconButton
                sx={{ color: "#ededed" }}
                aria-label="Add photo"
                onClick={(event) => handleEditPhoto(event, item.id)}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            )}
            <IconButton
              sx={{ color: "#ededed" }}
              aria-label="Edit"
              onClick={(event) => handleEdit(event, item.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#ededed" }}
              aria-label="delete"
              onClick={() => handleDelete(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default CardMediumScreen;
