import { createSlice } from '@reduxjs/toolkit';
 // States are called slices in redux toolit
const initialState = {
    _id: '',
    email: '',
    username: '',
    auth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state,action)=> {
          const { _id, email, username, auth } = action.payload;

          state._id= _id;
          state.email= email;
          state.username= username;
          state.auth= auth;
        },
        resetUser: (state) => {
            state._id= "";
            state.email= "";
            state.username= "";
            state.auth= false;

        }
    }
})

export const {setUser , resetUser} = userSlice.actions;
// The createSlice function automatically generates the action creators for each reducer defined in the reducers object.
// These action creators are exported and can be used in your components to dispatch actions to modify the state.
export default userSlice.reducer;