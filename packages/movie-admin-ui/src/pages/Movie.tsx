import React, { useContext, useState } from 'react'
import { Table } from 'antd'
import GenreContext from '../context/Genre'

const Movie: React.FC = () => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(false)
  const genres = useContext(GenreContext)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      search: true,
      render: (name: string) => name,
      width: '20%',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      // @ts-ignore·
      filters: genres.map((genre: { name: any; name_en: string }) => ({
        text: genre.name,
        value: genre.name_en.toLowerCase(),
      })),
      width: '20%',
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      width: '20%',
    },
    {
      title: 'Update Time',
      sort: true,
      dataIndex: 'updateTime',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
    },
  ]

  return (
    <Table
      columns={columns}
      rowKey={record => record}
      dataSource={data}
      pagination={pagination}
      loading={loading}
    />
  )
}

export default Movie
