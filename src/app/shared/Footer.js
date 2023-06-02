import React, { Component } from 'react';
// import { Trans } from 'react-i18next';
class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-center justify-content-sm-between py-2 w-100">
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Puzzle Admin Team </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;