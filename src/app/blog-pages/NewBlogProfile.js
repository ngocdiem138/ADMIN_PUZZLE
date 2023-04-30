import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardProfile from '../../components/Image';
import ImageNoAvatar from '../../assets/images/faces/noface.png';
import { useToasts } from 'react-toast-notifications';
import companyService from '../../services/companyService';
const BlogProfile = () => {
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
    const params = useParams();
    const { addToast } = useToasts();
    const [blogProfileData, setBlogProfileData] = useState({});
    useEffect(() => {
        companyService.getOneCompany(params.id).then(response => {
            if (response.data.errCode == "403") {
            } else {
                if (!blogProfileData.id) {
                    setBlogProfileData(response.data.data);
                }
            }
        }
        )
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
                        <span className="text-uppercase page-subtitle">Blog Posts</span>
                        <h3 className="page-title">Add New Post</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-9 col-md-12">
                        <div className="card card-small mb-3">
                            <div className="card-body">
                                <form className="add-new-post">
                                    <input className="form-control form-control-lg mb-3" type="text" placeholder="Your Post Title" />
                                    <ReactQuill
                                        style={{ 'color': '#000' }}
                                        theme="snow"
                                        value={blogProfileData.description}
                                        onChange={(event) => blogProfileData.description = event}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Words can be like x-rays if you use them properly..."
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                        <div className="card card-small mb-3">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Actions</h6>
                            </div>
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item p-3">
                                        <span className="d-flex mb-2"><i className="material-icons mr-1">flag</i><strong className="mr-1">Status:</strong> Draft <a className="ml-auto" href="#">Edit</a></span>
                                        <span className="d-flex mb-2"><i className="material-icons mr-1">visibility</i><strong className="mr-1">Visibility:</strong> <strong className="text-success">Public</strong> <a className="ml-auto" href="#">Edit</a></span>
                                        <span className="d-flex mb-2"><i className="material-icons mr-1">calendar_today</i><strong className="mr-1">Schedule:</strong> Now <a className="ml-auto" href="#">Edit</a></span>
                                        <span className="d-flex"><i className="material-icons mr-1">score</i><strong className="mr-1">Readability:</strong> <strong className="text-warning">Ok</strong></span>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <button className="btn btn-sm btn-outline-accent"><i className="material-icons">save</i> Save Draft</button>
                                        <button className="btn btn-sm btn-accent ml-auto"><i className="material-icons">file_copy</i> Publish</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card card-small mb-3">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Categories</h6>
                            </div>
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item px-3 pb-2">
                                        <div className="custom-control custom-checkbox mb-1">
                                            <input type="checkbox" className="custom-control-input" id="category1" checked="" />
                                            <label className="custom-control-label" for="category1">Uncategorized</label>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-1">
                                            <input type="checkbox" className="custom-control-input" id="category2" checked="" />
                                            <label className="custom-control-label" for="category2">Design</label>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-1">
                                            <input type="checkbox" className="custom-control-input" id="category3" />
                                            <label className="custom-control-label" for="category3">Development</label>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-1">
                                            <input type="checkbox" className="custom-control-input" id="category4" />
                                            <label className="custom-control-label" for="category4">Writing</label>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-1">
                                            <input type="checkbox" className="custom-control-input" id="category5" />
                                            <label className="custom-control-label" for="category5">Books</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="New category" aria-label="Add new category" aria-describedby="basic-addon2" />
                                            <div className="input-group-append">
                                                <button className="btn btn-white px-2" type="button"><i className="material-icons">add</i></button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BlogProfile
