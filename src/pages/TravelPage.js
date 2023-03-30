import { Helmet } from 'react-helmet-async';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Container, Stack, Typography, Button, Box, CardMedia, Card, CardContent, IconButton } from '@mui/material';
import TravelModal from '../components/modal/travel';
import Iconify from '../components/iconify';
import { AuthContext } from '../context/authContext';
// ----------------------------------------------------------------------

export default function TravelPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [newTravel, setNewTravel] = useState(false);
  const { travels, setTravels } = useContext(AuthContext);

  const [selectedTravel, setSelectedTravel] = useState([]);
  const [render, setRender] = useState(false);

  const [open, setOpen] = useState();

  const [trash, setTrash] = useState();
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  const getTravel = async () => {
    await axios
      .get('http://localhost:8000/travels')
      .then((res) => {
        console.log('TRAVEL IRLEE', res.data.travels);
        setTravels(res.data.travels);
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };

  useEffect(() => {
    getTravel();
  }, [render]);

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/travels/${id}`);
      console.log(res);
      setTrash(true);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  return (
    <>
      <Helmet>
        <title> Azure Аялал </title>
      </Helmet>
      <TravelModal
        open={open}
        handleClose={handleClose}
        newTravel={newTravel}
        selectedTravel={selectedTravel}
        setSelectedTravel={setSelectedTravel}
        render={render}
        // setRender={setRender}
        getTravel={getTravel}
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
            setNewTravel(true);
          }}
        >
          Шинэ Аялал Үүсгэх
        </Button>
        {!travels.length && <h4>Хоосон байна</h4>}
        {travels.length > 0 && (
          <Box sx={{ display: 'flex', flex: 'row', gap: 5, flexWrap: 'wrap' }}>
            {travels.map((e) => {
              // const { _id, title, price, imgUTL, location, viewer } = e;
              return (
                <Box key={e}>
                  <Card
                    sx={{
                      width: 200,
                      height: 350,
                      backgroundColor: 'azure',
                      color: 'black',
                      borderRadius: '23px',
                    }}
                  >
                    <CardMedia image={e.imgUTL} component="img" height="110" alt="Paella dish" />
                    <CardContent>
                      <Typography sx={{ color: '#1363DF' }} gutterBottom variant="h5" component="div">
                        {e.title}
                      </Typography>

                      <Typography gutterBottom variant="h5" component="div">
                        {e.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {e.day}
                      </Typography>
                      <Typography variant="body2" color="text.first">
                        {e.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {e.viewer}
                      </Typography>
                      <IconButton
                        size="large"
                        color="inherit"
                        onClick={() => {
                          setOpen(true);
                          setSelectedTravel(e);
                          setTravels(false);
                        }}
                      >
                        <Iconify icon={'eva:edit-fill'} />
                      </IconButton>
                      <IconButton size="large" color="inherit">
                        <Iconify
                          icon={'eva:trash-fill'}
                          onClick={() => {
                            deleteItem(e._id);
                            getTravel();
                          }}
                        />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </>
  );
}
