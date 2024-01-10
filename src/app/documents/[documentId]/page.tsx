import React from 'react'

interface IProps {
    params : {
        documentId:string
    }
}

const page = ({params : {documentId}}:IProps) => {

  return (
    <div className='p-10 mt-20'>You&apos;re Looking For The Doc With Id : {documentId} </div>
  )
}

export default page