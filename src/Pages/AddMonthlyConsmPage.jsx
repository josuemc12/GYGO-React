import { useParams } from "react-router-dom";
import { AddMonthlyConsumForm } from "../components/AddMonthlyConsumForm";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

export function AddMonthlyConsumPage() {
  const { consumptionId } = useParams();

  return (
    <DashboardLayout>
    <AddMonthlyConsumForm consumptionId={parseInt(consumptionId)} />
    <Footer></Footer>
    </DashboardLayout>
  );
}
