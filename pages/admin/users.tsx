import { NextPage } from 'next';
import useSWR from 'swr';

import PeopleIcon from '@mui/icons-material/PeopleOutline';
import { Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { IUser } from '../../interfaces';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import styles from './Users.module.css';

type Props = {
  users: IUser[];
};

const UsersPage: NextPage<Props> = () => {

  const { data: users, error } = useSWR<IUser[]>('/api/admin/users');

  if (!users && !error) return (<></>);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'fullName', headerName: 'Full Name', width: 180 },
    { field: 'role', headerName: 'Role', width: 100 },
  ];

  const rows = users!.map((user, index) => {
    return {
      id: index + 1,
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
