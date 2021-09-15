import { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import '../../styles/BodyTable.css';


function EditProfessional() {

  const { Option } = Select;
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
          <p className='form-sub-title'>Ingrese los datos del profesional </p>
          <div className='form-name-section'>
            <Form.Item
              rules={[{ required: true, message: 'Debe ingresar un nombre!' }]}
              className='form-title'
              label="Nombre"
            >
              <Input placeholder="Ejemplo: Nahuel" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Debe ingresar un apellido!' }]}
              className='form-title'
              label="Apellido">
              <Input placeholder="Ejemplo: Fernandez" />
            </Form.Item>
          </div>
          <Form.Item
            rules={[{ required: true, message: 'Debe ingresar un email!' }]}
            className='form-title form-title-email'
            requiredMark='true'
            label="Email">
            <Input placeholder="Ejemplo: nfernandez@gmail.com.ar" />
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
              placeholder="Elije al menos un idioma"
              onChange={() => console.log('+Idioma')}
              optionLabelProp="label"
            >
              {/* Realizar map del fetch de idiomas. */}
              <Option value="Español" label="Español">
                <div className="demo-option-label-item">
                  Español
                </div>
              </Option>
              <Option value="Ingles" label="Ingles">
                <div className="demo-option-label-item">
                  Ingles
                </div>
              </Option>
              <Option value="Portugues" label="Portugues">
                <div className="demo-option-label-item">
                  Portugues
                </div>
              </Option>
              <Option value="Koreano" label="Koreano">
                <div className="demo-option-label-item">
                  Koreano
                </div>
              </Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form>
      </Modal>
    </div >
  )
}

export default EditProfessional;
