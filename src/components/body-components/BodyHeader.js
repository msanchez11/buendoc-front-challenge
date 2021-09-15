import '../../styles/BodyHeader.css';
import { Input } from 'antd';
import AddProfessional from './AddProfessional';

function BodyHeader() {

  const { Search } = Input;
  const onSearch = value => console.log(value);

  return (
    <div className='bodyHeader_main'>
      <Search className='search-btn' placeholder="Buscar por nombre" onSearch={onSearch} style={{ width: 400 }} />
      <AddProfessional />
    </div>
  )
}

export default BodyHeader;