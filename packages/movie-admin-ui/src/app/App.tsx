import React, { useEffect, useState } from 'react'
import './App.less'
import AppRouter from './AppRouter'
import GenreContext from '../context/Genre'
import AppLoading from './AppLoading'
import { getGenres, sleep } from '../service/genre'
import { Genre } from '../type'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [genre, setGenre] = useState<Genre[]>([])
  const initAppData = async () => {
    setLoading(true)
    await sleep(100)
    setGenre(await getGenres())
    setLoading(false)
  }

  useEffect(() => {
    initAppData()
  }, [])

  const AdminApp = () => (
    <GenreContext.Provider value={genre}>
      <AppRouter />
    </GenreContext.Provider>
  )

  return loading ? <AppLoading /> : <AdminApp />
}

export default App
