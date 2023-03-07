import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Grid, Typography } from '@mui/material';
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import CreditCardIcon from '@mui/icons-material/CreditCardOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyOutlined';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOffOutlined';
import ClientsIcon from '@mui/icons-material/GroupOutlined';
import ProductsIcon from '@mui/icons-material/CategoryOutlined';
import OutStockIcon from '@mui/icons-material/CancelPresentationOutlined';
import LowInventoryIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';

import { DashboardSummaryResponse } from '../../interfaces';
import { AdminLayout, SummaryTile } from "../../components";
import styles from './Dashboard.module.css';

const DashboardPage = () => {

  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000 // 30 seconds
  });

  const [ refreshIn, setRefreshIn ] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.error(error);
    return <Typography color="error">Error on load information</Typography>
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      description="Dashboard page"
      subtitle="General Statistics"
      icon={ <DashboardIcon /> }
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle="Total Orders"
          icon={
            <CreditCardIcon
              color="secondary"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={paidOrders}
          subTitle="Paid Orders"
          icon={
            <AttachMoneyIcon
              color="success"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={notPaidOrders}
          subTitle="Pending Orders"
          icon={
            <CreditCardOffIcon
              color="warning"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={numberOfClients}
          subTitle="Clients"
          icon={
            <ClientsIcon
              color="primary"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={numberOfProducts}
          subTitle="Products"
          icon={
            <ProductsIcon
              color="secondary"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={productsWithNoInventory}
          subTitle="Out Stock"
          icon={
            <OutStockIcon
              color="error"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={lowInventory}
          subTitle="Low Inventory"
          icon={
            <LowInventoryIcon
              color="error"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={refreshIn}
          subTitle="Refresh in:"
          icon={
            <TimeIcon
              color="secondary"
              className={styles.Icon}
            />
          }
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
