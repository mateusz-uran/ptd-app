import "./App.css";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Statistics from "./components/Statistics";
import Archives from "./components/Archives";
import CardSpecification from "./features/cards/components/CardSpecification";
import { useSelector } from "react-redux";
import { isModalOpen } from "./features/modal/slices/modalSlice";
import Modal from "./features/modal/components/Modal";
import FuelAddForm from "./features/fuel/forms/FuelAddForm";
import TripAddForm from "./features/trips/forms/TripAddForm";
import ErrorPage from "./components/ErrorPage";
import CargoForm from "./features/trips/forms/TripCargoForm";
import Cards from "./features/cards/components/Cards";
import InvoiceWrapper from "./features/cards/components/InvoiceWrapper";
import CRMForm from "./features/crm/CrmForm";
import UpdateInformations from "./features/updates/components/UpdateInformations";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const isOpen = useSelector(isModalOpen);

  return (
    <>
      {isOpen && <Modal />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        >
          <Route path="/home/dashboard" element={<Dashboard />} />
          <Route path="/home/cards" element={<Cards />} />
          <Route path="/home/stats" element={<Statistics />} />
          <Route path="/home/archive" element={<Archives />} />
          <Route path="/home/updates" element={<UpdateInformations />} />
          <Route
            path="/home/:compName/:cardNumber/:cardId"
            element={<CardSpecification />}
          />
          <Route
            path="/home/:compName/:cardNumber/:cardId/add/:type"
            element={<FuelAddForm />}
          />
          <Route
            path="/home/:compName/:cardNumber/:cardId/add/trip"
            element={<TripAddForm />}
          />
          <Route
            path="/home/:compName/:cardNumber/:cardId/createcargo"
            element={<CargoForm />}
          />
          <Route
            path="/home/:compName/:cardNumber/:cardId/upgradecargo"
            element={<CargoForm />}
          />
          <Route
            path="/home/:compName/:cardNumber/:cardId/invoice"
            element={<InvoiceWrapper />}
          />
          <Route path="/home/:compName/crm" element={<CRMForm />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
