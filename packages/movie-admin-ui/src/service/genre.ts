import request from '../utils/request'
import { Genre } from '../type'

export const getGenres = async (): Promise<Genre[]> => request.get('/genres')

export const sleep = async (time: number = 1000) =>
  new Promise(resolve => setTimeout(resolve, time))
