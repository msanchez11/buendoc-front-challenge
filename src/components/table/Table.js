import { useState } from 'react';
import { Table, Space, Spin, Image } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import '../../styles/BodyTable.css'
import DeleteProfessional from './DeleteProfessional'
import ModalEditProfessional from './ModalEditProfessional'
import { useQuery } from 'react-query'

const fetchProfessionals = async (key) => {
  const res = await fetch(`http://challenge.radlena.com/api/v1/professionals/?page=${key.queryKey[1]}`);
  return res.json();
}

function TableData() {
  const { Column } = Table;
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['professionals', page], fetchProfessionals);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  function setCurrentUser(id) {
    setIsOpen(true);
    setUserId(id);
  }

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
            rowKey="id"
            dataSource={data.results}
            pagination={{
              'style': { 'padding': '0 20px' },
              'current': page,
              'pageSize': 10,
              'total': data.count,
              'onChange': (page) => { setPage(page) }
            }}
          >
            <Column
              align='center'
              title=""
              dataIndex="profile_image"
              key="profile_image"
              render={(_, record) => (
                < Space size='small'>
                  <Image className='table-avatar-pro' src={record.profile_image} alt='Dr. Avatar' />
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
              render={(_, record) => (
                <Space size="large">
                  <EditOutlined onClick={() => { setCurrentUser(record.id) }} style={{ fontSize: '20px', color: 'var(--secondary-color)' }} />
                  <DeleteProfessional currentUser={data.results.find(user => record.id === user.id)} />
                </Space>
              )}
            />
          </Table >
        )
      }
      {isOpen && <ModalEditProfessional currentUser={data.results.find(user => userId === user.id)} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div >
  )
}

export default TableData;