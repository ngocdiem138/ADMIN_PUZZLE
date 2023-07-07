import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import imageLogo from '../../assets/images/logo-main.png';
import authService from '../../services/authService';
import CardProfile from '../../components/Image';
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import ToggleButton from '../../components/ToggleButton';
import ImageNoAvatar from '../../assets/images/faces/noface.png';
import Paginate from '../../helpers/Paginate';
import jobService from '../../services/jobService';

const JobTable = () => {
    const [listJob, setListJob] = useState([]);
    const [listResult, setListResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listResult.slice(indexOfFirstPost, indexOfLastPost);
    const [updateStatus, setUpdateStatus] = useState(true)
    useEffect(() => {
        jobService.getAllJob().then(response => {
            if (response.data.errCode == "UNAUTHORIZED_ERROR") {
            } else {
                setListJob(response.data.data.content);
                setListResult(response.data.data.content);
            }
        }
        )
    }, []);

    useEffect(() => {

    }, [updateStatus])

    const paginate = (pageNumber) => {
        console.log("pageNumber", pageNumber)
        setCurrentPage(pageNumber);
    };

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

    const handleDelete = (id) => {
        console.log(id)
        const confirmBox = window.confirm(
            "Do you really want to delete this Job?"
        )
        if (confirmBox === true) {
            jobService.deleteJobById(id)
            setListJob(listJob.filter((item) => item.id !== id));
            setListResult(listResult.filter((item) => item.id !== id));
        }
    };

    const handleActive = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to active this Job?"
        )
        if (confirmBox === true) {
            jobService.activeJob(id, true);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listJob[upd_obj].isActive = true;
            listResult[upd_obj].isActive = true;
            return true;
        } else {
            return false;
        }
    };

    const handleInActive = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to inactive this Job?"
        )
        if (confirmBox === true) {
            jobService.activeJob(id, false);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listJob[upd_obj].isActive = false;
            listResult[upd_obj].isActive = false;
            return true;
        } else {
            return false;
        }
    };

    const jobTableContent = currentPosts.map(job => {
        return <tr>
            <td>
                {job.title}
            </td>
            <td>
                {job.employmentType}
            </td>
            <td>
                {job.workplaceType}
            </td>
            <td>
                {job.quantity}
            </td>
            <td>
                {job.minBudget} - {job.maxBudget}
            </td>
            <td className="text-center">
                <ToggleButton onChange={state => state ? handleActive(job.id) : handleInActive(job.id)} defaultChecked={job.isActive} value={job.isActive} />
            </td>
            <td style={{ "width": "15%" }}>
                <a href={'/jobs/' + job.id} className="table-link">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-crosshairs"></i>
                    </span>
                </a>
                <a href={'/jobs/' + job.id} className="table-link">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-pencil-circle-outline"></i>
                    </span>
                </a>
                <a onClick={() => handleDelete(job.id)} className="table-link danger">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-delete-circle-outline"></i>
                    </span>
                </a>
            </td>
        </tr>
    })

    const [q, setQ] = useState("");

    useEffect(() => {
        setListResult(listJob.filter((item) =>
            (item.title && item.title.indexOf(q) !== -1)
        ))
    }, [q]);

    return (
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item w-100">
                            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                                <input type="text" className="form-control" placeholder="Search title" value={q} onChange={(e) => setQ(e.target.value)} />
                            </form>
                        </li>
                    </ul>
                    <div className="main-box clearfix">
                        <div className="table-responsive table-job">
                            <table className="table job-list" id="dtBasicExample">
                                <thead>
                                    <tr>
                                        <th><span>Title</span></th>
                                        <th><span>Type</span></th>
                                        <th><span>Work Place</span></th>
                                        <th><span>Quantity</span></th>
                                        <th><span>Salary</span></th>
                                        <th className="text-center"><span>Status</span></th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobTableContent}
                                </tbody>
                            </table>
                        </div>
                        <Paginate
                            postsPerPage={postsPerPage}
                            totalPosts={listResult.length}
                            paginate={paginate}
                            previousPage={previousPage}
                            nextPage={nextPage}
                            selectedPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default JobTable
