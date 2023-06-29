import api from "../constants/api";

const token = localStorage.getItem('login');

const categoryService = {
    getAllCategory() {
        return api.get('api/admin/category', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    getCategoryById(data) {
        return api.get(`/admin/category/${data}`)
    },
    addCategory(data) {
        return api.post('/api/admin/add-category', data)
    },
    updateCategory(data) {
        return api.post('admin/category/update', data)
    },
    deleteCategory(categoryId) {
        return api.delete('admin/category/' + categoryId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    activeCategory(categoryId) {
        return api.put('api/admin/category/' + categoryId, { isActive: true },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    inActiveCategory(categoryId) {
        return api.put('api/admin/category/' + categoryId, { isActive: false },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },
}

export default categoryService