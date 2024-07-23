import React, { useContext } from 'react';
import { ContextDetails } from '../App';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const TopNav = () => {
  const { cartItems } = useContext(ContextDetails);
  const history = useNavigate();

  return (
    <div className='header-container'>
      <div>
        <img src={logo} alt='Logo' className='logo-image'/>
      </div>
      <div>
        <ul className='nav-items-container'>
          <li onClick={() => history('/')}>Home</li>
          <li>Products</li>
        </ul>
      </div>
      <div className='items-container'>
        <button onClick={() => history('/cart')}>
          <ShoppingCartOutlined size={100}/>{cartItems?.length > 0 && <sup>{cartItems.length}</sup>}
        </button>
        <button onClick={() => handleLogout()}><LogoutOutlined /></button>
      </div>
    </div>
  );
};

export default TopNav;
