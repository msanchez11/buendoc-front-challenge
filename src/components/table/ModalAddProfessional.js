import { useState } from 'react';
import '../../styles/BodyTable.css';
import { Modal, Form, Input, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

const fetchLanguages = async () => {
  const res = await fetch('http://challenge.radlena.com/api/v1/languages/');
  return res.json();
}

function ModalAddProfessional({ isOpen, handleCloseModal }) {

  const { data, status } = useQuery('languages', fetchLanguages)
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [profileImage, setProfileImage] = useState({})
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [proEmail, setProEmail] = useState(null);
  const { Option } = Select;
  let formData = new FormData();
  let postReq = new XMLHttpRequest();

  function handleUpload({ fileList }) {
    setProfileImage(fileList[0].originFileObj)
  };

  const handleOk = (e) => {
    e.preventDefault();

    //Validacion de campos del Form

    formData.append("profile_image", profileImage);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", proEmail);

    postReq.open("POST", 'http://challenge.radlena.com/api/v1/professionals/', true);
    postReq.send(formData);

    setConfirmLoading(true);

    setTimeout(() => {
      handleCloseModal();
      setConfirmLoading(false);
    }, 2000);

    // POST OK message.succes Doctor Agregado.
    // POST BAD message.error Error en la carga.

  };

  const handleCancel = () => {
    handleCloseModal(false);
  };

  return (
    <Modal
      centered='true'
      width='700'
      title="Nuevo profesional:"
      visible={isOpen}
      onOk={handleOk}
      okText='Guardar'
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelText='Cancelar'
    >
      <Form
        className='form-wrapper'
        layout='vertical'
      >
        <p className='form-sub-title'>Ingrese los datos del profesional</p>
        <div className='form-name-section'>
          <Form.Item
            className='form-title'
            label="Nombre"
          >
            <Input onChange={e => setFirstName(e.target.value)} placeholder="Ejemplo: Nahuel" />
          </Form.Item>
          <Form.Item
            requiredMark='true'
            rules={[{ required: true, message: 'Debe ingresar un apellido!' }]}
            className='form-title'
            label="Apellido">
            <Input onChange={e => setLastName(e.target.value)} placeholder="Ejemplo: Fernandez" />
          </Form.Item>
        </div>

        <Upload
          accept='image/*'
          className='form-upload-wrapper'
          maxCount='1'
          beforeUpload={() => false}
          onChange={handleUpload}>
          <Button className='form-upload-img' icon={<UploadOutlined />}>Subir imagen de perfil</Button>
        </Upload>

        <Form.Item
          rules={[{ required: true, message: 'Debe ingresar un email!' }]}
          className='form-title form-title-email'
          label="Email">
          <Input onChange={e => setProEmail(e.target.value)} placeholder="Ejemplo: nfernandez@gmail.com.ar" />
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
    </Modal >
  )
}

export default ModalAddProfessional;