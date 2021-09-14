import { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import '../../styles/BodyTable.css';


function EditProfessional() {

  const [isOpen, setIsOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setIsOpen(false);
  };


  return (
    <div>

      <EditOutlined
        onClick={() => { setIsOpen(true) }}
        style={{ fontSize: '20px', color: 'var(--secondary-color)' }}
      />

      <Modal
        centered='true'
        width='700'
        title="Editar profesional:"
        visible={isOpen}
        okText={'Guardar'}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        cancelText={'Cancelar'}
        onCancel={handleCancel}
      >
        <Form
          className='form-wrapper'
          layout='vertical'
        >
          <Form.Item className='form-sub-title' label="Ingrese los datos del profesional" />
          <div className='form-name-section'>
            <Form.Item className='form-title' label="Nombre">
              <Input placeholder="Ejemplo: Nahuel" />
            </Form.Item>
            <Form.Item className='form-title' label="Apellido">
              <Input placeholder="Ejemplo: Fernandez" />
            </Form.Item>
          </div>

          <Form.Item className='form-title' label="Email">
            <Input placeholder="Ejemplo: nfernandez@gmail.com.ar" />
          </Form.Item>

          <Form.Item className='form-title' label="Idiomas">
            <Form.Item className='form-sub-title' label="Estos idiomas seran utilizados para ponerte en contacto con pacientes que hablen el mismo idioma" />
            <Input placeholder="Ejemplo: Russo" />
          </Form.Item>


        </Form>

      </Modal>

    </div >
  )
}

export default EditProfessional;
