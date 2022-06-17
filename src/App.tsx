import "./App.css";
import { Suspense, useState } from "react";
import { AppLoader } from "./components/app-loader";
import { AppNavigator } from "./components/app-navigator";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createContext } from "react";


const UserContext = createContext<any>('')




function App() {
  const [data, setData] = useState<any>('')
  const [page, setPage] = useState<any>(1);


  return (
    <UserContext.Provider value={{data,setData,page , setPage}}>
    <Suspense fallback={<AppLoader />}>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AppNavigator />
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
export {UserContext}
