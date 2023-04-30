import api from "../constants/api";

const bookService = {
    getBook(){
        return api.get('/book')
    },
    getBookById(data){
        return api.get(`/admin/book/${data}`)
    },
    searchBook(data){
        return api.get(`/admin/book/search?q=${data}`)
    },
    addBook(data){
        return api.post('admin/book/add', data)
    },
    updateBook(data){
        return api.post('admin/book/update', data)
    },
    deleteBook(data){
        return api.delete('admin/book/update', data)
    },
    activeBook(bookId){
        return api.put('admin/book/update', bookId)
    },
    unActiveBook(bookId){
        return api.put('admin/book/update', bookId)
    },
}

export default bookService