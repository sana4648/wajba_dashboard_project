import React from "react";

import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Acceptrejectorder from "./Component/AcceptReject/Acceptrejectorder";
import Admin from "./Component/Admin";
import Bannersetting from "./Component/BannerSetting/Bannersetting";
import Commonsetting from "./Component/Common setting/Commonsetting";
import Kitchenstatus from "./Component/KitchenStatus/Kitchenstatus";
import Login from "./Component/Login";
import Menusetting from "./Component/Menusetting/Menusetting";
import Orderdetail from "./Component/Orderdetails/Orderdetail";
import POSinvoicetopbar from "./Component/POSinvoicetopbar/POSinvoicetopbar";
import Posinvoice from "./Component/Posinvoice/Posinvoice";
import Profile from "./Component/Profile/Profile";
import Registration from "./Component/Registration";
import RegistrationVerification from "./Component/RegistrationVerification";
import Setting from "./Component/Setting/Setting";
import TodayOrders from "./Component/TodayOrders/TodayOrders";
import Addcart from "./pages/AddCart/Addcart";
import CustomerUser from "./pages/CustomerUser/CustomerUser";
import Emplyee from "./pages/Employee/Emplyee";
import EmployeeView from "./pages/EmployeeVeiw/EmployeeView";
import Expenseadd from "./pages/Expenceadd/Expenseadd";
import Expensecatagorey from "./pages/ExpenseCatagorey/Expensecatagorey";
import Foodmanagement from "./pages/Food management/Foodmanagement";
import Foodcatagorey from "./pages/FoodCatagorey/Foodcatagorey";
import PayRoll from "./pages/PayRoll/PayRoll";
import Purchase from "./pages/Purcahse/Purchase";
import PurchaseReport from "./pages/PurchaseReport/PurchaseReport";
import ShowPurchaseItem from "./pages/ShowPurchaseItem/ShowPurchaseItem";
import Stock from "./pages/Stock/Stock";
import StockKitchen from "./pages/StockKitchen/StockKitchen";
import Supplier from "./pages/Supplier/Supplier";
import SystemUser from "./pages/SystemUser/SystemUser";
import ViewExpensereport from "./pages/ViewExpenserepoprt/ViewExpensereport";
import ViewFoodmanager from "./pages/ViewFoodmanager/ViewFoodmanager";
import Check from "./pages/home/Check/Check";
import Counter from "./pages/home/Pos/pages/Counter/Counter";
import Kitchen from "./pages/home/Pos/pages/Kiitchen/Kitchen";
import OrderList from "./pages/home/Pos/pages/OrderList";
import ShowRecepydata from "./pages/home/showRecepydata/ShowRecepydata";
import AuthProvider from "./providers/auth_provider";
import { AuthRoute } from "./providers/auth_route";
import AddRestaurant from "./Component/Addrestaurants.jsx";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          style: {
            padding: "16px",
          },
        }}
      />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes start here */}
            <Route path="/" exact element={<Login />}></Route>
            <Route
              path="/registration"
              exact
              element={<Registration />}
            ></Route>
            {/* Public routes end here */}

            <Route element={<AuthRoute />}>
              {/* Private routes start here */}
              <Route
                path="/addRestaurant"
                exact
                element={<AddRestaurant />}
              ></Route>
              <Route path="/admin" exact element={<Admin />}></Route>
              <Route
                path="/registrationverification"
                exact
                element={<RegistrationVerification />}
              ></Route>

              <Route path="/orderlist" exact element={<OrderList />} />
              <Route path="/Kitchen" exact element={<Kitchen />} />
              <Route path="/counter" exact element={<Counter />} />
              <Route path="/Kitchen" exact element={<Kitchen />} />
              <Route
                path="/foodmanagement"
                exact
                element={<Foodmanagement />}
              />
              <Route
                path="/viewfoodmanagement"
                exact
                element={<ViewFoodmanager />}
              />
              <Route path="/purchase" exact element={<Purchase />} />
              <Route
                path="/showpurchaseitem"
                exact
                element={<ShowPurchaseItem />}
              />
              <Route path="/supplier" exact element={<Supplier />} />
              <Route path="/systemuser" exact element={<SystemUser />} />
              <Route path="/costomeruser" exact element={<CustomerUser />} />
              <Route path="/employee" exact element={<Emplyee />} />
              <Route path="/employeeview" exact element={<EmployeeView />} />
              <Route path="/payroll" exact element={<PayRoll />} />
              <Route path="/check" exact element={<Check />} />
              <Route
                path="/purchasereport"
                exact
                element={<PurchaseReport />}
              />
              <Route path="/stock" exact element={<Stock />} />
              <Route path="/stockkitchen" exact element={<StockKitchen />} />
              <Route path="/expenseadd" exact element={<Expenseadd />} />
              <Route
                path="/viewexpensereport"
                exact
                element={<ViewExpensereport />}
              />
              <Route
                path="/expensecatagorey"
                exact
                element={<Expensecatagorey />}
              />
              <Route path="/addcart" exact element={<Addcart />} />
              <Route path="/foodcatagorey" exact element={<Foodcatagorey />} />
              <Route
                path="/showrecepydata"
                exact
                element={<ShowRecepydata />}
              />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/setting" exact element={<Setting />} />
              <Route path="/orderdetail" exact element={<Orderdetail />} />
              <Route path="/posinvoice" exact element={<Posinvoice />} />
              <Route
                path="/acceptrejectorder"
                exact
                element={<Acceptrejectorder />}
              />
              <Route path="/commonsetting" exact element={<Commonsetting />} />
              <Route path="/bannersetting" exact element={<Bannersetting />} />
              <Route path="/menusetting" exact element={<Menusetting />} />
              <Route
                path="/posinvoicetopbar"
                exact
                element={<POSinvoicetopbar />}
              />
              <Route path="/kitchenstatus" exact element={<Kitchenstatus />} />
              <Route path="/todayorder" exact element={<TodayOrders />} />
              {/* Private routes end here */}
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      {/* <div className='container'>
    <Sidebar/>
  </div> */}
    </>
  );
}
