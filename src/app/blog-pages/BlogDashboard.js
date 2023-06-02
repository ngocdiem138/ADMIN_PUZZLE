import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardProfile from '../../components/Image';
import ImageNoAvatar from '../../assets/images/faces/noface.png';
import { useToasts } from 'react-toast-notifications';
import companyService from '../../services/companyService';
import { Line, Bar, Doughnut, Pie, Scatter } from 'react-chartjs-2';

const BlogDashboard = () => {

    const areaData = {
        labels: ["1", "2", "3", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
            "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        datasets: [{
            label: 'Current month',
            data: [15, 9, 7, 5, 1, 3],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.3)",
            fill: "origin",
            borderWidth: 1,// 3: no fill
        },
        {
            label: 'Last month',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 162, 235, 0.3)",
            fill: "origin", // 3. Set the fill options

            borderWidth: 1,
        }]
    };

    const areaOptions = {
        tension: 0.3,
        plugins: {
            filler: {
                propagate: true
            }
        },
        scales: {
            yAxes: [{
                gridLines: {
                    color: "rgba(204, 204, 204,0.1)"
                }
            }],
            xAxes: [{
                gridLines: {
                    color: "rgba(204, 204, 204,0.1)"
                }
            }]
        }
    }
    const params = useParams();
    const { addToast } = useToasts();
    const [blogProfileData, setBlogProfileData] = useState({});
    useEffect(() => {
        
    }, []);

    const [fileImage, setFileImage] = useState()

    const callbackFunction = (childData) => {
        setFileImage(childData)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            callbackFunction();
            const formData = new FormData();
            formData.append("image", fileImage);
            formData.append("name", blogProfileData.name);
            formData.append("website", blogProfileData.website);
            formData.append("active", blogProfileData.active);
            formData.append("description", blogProfileData.description);
            const res = await companyService.updateCompany(params.id, formData);
            if (res.data.errCode == "") {
                addToast('Update company profile successfull', {
                    appearance: 'success',
                    autoDismiss: true,
                })
            }
            else {
                addToast('Some error occur. Please try again', {
                    appearance: 'error',
                    autoDismiss: false,
                })
            }
            console.log(res)
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div>
            <div className="main-content-container container-fluid px-4">
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <span className="text-uppercase page-subtitle">Dashboard</span>
                        <h3 className="page-title">Blog Overview</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg col-md-6 col-sm-6 mb-4">
                        <div className="stats-small stats-small--1 card card-small">
                            <div className="card-body p-0 d-flex">
                                <div className="chartjs-size-monitor" style={{ "position": "absolute", "inset": "0px", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                    <div className="chartjs-size-monitor-expand" style={{ "position": "absolute", "left": "0", "top": "0", "right": "0", "bottom": "0", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                        <div style={{ "position": "absolute", "width": "1000000px", "height": "1000000px", "left": "0", "top": "0" }}>
                                        </div>
                                    </div>
                                    <div className="chartjs-size-monitor-shrink" style={{ "position": "absolute", "left": "0", "top": "0", "right": "0", "bottom": "0", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                        <div style={{ "position": "absolute", "width": "200%", "height": "200%", "left": "0", "top": "0" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column m-auto">
                                    <div className="stats-small__data text-center">
                                        <span className="stats-small__label text-uppercase">Posts</span>
                                        <h6 className="stats-small__value count my-3">2,390</h6>
                                    </div>
                                    <div className="stats-small__data">
                                        <span className="stats-small__percentage stats-small__percentage--increase">4.7%</span>
                                    </div>
                                </div>
                                <canvas height="151" className="blog-overview-stats-small-2 chartjs-render-monitor" width="378" style={{ "display": "block", "height": "121px", "width": "303px" }}></canvas>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg col-md-4 col-sm-6 mb-4">
                        <div className="stats-small stats-small--1 card card-small">
                            <div className="card-body p-0 d-flex">
                                <div className="chartjs-size-monitor" style={{ "position": "absolute", "inset": "0px", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                    <div className="chartjs-size-monitor-expand" style={{ "position": "absolute", "left": "0", "top": "0", "right": "0", "bottom": "0", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                        <div style={{ "position": "absolute", "width": "1000000px", "height": "1000000px", "left": "0", "top": "0" }}>
                                        </div>
                                    </div>
                                    <div className="chartjs-size-monitor-shrink" style={{ "position": "absolute", "left": "0", "top": "0", "right": "0", "bottom": "0", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                        <div style={{ "position": "absolute", "width": "200%", "height": "200%", "left": "0", "top": "0" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column m-auto">
                                    <div className="stats-small__data text-center">
                                        <span className="stats-small__label text-uppercase">Comments</span>
                                        <h6 className="stats-small__value count my-3">8,147</h6>
                                    </div>
                                    <div className="stats-small__data">
                                        <span className="stats-small__percentage stats-small__percentage--decrease">3.8%</span>
                                    </div>
                                </div>
                                <canvas height="95" className="blog-overview-stats-small-3 chartjs-render-monitor" width="240" style={{ "display": "block", "height": "76px", "width": "192px" }}></canvas>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg col-md-4 col-sm-6 mb-4">
                        <div className="stats-small stats-small--1 card card-small">
                            <div className="card-body p-0 d-flex">
                                <div className="chartjs-size-monitor" style={{ "position": "absolute", "inset": "0px", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                    <div className="chartjs-size-monitor-expand" style={{ "position": "absolute", "left": "0", "top": "0", "right": "0", "bottom": "0", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                        <div style={{ "position": "absolute", "width": "1000000px", "height": "1000000px", "left": "0", "top": "0" }}>
                                        </div>
                                    </div>
                                    <div className="chartjs-size-monitor-shrink" style={{ "position": "absolute", "left": "0", "top": "0", "right": "0", "bottom": "0", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                        <div style={{ "position": "absolute", "width": "200%", "height": "200%", "left": "0", "top": "0" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column m-auto">
                                    <div className="stats-small__data text-center">
                                        <span className="stats-small__label text-uppercase">Users</span>
                                        <h6 className="stats-small__value count my-3">2,413</h6>
                                    </div>
                                    <div className="stats-small__data">
                                        <span className="stats-small__percentage stats-small__percentage--increase">12.4%</span>
                                    </div>
                                </div>
                                <canvas height="95" className="blog-overview-stats-small-4 chartjs-render-monitor" width="240" style={{ "display": "block", "height": "76px", "width": "192px" }}></canvas>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg col-md-4 col-sm-12 mb-4">
                        <div className="stats-small stats-small--1 card card-small">
                            <div className="card-body p-0 d-flex">
                                <div className="chartjs-size-monitor" style={{ "position": "absolute", "inset": "0px", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                    <div className="chartjs-size-monitor-expand" style={{ "position": "absolute", "left": "0", "top": "0", "right": "0", "bottom": "0", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                        <div style={{ "position": "absolute", "width": "1000000px", "height": "1000000px", "left": "0", "top": "0" }}>
                                        </div>
                                    </div>
                                    <div className="chartjs-size-monitor-shrink" style={{ "position": "absolute", "left": "0", "top": "0", "right": "0", "bottom": "0", "overflow": "hidden", "pointerEvents": "none", "visibility": "hidden", "zIndex": "-1" }}>
                                        <div style={{ "position": "absolute", "width": "200%", "height": "200%", "left": "0", "top": "0" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column m-auto">
                                    <div className="stats-small__data text-center">
                                        <span className="stats-small__label text-uppercase">Subscribers</span>
                                        <h6 className="stats-small__value count my-3">17,281</h6>
                                    </div>
                                    <div className="stats-small__data">
                                        <span className="stats-small__percentage stats-small__percentage--decrease">2.4%</span>
                                    </div>
                                </div>
                                <canvas height="95" className="blog-overview-stats-small-5 chartjs-render-monitor" width="240" style={{ "display": "block", "height": "76px", "width": "192px" }}></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
                        <div className="card card-small">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Posts</h6>
                            </div>
                            <Line data={areaData} options={areaOptions} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-9 col-md-12 col-sm-12 mb-4">
                        <div className="card card-small blog-comments">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Discussions</h6>
                            </div>
                            <div className="card-body p-0">
                                <div className="blog-comments__item d-flex p-3">
                                    <div className="blog-comments__avatar mr-3">
                                        <img src={ImageNoAvatar} alt="User avatar" className="img-xs rounded-circle"/>
                                    </div>
                                    <div className="blog-comments__content">
                                        <div className="blog-comments__meta text-muted">
                                            <a className="text-secondary" href="#">James Johnson</a> on <a className="text-secondary" href="#">Hello World!</a> <span className="text-muted">– 3 days ago</span>
                                        </div>
                                        <p className="m-0 my-1 mb-2 text-muted">Well, the way they make shows is, they make one show ...</p>
                                        <div className="blog-comments__actions">
                                            <div className="btn-group btn-group-sm">
                                                <button type="button" className="btn btn-white">
                                                    <span className="text-success"><i className="mdi mdi-check"></i></span> Approve </button>
                                                <button type="button" className="btn btn-white">
                                                    <span className="text-danger"><i className="mdi mdi-close"></i></span> Reject </button>
                                                <button type="button" className="btn btn-white">
                                                    <span className="text-light"><i className="mdi mdi-dots-vertical"></i></span> Edit </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-comments__item d-flex p-3">
                                    <div className="blog-comments__avatar mr-3">
                                        <img src={ImageNoAvatar} alt="User avatar" className="img-xs rounded-circle"/>
                                    </div>
                                    <div className="blog-comments__content">
                                        <div className="blog-comments__meta text-muted">
                                            <a className="text-secondary" href="#">James Johnson</a> on <a className="text-secondary" href="#">Hello World!</a> <span className="text-muted">– 4 days ago</span>
                                        </div>
                                        <p className="m-0 my-1 mb-2 text-muted">After the avalanche, it took us a week to climb out. Now...</p>
                                        <div className="blog-comments__actions">
                                            <div className="btn-group btn-group-sm">
                                                <button type="button" className="btn btn-white">
                                                    <span className="text-success"><i className="mdi mdi-check"></i></span> Approve </button>
                                                <button type="button" className="btn btn-white">
                                                    <span className="text-danger"><i className="mdi mdi-close"></i></span> Reject </button>
                                                <button type="button" className="btn btn-white">
                                                    <span className="text-light"><i className="mdi mdi-dots-vertical"></i></span> Edit </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-comments__item d-flex p-3">
                                    <div className="blog-comments__avatar mr-3">
                                        <img src={ImageNoAvatar} alt="User avatar" className="img-xs rounded-circle"/>
                                    </div>
                                    <div className="blog-comments__content">
                                        <div className="blog-comments__meta text-muted">
                                            <a className="text-secondary" href="#">James Johnson</a> on <a className="text-secondary" href="#">Hello World!</a> <span className="text-muted">– 5 days ago</span>
                                        </div>
                                        <p className="m-0 my-1 mb-2 text-muted">My money's in that office, right? If she start giving me...</p>
                                        <div className="blog-comments__actions">
                                            <div className="btn-group btn-group-sm">
                                                <button type="button" className="btn btn-white">
                                                    <span className="text-success"><i className="mdi mdi-check"></i></span> Approve </button>
                                                <button type="button" className="btn btn-white">
                                                    <span className="text-danger"><i className="mdi mdi-close"></i></span> Reject </button>
                                                <button type="button" className="btn btn-white">
                                                    <span className="text-light"><i className="mdi mdi-dots-vertical"></i></span> Edit </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer border-top">
                                <div className="row">
                                    <div className="col text-center view-report">
                                        <button type="submit" className="btn btn-white">View All Comments</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-4">
                        <div className="card card-small">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Top Referrals</h6>
                            </div>
                            <div className="card-body p-0" style={{'color': '#000'}}>
                                <ul className="list-group list-group-small list-group-flush">
                                    <li className="list-group-item d-flex px-3">
                                        <span className="text-semibold text-fiord-blue">GitHub</span>
                                        <span className="ml-auto text-right text-semibold text-reagent-gray">19,291</span>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <span className="text-semibold text-fiord-blue">Stack Overflow</span>
                                        <span className="ml-auto text-right text-semibold text-reagent-gray">11,201</span>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <span className="text-semibold text-fiord-blue">Hacker News</span>
                                        <span className="ml-auto text-right text-semibold text-reagent-gray">9,291</span>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <span className="text-semibold text-fiord-blue">Reddit</span>
                                        <span className="ml-auto text-right text-semibold text-reagent-gray">8,281</span>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <span className="text-semibold text-fiord-blue">The Next Web</span>
                                        <span className="ml-auto text-right text-semibold text-reagent-gray">7,128</span>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <span className="text-semibold text-fiord-blue">Tech Crunch</span>
                                        <span className="ml-auto text-right text-semibold text-reagent-gray">6,218</span>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <span className="text-semibold text-fiord-blue">YouTube</span>
                                        <span className="ml-auto text-right text-semibold text-reagent-gray">1,218</span>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <span className="text-semibold text-fiord-blue">Adobe</span>
                                        <span className="ml-auto text-right text-semibold text-reagent-gray">827</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-footer border-top">
                                <div className="row">
                                    <div className="col">
                                        <select className="custom-select custom-select-sm">
                                            <option value="0">Last Week</option>
                                            <option value="1">Today</option>
                                            <option value="2">Last Month</option>
                                            <option value="3">Last Year</option>
                                        </select>
                                    </div>
                                    <div className="col text-right view-report">
                                        <a href="#">Full report →</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDashboard
