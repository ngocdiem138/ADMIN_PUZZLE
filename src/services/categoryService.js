import api from "../constants/api";

const token = localStorage.getItem('login');

const categoryService = {
    getAllCategory() {
        return api.get('api/admin/get-all-category', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    getCategoryById(data) {
        return api.get(`/admin/category/${data}`)
    },
    addCategory(data) {
        return api.post('admin/category/add', data)
    },
    updateCategory(data) {
        return api.post('admin/category/update', data)
    },
    deleteCategory(data) {
        return api.delete('admin/category/update', data)
    }
}

export default categoryService