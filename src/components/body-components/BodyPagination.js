import { Pagination } from 'antd';

function BodyPagination() {
  return (
    <div className="body-pagination_container">
      <Pagination defaultCurrent={1} total={50} />
    </div>
  )
};

export default BodyPagination;