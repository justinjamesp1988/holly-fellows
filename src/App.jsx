import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VehiclesPage from './views/VehiclesPage.jsx';
import {selectUsers} from './store/usersSlice';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(selectUsers)

  return (
    <>  
    {
      <BrowserRouter>
        <Routes>
          <Route index element={<VehiclesPage />} />
        </Routes>
      </BrowserRouter>
    }
      
      
        
    </>
  )
}

export default App
