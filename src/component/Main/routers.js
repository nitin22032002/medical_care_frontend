import {createBrowserRouter} from 'react-router-dom'
import Home from "../WebSide/Home";
import SearchDrug from '../WebSide/SearchDrug';
import AddDiseases from '../WebSide/AddDiseases';
import SearchDiseases from '../WebSide/SearchDiseases';
const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/>,
    },
    {
        path: "/drugs",
        element: <SearchDrug/>,
        
    },
    {
        path: "/diseases",
        element: <SearchDiseases/>
        
    },
    {
        path: "/add",
        element: <AddDiseases/>
        
    }
  ]);

export default router;