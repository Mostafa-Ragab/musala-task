import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const usuario = JSON.parse(localStorage.getItem('user'));

export const user = {
    avatar: PersonOutlinedIcon,
    email: usuario ? usuario.email : '',
    id: usuario ? usuario.id : '',
    name: usuario ? usuario.name : '',
    refreshToken: usuario ? usuario.passsword : '',
    token: usuario ? usuario.token : ''
  };
