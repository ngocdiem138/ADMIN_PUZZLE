import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import imageLogo from '../../assets/images/logo-main.png';
import authService from '../../services/authService';
import CardProfile from '../../components/Image';
import accountService from '../../services/accountService';
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import ToggleButton from '../../components/ToggleButton';
import ImageNoAvatar from '../../assets/images/faces/noface.png';
import Paginate from '../../helpers/Paginate';
import userService from '../../services/userService';
import companyService from '../../services/companyService';

const CompanyTable = () => {
    const { addToast } = useToasts();
    const options = [
        { value: 'user', label: 'USER' },
        { value: 'candidate', label: 'CANDIDATE' },
        { value: 'employer', label: 'EMPLOYER' },
        { value: 'admin', label: 'ADMIN' },
    ];
    const [error, setError] = useState("");
    const [selectedOption, setSelectedOption] = useState([]);
    const [profileData, setProfileData] = useState({});
    const [listCompany, setListCompany] = useState([]);
    const [listResult, setListResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listResult.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        companyService.getAllCompany().then(response => {
            if (response.data.errCode == "UNAUTHORIZED_ERROR") {
            } else {
                setListCompany(response.data.data.content);
                setListResult(response.data.data.content);
            }
        }
        )
    }, []);

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
            "Do you really want to delete this Company?"
        )
        if (confirmBox === true) {
            userService.deleteCompany(id)
            setListCompany(listCompany.filter((item) => item.id !== id));
            setListResult(listResult.filter((item) => item.id !== id));
        }
    };

    const handleActive = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to active this Company?"
        )
        if (confirmBox === true) {
            companyService.activeCompany(id);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listCompany[upd_obj].active = true;
            listResult[upd_obj].active = true;
        }
    };

    const handleInActive = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to inactive this Company?"
        )
        if (confirmBox === true) {
            companyService.unActiveCompany(id);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listCompany[upd_obj].active = false;
            listResult[upd_obj].active = false;
        }
    };

    const CompanyTableContent = currentPosts.map(company => {
        return <tr>
            <td>
                <img src={company.image ? company.image : ImageNoAvatar} alt="" style={{ borderRadius: '0%' }} />
                <Link to={'/companys/' + company.id} class="user-link" style={{ paddingLeft: '4%' }}>{company.name ? company.name : "Name haven't updated"}</Link>
            </td>
            <td>
                {company.website}
            </td>
            <td className='text-center'>
                {company.createdEmployerId ?
                    <Link to={'/users/' + company.createdEmployerId}>
                        <span class="fa-stack">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i class="fa fa-id-badge fa-stack-1x fa-inverse"></i>
                        </span>
                    </Link>
                    : ''}
            </td>
            <td class="text-center">
                <ToggleButton onChange={state => state ? handleActive(company.id) : handleInActive(company.id)} defaultChecked={company.isPublic} />
            </td>
            <td style={{ "width": "15%" }}>
                <a href={'/companys/' + company.id} class="table-link">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-crosshairs"></i>
                    </span>
                </a>
                <a href={'/companys/' + company.id} class="table-link">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-pencil-circle-outline"></i>
                    </span>
                </a>
                <a onClick={() => handleDelete(company.id)} class="table-link danger">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-delete-circle-outline"></i>
                    </span>
                </a>
            </td>
        </tr>
    })

    const [q, setQ] = useState("");

    useEffect(() => {
        setListResult(listCompany.filter((item) =>
            (item.name && item.name.indexOf(q) !== -1) || (item.website && item.website.indexOf(q) !== -1)
        ))
    }, [q]);

    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Company Table</h4>
                    <ul className="navbar-nav w-100">
                        <li className="nav-item w-100">
                            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                                <input type="text" className="form-control" placeholder="Search company name or website" value={q} onChange={(e) => setQ(e.target.value)} />
                            </form>
                        </li>
                    </ul>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Website</th>
                                    <th class="text-center">View create employer</th>
                                    <th class="text-center">Status</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CompanyTableContent}
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
    )
}

export default CompanyTable
