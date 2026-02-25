import { Routes, Route } from "react-router-dom";
import { SmoothCursor } from "./components/ui/smooth-cursor";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="cursor-none text-foreground bg-background">
      <SmoothCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
