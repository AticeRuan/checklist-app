import Form from '../components/form'
import { useState, useEffect, useRef } from 'react'
import { useAddTemplateMutation } from '../app/api/templateApi'

import { useDispatch, useSelector } from 'react-redux'
import { addTemplate as addTemplateAction } from '../app/features/template/templateSlice'
import Loading from '../components/ui/loading'
import { useGetListItemsByTemplateIdQuery } from '../app/api/listitemApi'

const CreateNew = () => {
  const [addTemplate] = useAddTemplateMutation()

  const dispatch = useDispatch()
  const [templateToEdit, setTemplateToEdit] = useState({})
  const [loading, setLoading] = useState(true)
  const hasCreatedRef = useRef(false)

  const id = templateToEdit.template_id
  const { data: listitems } = useGetListItemsByTemplateIdQuery(id, {
    skip: id === undefined,
  })

  useEffect(() => {
    const createTemplate = async () => {
      if (hasCreatedRef.current) {
        return
      }

      try {
        const newTemplate = await addTemplate().unwrap()

        if (newTemplate.error) {
          console.error('Failed to add template:', newTemplate.error)
          return
        }

        if (newTemplate) {
          dispatch(addTemplateAction(newTemplate))
          setTemplateToEdit(newTemplate)
          hasCreatedRef.current = true
          setLoading(false) // Mark that the template has been created
        }
      } catch (err) {
        console.error('Failed to add template:', err)
        setLoading(false)
      }
    }

    createTemplate()
    return () => {
      hasCreatedRef.current = true
    }
  }, [addTemplate, dispatch])

  useEffect(() => {
    console.log(
      'templateToEdit at createNew page',
      templateToEdit,
      'typeof',
      typeof templateToEdit,
    )
  }, [templateToEdit])

  if (loading) {
    return <Loading text="Initializing new template" /> // Show loading indicator while creating template
  }

  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full 2xl:w-[80vw]">
      <div className="flex items-center justify-between my-[3.5rem] w-full pr-[3.5rem]">
        <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] ">
          Create New Template
        </h1>
      </div>

      <Form isCreateNew={true} data={templateToEdit} listitems={listitems} />
    </div>
  )
}

export default CreateNew
