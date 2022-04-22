import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../redux/store';
import { Box } from '@mui/material';
import { logout } from '../../redux/tokenSlice';
import '../../App.css'
import { UserData } from '../../interface-types/user';

const Sidebar: React.FC = () => {
  const dispatch = useTypedDispatch();
  const user : UserData | null = useTypedSelector((state)=>state.authToken.user);
  return (
    <div className='sidebar' >
        <h4>Hi {user?.display_name} !</h4>
        {/* <img src={user?.images[0]?.url}/> */}
        <Box>
          <button className='new-btn' onClick={() => dispatch(logout())}>Logout</button>
        </Box>
    </div>
  )
}

export default Sidebar;