import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Select, InputLabel, MenuItem, CardMedia, Card, CardContent } from '@mui/material';
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
  render,
  setRender,
}) {
  const { categories } = useContext(AuthContext);
  const [newTravelObj, setNewTravelObj] = useState({
    title: '',
    description: '',
    travelImg: 'url',
    travelPrice: '',
    travelDay: '',
    travelLocation: '',
    category: '',
  });

  const changeHandler = (e) => {
    if (newTravel) {
      setNewTravelObj({ ...newTravel, [e.target.name]: e.target.value });
    } else {
      setSelectedTravel({ ...selectedTravel, [e.target.name]: e.target.value });
    }
  };

  const updateTravel = async () => {
    try {
      const editTravel = await axios.put(`http://localhost:8000/travels/${selectedTravel._id}`, selectedTravel);
      setRender(!render);
      handleClose();
      // setOpen(false);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const addTravel = async () => {
    try {
      const result = await axios.post(`http://localhost:8000/travels`, newTravelObj);
      setRender(!render);
      handleClose();
    } catch (err) {
      console.log('ERROR', err);
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
              label="Тайлбар"
              variant="outlined"
              value={newTravel ? newTravelObj.description : selectedTravel.description}
              name="description"
              onChange={changeHandler}
            />
            <TextField
              label="Зураг"
              variant="outlined"
              name="categoryImg"
              value={newTravel ? newTravelObj.travelImg : selectedTravel.travelImg}
              onChange={() => {
                console.log('Upload Photo');
              }}
            />
            <TextField
              label="Аялалын Үнэ"
              variant="outlined"
              value={newTravel ? newTravelObj.travelPrice : selectedTravel.travelPrice}
              name="categoryRating"
              onChange={changeHandler}
            />
            <TextField
              label="Аялалын Өдөр"
              variant="outlined"
              value={newTravel ? newTravelObj.travelDay : selectedTravel.travelDay}
              name="categoryRating"
              onChange={changeHandler}
            />
            <TextField
              label="Аялалын Байршил"
              variant="outlined"
              value={newTravel ? newTravelObj.travelLocation : selectedTravel.travelLocation}
              name="categoryRating"
              onChange={changeHandler}
            />
            <InputLabel id="demo-simple-select-label">Категори</InputLabel>
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
            </Select>
            <Button
              variant="contained"
              onClick={() => {
                if (newTravel) {
                  addTravel();
                } else {
                  updateTravel();
                }
              }}
            >
              Хадгалах
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box>
        {selectedTravel.map((e) => (
          <Box key={e}>
            <Card sx={{ maxWidth: 330, height: 410, backgroundColor: '#FED049', color: 'black', borderRadius: '23px' }}>
              <CardMedia sx={{ height: 220 }} image={selectedTravel.travelImg} title="аялалын тайлбар" />
              <CardContent>
                <Typography sx={{ color: '#1363DF' }} gutterBottom variant="h5" component="div">
                  {selectedTravel.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedTravel.description}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {selectedTravel.travelPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedTravel.travelDay} {'Өдөр'}
                </Typography>
                <Typography variant="body2" color="text.first">
                  {selectedTravel.travelLocation}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </div>
  );
}
