import React, { useState } from "react";
import accountService from "../services/accountService";
import { useToasts } from 'react-toast-notifications';

const ImgUpload = ({ onChange, src }) =>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
            <img htmlFor="photo-upload" src={src} />
        </div>
        <input id="photo-upload" type="file" onChange={onChange} />
    </label>

const Profile = ({ onSubmit, src }) =>
    <form onSubmit={onSubmit}>
        <div className="img-wrap" >
            <img htmlFor="photo-upload" src={src} />
        </div>
    </form>


const Edit = ({ onSubmit, children }) =>
    <div className="card">
        <form onSubmit={onSubmit}>
            {children}
        </form>
    </div>

const CardProfile = (url) => {

    const { addToast } = useToasts();
    const [state, setState] = useState({
        file: '',
        imagePreviewUrl: url.url ? url.url : 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
        active: 'edit'
    })

    const photoUpload = async (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setState({
                ...state,
                ["file"]: file,
                ["imagePreviewUrl"]: reader.result
            });
        }
        reader.readAsDataURL(file);
        sendData(file);
        // const res = await accountService.uploadUserAvatar(file);
        // if (res.data.errCode == "") {
        //     addToast('Update avatar successfull', {
        //         appearance: 'success',
        //         autoDismiss: true,
        //     })
        // }
        // else {
        //     addToast('Some error occur. Please try again', {
        //         appearance: 'danger',
        //         autoDismiss: false,
        //     })
        // }
    }
    const sendData = (file) => {
        if (url.parentCallback) {
            url.parentCallback(file);
        }
    }

    const handleSubmit = (e) => {
        let activeP = state.active === 'edit' ? 'profile' : 'edit';
        setState({
            ...state,
            [active]: activeP,
        })
        sendData();
    }

    const { imagePreviewUrl, active } = state;
    
    return (
        <div id='profile-card'>
            {(active === 'edit') ? (
                <Edit onSubmit={handleSubmit}>
                    <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
                </Edit>
            ) : (
                <Profile onSubmit={handleSubmit} src={imagePreviewUrl} />)}
        </div>
    )
}

export default CardProfile
