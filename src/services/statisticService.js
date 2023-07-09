import api from '../constants/api'


const token = localStorage.getItem('login')

const statisticService = {

    getTotalRevenueByTime(time){
        if (!token)
            return null
        return api.post('/api/admin/invoice/total-revenue/get-by-time-frame', time,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getAllTransactions() {
        return api.get('/api/admin/invoice',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },
    
    getDataJoinLastWeek() {
        if (!token)
            return null
        return api.get('/api/admin/statistics/new-account/get-amount/6',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getApplicationAmount() {
        if (!token)
            return null
        return api.get('api/admin/admin/application/get-amount',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getJobAmount() {
        if (!token)
            return null
        return api.get('api/admin/job-post/get-amount',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getAmountAccount(id) {
        if (!token)
            return null
        return api.get('/api/admin/account/get-amount',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },
    getAmountCompany() {
        if (!token)
            return null
        return api.get('/api/admin/company',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },


}

export default statisticService