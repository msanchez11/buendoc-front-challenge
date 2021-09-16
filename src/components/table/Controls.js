import '../../styles/Controls.css';
import { useState } from 'react';
import { Input, Button } from 'antd';
import ModalAddProfessional from './ModalAddProfessional';

const { Search } = Input;

function Controls({ setSearchFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  return (
    <div className='controls'>
      <Search className='search-btn' allowClear placeholder="Buscar por nombre" onSearch={setSearchFilter} />
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