import { createContext } from 'react'
import { Genre } from '../type'

const Genres: Genre[] = []

const GenreContext = createContext(Genres)

export default GenreContext
