import { CssBaseline } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import Header from "./components/Header/Header";
import Router from "./routes";
import AuthMiddleware from "./components/AuthMiddleware";

function App() {

  return (
    <>
      <CssBaseline />
      <NiceModal.Provider>
        <AuthMiddleware>
          <>
            <Header />
            <Router />
          </>
        </AuthMiddleware>
      </NiceModal.Provider>
    </>
  );
}

export default App;