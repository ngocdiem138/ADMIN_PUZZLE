import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import imageLogo from '../../assets/images/logo-main.png';
import authService from '../../services/authService';
import CardProfile from '../../components/Image';
import accountService from '../../services/accountService';
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import ImageNoAvatar from '../../assets/images/faces/noface.png';
const Profile = () => {
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

    useEffect(() => {
        accountService.getProfile().then(response => {
            if (response.data.errCode == "UNAUTHORIZED_ERROR") {
            } else {
                setProfileData(response.data.data);
                let array = []
                response.data.data.roleCodes.forEach(element => {
                    array = [...array, { value: element, label: element.toUpperCase() }];
                });
                setSelectedOption(array)
            }
        }
        )
    }, []);

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
            setProfileData({ ...profileData, [type]: array })
        }
        else if (type === 'joinDate') {
            valueTmp[type] = event.target.value + " 00:00:00"
        } else {
            valueTmp[type] = event.target.value
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await accountService.updateProfile(profileData);
            if (res.data.errCode == "") {
                addToast('Update profile successfull', {
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
                        <h3 className="page-title">User Profile</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card card-small mb-4 pt-3">
                            <div className="card-header border-bottom text-center">
                                <div className="mb-3 mx-auto">
                                    {profileData.avatar !== undefined ? <CardProfile url={(!profileData.avatar) ? ImageNoAvatar : profileData.avatar} /> : ''}
                                </div>
                                <h4 className="mb-0">{profileData.username}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-small mb-4">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Account Details</h6>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item p-3">
                                    <div className="row">
                                        <div className="col">
                                            <form id='form-account' onSubmit={handleSubmit}>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="feUserName">User Name</label>
                                                        <input type="text" className="form-control" id="feUserName" placeholder="User Name" name="username"
                                                            value={profileData.username} onChange={(event) => setProfileData({ ...profileData, [event.target.name]: event.target.value })} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="feFullName">Full Name</label>
                                                        <input type="text" className="form-control" id="feFullName" placeholder="Full Name" name="fullName"
                                                            value={profileData.fullName} onChange={(event) => setProfileData({ ...profileData, [event.target.name]: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="feEmailAddress">Email</label>
                                                        <input type="email" className="form-control" id="feEmailAddress" placeholder="Email" name='email'
                                                            value={profileData.email} onChange={(event) => setProfileData({ ...profileData, [event.target.name]: event.target.value })} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="fePhone">Phone number</label>
                                                        <input type="number" className="form-control" id="fePhone" placeholder="Phone number" name='phone'
                                                            value={profileData.phone} onChange={(event) => setProfileData({ ...profileData, [event.target.name]: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="feInputActive">Active</label>
                                                        <select id="feInputActive" className="form-control" name='active' style={{ backgroundColor: '#fff', color: '#000' }}
                                                            value={profileData.active} onChange={(event) => setProfileData({ ...profileData, [event.target.name]: event.target.value })}>
                                                            <option value="true">Active</option>
                                                            <option value="false">Inactive</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="feInputActive">Email Verified</label>
                                                        <select id="feInputActive" className="form-control" name='emailVerified' style={{ backgroundColor: '#fff', color: '#000' }}
                                                            value={profileData.emailVerified} onChange={(event) => setProfileData({ ...profileData, [event.target.name]: event.target.value })}>
                                                            <option value="true">Verified</option>
                                                            <option value="false">Unconfirmed</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-12" style={{ backgroundColor: '#fff', color: '#000' }}>
                                                        <label htmlFor="feInputActive">Role</label>
                                                        <Select
                                                            value={selectedOption}
                                                            onChange={(e) => { setSelectedOption(e); onChange(e, "roleCodes") }}
                                                            options={options}
                                                            isMulti={true}
                                                            isSearchable={true}
                                                        />
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type='submit'>Update Account</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default Profile
