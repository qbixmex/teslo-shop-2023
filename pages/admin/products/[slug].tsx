import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import {
  Box, Button, capitalize, Card, CardActions,
  CardMedia, Checkbox, Chip, Divider,
  FormControl, FormControlLabel, FormGroup, FormLabel,
  Grid, Radio, RadioGroup, TextField
} from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import GarbageIcon from '@mui/icons-material/DeleteOutlined';
import UploadIcon from '@mui/icons-material/UploadOutlined';
import DiveFileRenameIcon from '@mui/icons-material/DriveFileRenameOutline';
import Swal from 'sweetalert2';

import { Product } from '../../../models';
import { IProduct, ISize, IType, ValidGenders } from '../../../interfaces';
import { AdminLayout } from '../../../components';
import { dbProducts } from '../../../database';
import tesloAPI from '../../../services/tesloAPI';

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
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const [ newTagValue, setNewTagValue ] = useState('');
  const [ isSaving, setIsSaving ] = useState(false);
  const [ isDeleting, setIsDeleting ] = useState(false);

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

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');
    if (currentTags.includes(newTag)) return;
    currentTags.push(newTag);
  };

  const onDeleteTag = ( tag: string ) => {
    const updatedTags = getValues('tags').filter(t => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true });
  };

  const onDeleteProduct = () => {
    setIsDeleting(true);

    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You cannot recover this product!",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await tesloAPI({
            url: `/admin/products/${product._id}`,
            method: 'DELETE',
          }) as { data: { message: string; }};
          Swal.fire({
            title: 'Deleted!',
            text: data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => router.replace(`/admin/products`), 2000);
        }
        setIsDeleting(false);
      });
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  const onFilesSelected = async ({target}: ChangeEvent<HTMLInputElement>) => {    
    if (!target.files || target.files.length === 0) return;

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await tesloAPI.post<{ message: string }>('/admin/products/upload', formData);
        setValue('images', [...getValues('images'), data.message], { shouldValidate: true })
      }
    } catch(error) {
      console.error(error);
    }

  };

  const onDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter(img => img !== image),
      { shouldValidate: true },
    );
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2) return;

    setIsSaving(true);

    try {
      await tesloAPI({
        url: `/admin/products/${product._id}`,
        method: form._id ? 'PATCH' : 'POST',
        data: form
      });

      if (!form._id) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Product has been created',
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => router.replace(`/admin/products/${form.slug}`), 2000);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Product has been updated',
          showConfirmButton: false,
          timer: 2000
        });
        setIsSaving(false);
      }
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout 
      title='Product'
      subtitle={`Edit: ${product.title}`}
      description='Product Management'
      icon={<DiveFileRenameIcon />}
    >
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
          <Button 
            color="secondary"
            startIcon={ <SaveIcon /> }
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >Save</Button>
          { product._id && (
              <Button 
                color="error"
                startIcon={ <GarbageIcon /> }
                sx={{ width: '150px' }}
                type="button"
                disabled={isDeleting}
                onClick={onDeleteProduct}
              >Delete</Button>
            )
          }
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
              autoComplete="off"
              value={ newTagValue }
              onChange={ ({target}) => setNewTagValue(target.value) }
              onKeyUp={ ({ code }) => code === 'Space' ? onNewTag() : undefined }
            />
              
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {
                getValues('tags').map(tag => {
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
                onClick={ () => fileInputRef.current?.click() }
              >Load Image</Button>

              <input
                ref={ fileInputRef }
                type="file"
                multiple
                accept='image/png, image/gif, image/jpeg'
                style={{ display: 'none' }}
                onChange={ onFilesSelected }
              />

              {
                (getValues('images').length < 2) && (
                  <Chip 
                    label="You need to add at least 2 images"
                    color='error'
                    variant='outlined'                
                  />
                )
              }

              <Grid container spacing={2}>
                {
                  getValues('images').map( img => (
                    <Grid item xs={4} sm={3} key={img}>
                      <Card>
                        <CardMedia 
                          component='img'
                          className='fadeIn'
                          image={ img }
                          alt={ img }
                        />
                        <CardActions>
                          <Button
                            fullWidth
                            color="error"
                            onClick={ () => onDeleteImage(img) }
                          >Delete</Button>
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

  let product: IProduct | null;

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = [];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

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
