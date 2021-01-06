import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';

import { HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer, ImageLogo} from './header.styles'

import logo from '../../assets/images/black.png';

const Header = ({ currentUser, hidden }) => {
    return (
        <HeaderContainer>
            <LogoContainer to='/'
            ><ImageLogo src={logo} alt='logo'></ImageLogo>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/shop'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ? 
                    (<OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>)
                    :
                    (<OptionLink to='/signin'>SIGN IN</OptionLink>)
                }
                <CartIcon />
            </OptionsContainer>
            { 
                hidden 
                ? 
                null
                 : (
                <CartDropdown />) 
            } 
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
   });

export default connect (mapStateToProps)(Header);