import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ToggleButton from '../../components/ToggleButton';
import Paginate from '../../helpers/Paginate';
import categoryService from '../../services/categoryService';

const CategoryTable = () => {
    const [listCategory, setListCategory] = useState([]);
    const [listResult, setListResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listResult.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        categoryService.getAllCategory().then(response => {
            if (response.data.errCode == "403") {
            } else {
                setListCategory(response.data.data);
                setListResult(response.data.data);
            }
        }
        )
    }, []);

    const paginate = (pageNumber) => {
        console.log("pageNumber", pageNumber)
        setCurrentPage(pageNumber);
    };

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(invoces.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleDelete = (id) => {
        console.log(id)
        const confirmBox = window.confirm(
            "Do you really want to delete this Category?"
        )
        if (confirmBox === true) {
            categoryService.deleteCategory(id);
            setListCategory(listCategory.filter((item) => item.id !== id));
            setListResult(listResult.filter((item) => item.id !== id));
        }
    };

    const handleActive = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to active this Category?"
        )
        if (confirmBox === true) {
            categoryService.activeCategory(id);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listCategory[upd_obj].isActive = true;
            listResult[upd_obj].isActive = true;
            return true;
        } else {
            return false;
        }
    };

    const handleInActive = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to inactive this Category?"
        )
        if (confirmBox === true) {
            categoryService.inActiveCategory(id);
            let upd_obj = listResult.findIndex((obj => obj.id == id));
            listCategory[upd_obj].isActive = false;
            listResult[upd_obj].isActive = false;
            return true;
        } else {
            return false;
        }
    };

    const CategoryTableContent = currentPosts.map(category => {
        return <tr>
            <td>
                <Link to={'/blogs/categories/' + category.id} class="user-link" style={{ paddingLeft: '4%' }}>{category.id ? category.id : "ID haven't updated"}</Link>
            </td>
            <td>
                {category.name}
            </td>
            <td class="text-center">
                <ToggleButton onChange={state => state ? handleActive(category.id) : handleInActive(category.id)} defaultChecked={category.isActive} />
            </td>
            <td style={{ "width": "15%" }}>
                <a href={'/blogs/categories/' + category.id} class="table-link">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-crosshairs"></i>
                    </span>
                </a>
                <a href={'/blogs/categories/' + category.id} class="table-link">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-pencil-circle-outline"></i>
                    </span>
                </a>
                <a onClick={() => handleDelete(category.id)} class="table-link danger">
                    <span class="menu-icon" style={{ 'fontSize': '2.0rem' }}>
                        <i className="mdi mdi-delete-circle-outline"></i>
                    </span>
                </a>
            </td>
        </tr>
    })

    const [q, setQ] = useState("");

    useEffect(() => {
        setListResult(listCategory.filter((item) =>
            (item.name && item.name.indexOf(q) !== -1) || (item.id && item.id.indexOf(q) !== -1)
        ))
    }, [q]);

    return (
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Category Table</h4>

                    <ul className="navbar-nav w-100" style={{display: 'block ruby'}}>
                        <li className="nav-item w-80" style={{width: '75%'}}>
                            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                                <input type="text" className="form-control" placeholder="Search category name or ID" value={q} onChange={(e) => setQ(e.target.value)} />
                            </form>
                        </li>
                        <li className="nav-item w-20" style={{width: '5%'}}>
                            {/* <Link className="nav-link btn btn-success create-new-button no-caret"> + Create new category </Link> */}
                        </li>
                        <li className="nav-item w-20" style={{width: '20%'}}>
                            <Link className="nav-link btn btn-success create-new-button no-caret" to="/blogs/categories/new"> + Create new category </Link>
                        </li>
                    </ul>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th class="text-center">Status</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CategoryTableContent}
                            </tbody>
                        </table>
                    </div>
                    <Paginate
                        postsPerPage={postsPerPage}
                        totalPosts={listResult.length}
                        paginate={paginate}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        selectedPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default CategoryTable
