import React from 'react'
import styled, { withTheme } from 'styled-components'
import Link from 'gatsby-link'

import { media, isPhone } from '../utils/css-utils'

import WebpurpleLogo from './webpurple-logo/webpurple-logo'

import { MenuIcon, CloseIcon } from './icons/header/index'
import RoundAvatar from './common/round-avatar'

const Wrapper = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 2.6rem 1.5rem;
  width: 100%;

  ${media.tablet`
        flex-direction: row;
        width: auto;
        padding: 0;
        margin: 3rem 0;
    `};
  ${media.desktop`padding: 0 10rem;`} ${media.hd`padding: 0 12rem;`};
`

const MenuHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  ${media.tablet`
        width: auto;
        align-items:auto;
    `};
`

const MenuButton = styled(MenuIcon)`
  display: flex;

  ${media.tablet`display: none;`};
`

const CloseButton = styled(CloseIcon)`
  display: flex;

  ${media.tablet`display: none;`};
`

const MenuBar = styled.div`
  display: flex;
  flex-grow: 2;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 0;

  ${media.tablet`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 0;
    `};
`

const NavigationBar = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;

  ${media.tablet`
        margin: 0;
        flex-grow: 2;
        align-items: center;
        flex-direction: row;
        width: auto;
        padding: 0 0 0 4rem;
    `};
`

const MenuItem = styled.li`
  list-style: none;
  display: inline-flex;
`

const NavigationLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  font-family: Rubik, sans-serif;
  font-size: 2.3rem;
  font-weight: 500;
  color: ${props => props.theme.warmGrey};

  box-sizing: border-box;
  border-bottom: solid 0.3rem transparent;
  padding: 1.3rem 0 1rem 0;
  margin: 0 2.5rem 2rem 4rem;
  transition: border-color 1s ease-out;

  &:hover,
  &.active {
    border-bottom-color: ${props => props.theme.lipstick};
  }

  ${media.tablet`
        font-size: 1.6rem;
        margin: 0 2.5rem 0 0;
    `};
`

const Header = ({ isMenuOpen, showMenu, hideMenu, height, theme }) => (
  <Wrapper style={{ height }}>
    <MenuHeader>
      <WebpurpleLogo />
      {isMenuOpen ? (
        <CloseButton onClick={hideMenu} />
      ) : (
        <MenuButton onClick={showMenu} />
      )}
    </MenuHeader>
    {isMenuOpen && (
      <MenuBar>
        <NavigationBar>
          <MenuItem>
            <NavigationLink to="/" exact>
              home
            </NavigationLink>
          </MenuItem>
          <MenuItem>
            <NavigationLink to="/events">events</NavigationLink>
          </MenuItem>
          <MenuItem>
            <NavigationLink to="/speakers">speakers</NavigationLink>
          </MenuItem>
          <MenuItem>
            <NavigationLink to="/feed">feed</NavigationLink>
          </MenuItem>
        </NavigationBar>
      </MenuBar>
    )}
  </Wrapper>
)

Header.propTypes = {
  isMenuOpen: React.PropTypes.bool,
  showMenu: React.PropTypes.func,
  hideMenu: React.PropTypes.func,
  height: React.PropTypes.string,
  theme: React.PropTypes.object,
}

export default compose(
  withState('isMenuOpen', 'toggleMenu', !isPhone()),
  mapProps(({ isMenuOpen, toggleMenu }) => ({
    isMenuOpen,
    showMenu: () => toggleMenu(true),
    hideMenu: () => toggleMenu(false),

    height: isMenuOpen && isPhone() ? '100vh' : 'auto',
  })),
  withTheme,
)(Header)