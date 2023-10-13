import { useState } from "react"
import axios from "axios"

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useResource = (baseUrl) => {
  const [values, setValues] = useState([])

  let token = null

  // not really being used since it's not relevant to the exercise
  const setToken = (newToken) => {
    token = newToken
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setValues(response.data)
    return values
  }

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    const createdObject = response.data
    setValues(values.concat(createdObject))
    return createdObject
  }

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    const updatedObject = response.data
    setValues(values.map(v => v.id == updatedObject.id ? updatedObject : v))
    return updatedObject
  }

  const service = {
    getAll,
    create,
    update,
    setToken
  }

  return [
    values,
    service,
  ]
}
