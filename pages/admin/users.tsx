import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';

import PeopleIcon from '@mui/icons-material/PeopleOutline';
import { Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { IUser } from '../../interfaces';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import styles from './Users.module.css';
import tesloAPI from '../../services/tesloAPI';

const UsersPage: NextPage = () => {

  const { data, error } = useSWR<IUser[]>('/api/admin/users');
  const [ users, setUsers ] = useState<IUser[]>([]);

  useEffect(() => (data) && setUsers(data), [data]);

  if (!data && !error) return (<></>);

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = users.map(user => ({ ...user }));
    const updatedUsers = users.map(user => ({
      ...user,
      role: (userId === user._id) ? newRole : user.role,
    }));

    setUsers(updatedUsers as IUser[]);

    try {
      await tesloAPI.patch('/admin/users', { userId, role: newRole });
    } catch (error) {
      setUsers(previousUsers);
      console.error('Cannot Update user role!');
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'fullName', headerName: 'Full Name', width: 180 },
    {
      field: 'role',
      headerName: 'Role',
      width: 300,
      renderCell: (params) => (
        <Select
          value={ params.row.role }
          label="Role"
          onChange={event => {
            onRoleUpdated(params.row.id, event.target.value);
          }}
          className={styles.select}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="client">Client</MenuItem>
          <MenuItem value="super-user">Super User</MenuItem>
          <MenuItem value="seo">SEO</MenuItem>
        </Select>
      ),
    },
  ];

  const rows = users.map((user) => {
    return {
      id: user._id,
      email: user.email,
      fullName: user.name,
      role: user.role,
    };
  });

  return (
    <AdminLayout
      title="Users"
      description="Manage Users"
      subtitle="Users Maintenance"
      icon={ <PeopleIcon /> }
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} className={styles.item}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
