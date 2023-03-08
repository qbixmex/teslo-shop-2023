import { NextPage } from 'next';
import useSWR from 'swr';

import PeopleIcon from '@mui/icons-material/PeopleOutline';
import { Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { IUser } from '../../interfaces';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import styles from './Users.module.css';
import tesloAPI from '../../services/tesloAPI';

type Props = {
  users: IUser[];
};

const UsersPage: NextPage<Props> = () => {

  const { data: users, error } = useSWR<IUser[]>('/api/admin/users');

  if (!users && !error) return (<></>);

  const onRoleUpdated = async (userId: string, newRole: string) => {
    try {
      await tesloAPI.patch('/admin/users', { userId, role: newRole });
    } catch (error) {
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

  const rows = users!.map((user, index) => {
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
