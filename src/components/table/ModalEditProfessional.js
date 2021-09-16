import { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import '../../styles/BodyTable.css';
import { useQuery } from 'react-query';

const fetchLanguages = async () => {
  const res = await fetch('http://challenge.radlena.com/api/v1/languages/');
  return res.json();
}
const fetchProfLang = async (key) => {
  const res = await fetch(`http://challenge.radlena.com/api/v1/professional-languages/?professional__id=${key.queryKey[1]}`);
  return res.json();
}

function ModalEditProfessional({ isOpen, setIsOpen, currentUser }) {
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data, status } = useQuery('languages', fetchLanguages);
  const { data: info, status: state } = useQuery(['prof-lang', currentUser.id], fetchProfLang);

  function getProfLanguages() {
    console.log(state, info);
    // Retornar null si no tiene idiomas (info === [])
    // Retirnar [idioma, idioma] si tiene idiomas (info === [{},{},...])
  }


  const handleOk = () => {
    // Hacer PATCH sobre /profesional para actualizar data del Dr
    // Haver POST sobre /professional-languages para insertar idiomas de un Dr x
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
            className='form-title'
            label="Nombre"
            rules={[
              {
                required: true,
                message: 'Please input your name',
              },
            ]}
          >
            <Input placeholder="Ejemplo: Nahuel" value={currentUser.first_name} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            className='form-title'
            label="Apellido">
            <Input placeholder="Ejemplo: Fernandez" value={currentUser.last_name} />
          </Form.Item>
        </div>
        <Form.Item
          rules={[{ required: true }]}
          className='form-title form-title-email'
          requiredMark='true'
          label="Email">
          <Input placeholder="Ejemplo: nfernandez@gmail.com.ar" value={currentUser.email} />
        </Form.Item>

        <Form.Item
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
            defaultValue={getProfLanguages()}
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
