import React, { useEffect, useState } from 'react'
import { unstable_createResource } from 'react-cache'

interface Props {
  props: string
}

const User: React.FC<Props> = ({ props }: Props) => {
  const [count, setCount] = useState(0)

  const resource = unstable_createResource(() => new Promise(resolve => setTimeout(resolve, 1000)))

  useEffect(() => {
    resource.read('dmo')
  }, [])

  return (
    <>
      <h1>Hello, World!</h1>
      <div>{props}</div>
      <button type="button" onClick={() => setCount(count + 1)}>
        {count}
      </button>
    </>
  )
}

export default User
