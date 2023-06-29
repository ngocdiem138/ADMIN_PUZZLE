import api from '../constants/api'


const token = localStorage.getItem('login')

const extraInfoService = {

    getAllExtraInfo() {
        if (!token)
            return null
        return api.get('api/admin/get-all-extra-info',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },
    getAllExtraInfoByType(type) {
        return api.get('api/common/get-all-extra-info-by-type?type=' + type,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    getOneExtraInfo(id) {
        if (!token)
            return null
        return api.get('api/admin/extra-info/' + id,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    createNewExtraInfo(data) {
        if (!token)
            return null
        return api.post('api/admin/extra-info', data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    updateExtraInfo(id, data) {
        return api.put('api/admin/extra-info/'+ id, data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    activeExtraInfo(id) {
        return api.put('api/admin/extra-info/'+ id, {isActive: true},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    inActiveExtraInfo(id) {
        return api.put('api/admin/extra-info/' + id, {isActive: false},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    deleteExtraInfo(id) {
        if (!token)
            return null
        return api.delete('api/admin/extra-info/' + id,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },



}

export default extraInfoService