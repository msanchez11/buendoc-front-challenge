import { useState } from 'react';
import '../../styles/BodyTable.css';
import { Modal, Form, Input, Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

const fetchLanguages = async () => {
  const res = await fetch('http://challenge.radlena.com/api/v1/languages/');
  return res.json();
}

function ModalAddProfessional({ isOpen, handleCloseModal }) {

  const { data, status } = useQuery('languages', fetchLanguages)

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [proAvatar, setProAvatar] = useState(null);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [proEmail, setProEmail] = useState(null);

  const { Option } = Select;
  const props = {
    name: 'file',
    maxCount: 1,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} subido correctamente`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} ha fallado.`);
      }
    }
  }

  const handleOk = () => {

    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "profile_image": proAvatar,
        "first_name": firstName,
        "last_name": lastName,
        "email": proEmail,
        "is_active": true
      })
    };
    fetch('http://challenge.radlena.com/api/v1/professionals/', postOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));


    setConfirmLoading(true);
    setTimeout(() => {
      handleCloseModal();
      setConfirmLoading(false);
    }, 2000);
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
      onCancel={handleCancel}
      footer={null}
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

        <Upload accept='image/*' className='form-upload-wrapper' {...props}>
          <Button className='form-upload-img' icon={<UploadOutlined />}>Subir imagen de perfil</Button>
        </Upload>

        <Form.Item
          rules={[{ required: true, message: 'Debe ingresar un email!' }]}
          className='form-title form-title-email'
          label="Email">
          <Input onChange={e => setProEmail(e.target.value)} placeholder="Ejemplo: nfernandez@gmail.com.ar" />
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

    </Modal >
  )
}

export default ModalAddProfessional;