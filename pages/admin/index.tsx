import { Card, CardContent, Grid, Typography } from '@mui/material';
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import CreditCardIcon from '@mui/icons-material/CreditCardOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyOutlined';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOffOutlined';
import ClientsIcon from '@mui/icons-material/GroupOutlined';
import ProductsIcon from '@mui/icons-material/CategoryOutlined';
import OutStockIcon from '@mui/icons-material/CancelPresentationOutlined';
import LowInventoryIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';
import { AdminLayout, SummaryTile } from "../../components";
import styles from './Dashboard.module.css';

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      description="Dashboard page"
      subtitle="General Statistics"
      icon={ <DashboardIcon /> }
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={15}
          subTitle="Total Orders"
          icon={
            <CreditCardIcon
              color="secondary"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={2}
          subTitle="Paid Orders"
          icon={
            <AttachMoneyIcon
              color="success"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={8}
          subTitle="Pending Orders"
          icon={
            <CreditCardOffIcon
              color="warning"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={4}
          subTitle="Clients"
          icon={
            <ClientsIcon
              color="primary"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={25}
          subTitle="Products"
          icon={
            <ProductsIcon
              color="secondary"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={25}
          subTitle="Out Stock"
          icon={
            <OutStockIcon
              color="error"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={5}
          subTitle="Low Inventory"
          icon={
            <LowInventoryIcon
              color="error"
              className={styles.Icon}
            />
          }
        />
        <SummaryTile
          title={5}
          subTitle="Update in:"
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
