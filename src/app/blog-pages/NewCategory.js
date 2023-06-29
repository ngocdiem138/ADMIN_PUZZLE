import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import extraInfoService from '../../services/extraInfoService';
import { useToasts } from 'react-toast-notifications';
import { Form } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import categoryService from '../../services/categoryService';
const NewCategory = () => {

    const { addToast } = useToasts();
    const [categoryData, setCategoryData] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await categoryService.addCategory(categoryData);
            if (res.data.errCode == "" || res.data.errCode == null) {
                addToast('Create category successfull', {
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
            console.log(res);


        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Category Information</h4>
                        <form className="form-sample" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Group className="row">
                                        <label className="col-sm-1 col-form-label">Name</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" placeholder="Name" name="name"
                                                value={categoryData.name} onChange={(event) => setCategoryData({ ...categoryData, [event.target.name]: event.target.value })} />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row" name="active" onChange={(event) => setCategoryData({ ...categoryData, [event.target.name]: event.target.value })}>
                                        <label className="col-sm-2 col-form-label">Active</label>
                                        <div className="col-sm-3">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input"
                                                        value='true' name="active" id="active" defaultChecked={categoryData.active} /> Active
                                                    <i className="input-helper"></i>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input"
                                                        value='false' name="active" id="inactive" defaultChecked={!categoryData.active} /> Inactive
                                                    <i className="input-helper"></i>
                                                </label>
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div>
                                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type='submit'>Create Extra Information</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewCategory
