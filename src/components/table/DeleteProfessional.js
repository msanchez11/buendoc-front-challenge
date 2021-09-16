import { Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function DeleteProfessional(currentUser) {

  function handleDelete() {
    fetch(`http://challenge.radlena.com/api/v1/professionals/${currentUser.currentUser.id}`, { method: 'DELETE' })
      .then(message.success('Elemento eliminado.'))
      .catch(err => message.error(err));
  }

  return (
    <Popconfirm
      placement="topRight"
      title="Esta seguro que quiere eliminar el registro?"
      onConfirm={handleDelete}
      okText="Si"
      cancelText="No"
    >
      <DeleteOutlined style={{ fontSize: '20px', color: 'var(--secondary-color)' }} />
    </Popconfirm>
  )
}

export default DeleteProfessional;