import { Table, Space, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import '../../styles/BodyTable.css'
import DeleteProfessional from './DeleteProfessional'
import EditProfessional from './EditProfessional'

function BodyTable() {

  const { Column } = Table;
  const data = [
    {
      key: '1',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '2',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '3',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '4',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '5',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '6',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '7',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '8',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '9',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '10',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '11',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
    {
      key: '12',
      name: 'Nicolas',
      surname: 'Fernandez',
      id: 1,
      email: 'nfernandez@buendoc.com.ar',
      createDate: '2020-10-22',
    },
  ];

  return (
    <Table
      className='table'
      rowKey="uid"
      dataSource={data}
      onChange={() => console.log('Cambio en tabla')}
      pagination={{
        'style': { 'padding': '0 20px' },
        'current': 1,
        'pageSize': 8,
        'total': data.length,
        'onChange': function (page) {
          console.log('Pagina cambiada')
        }
      }}
    >
      <Column
        align='right'
        title=""
        dataIndex="avatar"
        key="avatar"
        render={() => (
          <Space size='small'>
            <Avatar size={30} icon={<UserOutlined />} />
          </Space>
        )}
      />
      <Column align='center' className='table-column' title="NOMBRE" dataIndex="name" key="name" />
      <Column align='center' className='table-column' title="APELLIDO" dataIndex="surname" key="surname" />
      <Column align='center' className='table-column' title="EMAIL" dataIndex="email" key="email" />
      <Column align='center' className='table-column' title="ID" dataIndex="id" key="id" />
      <Column align='center' className='table-column' title="FECHA CREACION" dataIndex="createDate" key="createDate" />

      <Column
        align='center'
        title=""
        key="action"
        render={() => (
          <Space size="large">
            <EditProfessional />
            <DeleteProfessional />
          </Space>
        )}
      />
    </Table >
  )
}

export default BodyTable;