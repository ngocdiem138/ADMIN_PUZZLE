import api from "../constants/api";

const categoryService = {
    getCategory(){
        return api.get('/admin/category')
    },
    getCategoryById(data){
        return api.get(`/admin/category/${data}`)
    },
    addCategory(data){
        return api.post('admin/category/add', data)
    },
    updateCategory(data){
        return api.post('admin/category/update', data)
    },
    deleteCategory(data){
        return api.delete('admin/category/update', data)
    }
}

export default categoryService