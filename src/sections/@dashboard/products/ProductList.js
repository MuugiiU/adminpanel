import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ travels, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {travels.map((travel) => (
        <Grid key={travel._id} item xs={12} sm={6} md={3}>
          <ShopProductCard travel={travel} />
        </Grid>
      ))}
    </Grid>
  );
}
