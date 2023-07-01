import { createBrowserRouter } from 'react-router-dom'
import Home from "../WebSide/Home";
import SearchDrug from '../WebSide/SearchDrug';
import AddDiseases from '../WebSide/AddDiseases';
import SearchDiseases from '../WebSide/SearchDiseases';
import EditDiseases from '../WebSide/EditDiseases';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/drugs",
    element: <SearchDrug />,

  },
  {
    path: "/diseases",
    element: <SearchDiseases />

  },
  {
    path: "/add",
    element: <AddDiseases />

  },
  {
    path: "/edit",
    element: <EditDiseases/>

  },
]);

export default router;