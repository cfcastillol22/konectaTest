import { GlobalProvider } from "./context/GlobalContext";
import AppRouter from "./router/AppRouter";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/index.js";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <GlobalProvider>
        <AppRouter />
      </GlobalProvider>
    </Provider>
  );
}

export default App;
