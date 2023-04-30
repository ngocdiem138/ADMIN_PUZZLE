import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ToggleButton from '../../components/ToggleButton';
import Paginate from '../../helpers/Paginate';
import extraInfoService from '../../services/extraInfoService';

const ServiceTable = () => {
    const [listService, setListService] = useState([]);
    const [listResult, setListResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listResult.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        extraInfoService.getAllExtraInfoByType('service').then(response => {
            if (response.data.errCode == "403") {
            } else {
                setListService(response.data.data);
                setListResult(response.data.data);
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
            "Do you really want to delete this Service?"
        )
        if (confirmBox === true) {
            extraInfoService.deleteExtraInfo(id);
            setListService(listService.filter((item) => item.id !== id));
            setListResult(listResult.filter((item) => item.id !== id));
        }
    };

    const handleActive = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to active this Service?"
        )
        if (confirmBox === true) {
            extraInfoService.activeExtraInfo(id);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listService[upd_obj].active = true;
            listResult[upd_obj].active = true;
            return true;
        } else {
            return false;
        }
    };

    const handleInActive = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to inactive this User?"
        )
        if (confirmBox === true) {
            extraInfoService.inActiveExtraInfo(id);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listService[upd_obj].active = false;
            listResult[upd_obj].active = false;
            return true;
        } else {
            return false;
        }
    };

    const ServiceTableContent = currentPosts.map(service => {
        return <tr>
            <td>
                <Link to={'/extraInfos/' + service.id} class="user-link" style={{ paddingLeft: '4%' }}>{service.id ? service.id : "ID haven't updated"}</Link>
            </td>
            <td>
                {service.name}
            </td>
            <td class="text-center">
                <ToggleButton onChange={state => state ? handleActive(service.id) : handleInActive(service.id)} defaultChecked={service.active} />
            </td>
            <td style={{ "width": "15%" }}>
                <a href={'/extraInfos/' + service.id} class="table-link">
                    <span class="fa-stack">
                        <i class="fa fa-square fa-stack-2x"></i>
                        <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
                <a href={'/extraInfos/' + service.id} class="table-link">
                    <span class="fa-stack">
                        <i class="fa fa-square fa-stack-2x"></i>
                        <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
                <a onClick={() => handleDelete(service.id)} class="table-link danger">
                    <span class="fa-stack">
                        <i class="fa fa-square fa-stack-2x"></i>
                        <i class="fa fa-trash fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
            </td>
        </tr>
    })

    const [q, setQ] = useState("");

    useEffect(() => {
        setListResult(listService.filter((item) =>
            (item.name && item.name.indexOf(q) !== -1) || (item.id && item.id.indexOf(q) !== -1)
        ))
    }, [q]);

    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Service Table</h4>
                    <ul className="navbar-nav w-100">
                        <li className="nav-item w-100">
                            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                                <input type="text" className="form-control" placeholder="Search service name or ID" value={q} onChange={(e) => setQ(e.target.value)} />
                            </form>
                        </li>
                    </ul>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Service Name</th>
                                    <th class="text-center">Status</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ServiceTableContent}
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

export default ServiceTable