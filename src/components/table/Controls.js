import '../../styles/Controls.css';
import { useState } from 'react';
import { Input, Button } from 'antd';
import ModalAddProfessional from './ModalAddProfessional';

const { Search } = Input;

function Controls() {
  const [isOpen, setIsOpen] = useState(false);

  const onSearch = value => console.log(value);

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  return (
    <div className='controls'>
      <Search className='search-btn' placeholder="Buscar por nombre" onSearch={onSearch} />
      <Button
        className='add-professional-btn'
        onClick={handleOpenModal}
        size='large'
        type="primary">
        Nuevo Profesional
      </Button>
      {isOpen && <ModalAddProfessional isOpen={isOpen} handleCloseModal={handleCloseModal} />}
    </div>
  )
}

export default Controls;