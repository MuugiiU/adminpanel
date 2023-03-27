import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CategoryModal({ open, handleClose, newCategory }) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {newCategory ? (
          <Box sx={style}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Шинэ Категори
              </Typography>
              <TextField label=" Категори Нэр" variant="outlined" />
              <TextField label="Тайлбар" variant="outlined" />
              <TextField label="Зураг" variant="outlined" />
              <TextField label="Үнэлгээ" variant="outlined" />
              <Button variant="contained">Хадгалах</Button>
            </Box>
          </Box>
        ) : (
          <Box sx={style}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Категори Өөрчлөх
              </Typography>
              <TextField label=" Категори Нэр" variant="outlined" />

              <TextField label="Тайлбар" variant="outlined" />
              <TextField label="Зураг" variant="outlined" />
              <TextField label="Үнэлгээ" variant="outlined" />
              <Button variant="contained">Хадгалах</Button>
            </Box>
          </Box>
        )}
      </Modal>
    </div>
  );
}
