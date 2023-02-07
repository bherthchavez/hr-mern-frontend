import React from 'react'

const Image = ({ data }) => {

  return (
    <>
          <img src={`data:image/jpeg;base64,${data}`} alt="uploaded" className="h-12 w-12 border rounded-full object-cover" />

    </>
  )
}

export default Image