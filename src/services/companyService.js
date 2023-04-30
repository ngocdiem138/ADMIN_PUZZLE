import api from '../constants/api'

const token = localStorage.getItem('login')

const companyService = {
    
    getAllCompany(){
        return api.get('/api/admin/get-all-company',
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    getOneCompany(id){
        return api.get('/api/admin/get-one-company/'+id,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    deleteCompany(id){
        return api.get('/api/admin/delete-info-company/'+id,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },

    createCompany(data){
        return api.post('/api/admin/create-info-company', data,
        {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    },


    updateCompany(id, data){
        return api.put('/api/admin/update-info-company/' + id, data,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }})
    },


}

export default companyService