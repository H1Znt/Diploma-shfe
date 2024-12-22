import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Main } from "./Pages/Main";
import { Login } from "./Pages/Login";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import { EditMovie } from "./Pages/EditMovie";
import { AuthProvider } from "./hooks/AuthProvider";
import { AddMovie } from "./components/AddMovie";
import { MovieSeance } from "./components/MovieSeance";
import { BookingTickets } from "./components/BookingTickets";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Main />} />
          <Route path="/movies/:seanceId" element={<MovieSeance />} />
          <Route path="/booking-tickets" element={<BookingTickets />} />
          <Route
            path="/movies/new"
            element={
              <ProtectedRoute>
                <AddMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/edit"
            element={
              <ProtectedRoute>
                <EditMovie />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
