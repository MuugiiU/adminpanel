import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Container, Stack, Typography, Button, Modal, TextField, Box, Select } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// components
import { ProductSort, ProductFilterSidebar } from '../sections/@dashboard/products';
// // mock
// import PRODUCTS from '../_mock/products';
import Iconify from '../components/iconify';
import { AuthContext } from '../context/authContext';

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 680,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  backgroundColor: '#ECF2FF',
};

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { categories } = React.useContext(AuthContext);
  const [openFilter, setOpenFilter] = useState(false);
  const [addTravel, setAddTravel] = useState(null);
  const [added, setAdded] = useState(false);
  const [filteredTravel, setFilteredTravel] = useState([]);
  const [categoryId, setCategoryId] = React.useState();

  const handleChange = (event) => {
    console.log(event.target.value);
    setCategoryId(event.target.value);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleTravel = () => {
    setAddTravel(true);
  };
  const travelBarilt = (e) => {
    console.log(e.target.value);
    const createObj = {};
    createObj[e.target.name] = e.target.value;
    setCreateTravel({ ...createTravel, ...createObj });
  };
  const handleClose = () => setAddTravel(false);

  const [createTravel, setCreateTravel] = useState({});

  const createTravels = async () => {
    try {
      const result = await axios.post(`http://localhost:8000/travels`, { ...createTravel, category: categoryId });
      console.log(result);
      setAdded(true);
      setAddTravel(false);
    } catch (err) {
      console.log('Err:', err);
    }
  };

  const getTravel = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/travels`);
      console.log(result);
      setFilteredTravel(result.data.travels);
    } catch (err) {
      console.log('Err', err);
    }
  };

  // const deleteTravel = async () => {
  //   try {

  //   } catch (err){

  //   }
  // }

  useEffect(() => {
    console.log('ProductPage ali hediin ehelsen.');
    getTravel();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Travels
        </Typography>
        <Button onClick={handleTravel} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Шинэ аялал үүсгэх
        </Button>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <Modal
          open={addTravel}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Аялал нэмэх хэсэг
            </Typography>
            <Box sx={{ margin: '30px' }}>
              <TextField
                name="title"
                onChange={travelBarilt}
                sx={{ width: '100%', margin: '10px 0' }}
                id="outlined-basic"
                label="Аялал нэр"
                variant="outlined"
              />

              <TextField
                name="description"
                onChange={travelBarilt}
                sx={{ width: '100%', margin: '10px 0' }}
                id="outlined-basic"
                label="Тайлбар"
                variant="outlined"
              />

              <TextField
                name="travelImg"
                onChange={travelBarilt}
                sx={{ width: '100%', margin: '10px 0' }}
                id="outlined-basic"
                label="Зураг"
                variant="outlined"
              />

              <TextField
                onChange={travelBarilt}
                sx={{ width: '100%', margin: '10px 0' }}
                name="travelPrice"
                id="outlined-basic"
                label="Үнийн дүн"
                variant="outlined"
              />

              <TextField
                onChange={travelBarilt}
                sx={{ width: '100%', margin: '10px 0' }}
                name="travelDay"
                id="outlined-basic"
                label="Өдөр"
                variant="outlined"
              />

              <TextField
                onChange={travelBarilt}
                sx={{ width: '100%', margin: '10px 0' }}
                name="travelLocation"
                id="outlined-basic"
                label="Байршил"
                variant="outlined"
              />

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Категори сонголт</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    onChange={handleChange}
                  >
                    {/* <MenuItem value={"catID-1"}>Хөшигийн Хөндийн Нисэх Онгоцны Буудал</MenuItem>
                    <MenuItem value={"catID-2"}>Манзушир хийд</MenuItem> */}
                    {categories.map((cat) => (
                      <MenuItem value={cat._id}>{cat.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Button sx={{ margin: '20px 0' }} onClick={createTravels} variant="contained">
                Нэмэх
              </Button>
            </Box>
          </Box>
        </Modal>

        <Box>
          {filteredTravel.map((e) => (
            <Box key={e}>
              <Card
                sx={{ maxWidth: 330, height: 410, backgroundColor: '#FED049', color: 'black', borderRadius: '23px' }}
              >
                <CardMedia sx={{ height: 220 }} image={e.travelImg} title="аялалын тайлбар" />
                <CardContent>
                  <Typography sx={{ color: '#1363DF' }} gutterBottom variant="h5" component="div">
                    {e.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {e.description}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {e.travelPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {e.travelDay} {'Өдөр'}
                  </Typography>
                  <Typography variant="body2" color="text.first">
                    {e.travelLocation}
                  </Typography>
                </CardContent>
                <CardActions>{/* <Button sx={{color: "red"}} size="small">Learn More</Button> */}</CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
