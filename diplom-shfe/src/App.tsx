import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Main } from "./components/Main";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import { EditMovie } from "./components/EditMovie";
import { AuthProvider } from "./hooks/AuthProvider";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="page-grud">
          <Routes>
            <Route path="/*" element={<Navigate replace to="/" />} />
            <Route path="/" element={<Main />} />
            {/* <Route path="/movies/new" element={<AddMovie />} /> */}
            <Route
              path="/movies/edit"
              element={
                <ProtectedRoute>
                  <EditMovie />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/movies/:id" element={<MovieView />} /> */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
