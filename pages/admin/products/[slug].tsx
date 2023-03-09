import React, { FC } from 'react';
import { GetServerSideProps } from 'next';

import {
  Box, Button, capitalize, Card, CardActions,
  CardMedia, Checkbox, Chip, Divider,
  FormControl, FormControlLabel, FormGroup, FormLabel,
  Grid, Radio, RadioGroup, TextField
} from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import UploadIcon from '@mui/icons-material/UploadOutlined';
import DiveFileRenameIcon from '@mui/icons-material/DriveFileRenameOutline';

import { IProduct } from '../../../interfaces';
import { AdminLayout } from '../../../components';
import { dbProducts } from '../../../database';

const validTypes  = ['shirts','pants','hoodies','hats'];
const validGender = ['men','women','kid','unisex'];
const validSizes = ['XS','S','M','L','XL','XXL','XXXL'];

type Props = {
  product: IProduct;
};

const ProductAdminPage:FC<Props> = ({ product }) => {

    const onDeleteTag = ( tag: string ) => {
      // ...logic
    }

    return (
      <AdminLayout 
        title='Product'
        subtitle={`Edit: ${product.title}`}
        description='Product Management'
        icon={<DiveFileRenameIcon />}
      >
        <form>
          <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
            <Button 
              color="secondary"
              startIcon={ <SaveIcon /> }
              sx={{ width: '150px' }}
              type="submit"
            >Save</Button>
          </Box>

          <Grid container spacing={2}>
            {/* Data */}
            <Grid item xs={12} sm={ 6 }>
              <TextField
                label="Title"
                variant="filled"
                fullWidth 
                sx={{ mb: 1 }}
                // { ...register('name', {
                //     required: 'Este campo es requerido',
                //     minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                // })}
                // error={ !!errors.name }
                // helperText={ errors.name?.message }
              />
              <TextField
                label="Description"
                variant="filled"
                fullWidth 
                multiline
                sx={{ mb: 1 }}
              />

              <TextField
                label="Inventory"
                type='number'
                variant="filled"
                fullWidth 
                sx={{ mb: 1 }}
              />
              
              <TextField
                label="Price"
                type='number'
                variant="filled"
                fullWidth 
                sx={{ mb: 1 }}
              />

              <Divider sx={{ my: 1 }} />

              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Type</FormLabel>
                <RadioGroup
                  row
                  // value={ status }
                  // onChange={ onStatusChanged }
                >
                  {
                    validTypes.map( option => (
                      <FormControlLabel 
                        key={ option }
                        value={ option }
                        control={ <Radio color='secondary' /> }
                        label={ capitalize(option) }
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>

              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  // value={ status }
                  // onChange={ onStatusChanged }
                >
                  {
                    validGender.map( option => (
                      <FormControlLabel 
                        key={ option }
                        value={ option }
                        control={ <Radio color='secondary' /> }
                        label={ capitalize(option) }
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>

              <FormGroup>
                <FormLabel>Sizes</FormLabel>
                {
                  validSizes.map(size => (
                    <FormControlLabel key={size} control={<Checkbox />} label={ size } />
                  ))
                }
              </FormGroup>

            </Grid>

            {/* Tags and Images */}
            <Grid item xs={12} sm={ 6 }>
              <TextField
                label="Slug - URL"
                variant="filled"
                fullWidth
                sx={{ mb: 1 }}
              />

              <TextField
                label="Tags"
                variant="filled"
                fullWidth 
                sx={{ mb: 1 }}
                helperText="Press [spacebar] to add"
              />
                
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                }} component="ul"
              >
                {
                  product.tags.map((tag) => {
                    return (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={ () => onDeleteTag(tag)}
                        color="primary"
                        size='small'
                        sx={{ ml: 1, mt: 1}}
                      />
                    );
                  })
                }
              </Box>

              <Divider sx={{ my: 2  }}/>
                
              <Box display='flex' flexDirection="column">
                <FormLabel sx={{ mb:1}}>Images</FormLabel>
                <Button
                  color="secondary"
                  fullWidth
                  startIcon={ <UploadIcon /> }
                  sx={{ mb: 3 }}
                >
                  Load Image
                </Button>

                <Chip 
                  label="You need to add at least 2 images"
                  color='error'
                  variant='outlined'
                />

                <Grid container spacing={2}>
                  {
                    product.images.map( img => (
                      <Grid item xs={4} sm={3} key={img}>
                        <Card>
                          <CardMedia 
                            component='img'
                            className='fadeIn'
                            image={ `/products/${ img }` }
                            alt={ img }
                          />
                          <CardActions>
                            <Button fullWidth color="error">Delete</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  }
                </Grid>

              </Box>

            </Grid>

          </Grid>
        </form>
      </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = ''} = query;
  const product = await dbProducts.getProductBySlug(slug.toString());

  if ( !product ) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      }
    }
  }

  return {
    props: {
      product
    }
  };
};

export default ProductAdminPage;
