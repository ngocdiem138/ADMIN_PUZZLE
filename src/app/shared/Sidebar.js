import React, { Component, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import imageFace1 from "../../assets/images/faces/face1.jpg";
import imageLogo from '../../assets/images/logo-main.png';
import accountService from "../../services/accountService";
import { useToasts } from 'react-toast-notifications';
import authService from '../../services/authService';
const Sidebar = () => {
  const [profileData, setProfileData] = useState({});
  const { addToast } = useToasts();
  useEffect(() => {
    accountService.getProfile().then(res => {
      if (res.data.errCode == "403") {
      } else {
        setProfileData(res.data.data);
      }
    }
    )
  }, []);
  const onLogout = () => {
    localStorage.removeItem('login')
    window.location.href = '/login';
  }
  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  const toggleRightSidebar = () => {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }

  const [dropdownState, setDropdownState] = useState({
    appsMenuOpen: false,
    basicUiMenuOpen: false,
    formElementsMenuOpen: false,
    tablesMenuOpen: false,
    iconsMenuOpen: false,
    chartsMenuOpen: false,
    userPagesMenuOpen: false,
    companyPagesMenuOpen: false,
    extraInfoPagesMenuOpen: false,
    errorPagesMenuOpen: false,
  })

  const toggleMenuState = (menuState) => {
    if (menuState) {
      let updatedValue = {};
      updatedValue = { [menuState]: dropdownState[menuState] ? false : true }
      setDropdownState({
        appsMenuOpen: false,
        basicUiMenuOpen: false,
        formElementsMenuOpen: false,
        tablesMenuOpen: false,
        iconsMenuOpen: false,
        chartsMenuOpen: false,
        userPagesMenuOpen: false,
        companyPagesMenuOpen: false,
        extraInfoPagesMenuOpen: false,
        errorPagesMenuOpen: false,
      })
      setDropdownState((dropdownState) => ({ ...dropdownState, ...updatedValue }))
    }
  }



  const onRouteChanged = () => {
    document.querySelector('#sidebar').classList.remove('active');
  }

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  }

  useEffect(() => {
    onRouteChanged();
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }, []);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo" href="index.html"><img src={imageLogo} alt="logo" /></a>
        <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={imageLogo} alt="logo" /></a>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img className="img-xs rounded-circle " src={profileData.avatar} alt="profile" />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal"><Trans>{profileData.username}</Trans></h5>
                <span><Trans>Admin Member</Trans></span>
              </div>
            </div>
            <Dropdown alignRight>
              <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                <i className="mdi mdi-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="sidebar-dropdown preview-list">
                <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small"><Trans>Account settings</Trans></p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword  text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small"><Trans>Change Password</Trans></p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar-today text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small"><Trans>To-do list</Trans></p>
                  </div>
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link"><Trans>Navigation</Trans></span>
        </li>
        <li className={isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/dashboard">
            <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
            <span className="menu-title"><Trans>Dashboard</Trans></span>
          </Link>
        </li>
        <li className={isPathActive('/users') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-laptop"></i>
            </span>
            <span className="menu-title"><Trans>Users</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.userPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className={isPathActive('/users/user-table') ? 'nav-link active' : 'nav-link'} to="/users/user-table">
                    <span className="menu-icon"><i className="mdi mdi-account-multiple"></i></span>
                    <span className="menu-title"><Trans>Users</Trans></span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={isPathActive('/users/new') ? 'nav-link active' : 'nav-link'} to="/users/new">
                    <span className="menu-icon"><i className="mdi mdi-account-multiple-plus"></i></span>
                    <span className="menu-title"><Trans>Add User</Trans></span>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={isPathActive('/companys') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.companyPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('companyPagesMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-book-plus-multiple"></i>
            </span>
            <span className="menu-title"><Trans>Companys</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.companyPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className={isPathActive('/companys/company-table') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
                  <Link className="nav-link" to="/companys/company-table">
                    <span className="menu-icon"><i className="mdi mdi-domain"></i></span>
                    <span className="menu-title"><Trans>Company</Trans></span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={isPathActive('/companys/new') ? 'nav-link active' : 'nav-link'} to="/companys/new">
                    <span className="menu-icon"><i className="mdi mdi-bank-plus"></i></span>
                    <span className="menu-title"><Trans>Add company</Trans></span>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li className={isPathActive('/extraInfos') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.extraInfoPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('extraInfoPagesMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-book-plus-multiple"></i>
            </span>
            <span className="menu-title"><Trans>ExtraInfos</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.extraInfoPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className={isPathActive('/extraInfos/position-table') ? 'nav-link active' : 'nav-link'} to="/extraInfos/position-table">
                    <span className="menu-icon"><i className="mdi mdi-account-cash-outline"></i></span>
                    <span className="menu-title"><Trans>Position</Trans></span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={isPathActive('/extraInfos/skill-table') ? 'nav-link active' : 'nav-link'} to="/extraInfos/skill-table">
                    <span className="menu-icon"><i className="mdi mdi-account-details-outline"></i></span>
                    <span className="menu-title"><Trans>Skill</Trans></span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={isPathActive('/extraInfos/service-table') ? 'nav-link active' : 'nav-link'} to="/extraInfos/service-table">
                    <span className="menu-icon"><i className="mdi mdi-face-agent"></i></span>
                    <span className="menu-title"><Trans>Service</Trans></span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={isPathActive('/extraInfos/new') ? 'nav-link active' : 'nav-link'} to="/extraInfos/new">
                    <span className="menu-icon"><i className="mdi mdi-view-grid-plus"></i></span>
                    <span className="menu-title"><Trans>Add new extraInfo</Trans></span>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={isPathActive('/blogs/blog-tables') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/blogs/blog-tables">
            <span className="menu-icon"><i className="mdi mdi-post-outline"></i></span>
            <span className="menu-title"><Trans>Blog</Trans></span>
          </Link>
        </li>
        <li className={isPathActive('/profile') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <Link className="nav-link" to="/profile">
            <span className="menu-icon"><i className="mdi mdi-account-box-outline"></i></span>
            <span className="menu-title"><Trans>Profile</Trans></span>
          </Link>
        </li>


        <li className={isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('basicUiMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-laptop"></i>
            </span>
            <span className="menu-title"><Trans>Basic UI Elements</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.basicUiMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'} to="/basic-ui/buttons"><Trans>Buttons</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('formElementsMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-playlist-play"></i>
            </span>
            <span className="menu-title"><Trans>Form Elements</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.formElementsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/form-elements/basic-elements"><Trans>Basic Elements</Trans></Link></li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={isPathActive('/tables') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('tablesMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-table-large"></i>
            </span>
            <span className="menu-title"><Trans>Tables</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.tablesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link'} to="/tables/basic-table"><Trans>Basic Table</Trans></Link></li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={isPathActive('/charts') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('chartsMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-chart-bar"></i>
            </span>
            <span className="menu-title"><Trans>Charts</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.chartsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link'} to="/charts/chart-js"><Trans>Chart Js</Trans></Link></li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-contacts"></i>
            </span>
            <span className="menu-title"><Trans>Icons</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.iconsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link'} to="/icons/mdi"><Trans>Material</Trans></Link></li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-security"></i>
            </span>
            <span className="menu-title"><Trans>User Pages</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.userPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/login') ? 'nav-link active' : 'nav-link'} to="/login"><Trans>Login</Trans></Link></li>
                <li className="nav-item"> <Link className={isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link"><Trans>More</Trans></span>
        </li>
        <li className={isPathActive('/error-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
          <div className={dropdownState.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => toggleMenuState('errorPagesMenuOpen')} data-toggle="collapse">
            <span className="menu-icon">
              <i className="mdi mdi-lock"></i>
            </span>
            <span className="menu-title"><Trans>Error Pages</Trans></span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={dropdownState.errorPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-404">404</Link></li>
                <li className="nav-item"> <Link className={isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link'} to="/error-pages/error-500">500</Link></li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className="nav-item menu-items">
          <a className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
            <span className="menu-icon">
              <i className="mdi mdi-file-document-box"></i>
            </span>
            <span className="menu-title"><Trans>Documentation</Trans></span>
          </a>
        </li>
      </ul>
    </nav>
  );
}



export default withRouter(Sidebar);