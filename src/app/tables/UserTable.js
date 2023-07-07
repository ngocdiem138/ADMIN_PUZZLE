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

const UserTable = () => {
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
    const [listUser, setListUser] = useState([]);
    const [listResult, setListResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listResult.slice(indexOfFirstPost, indexOfLastPost);
    const [updateStatus, setUpdateStatus] = useState(true)
    useEffect(() => {
        accountService.getAllAccount().then(response => {
            if (response.data.errCode == "UNAUTHORIZED_ERROR") {
            } else {
                setListUser(response.data.data.content);
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

    const onChange = (event, type) => {
        if (type === 'active' || type === 'online' || type === 'emailVerified')
            valueTmp[type] = event.target.checked
        else if (type === 'roleCodes') {
            let array = [];
            event.forEach(element => {
                array = [...array, element.value]
            });
            if (array.length == 0) {
                array = ['USER']
            }
            setProfileData({ [type]: array })
        }
        else if (type === 'joinDate') {
            valueTmp[type] = event.target.value + " 00:00:00"
        } else {
            valueTmp[type] = event.target.value
        }
    }

    const handleDelete = (id) => {
        console.log(id)
        const confirmBox = window.confirm(
            "Do you really want to delete this User?"
        )
        if (confirmBox === true) {
            userService.deleteUserById(id)
            setListUser(listUser.filter((item) => item.id !== id));
            setListResult(listResult.filter((item) => item.id !== id));
        }
    };

    const handleActive = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to active this User?"
        )
        if (confirmBox === true) {
            userService.activeUser(id);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listUser[upd_obj].active = true;
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
            userService.unActiveUser(id);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listUser[upd_obj].active = false;
            listResult[upd_obj].active = false;
            return true;
        } else {
            return false;
        }
    };

    const userTableContent = currentPosts.map(user => {
        return <tr>
            <td>
                <img src={user.avatar ? user.avatar : ImageNoAvatar} alt="" />
                <Link to={'/users/' + user.id} class="user-link">{user.fullName ? user.fullName : "Name haven't updated"}</Link>
                <span class="user-subhead">{user.roleCodes.length > 0 ? user.roleCodes.join(' ,') : "Role haven't updated"}</span>
            </td>
            <td>
                {user.joinDate}
            </td>
            <td class="text-center">
                <span class={user.emailVerified ? "label label-success" : "label label-default"}>{user.emailVerified ? 'Verified' : 'Unconfirmed'}</span>
            </td>
            <td class="text-center">
                <ToggleButton onChange={state => state ? handleActive(user.id) : handleInActive(user.id)} defaultChecked={user.isActive} value={user.isActive} />
            </td>
            <td>
                <a href={'/users/' + user.id}>{user.email}</a>
            </td>
            <td style={{ "width": "15%" }}>
                <a href={'/users/' + user.id} class="table-link">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-crosshairs"></i>
                    </span>
                </a>
                <a href={'/users/' + user.id} class="table-link">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-pencil-circle-outline"></i>
                    </span>
                </a>
                <a onClick={() => handleDelete(user.id)} class="table-link danger">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-delete-circle-outline"></i>
                    </span>
                </a>
            </td>
        </tr>
    })

    const [q, setQ] = useState("");

    useEffect(() => {
        setListResult(listUser.filter((item) =>
            (item.fullName && item.fullName.indexOf(q) !== -1) || (item.email && item.email.indexOf(q) !== -1)
        ))
    }, [q]);

    return (
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item w-100">
                            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                                <input type="text" className="form-control" placeholder="Search full name or email" value={q} onChange={(e) => setQ(e.target.value)} />
                            </form>
                        </li>
                    </ul>
                    <div class="main-box clearfix">
                        <div class="table-responsive table-user">
                            <table class="table user-list" id="dtBasicExample">
                                <thead>
                                    <tr>
                                        <th><span>User</span></th>
                                        <th><span>Created</span></th>
                                        <th class="text-center"><span>Email Verified</span></th>
                                        <th class="text-center"><span>Status</span></th>
                                        <th><span>Email</span></th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userTableContent}
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

export default UserTable
