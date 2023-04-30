import api from '../constants/api'

const token = localStorage.getItem('login')

const authService = {
    
    login(data){
        return api.post('/api/auth/login', data,
        {headers: {
            'Content-Type': 'application/json'
        }})
    },

    loginWithGoogle(data){
        return api.post('/api/auth/login', data,
        {headers: {
            "Access-Control-Allow-Origin": "*"
        }})
    },

    logout(){
        return api.get('/api/common/logout',
        {headers: {
            Authorization: `Bearer ${token}`
        }})
    },

    getProfile(){
        return api.get('/api/user/profile',
        {headers: {
            Authorization: `Bearer ${token}`
        }})
    },

    getForgotPass(email) {
        return api.get("/api/auth/forgot-password?email="+ email)
    },

    getResetPass(token, newPass) {
        return api.get("/api/auth/reset-password?token=" + token + "&newPassword=" + newPass)
    },

    changePassword(data){
        return api.post('/admin/auth/change-password', data)
    },

}

export default authService