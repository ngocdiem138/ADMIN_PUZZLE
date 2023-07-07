import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Tag, TagCloseButton, TagLabel, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, Textarea, Select, Text, Col } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { BlogServiceIml, ParagraphServiceIml, UserServiceIml } from '../actions/user-actions';
import PageWrapper from '../components/PageWrapper';

import CreatableSelect, { useCreatable } from 'react-select/creatable';
import { Alert } from 'react-bootstrap';
import Cover from '../components/Cover';
import { API_BASE_URL } from '../utils/constants/url';
import { useLocation } from "@reach/router";
import { parse } from "query-string";
import { useToasts } from 'react-toast-notifications';

const Paragraph = () => {
    const { addToast } = useToasts();
    const quillRef = useRef();
    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
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
    const location = useLocation();
    const searchParams = parse(location.search);
    const id = searchParams.id;
    useEffect(() => {
        BlogServiceIml.getAllCategory().then((response) => {
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
        BlogServiceIml.getBlogPostById(id).then(response => {
            if (!response.data.errCode) {
                setTitle(response.data.data.title);
                setDescription(response.data.data.body);
                setThumbnail(response.data.data.thumbnail);
                setCategoryId(response.data.data.categoryId);
                setTags(response.data.data.tags);
            }
        })
    }, [id])

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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
                            BlogServiceIml.uploadImageBlog(formData).then(response => {
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
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            saveOrUpdateBlogPost(event);
        }
        setValidated(true);

    };
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

    const titlePage = <h2>{id != 'new' ? 'Edit BlogPost information' : 'New BlogPost'}</h2>;
    const action = <div>{id != 'new' ? 'Edit BlogPost' : 'Create BlogPost'}</div>;

    return (
        <>
            <PageWrapper
                headerConfig={{
                    button: "profile",
                    isFluid: true,
                    bgClass: "bg-default",
                    reveal: false,
                }}
            >
                <div
                    className="dashboard-main-container mt-24 mt-lg-31"
                    id="dashboard-body"
                >
                    <div className="container">
                        <div className="mb-15 mb-lg-23">
                            <div className="row">
                                <div className="col-xxxl-9 px-lg-13 px-6">
                                    <h5 className="font-size-6 font-weight-semibold mb-11">
                                        {titlePage}
                                    </h5>
                                    <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                                        {showError || showSuccess ?
                                            <Alert
                                                variant={showError ? 'danger' : showSuccess ? 'success' : 'info'}>
                                                {showError ? 'Save fail' : showSuccess ? 'Save success' : 'info'}
                                                <div className="d-flex justify-content-end">
                                                    <Button
                                                        onClick={() => {
                                                            setShowError(false);
                                                            setShowSuccess(false)
                                                        }}
                                                        variant={showError ? 'outline-danger' : showSuccess ? 'outline-success' : 'outline-info'}>
                                                        Close!
                                                    </Button>
                                                </div>
                                            </Alert>
                                            : null
                                        }
                                        <HStack spacing={30} paddingTop={10}>
                                            <FormControl id="name" width="50%">
                                                <FormLabel>
                                                    <h4>
                                                        Blog title
                                                    </h4>
                                                </FormLabel>
                                                <Input
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    value={title}
                                                    focusBorderColor="brand.blue"
                                                    type="text"
                                                    placeholder="IT DEV" />
                                            </FormControl>
                                            <FormControl width="50%">
                                                <FormLabel htmlFor='tag'>Category</FormLabel>
                                                <CreatableSelect
                                                    isValidNewOption={() => false}
                                                    maxMenuHeight={100}
                                                    isClearable={true}
                                                    isSearchable
                                                    onChange={(e) => { setCategoryId(e.value); setSelectedCategory(e) }}
                                                    value={selectedCategory ? selectedCategory : findCategory(categoryId)}
                                                    options={categoryList} />
                                            </FormControl>
                                        </HStack>
                                        <HStack spacing={30} paddingTop={10}>
                                            <FormControl id="avatar" className='blog-thumbnail'>
                                                <FormLabel>Thumbnail</FormLabel>
                                                <Cover url={thumbnail} borderRadius={"0%"} parentCallback={callbackFunction} />
                                            </FormControl>
                                        </HStack>
                                        <HStack spacing={30} paddingTop={10}>
                                            <FormControl id="content" className="blog-content" style={{ "marginTop": "2vh" }}>
                                                <FormLabel>
                                                    <h5>
                                                        Blog content
                                                    </h5>
                                                </FormLabel>
                                                <ReactQuill
                                                    ref={quillRef}
                                                    style={{ width: "100%", margin: "0px", maxWidth: "100%" }}
                                                    theme="snow"
                                                    onChange={(e) => setDescription(e)}
                                                    value={description}
                                                    modules={modules}
                                                    formats={formats}
                                                    placeholder="Write about your content ....."
                                                />
                                            </FormControl>
                                        </HStack>

                                        <FormControl >
                                            <HStack spacing={30} mt={6}>
                                                <FormControl width="100%">
                                                    <FormLabel htmlFor='tag'>Tag</FormLabel>
                                                    <CreatableSelect
                                                        isMulti
                                                        isClearable={true}
                                                        isSearchable
                                                        onChange={(e) => { setTags(stringTags(e)) }}
                                                        value={getTag(tags)}
                                                        options={tagList} />
                                                </FormControl>
                                            </HStack>
                                        </FormControl>
                                        <Button className='action-button btn-green' marginRight={"10vw"} colorScheme={'purple'} my={5} onClick={saveOrUpdateBlogPost}>{action}</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    )
};

export default Paragraph;