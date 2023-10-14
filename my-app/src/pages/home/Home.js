import { useEffect } from "react";
import BarChart from "../../Component/BarChart/BarChart";
import Charts from "../../Component/Charts/Charts";
// import ChartandOrder from '../../Component/CharttandOrders/ChartandOrder';
import Dashboardhome from "../../Component/Dashboardhome/Dashboardhome";
import FeaturedCards from "../../Component/FeaturedCards/FeaturedCards";
import Table from "../../Component/Tables/Table";
import "./Home.css";
import { adminById } from "../../services/admin_services";
import { useAuth } from "../../providers/auth_provider";
import { restaurantByOwner } from "../../services/restaurant_services";

export default function Home() {
  const { user, setUser, setRestaurant } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await adminById(user.id);
      if (data) {
        setUser(data);
      }
    };
    const getResturant = async () => {
      const { data } = await restaurantByOwner(user.id);
      if (data[0]) {
        console.log(data[0]);
        setRestaurant(data[0]);
      }
    };

    if (user != null) {
      getUser();
      getResturant();
    }

    return () => {};
  }, []);
  return (
    <div className="home">
      <Dashboardhome />
      <FeaturedCards />
      <Table />
      <Charts />
      <BarChart />
      {/* <ChartandOrder/> */}
    </div>
  );
}
