import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: '#fb5607',
  },
  "& .MuiOutlinedInput-root.Mui-hovered": {
    borderColor: '#fb5607',
  },
  "& .MuiInputLabel-root": {
    color: "#fb5607"
  },
  "& .css-1d6u1w6-MuiFormLabel-root-MuiInputLabel-root": {
    color: "#fb5607 !important"
  }
});
