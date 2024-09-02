import React from 'react'
import { useGetOneTemplateQuery } from '../app/api/templateApi'
import { useParams } from 'react-router-dom'
const Update = () => {
  const { id } = useParams()
  const { data: template, error, isLoading } = useGetOneTemplateQuery(id)

  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
      <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem]">
        Edit {template?.title}
      </h1>
    </div>
  )
}

export default Update
