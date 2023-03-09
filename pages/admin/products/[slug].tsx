import { FC, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { Controller, useForm } from 'react-hook-form';

import {
  Box, Button, capitalize, Card, CardActions,
  CardMedia, Checkbox, Chip, Divider,
  FormControl, FormControlLabel, FormGroup, FormLabel,
  Grid, Radio, RadioGroup, TextField
} from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import UploadIcon from '@mui/icons-material/UploadOutlined';
import DiveFileRenameIcon from '@mui/icons-material/DriveFileRenameOutline';

import { IProduct, ISize, IType, ValidGenders } from '../../../interfaces';
import { AdminLayout } from '../../../components';
import { dbProducts } from '../../../database';

const validTypes  = ['shirts','pants','hoodies','hats'];
const validGender = ['men','women','kid','unisex'];
const validSizes = ['XS','S','M','L','XL','XXL','XXXL'];

type FormData = {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: ValidGenders;
};

type Props = {
  product: IProduct;
};

const ProductAdminPage: FC<Props> = ({ product }) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: product
  });

  useEffect(() => {
    const subscription = watch((value, {name, type}) => {
      if (name === 'title') {
        const newSlug = value.title?.trim()
          .replaceAll(' ', '_')
          .replaceAll("-", '_')
          .replaceAll("'", '')
          .toLowerCase() ?? '';
        setValue('slug', newSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onChangeSize = (size: ISize) => {
    const currentSizes = getValues('sizes');
    if (currentSizes.includes(size)) {
      return setValue(
        'sizes',
        currentSizes.filter(s => s !== size),
        { shouldValidate: true }
      );
    }
    setValue('sizes', [ ...currentSizes, size ], { shouldValidate: true });
  };

  const onDeleteTag = ( tag: string ) => {
    // ...logic
  };

  const onSubmit = (form: FormData) => {
    console.log(form);
  };

  return (
    <AdminLayout 
      title='Product'
      subtitle={`Edit: ${product.title}`}
      description='Product Management'
      icon={<DiveFileRenameIcon />}
    >
      <form onSubmit={ handleSubmit(onSubmit) }>
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
              { ...register('title', {
                required: 'Field is required!',
                minLength: { value: 3, message: 'You must type at least 3 characters!' }
              })}
              error={ !!errors.title }
              helperText={ errors.title?.message }
            />

              <TextField
                label="Description"
                variant="filled"
                fullWidth
                multiline
                rows={5}
                sx={{ mb: 1 }}
                { ...register('description', {
                  required: 'Field is required!',
                  minLength: { value: 8, message: 'You must type at least 8 characters!' }
                })}
                error={ !!errors.description }
                helperText={ errors.description?.message }
              />

            <TextField
              label="Inventory"
              type='number'
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              { ...register('inStock', {
                required: 'Field is required!',
                minLength: { value: 0, message: 'You must put at least 0 as value!' }
              })}
              error={ !!errors.inStock }
              helperText={ errors.inStock?.message }
            />
            
            <TextField
              label="Price"
              type='number'
              variant="filled"
              fullWidth 
              sx={{ mb: 1 }}
              { ...register('price', {
                required: 'Field is required!',
                minLength: { value: 0, message: 'You must put at least 0 as value!' }
              })}
              error={ !!errors.price }
              helperText={ errors.price?.message }
            />

            <Divider sx={{ my: 1 }} />

            <Controller
              name="type"
              control={control}
              defaultValue={undefined}
              render={({field}) => (
                <FormControl sx={{ mb: 1 }}>
                  <FormLabel>Type</FormLabel>
                  <RadioGroup row { ...field }>
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
              )}
            />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row
                value={ getValues('gender') }
                onChange={({target}) => {
                  setValue(
                    'gender',
                    target.value as ValidGenders,
                    { shouldValidate: true }
                  )
                }}
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
                  <FormControlLabel
                    key={size}
                    label={size}
                    control={
                      <Checkbox
                        checked={ getValues('sizes').includes(size as ISize) }
                        onChange={ () => onChangeSize(size as ISize) }
                      />
                    }
                  />
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
              { ...register('slug', {
                required: 'Field is required!',
                validate: (value) => {
                  return value.trim().includes(' ')
                    ? 'Cannot include empty spaces!'
                    : undefined;
                }
              })}
              error={ !!errors.slug }
              helperText={ errors.slug?.message }
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