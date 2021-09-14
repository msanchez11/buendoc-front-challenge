import { Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


function DeleteProfessional() {

  function confirm(e) {
    console.log(e);
    message.success('Elemento eliminado.');
  }

  // function cancel(e) {
  //   console.log(e);
  //   message.error('No se pudo borrar.');
  // }

  return (
    <div>
      <Popconfirm
        placement="topRight"
        title="Esta seguro que quiere eliminar el registro?"
        onConfirm={confirm}
        //onCancel={cancel}
        okText="Si"
        cancelText="No"
      >
        <DeleteOutlined style={{ fontSize: '20px', color: 'var(--secondary-color)' }} />
      </Popconfirm>
    </div>
  )
}

export default DeleteProfessional;