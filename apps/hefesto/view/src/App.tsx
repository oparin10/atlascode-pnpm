import React from "react";
import Loading from "./components/Util/Loading";
import GlobalAlert from "./components/Util/GlobalAlert";
import "./css/App.css";
import RouterMain from "./components/App/RouterMain";
import AppLayout from "./layout_v2/Main";

function App() {
  return (
    <div>
      <Loading />
      <GlobalAlert />
      <RouterMain />
      {/* <AppLayout /> */}
    </div>
  );
}

export default App;
