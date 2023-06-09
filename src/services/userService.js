import api from "../constants/api";

const token = localStorage.getItem('login')

const userService = {
    getUser() {
        return api.get('/admin/user')
    },
    deleteUserById(id) {
        if (!token)
            return null
        return api.delete('/api/admin/delete-account/' + id,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },
    getUserById(data) {
        return api.get(`/admin/user/${data}`)
    },
    searchUser(data) {
        return api.get(`/admin/user/search?q=${data}`)
    },
    addUser(data) {
        return api.post('admin/user/add', data)
    },
    updateUser(data) {
        return api.post('admin/user/update', data)
    },
    deleteUser(data) {
        return api.delete('admin/user/delete', data)
    },
    activeUser(userId) {
        return api.put(`api/admin/account/${userId}`, { isActive: true }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },
    unActiveUser(userId) {
        return api.put(`api/admin/account/${userId}`, { isActive: false }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },
}

export default userService