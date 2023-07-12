import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardProfile from '../../components/Image';
import ImageNoAvatar from '../../assets/images/faces/noface.png';
import { useToasts } from 'react-toast-notifications';
import companyService from '../../services/companyService';
const NewCompanyProfile = () => {
    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];
    const { addToast } = useToasts();
    const [companyProfileData, setCompanyProfileData] = useState({description: '', active: false});

    const [fileImage, setFileImage] = useState();
    const [isFile, setIsFile] = useState(false);

    const callbackFunction = (childData) => {
        setFileImage(childData);
        setIsFile(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            callbackFunction();
            const formData = new FormData();
            if (fileImage && isFile) {
                formData.append("image", fileImage);
            }
            formData.append("name", companyProfileData.name);
            formData.append("website", companyProfileData.website);
            formData.append("active", companyProfileData.active);
            formData.append("description", companyProfileData.description);
            const res = await companyService.createCompany(formData);
            if (res.data.errCode == "" || res.data.errCode == null) {
                addToast('Create company profile successfull', {
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
            console.log(error.message)
        }
    };

    return (
        <div>
            <div className="main-content-container container-fluid px-4">
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h3 className="page-title">Company Profile</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card card-small mb-4 pt-3">
                            <div className="card-header border-bottom text-center">
                                <div className="mb-3 mx-auto" id="image-company">
                                    <CardProfile url={(!companyProfileData.image) ? ImageNoAvatar : companyProfileData.image} parentCallback={callbackFunction} />
                                </div>
                                <h4 className="mb-0">{companyProfileData.name}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-small mb-4">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Company Details</h6>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item p-3">
                                    <div className="row">
                                        <div className="col">
                                            <form id='form-account' onSubmit={handleSubmit}>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="feCompanyName">Company Name</label>
                                                        <input type="text" className="form-control" id="feCompanyName" placeholder="Company Name" name="name"
                                                            value={companyProfileData.name} onChange={(event) => setCompanyProfileData({ ...companyProfileData, [event.target.name]: event.target.value })} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="feInputActive">Active</label>
                                                        <select id="feInputActive" className="form-control" name='active' style={{ backgroundColor: '#fff', color: '#000' }}
                                                            value={companyProfileData.active ? companyProfileData.active : false} onChange={(event) => setCompanyProfileData({ ...companyProfileData, [event.target.name]: event.target.value })}>
                                                            <option value="true">Active</option>
                                                            <option value="false">Inactive</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label htmlFor="feWebsite">Website</label>
                                                        <input type="text" className="form-control" id="feWebsite" placeholder="Website" name='website'
                                                            value={companyProfileData.website} onChange={(event) => setCompanyProfileData({ ...companyProfileData, [event.target.name]: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12 company-description">
                                                        <label htmlFor="feDescription">Description</label>
                                                        <ReactQuill
                                                            style={{ 'color': '#000' }}
                                                            theme="snow"
                                                            value={companyProfileData.description}
                                                            onChange={(event) => companyProfileData.description = event}
                                                            modules={modules}
                                                            formats={formats}
                                                            placeholder="Describe about the company what make it unique"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div>
                                                        <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type='submit'>Create Company</button>
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

export default NewCompanyProfile
