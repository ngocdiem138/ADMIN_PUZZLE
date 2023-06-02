import React, { Component, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList';
import { VectorMap } from "react-jvectormap";
import imageFace1 from "../../assets/images/faces/face1.jpg";
import imageRectangle from '../../assets/images/dashboard/Rectangle.jpg';
import Paginate from '../../helpers/Paginate';
import statisticService from '../../services/statisticService';
import { scaleLinear } from "d3-scale";

const latLngToColorScale = scaleLinear()
  .domain([-180, 180])
  .range(["#000000", "#FFFFFF"]);

const mapData = {
  "BZ": 75.00,
  "US": 56.25,
  "AU": 15.45,
  "GB": 25.00,
  "RO": 10.25,
  "GE": 33.25
}

const Dashboard = () => {
  const [invoces, setInvoces] = useState([]);
  const [showError, setShowError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = invoces.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    console.log("pageNumber", pageNumber)
    setCurrentPage(pageNumber);
  };

  const VietnamMap = () => {
    return (
      <div>
        <VectorMap
          containerClassName="dashboard-vector-map"
          map={"vn_mill"}
          backgroundColor="#FFFFFF"
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px",
          }}
          regionsSelectable={true}
          regionsSelectableOne={true}
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer",
            },
            selected: {
              fill: "#3CAEA3",
            },
            selectedHover: {},
          }}
          markerStyle={{
            initial: {
              fill: "#F44336",
              stroke: "#F44336",
              "fill-opacity": 0.7,
              "stroke-width": 1,
              "stroke-opacity": 0.7,
              r: 7,
            },
            hover: {
              stroke: "#FFFFFF",
              "stroke-width": 2,
              cursor: "pointer",
            },
          }}
          markers={[
            {
              latLng: [10.8231, 106.6297],
              name: "Ho Chi Minh City",
            },
            {
              latLng: [21.0278, 105.8342],
              name: "Hanoi",
            },
            // Add more markers here
          ]}
        />
      </div>
    );
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(invoces.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    statisticService.getAllTransactions().then((response) => {
      if (response.data.errCode == "403") {
        setShowError(true);
      } else {
        setInvoces(response.data.data);
      }
    });
  }, []);

  const listInvoice = currentPosts.map(invoce => {
    return <tr>
      <td>
        <div className="form-check form-check-muted m-0">
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" />
            <i className="input-helper"></i>
          </label>
        </div>
      </td>
      <td>
        <div className="d-flex">
          {/* <img src={imageFace1} alt="face" /> */}
          <span>{invoce.email}</span>
        </div>
      </td>
      <td> {invoce.transactionCode} </td>
      <td> {invoce.price} </td>
      <td> {invoce.serviceType} </td>
      <td> {invoce.paymentMethod}</td>
      <td> {invoce.payTime.split(' ')[0]} </td>
      <td>
        <div className={invoce.status == 'COMPLETED' ? 'badge badge-outline-success' : invoce.status == 'REJECT' ? 'badge badge-outline-danger' : 'badge badge-outline-warning'}>{invoce.status}</div>
      </td>
    </tr>
  })

  const transactionHistoryData = {
    labels: ["Paypal", "Stripe", "Cash"],
    datasets: [{
      data: [55, 25, 20],
      backgroundColor: [
        "#111111", "#00d25b", "#ffab00"
      ]
    }
    ]
  };

  const transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    }
  }

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  const toggleProBanner = () => {
    document.querySelector('.proBanner').classList.toggle("hide");
  }
  return (
    <div>
      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$12.34</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Potential growth</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$17.34</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+11%</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Revenue current</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$12.34</h3>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">-2.4%</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-danger">
                    <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Daily Income</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$31.53</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Expense current</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Transaction History</h4>
              <div className="aligner-wrapper">
                <Doughnut data={transactionHistoryData} options={transactionHistoryOptions} />
                <div className="absolute center-content">
                  <h5 className="font-weight-normal text-whiite text-center mb-2 text-white">1200</h5>
                  <p className="text-small text-muted text-center mb-0">Total</p>
                </div>
              </div>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 className="mb-1">Transfer to Paypal</h6>
                  <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 className="font-weight-bold mb-0">$236</h6>
                </div>
              </div>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 className="mb-1">Tranfer to Stripe</h6>
                  <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 className="font-weight-bold mb-0">$593</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title mb-1">Open Projects</h4>
                <p className="text-muted mb-1">Your data status</p>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="preview-list">
                    <div className="preview-item border-bottom">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-primary">
                          <i className="mdi mdi-file-document"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">Admin dashboard design</h6>
                          <p className="text-muted mb-0">Broadcast web app mockup</p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">15 minutes ago</p>
                          <p className="text-muted mb-0">30 tasks, 5 issues </p>
                        </div>
                      </div>
                    </div>
                    <div className="preview-item border-bottom">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-success">
                          <i className="mdi mdi-cloud-download"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">Wordpress Development</h6>
                          <p className="text-muted mb-0">Upload new design</p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">1 hour ago</p>
                          <p className="text-muted mb-0">23 tasks, 5 issues </p>
                        </div>
                      </div>
                    </div>
                    <div className="preview-item border-bottom">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-info">
                          <i className="mdi mdi-clock"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">Project meeting</h6>
                          <p className="text-muted mb-0">New project discussion</p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">35 minutes ago</p>
                          <p className="text-muted mb-0">15 tasks, 2 issues</p>
                        </div>
                      </div>
                    </div>
                    <div className="preview-item border-bottom">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-danger">
                          <i className="mdi mdi-email-open"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">Broadcast Mail</h6>
                          <p className="text-muted mb-0">Sent release details to team</p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">55 minutes ago</p>
                          <p className="text-muted mb-0">35 tasks, 7 issues </p>
                        </div>
                      </div>
                    </div>
                    <div className="preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-warning">
                          <i className="mdi mdi-chart-pie"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">UI Design</h6>
                          <p className="text-muted mb-0">New application planning</p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">50 minutes ago</p>
                          <p className="text-muted mb-0">27 tasks, 4 issues </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Revenue</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">$32123</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                  </div>
                  <h6 className="text-muted font-weight-normal">11.38% Since last month</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Sales</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">$45850</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+8.3%</p>
                  </div>
                  <h6 className="text-muted font-weight-normal"> 9.61% Since last month</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Purchase</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">$2039</h2>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p>
                  </div>
                  <h6 className="text-muted font-weight-normal">2.27% Since last month</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Order Status</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </th>
                      <th> Client Email </th>
                      <th> Order No </th>
                      <th> Cost ($) </th>
                      <th> Service </th>
                      <th> Payment Mode </th>
                      <th> Start Date </th>
                      <th> Payment Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listInvoice}
                  </tbody>
                </table>
              </div>
              <Paginate
                postsPerPage={postsPerPage}
                totalPosts={invoces.length}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
                selectedPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title">Messages</h4>
                <p className="text-muted mb-1 small">View all</p>
              </div>
              <div className="preview-list">
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img src={imageFace1} alt="face" className="rounded-circle" />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Leonard</h6>
                        <p className="text-muted text-small">5 minutes ago</p>
                      </div>
                      <p className="text-muted">Well, it seems to be working now.</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img src={imageFace1} alt="face" className="rounded-circle" />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Luella Mills</h6>
                        <p className="text-muted text-small">10 Minutes Ago</p>
                      </div>
                      <p className="text-muted">Well, it seems to be working now.</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img src={imageFace1} alt="face" className="rounded-circle" />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Ethel Kelly</h6>
                        <p className="text-muted text-small">2 Hours Ago</p>
                      </div>
                      <p className="text-muted">Please review the tickets</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img src={imageFace1} alt="face" className="rounded-circle" />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Herman May</h6>
                        <p className="text-muted text-small">4 Hours Ago</p>
                      </div>
                      <p className="text-muted">Thanks a lot. It was easy to fix it .</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Portfolio Slide</h4>
              <Slider className="portfolio-slider" {...sliderSettings}>
                <div className="item">
                  <img src={imageRectangle} alt="carousel-item" />
                </div>
                <div className="item">
                  <img src={require('../../assets/images/dashboard/Img_5.jpg')} alt="carousel-item" />
                </div>
                <div className="item">
                  <img src={require('../../assets/images/dashboard/img_6.jpg')} alt="carousel-item" />
                </div>
              </Slider>
              <div className="d-flex py-4">
                <div className="preview-list w-100">
                  <div className="preview-item p-0">
                    <div className="preview-thumbnail">
                      <img src={imageFace1} className="rounded-circle" alt="face" />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">CeeCee Bass</h6>
                          <p className="text-muted text-small">4 Hours Ago</p>
                        </div>
                        <p className="text-muted">Well, it seems to be working now.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted">Well, it seems to be working now. </p>
              <div className="progress progress-md portfolio-progress">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: '50%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">To do list</h4>
              <TodoListComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Visitors by Countries</h4>
              <div className="row">
                <div className="col-md-5">
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-us"></i>
                          </td>
                          <td>USA</td>
                          <td className="text-right"> 1500 </td>
                          <td className="text-right font-weight-medium"> 56.35% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-de"></i>
                          </td>
                          <td>Germany</td>
                          <td className="text-right"> 800 </td>
                          <td className="text-right font-weight-medium"> 33.25% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-au"></i>
                          </td>
                          <td>Australia</td>
                          <td className="text-right"> 760 </td>
                          <td className="text-right font-weight-medium"> 15.45% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-gb"></i>
                          </td>
                          <td>United Kingdom</td>
                          <td className="text-right"> 450 </td>
                          <td className="text-right font-weight-medium"> 25.00% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-ro"></i>
                          </td>
                          <td>Romania</td>
                          <td className="text-right"> 620 </td>
                          <td className="text-right font-weight-medium"> 10.25% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-br"></i>
                          </td>
                          <td>Brasil</td>
                          <td className="text-right"> 230 </td>
                          <td className="text-right font-weight-medium"> 75.00% </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-7">
                  <div id="audience-map" className="vector-map"></div>
                  <VectorMap
                    containerClassName="dashboard-vector-map"
                    map={"asia_mill"}
                    focusOn={{
                      x: 0.5,
                      y: 0.5,
                      scale: 1,
                      animate: true
                    }}
                    backgroundColor="#000000"
                    zoomOnScroll={true}
                    containerStyle={{
                      width: "100%",
                      height: "520px",
                    }}
                    regionsSelectable={true}
                    regionsSelectableOne={true}
                    regionStyle={{
                      initial: {
                        fill: "#e4e4e4",
                        "fill-opacity": 0.9,
                        stroke: "none",
                        "stroke-width": 0,
                        "stroke-opacity": 0,
                      },
                      hover: {
                        "fill-opacity": 0.8,
                        cursor: "pointer",
                      },
                      selected: {
                        fill: "#3CAEA3",
                      },
                      selectedHover: {},
                    }}
                    markerStyle={{
                      initial: {
                        fill: "#F44336",
                        stroke: "#F44336",
                        "fill-opacity": 0.7,
                        "stroke-width": 1,
                        "stroke-opacity": 0.7,
                        r: 7,
                      },
                      hover: {
                        stroke: "#FFFFFF",
                        "stroke-width": 2,
                        cursor: "pointer",
                      },
                      selected: {
                        fill: "#3CAEA3",
                      },
                      selectedHover: {},
                      // use scale function to map latitude or longitude to color
                      scale: latLngToColorScale,
                      normalizeFunction: "polynomial",
                    }}
                    markers={[
                      {
                        latLng: [14.4379, 108.0014],
                        name: "Quang Nam Province"
                      },
                      {
                        latLng: [12.2388, 109.1969],
                        name: "Ninh Thuan Province"
                      },
                      {
                        latLng: [10.5423, 107.1857],
                        name: "Ba Ria - Vung Tau Province"
                      },
                      {
                        latLng: [160.0852, 180.1607],
                        name: "Ho Chi Minh City"
                      },
                      {
                        latLng: [11.931, 108.4422],
                        name: "Binh Thuan Province"
                      },
                      {
                        latLng: [15.8794, 108.335],
                        name: "Da Nang City"
                      },
                      {
                        latLng: [13.5209, 107.2835],
                        name: "Gia Lai Province"
                      },
                      {
                        latLng: [12.2388, 109.1969],
                        name: "Ninh Thuan Province"
                      },
                      {
                        latLng: [16.4695, 107.5968],
                        name: "Thua Thien Hue Province"
                      },
                      {
                        latLng: [13.2621, 108.2686],
                        name: "Khanh Hoa Province"
                      },
                      {
                        latLng: [13.3622, 108.4422],
                        name: "Phu Yen Province"
                      },
                      {
                        latLng: [10.1579, 108.0049],
                        name: "Binh Dinh Province"
                      },
                      {
                        latLng: [12.8327, 108.2138],
                        name: "Ninh Thuan Province"
                      },
                      {
                        latLng: [11.9935, 109.2345],
                        name: "Lam Dong Province"
                      },
                      {
                        latLng: [11.8833, 108.4333],
                        name: "Bao Loc City"
                      },
                      {
                        latLng: [20.8328, 106.6883],
                        name: "Bac Kan Province"
                      },
                      {
                        latLng: [15.8232, 108.322],
                        name: "Hoi An City"
                      },
                      {
                        latLng: [13.4385, 107.7795],
                        name: "Dak Lak Province"
                      },
                      {
                        latLng: [12.2394, 109.1967],
                        name: "Ninh Thuan Province"
                      },
                      {
                        latLng: [20.8194, 106.7247],
                        name: "Thai Nguyen Province"
                      },
                      {
                        latLng: [21.0278, 105.8342],
                        name: "Hanoi"
                      },
                      {
                        latLng: [15.3811, 108.238],
                        name: "Quang Ngai Province"
                      },
                      {
                        latLng: [16.0718, 108.2225],
                        name: "Da Nang City"
                      },
                      {
                        latLng: [100.9333, 1008.1],
                        name: "Tay Ninh Province"
                      },
                      {
                        latLng: [10.5745, 107.3501],
                        name: "Vung Tau City"
                      },
                      {
                        latLng: [11.8451, 108.7881],
                        name: "Dak Nong Province"
                      },
                      {
                        latLng: [21.5083, 104.0486],
                        name: "Lao Cai Province"
                      },
                      // Add more markers here
                    ]}
                  />
                  <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent" //change it to ocean blue: #0077be
                    panOnDrag={true}
                    containerClassName="dashboard-vector-map"
                    focusOn={{
                      x: 0.5,
                      y: 0.5,
                      scale: 1,
                      animate: true
                    }}
                    series={{
                      regions: [{
                        scale: ['#3d3c3c', '#f2f2f2'],
                        normalizeFunction: 'polynomial',
                        values: mapData
                      }]
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Dashboard;