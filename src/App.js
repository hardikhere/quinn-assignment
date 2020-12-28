import logo from './logo.svg';
import './App.css';
import Calendar from './Components/Calendar';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;
