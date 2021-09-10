import '../../styles/BodyHeader.css';
import { Button, Input } from 'antd';

function BodyHeader() {

  const { Search } = Input;
  const onSearch = value => console.log(value);

  return (
    <div className='bodyHeader_main'>
      <Search className='search-btn' placeholder="Buscar por nombre" onSearch={onSearch} style={{ width: 400 }} />
      <Button className='add-professional-btn' size='large' type="primary">Nuevo Profesional</Button>
    </div>
  )
}

export default BodyHeader;