import api from "../constants/api";

const token = localStorage.getItem('login');

const blogService = {
    uploadImageBlog(file) {
        return axios.post(API_BASE_URL + "/user/upload-blog-image", file, {
            headers: {
                "Content-Type": `multipart/form-data;`,
                'Authorization': `Bearer ${token}`
            }
        })
    },
    getAllBlog() {
        return api.get('api/common/blog-post', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    getCategoryById(data) {
        return api.get(`/admin/blog/${data}`)
    },
    addCategory(data) {
        return api.post('/api/admin/add-blog', data)
    },
    updateCategory(data) {
        return api.post('admin/blog/update', data)
    },
    deleteCategory(blogId) {
        return api.delete('admin/blog/' + blogId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    activeCategory(blogId) {
        return api.put('api/admin/blog/' + blogId, { isActive: true },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    inActiveCategory(blogId) {
        return api.put('api/admin/blog/' + blogId, { isActive: false },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },
}

export default blogService