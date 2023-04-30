import React from 'react';

const Paginate = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage, selectedPage }) => {
   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <div className="pt-2">
         <nav aria-label="Page navigation example">
            <ul className="pagination pagination-hover-primary rounded-0 ml-n2">
               <li onClick={previousPage} className="page-item rounded-0 flex-all-center">
                  <a
                     className="page-link rounded-0 border-0 px-3active"
                     aria-label="Previous"
                  >
                     <i className="mdi mdi-skip-previous"></i>
                  </a>
               </li>
               {pageNumbers.map((number) => (
                  <li
                     key={number}
                     onClick={() => paginate(number)}
                     className="page-item rounded-0 flex-all-center"
                  >
                     <a
                        className="page-link border-0 font-size-4 font-weight-semibold px-3"
                        style={selectedPage==number?{color:"blue", fontWeight:"800"}:{color:"gray"}}
                     >
                        {number}
                     </a>

                  </li>
               ))}
               <li onClick={nextPage} className="page-item rounded-0 flex-all-center">
                  <a
                     className="page-link rounded-0 border-0 px-3"
                     aria-label="Next"
                  >
                     <i className="mdi mdi-skip-next"></i> 
                  </a>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default Paginate;