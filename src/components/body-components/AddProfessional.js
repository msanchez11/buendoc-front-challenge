import { useState } from 'react';
import '../../styles/BodyTable.css';
import { Modal, Form, Input, Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const fetchLanguages = async () => {
  const res = await fetch('http://challenge.radlena.com/api/v1/languages/');
  return res.json();
}

const queryClient = new QueryClient()

function AddProfessional() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchedLanguages />
    </QueryClientProvider>
  )
}

function FetchedLanguages() {

  const { Option } = Select;
  const [isOpen, setIsOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { data, status } = useQuery('languages', fetchLanguages)

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
      <Button
        className='add-professional-btn'
        onClick={() => { setIsOpen(true) }}
        size='large'
        type="primary">
        Nuevo Profesional
      </Button>

      <Modal
        centered='true'
        width='700'
        title="Nuevo profesional:"
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
              requiredMark='true'
              rules={[{ required: true, message: 'Debe ingresar un apellido!' }]}
              className='form-title'
              label="Apellido">
              <Input placeholder="Ejemplo: Fernandez" />
            </Form.Item>
          </div>


          <Upload accept='image/*' className='form-upload-wrapper' {...props}>
            <Button className='form-upload-img' icon={<UploadOutlined />}>Subir imagen de perfil</Button>
          </Upload>

          <Form.Item
            rules={[{ required: true, message: 'Debe ingresar un email!' }]}
            className='form-title form-title-email'
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
              {status === 'loading' && (<h3>Cargando idiomas.</h3>)}
              {status === 'error' && (<h3>Error: No hay idiomas disponibles.</h3>)}
              {status === 'success' && (
                data.map(data => (
                  <Option value={data.name} label={data.name}>
                    <div className="demo-option-label-item">
                      {data.name}
                    </div>
                  </Option>
                ))
              )
              }
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form>

      </Modal>
    </div>
  )
}

export default AddProfessional;