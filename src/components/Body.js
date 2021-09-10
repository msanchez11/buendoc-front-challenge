import '../styles/Body.css';
import BodyHeader from './body-components/BodyHeader';
import BodyTable from './body-components/BodyTable';
import BodyPagination from './body-components/BodyPagination';

function Body() {
  return (
    <div className='body'>
      <div className='body_header'>
        <BodyHeader />
      </div>
      <div className="body_main">
        <div className="body_table_main">
          <BodyTable />
        </div>
        <div className="body_table_footer">
          <BodyPagination />
        </div>
      </div>
    </div>
  )
}

export default Body;