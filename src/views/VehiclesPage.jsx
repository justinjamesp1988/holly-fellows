import Header from '../components/Header.jsx';
import {useSelector, useDispatch} from 'react-redux';
import {selectVehicles, fetchVehicles} from '../store/vehiclesSlice.js';
import { useEffect, useState } from 'react';
import { ImageSlider } from './ImageSlider.jsx';

import img1 from '/49Seater/49-1.jpg';
import img2 from '/26Seater/26-1.jpg';
import img3 from '/12Seater/12-1.jpg';
import img4 from '/19Seater/19-1.jpg';

const IMAGES = [
  {
    url: img1,
    alt: "vehicle 1"
  },
  {
    url: img2,
    alt: "vehicle 2"
  },
  {
    url: img3,
    alt: "vehicle 3"
  },
  {
    url: img4,
    alt: "vehicle 4"
  }
];

function vehiclesPage() {

  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles).vehicles;
  const pageTitle = "Holly Fellowz Tripmates - Kechery - Thrissur";
  const [activeClass, setActiveClass] = useState('')
  const [selectedVehicleType, setSelectedVehicleType] = useState('')
  
  
  const vehicleStatus = useSelector(selectVehicles).status;
  

  useEffect(() => {
    if(vehicleStatus === 'idle') {
      dispatch(fetchVehicles())
    }
  }, []);

  const updateModal = (v) => {
    setSelectedVehicleType(v)
    setActiveClass('active')
  }
      
  return (
      <>
        <div className="container">
            <Header pageTitle={pageTitle} />
            <div className={`modal ${activeClass}`} id='modal'>
              <div className='modal-header'>
                <div className='title'>{selectedVehicleType}</div>
                <button className='close-button' onClick={() => setActiveClass('')}>&times;</button>
              </div>
              <div className='modal-body'>
                <div style={{
                  maxWidth: "1200px", 
                  width: "100%", 
                  margin: "0 auto"}}>
                  <ImageSlider images={IMAGES} />
                </div>
              </div>
            </div>
            <div id="overlay" className={activeClass}></div>
            <div className="books-container">
                <div className="books-list">
                    {vehicles.map(vehicle => 
                      <div className="book">
                          <div className="book-cover">
                              {vehicle.vehicleType === '49-Seater' && <img onClick={() => updateModal('49 Seater Bus')} src={'/49Seater/49-1.jpg'} />}
                              {vehicle.vehicleType === '26-Seater' && <img onClick={() => updateModal('26 Seater Traveller')} src={'/26Seater/26-1.jpg'} />}
                              {vehicle.vehicleType === '12-Seater' && <img onClick={() => updateModal('12 Seater Traveller')} src={'/12Seater/12-1.jpg'} />}
                              {vehicle.vehicleType === '17-Seater' && <img onClick={() => updateModal('17 Seater Traveller')} src={'/17Seater/17-1.jpg'} />}
                              {vehicle.vehicleType === '19-Seater' && <img onClick={() => updateModal('19 Seater Traveller')} src={'/19Seater/19-1.jpg'} />}
                              {vehicle.vehicleType === '17-seater Luxury Variant' && <img onClick={() => updateModal('17 Seater Luxury Traveller')} src={'/17SeaterL/17-1L.jpeg'} />}
                          </div>

                          <div className="book-details">
                              <p className="book-author">{ vehicle.Model }</p>
                              <h3 className="book-title">{ vehicle.vehicleType }</h3>
                          </div>
                      </div>
                    )}
                </div>
            </div>

        </div>
      </>
    )
  }
  
  export default vehiclesPage
  