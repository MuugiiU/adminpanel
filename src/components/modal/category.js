import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';

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

export default function CategoryModal({
  open,
  handleClose,
  newCategory,
  selectedCategory,
  setSelectedCategory,
  render,
  setRender,
}) {
  const [newCategoryObj, setNewCategoryObj] = useState({
    title: '',
    description: '',
    categoryImg: 'url',
    categoryRating: '',
  });

  const changeHandler = (e) => {
    if (newCategory) {
      setNewCategoryObj({ ...newCategoryObj, [e.target.name]: e.target.value });
    } else {
      setSelectedCategory({ ...selectedCategory, [e.target.name]: e.target.value });
    }
  };

  const updateCategory = async () => {
    try {
      const editCat = await axios.put(`http://localhost:8000/categories/${selectedCategory._id}`, selectedCategory);
      setRender(!render);
      handleClose();
      // setOpen(false);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const addCtegory = async () => {
    try {
      const result = await axios.post(`http://localhost:8000/categories`, newCategoryObj);
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
              {newCategory ? 'Шинэ' : 'Өөрчлөх'} - Категори
            </Typography>
            <TextField
              label=" Категори Нэр"
              variant="outlined"
              value={newCategory ? newCategoryObj.title : selectedCategory.title}
              name="title"
              onChange={changeHandler}
            />
            <TextField
              label="Тайлбар"
              variant="outlined"
              value={newCategory ? newCategoryObj.description : selectedCategory.description}
              name="description"
              onChange={changeHandler}
            />
            <TextField
              label="Зураг"
              variant="outlined"
              name="categoryImg"
              value={newCategory ? newCategoryObj.categoryImg : selectedCategory.categoryImg}
              onChange={() => {
                console.log('Upload Photo');
              }}
            />
            <TextField
              label="Үнэлгээ"
              variant="outlined"
              value={newCategory ? newCategoryObj.categoryRating : selectedCategory.categoryRating}
              name="categoryRating"
              onChange={changeHandler}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (newCategory) {
                  addCtegory();
                } else {
                  updateCategory();
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
