import { Helmet } from 'react-helmet-async';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import { ProductSort, ProductFilterSidebar } from '../sections/@dashboard/products';
import TravelModal from '../components/modal/travel';
// mock
// import PRODUCTS from '../_mock/products';

import Iconify from '../components/iconify';
import { AuthContext } from '../context/authContext';
// ----------------------------------------------------------------------

export default function TravelPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [newTravel, setNewTravel] = useState();
  const { travels, setTravels } = useContext(AuthContext);

  const [selectedTravel, setSelectedTravel] = useState([]);
  const [render, setRender] = useState(false);

  const [open, setOpen] = useState(null);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/travels')
      .then((res) => {
        console.log('TRAVEL IRLEE', res.data.travels);
        setTravels(res.data.travels);
      })
      .catch((err) => {
        console.log('Err', err);
      });
  }, [render]);

  return (
    <>
      <Helmet>
        <title> Dashboard: Travels | Minimal UI </title>
      </Helmet>
      <TravelModal
        open={open}
        // handleClose={handleClose}
        newTravel={newTravel}
        selectedTravel={selectedTravel}
        setSelectedTravel={setSelectedTravel}
        render={render}
        setRender={setRender}
      />
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Аялал
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            setOpen(true);
            setTravels(true);
          }}
        >
          Шинэ Аялал Үүсгэх
        </Button>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}
      </Container>
    </>
  );
}
