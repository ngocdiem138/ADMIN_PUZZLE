import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardProfile from '../../components/Image';
import ImageNoAvatar from '../../assets/images/wood-blog-placeholder.jpg';
import { useToasts } from 'react-toast-notifications';
import companyService from '../../services/companyService';
import blogService from '../../services/blogService';
import categoryService from '../../services/categoryService';
import CreatableSelect from 'react-select/creatable';
const BlogProfile = () => {
    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                [{ 'align': [] }],
                ["link", "image"],
                ["clean"],
                [{ 'color': [] }],
            ],
            handlers: {
                image: () => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.setAttribute('multiple', 'multiple');
                    input.click();
                    input.onchange = async () => {
                        Array.from(input.files).forEach((item) => {
                            const formData = new FormData();
                            formData.append('file', item);
                            formData.append('subjectId', '123');
                            blogService.uploadImageBlog(formData).then(response => {
                                console.log('data', response.data.data);
                                const quill = quillRef?.current?.getEditor();
                                console.log('data', quill);
                                const cursorPosition = quill.getSelection();
                                const link = response.data.data;
                                quill.insertEmbed(cursorPosition, 'image', link);
                                quill.setSelection(cursorPosition + 1);
                            });
                        });
                    };
                },
            },
        },
        clipboard: {
            matchVisual: false,
            // Disable pasting of images and videos
            matchers: [
                ['img', (node) => node.tagName.toLowerCase() !== 'img'],
                ['video', (node) => node.tagName.toLowerCase() !== 'video'],
            ],
        },
    }), []);

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
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [thumbnail, setThumbnail] = useState("");
    const [tags, setTags] = useState("");
    const [showError, setShowError] = useState(false);
    const [showError403, setShowError403] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        categoryService.getAllCategory().then((response) => {
            if (response.data.data) {
                let categoryList1 = []
                response.data.data.forEach(element => {
                    categoryList1 = [...categoryList1, { value: element.id, label: element.name }]
                });
                setCategoryList(categoryList1);
            }
            else {

            }
        });
    }, [])

    const [fileImage, setFileImage] = useState()
    const saveOrUpdateBlogPost = (e) => {
        e.preventDefault();
        callbackFunction();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("categoryId", categoryId);
        formData.append("tags", tags);
        formData.append("thumbnail", thumbnail);
        formData.append("body", description);

        if (id != 'new') {
            BlogServiceIml.updateBlogPost(id, formData).then((response) => {
                if (response.data.errCode == "UNAUTHORIZED_ERROR") {
                    setShowAlert(true);
                } else if (response.data.errCode != "200" && response.data.errCode != null) {
                    addToast(<a href='/dashboard-blogs' style={{ 'fontSize': 16 }}>Update blog post successfull, click here to return list blog page</a>, {
                        appearance: 'success',
                        autoDismiss: false,
                    })
                }
                // navigate.push('/employer/jobs')
            }).catch(error => {
                addToast("some error occurred. Please try again", {
                    appearance: 'info',
                    autoDismiss: true,
                })
            })

        } else {

            BlogServiceIml.createBlogPost(formData).then((response) => {
                if (response.data.errCode == "UNAUTHORIZED_ERROR") {
                    setShowAlert(true);
                } else if (response.data.errCode != "200" && response.data.errCode != null) {
                    addToast(<a href='/dashboard-blogs' style={{ 'fontSize': 16 }}>Create blog post successfull, click here to return list blog page</a>, {
                        appearance: 'success',
                        autoDismiss: false,
                    })
                }

                // navigate.push('/employer/jobs');

            }).catch(error => {
                addToast("some error occurred. Please try again", {
                    appearance: 'info',
                    autoDismiss: true,
                })
            })
        }
    }

    const [tagList, setTagList] = useState([])
    const getTag = (tags) => {
        if (tags) {
            tags = tags.slice(1);
        }
        let arr = tags ? tags.split('#') : [];
        let tagOjectList = []
        arr.forEach((element) => {
            tagOjectList = [...tagOjectList, { value: element, label: element }]
        })
        return tagOjectList;
    }

    const stringTags = (tags) => {
        let tagNameList = []
        tags.forEach((element) => {
            tagNameList = [...tagNameList, element.label]
        })
        return "#" + tagNameList.join('#');
    }

    const findCategory = (id) => {
        categoryList.forEach((element) => {
            if (element.value == id) {
                setSelectedCategory(element)
                return element;
            }
        })
    }

    const callbackFunction = (childData) => {
        setThumbnail(childData)
    }

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
                            <div className="card-body" style={{ 'backgroundColor': '#fff' }}>
                                <form className="add-new-post">
                                    <input
                                        className='form-control form-control-lg mb-3'
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        type="text"
                                        placeholder="IT DEV"
                                        style={{ 'color': '#fff', 'fontWeight': '600' }} />
                                    <ReactQuill
                                        style={{ 'color': '#000' }}
                                        theme="snow"
                                        value={description}
                                        onChange={(event) => setDescription(event)}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Words can be like x-rays if you use them properly..."
                                    />
                                    <h5>Tags</h5>
                                    <CreatableSelect
                                        isMulti
                                        isClearable={true}
                                        isSearchable
                                        onChange={(e) => { setTags(stringTags(e)) }}
                                        value={getTag(tags)}
                                        options={tagList} />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                        <div className="card card-small mb-3">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Thumbnail</h6>
                                <CardProfile url={(!thumbnail) ? ImageNoAvatar : thumbnail} parentCallback={callbackFunction} />
                            </div>
                        </div>
                        <div className="card card-small mb-3">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Categories</h6>
                            </div>
                            <div className="card-body p-0" style={{ 'color': '#000' }}>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item px-3 pb-2">
                                        <div className="custom-control  mb-1">
                                            <input type="radio" name="category" id="category1" checked="" />
                                            <label for="category1">Uncategorized</label>
                                        </div>
                                        <div className="custom-control  mb-1">
                                            <input type="radio" name="category" id="category2" checked="" />
                                            <label for="category2">Design</label>
                                        </div>
                                        <div className="custom-control  mb-1">
                                            <input type="radio" name="category" id="category3" />
                                            <label for="category3">Development</label>
                                        </div>
                                        <div className="custom-control  mb-1">
                                            <input type="radio" name="category" id="category4" />
                                            <label for="category4">Writing</label>
                                        </div>
                                        <div className="custom-control  mb-1">
                                            <input type="radio" name="category" id="category5" />
                                            <label for="category5">Books</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex px-3">
                                        <div className="input-group" style={{ 'border': '1px solid rgba(0,0,0,.125)' }}>
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
