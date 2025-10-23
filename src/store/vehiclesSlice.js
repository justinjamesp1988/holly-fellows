import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from '../firebase/config.js';

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [],
    status: 'idle'
  },
  reducers: {
    addVehicle: (vehicles, action) => {
      let newVehicle = action.payload;
      newVehicle.id = vehicles.length ? Math.max(...vehicles.map(vehicle => vehicle.id)) + 1 : 1;
      vehicles.push(newVehicle);
    },
    eraseVehicle: (vehicles, action) => {
        return vehicles.filter(vehicle => vehicle.id != action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVehicles.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.vehicles = action.payload
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action.error.message);  
      })
  }
})

export const { addVehicle, eraseVehicle } = vehiclesSlice.actions;

export const selectVehicles = state => state.vehicles;

export default vehiclesSlice.reducer;

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
  const q = query(collection(db, "Vehicles"));
    const querySnapshot = await getDocs(q);
    let vehicleList = [];
    querySnapshot.forEach((doc) => {
      vehicleList.push({id: doc.id, ...doc.data()})
    });

    return vehicleList;
})