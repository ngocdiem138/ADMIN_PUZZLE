import api from '../constants/api'


const token = localStorage.getItem('login')

const statisticService = {

    getTotalRevenueByTime(time){
        if (!token)
            return null
        return api.post('/api/admin/get-total-revenue-by-time-frame', time,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getAllTransactions() {
        return api.get('/api/admin/get-all-invoice',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },
    
    getDataJoinLastWeek() {
        if (!token)
            return null
        return api.get('/api/admin/get-data-join-account-in-last-num-week/6',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getApplicationAmount() {
        if (!token)
            return null
        return api.get('api/admin/get-application-amount',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getJobAmount() {
        if (!token)
            return null
        return api.get('api/admin/get-job-post-amount',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getAmountAccount(id) {
        if (!token)
            return null
        return api.get('/api/admin/get-account-amount',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },
    getAmountCompany() {
        if (!token)
            return null
        return api.get('/api/admin/get-all-company',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },


}

export default statisticService