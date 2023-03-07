import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import { AdminLayout } from "../../components";

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      description="Dashboard page"
      subtitle="General Statistics"
      icon={ <DashboardIcon /> }
    >
      <p>Dashboard Content</p>
    </AdminLayout>
  );
};

export default DashboardPage;
