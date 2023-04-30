import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import extraInfoService from '../../services/extraInfoService';
import { useToasts } from 'react-toast-notifications';
import { Form } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
const NewExtraInfoProfile = () => {


    const { addToast } = useToasts();
    const [extraInfoProfileData, setExtraInfoProfileData] = useState({});
    const [amountSkill, setAmountSkill] = useState(0);
    const [amountPosition, setAmountPosition] = useState(0);
    const [amountService, setAmountService] = useState(0);

    useEffect(() => {
        extraInfoService.getAllExtraInfoByType('skill').then(response => {
            if (response.data.errCode == "403") {

            } else {
                setAmountSkill(response.data.data.length);
            }
        }
        );
        extraInfoService.getAllExtraInfoByType('service').then(response => {
            if (response.data.errCode == "403") {

            } else {
                setAmountService(response.data.data.length);
            }
        }
        );
        extraInfoService.getAllExtraInfoByType('position').then(response => {
            if (response.data.errCode == "403") {

            } else {
                setAmountPosition(response.data.data.length);
            }
        }
        );
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await extraInfoService.createNewExtraInfo(extraInfoProfileData);
            if (res.data.errCode == "" || res.data.errCode == null) {
                addToast('Create extraInfo profile successfull', {
                    appearance: 'success',
                    autoDismiss: true,
                }),
                extraInfoService.getAllExtraInfoByType('skill').then(response => {
                    if (response.data.errCode == "403") {

                    } else {
                        setAmountSkill(response.data.data.length);
                    }
                }
                ),
                extraInfoService.getAllExtraInfoByType('service').then(response => {
                    if (response.data.errCode == "403") {

                    } else {
                        setAmountService(response.data.data.length);
                    }
                }
                ),
                extraInfoService.getAllExtraInfoByType('position').then(response => {
                    if (response.data.errCode == "403") {

                    } else {
                        setAmountPosition(response.data.data.length);
                    }
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

    const doughnutPieData = {
        datasets: [{
            data: [amountService, amountSkill, amountPosition],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Service',
            'Skill',
            'Position',
        ]
    };

    const doughnutPieOptions = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Extra Information</h4>
                        <form className="form-sample" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Group className="row">
                                        <label className="col-sm-1 col-form-label">Name</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" placeholder="Name" name="name"
                                                value={extraInfoProfileData.name} onChange={(event) => setExtraInfoProfileData({ ...extraInfoProfileData, [event.target.name]: event.target.value })} />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-2 col-form-label">Type</label>
                                        <div className="col-sm-9">
                                            <select className="form-control" name='type' value={extraInfoProfileData.type} onChange={(event) => setExtraInfoProfileData({ ...extraInfoProfileData, [event.target.name]: event.target.value })}>
                                                <option value='SERVICE'>Service</option>
                                                <option value='POSITION'>Position</option>
                                                <option value='SKILL'>Skill</option>
                                            </select>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row" name="active" onChange={(event) => setExtraInfoProfileData({ ...extraInfoProfileData, [event.target.name]: event.target.value })}>
                                        <label className="col-sm-2 col-form-label">Active</label>
                                        <div className="col-sm-3">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input"
                                                        value='true' name="active" id="active" defaultChecked={extraInfoProfileData.active} /> Active
                                                    <i className="input-helper"></i>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input"
                                                        value='false' name="active" id="inactive" defaultChecked={!extraInfoProfileData.active} /> Inactive
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
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Extra Info Chart</h4>
                        <Doughnut data={doughnutPieData} options={doughnutPieOptions} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewExtraInfoProfile
