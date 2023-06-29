import api from '../constants/api'

const token = localStorage.getItem('login')

const companyService = {

    getAllCompany() {
        return api.get('/api/admin/company',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getOneCompany(id) {
        return api.get('/api/admin/company/' + id,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    deleteCompany(id) {
        return api.get('/api/admin/company/' + id,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    createCompany(data) {
        return api.post('/api/admin/company', data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    updateCompany(id, data) {
        return api.put('/api/admin/company/' + id, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    activeCompany(companyId) {
        const formData = new FormData();
        formData.append("isPublic", true);
        return api.put(`api/admin/company/${companyId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },
    unActiveCompany(companyId) {
        const formData = new FormData();
        formData.append("isPublic", false);
        return api.put(`api/admin/company/${companyId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },


}

export default companyService