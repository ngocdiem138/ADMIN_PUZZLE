import api from '../constants/api'


const token = localStorage.getItem('login');

const jobService = {

    getAllJob() {
        return api.get('api/admin/job-post',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    activeJob(id, value) {
        if (!token)
            return null
        return api.get(`api/admin/job-post/update-status/${id}?active=${value}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    updateCompanyStatus(id) {
        if (!token)
            return null
        return api.get(`api/admin/update-status-job-post/${id}?active=true`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

}

export default jobService