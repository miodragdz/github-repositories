import React, { Component } from 'react'
import { range } from '../utils/helpers'
import { LEFT_PAGE, RIGHT_PAGE } from '../utils/constants'

export class Pagination extends Component {
  getPageNumbers = () => {
    const { currentPage, maxPage } = this.props
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(maxPage - 1, currentPage + 2);

    let pages = range(startPage, endPage);

    const hasLeftSpill = startPage > 2;              //has hidden pages to the left
    const hasRightSpill = (maxPage - endPage) > 1;   //has hidden pages to the right
    const spillOffset = 7 - (pages.length + 1);      //number of hidden pages either to the left or to the right

    // handle: (1) < {5 6} [7] {8 9} (10)
    if (hasLeftSpill && !hasRightSpill) {
      const extraPages = range(startPage - spillOffset + 1, startPage - 1);
      pages = [LEFT_PAGE, ...extraPages, ...pages];
      return [1, ...pages, maxPage];
    }

    // handle: (1) {2 3} [4] {5 6} > (10)
    if (!hasLeftSpill && hasRightSpill) {
      const extraPages = range(endPage + 1, endPage + spillOffset - 1);
      pages = [...pages, ...extraPages, RIGHT_PAGE];
      return [1, ...pages, maxPage];
    }

    // handle: (1) < {4 5} [6] {7 8} > (10)
    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
    return [1, ...pages, maxPage];
  }
  
  render() {
    const { jumpToPage, currentPage, maxPage } = this.props
    const pages = this.getPageNumbers();
  
    return (
      <div className="pagination">
        {pages.map((page) => {
          if (page === LEFT_PAGE) return (
              <button key={page} className="prev page-numbers" aria-label="Previous" onClick={() => jumpToPage(currentPage-5) }>
                <span>&laquo;</span>
                <span>Previous</span>
              </button>
          );

          if (page === RIGHT_PAGE) return (
              <button key={page} className="next page-numbers" aria-label="Next" onClick={() => jumpToPage(currentPage+5) }>
                <span>Next</span>
                <span>&raquo;</span>             
              </button>
          );

          return (
            <button 
              key={page} 
              className={`page-numbers${ currentPage === page ? ' current' : ''}`}  
              onClick={ () => jumpToPage(Math.min(page, maxPage)) }
            >
              {page}
            </button>
          );
        })}
      </div>
    )
  }
}

export default Pagination
