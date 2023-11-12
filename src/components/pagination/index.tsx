import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

interface PaginationProps {
  dataLength: number;
  changePage: (selectedItem: { selected: number }) => void;
  selectedPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  dataLength,
  changePage,
  selectedPage,
}) => {
  return (
    <div className="flex justify-center mt-12 mb-4 md:justify-end md:mx-6">
      <div className="join">
        <ReactPaginate
          previousLabel={"< Prev"}
          pageCount={Math.ceil(dataLength / 10)}
          onPageChange={changePage}
          breakLinkClassName="md:px-4 md:py-2 px-2 py-1 join-item btn btn-disabled bg-secondary rounded "
          breakLabel="..."
          containerClassName="flex justify-center mb-4 space-x-2"
          pageLinkClassName="md:px-4 md:py-2 px-2 py-1 bg-secondary join-item rounded"
          pageRangeDisplayed={1}
          previousLinkClassName="md:px-4 md:py-2 px-2 py-1 bg-primary join-item rounded text-white"
          renderOnZeroPageCount={null}
          nextLinkClassName="md:px-4 md:py-2 px-2 py-1 bg-primary text-white join-item rounded"
          forcePage={selectedPage}
          activeLinkClassName="md:px-4 md:py-2 px-2 py-1 bg-ternary "
          disabledLinkClassName="btn-disabled rounded bg-slate-200 hover:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  dataLength: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  selectedPage: PropTypes.number.isRequired,
};

export default Pagination;
