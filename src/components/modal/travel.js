import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Select, InputLabel, MenuItem } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

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

export default function TravelModal({
  open,
  handleClose,
  newTravel,
  selectedTravel,
  setSelectedTravel,
  // render,
  // setRender,
  getTravel,
}) {
  const { categories } = useContext(AuthContext);
  const [newTravelObj, setNewTravelObj] = useState({
    title: '',
    imgUTL: 'url',
    price: '',
    day: '',
    location: '',
    viewer: '',
    // category: '',
  });

  const changeHandler = (e) => {
    if (newTravel) {
      setNewTravelObj({ ...newTravelObj, [e.target.name]: e.target.value });
    } else {
      setSelectedTravel({ ...selectedTravel, [e.target.name]: e.target.value });
    }
  };

  const updateTravel = async () => {
    try {
      const editTravel = await axios.put(`http://localhost:8000/travels/${selectedTravel._id}`, selectedTravel);
      // setRender(!render);
      handleClose();
      getTravel();
      // setOpen(false);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const addTravel = async () => {
    try {
      console.log('setted: ', newTravelObj);
      await axios.post(`http://localhost:8000/travels`, newTravelObj);
      console.log(newTravelObj);
      // setRender(!render);
      getTravel();
      handleClose();
    } catch (err) {
      console.log('ERROR', err.message);
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal open={open} onClose={handleClose}>
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
              {newTravel ? 'Шинэ' : 'Өөрчлөх'} - Аялал
            </Typography>
            <TextField
              label=" Аялалын Нэр"
              variant="outlined"
              value={newTravel ? newTravelObj.title : selectedTravel.title}
              name="title"
              onChange={changeHandler}
            />

            <TextField
              label="Зураг"
              variant="outlined"
              name="imgUTL"
              value={newTravel ? newTravelObj.imgUTL : selectedTravel.imgUTL}
              onChange={() => {
                console.log('Upload Photo');
              }}
            />
            <TextField
              label="Аялалын Үнэ"
              variant="outlined"
              value={newTravel ? newTravelObj.price : selectedTravel.price}
              name="price"
              onChange={changeHandler}
            />
            <TextField
              label="Аялалын Өдөр"
              variant="outlined"
              value={newTravel ? newTravelObj.day : selectedTravel.day}
              name="day"
              onChange={changeHandler}
            />
            <TextField
              label="Аялалын Байршил"
              variant="outlined"
              value={newTravel ? newTravelObj.location : selectedTravel.location}
              name="location"
              onChange={changeHandler}
            />
            <TextField
              label="Тайлбар"
              variant="outlined"
              value={newTravel ? newTravelObj.viewer : selectedTravel.viewer}
              name="viewer"
              onChange={changeHandler}
            />
            {/* <InputLabel id="demo-simple-select-label">Категори</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categories._id}
              label="Категори"
              onChange={changeHandler}
            >
              {categories.map((category) => (
                <MenuItem value={category._id}>{category.title}</MenuItem>
              ))}
            </Select> */}
            <Button
              variant="contained"
              onClick={() => {
                if (newTravel) {
                  addTravel();
                } else {
                  updateTravel();
                  console.log(selectedTravel._id);
                }
              }}
            >
              Хадгалах
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
