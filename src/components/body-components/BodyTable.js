import { Table, Space, Avatar, Spin, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import '../../styles/BodyTable.css'
import DeleteProfessional from './DeleteProfessional'
import EditProfessional from './EditProfessional'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function BodyTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <TableData />
    </QueryClientProvider>
  )
}

const fetchProfessionals = async () => {
  const res = await fetch('http://challenge.radlena.com/api/v1/professionals/');
  return res.json();
}


function TableData() {

  const { Column } = Table;
  const { data, status } = useQuery('languages', fetchProfessionals)

  console.log(data.results)

  return (
    <div className='table'>
      {status === 'loading' && (
        <Space className='table-loading-spin' size="large">
          <Spin size="large" />
        </Space>
      )}
      {status === 'error' && (
        <h1 className='table-fetch-error'>Error: No se pudieron cargar los profesionales.</h1>
      )
      }
      {
        status === 'success' && (
          <Table
            className='table'
            rowKey="uid"
            dataSource={data.results}
            onChange={() => console.log('Cambio en tabla')}
            pagination={{
              'style': { 'padding': '0 20px' },
              'current': 1,
              'pageSize': 8,
              'total': data.results.length,
              'onChange': function (page) {
                console.log('Pagina cambiada')
              }
            }}
          >
            <Column
              align='center'
              title=""
              dataIndex="profile_image"
              key="profile_image"
              render={() => (
                //<img className='table-avatar-item' src={data.results.profile_image} alt='Avatar' />
                //<Avatar size={30} icon={<UserOutlined />} />
                < Space size='small'>
                  <Image width={100} src={data.results.profile_image} alt='Avatar' />
                </Space>
              )
              }
            />
            <Column align='center' className='table-column' title="NOMBRE" dataIndex="first_name" key="first_name" />
            <Column align='center' className='table-column' title="APELLIDO" dataIndex="last_name" key="last_name" />
            <Column align='center' className='table-column' title="EMAIL" dataIndex="email" key="email" />
            <Column align='center' className='table-column' title="ID" dataIndex="id" key="id" />

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
    </div >
  )
}

export default BodyTable;