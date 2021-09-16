import { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import '../../styles/BodyTable.css';
import { useQuery } from 'react-query';

const fetchLanguages = async () => {
  const res = await fetch('http://challenge.radlena.com/api/v1/languages/');
  return res.json();
}

function ModalEditProfessional({ isOpen, setIsOpen, currentUser }) {

  const { data, status } = useQuery('languages', fetchLanguages)
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };


  return (
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
        <p className='form-sub-title'>Ingrese los datos del profesional </p>
        <div className='form-name-section'>
          <Form.Item
            rules={[{ required: true, message: 'Debe ingresar un nombre!' }]}
            className='form-title'
            label="Nombre"
          >
            <Input placeholder="Ejemplo: Nahuel" value={currentUser.first_name} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Debe ingresar un apellido!' }]}
            className='form-title'
            label="Apellido">
            <Input placeholder="Ejemplo: Fernandez" value={currentUser.last_name} />
          </Form.Item>
        </div>
        <Form.Item
          rules={[{ required: true, message: 'Debe ingresar un email!' }]}
          className='form-title form-title-email'
          requiredMark='true'
          label="Email">
          <Input placeholder="Ejemplo: nfernandez@gmail.com.ar" value={currentUser.email} />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: 'Debe ingresar un idioma!' }]}
          className='form-title'
          label="Idiomas"
        >
          <p className='form-sub-title'>Estos idiomas seran utilizados para ponerte en contacto con pacientes que hablen el mismo idioma</p>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Elije un idioma"
            onChange={() => console.log('+Idioma')}
            optionLabelProp="label"
          >
            {status === 'loading' && (<h3>Cargando idiomas.</h3>)}
            {status === 'error' && (<h3>Error: No hay idiomas disponibles.</h3>)}
            {status === 'success' && (
              data.map(data => (
                <Option key={data.id} value={data.name} label={data.name} >
                  <div className="demo-option-label-item">
                    {data.name}
                  </div>
                </Option>
              ))
            )
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalEditProfessional;
