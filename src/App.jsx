import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./features/auth/Login";
import OAuth2RedirectHandler from "./features/auth/OAuth2RedirectHandler";
import FeedPage from "./pages/post/FeedPage";
import "./App.css";
import { QueryProvider } from "./app/provider/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/main" element={<FeedPage />} />
        </Routes>
      </Router>
    </QueryProvider>
  );
}

export default App;
