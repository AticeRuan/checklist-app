import React, { useEffect } from 'react'
import { useGetOneTemplateQuery } from '../app/api/templateApi'
import { useGetListItemsByTemplateIdQuery } from '../app/api/listitemApi'
import { useParams } from 'react-router-dom'
import Form from '../components/form'
import {
  getListitems,
  deleteListitem as deleteListItemAction,
  updateListitem as updateListItemAction,
  addListitem as addListItemAction,
} from '../app/features/listitem/listitemSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAddListItemMutation,
  useUpdateListItemMutation,
  useDeleteListItemMutation,
} from '../app/api/listitemApi'

import Loading from '../components/ui/loading'
import Error from '../components/ui/error'

const Update = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  //handle template crud logic
  const { data: template, error, isLoading } = useGetOneTemplateQuery(id)

  //handle listitem crud logic
  const { data: listitems } = useGetListItemsByTemplateIdQuery(id)

  useEffect(() => {
    if (listitems) {
      dispatch(getListitems(listitems))
    }
  }, [listitems, dispatch])

  if (isLoading)
    return (
      <div>
        <Loading text="Preparing..." />
      </div>
    )
  if (error)
    return (
      <div>
        <Error />
      </div>
    )

  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full 2xl:w-[80vw]">
      <div className="flex items-center justify-between my-[3.5rem] w-full pr-[3.5rem]">
        <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] ">
          Edit {template?.title}
        </h1>
      </div>
      <Form data={template} listitems={listitems} />
    </div>
  )
}

export default Update
