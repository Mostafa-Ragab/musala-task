import { MenuItem } from "react-pro-sidebar";
import {  Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected,colors }) => {
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

export default Item