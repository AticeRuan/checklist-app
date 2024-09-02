import { Link } from 'react-router-dom'
import Archive from '../svg/archive'
import Delete from '../svg/delete'
import Edit from '../svg/edit'
import { Restore } from '../svg/restore'
import dateFormat, { masks } from 'dateformat'
import {
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} from '../../app/api/templateApi'
import { useDispatch } from 'react-redux'
import {
  updateTemplate as updateTemplateAction,
  deleteTemplate as deleteTemplateAction,
} from '../../app/features/template/templateSlice'

const Tile = ({
  item,
  createdAt,
  updatedAt,
  draft = false,
  archived = false,
}) => {
  const created_date = new Date(item.createdAt)
  const updated_date = new Date(item.updatedAt)

  masks.default = 'dd-mm-yyyy'
  createdAt = dateFormat(created_date, 'default')
  updatedAt = dateFormat(updated_date, 'default')

  const [updateTemplate] = useUpdateTemplateMutation()
  const [deleteTemplate] = useDeleteTemplateMutation()
  const dispatch = useDispatch()

  const handledArchive = async () => {
    try {
      // Call the RTK Query mutation to update the status to 'archived'
      await updateTemplate({ id: item.template_id, status: 'archived' })

      // Dispatch a Redux action to update the state
      dispatch(
        updateTemplateAction({
          id: item.template_id,
          status: 'archived',
        }),
      )
    } catch (err) {
      console.error('Failed to archive template:', err)
    }
  }

  const handledRestore = async () => {
    try {
      // Call the RTK Query mutation to update the status to 'published'
      await updateTemplate({ id: item.template_id, status: 'published' })

      // Dispatch a Redux action to update the state
      dispatch(
        updateTemplateAction({
          id: item.template_id,
          status: 'published',
        }),
      )
    } catch (err) {
      console.error('Failed to restore template:', err)
    }
  }

  const handleDelete = async () => {
    try {
      // Call the RTK Query mutation to delete the template
      await deleteTemplate(item.template_id)

      // Dispatch a Redux action to update the state
      dispatch(deleteTemplateAction(item.template_id))
    } catch (err) {
      console.error('Failed to delete template:', err)
    }
  }

  //   const isDraft = draft ? true : false
  //   const isArchived = archived ? true : false
  return (
    <div className="w-[11.8rem] h-[11.8rem] rounded-[1.25rem] bg-b-background-grey px-[1.25rem] py-[2.19rem] flex flex-col items-start shadow-lg justify-center gap-2 relative group whitespace-nowrap ">
      <h2 className="text-[1.25rem] font-[600] text-b-active-blue">
        {item.title}
      </h2>
      <p className="text-b-light-grey font-[400] text-[0.75rem]">
        Created at {createdAt}
      </p>
      <p className="text-b-light-grey font-[400] text-[0.75rem]">
        Last Updated at {updatedAt}
      </p>
      {draft && (
        <span className="absolute bg-b-dark-green text-white text-[1rem] py-[2px] top-0 right-0 w-[5rem] text-center rounded-bl-xl rounded-tr-xl capitalize font-bold">
          in draft{' '}
        </span>
      )}
      {archived ? (
        <div className="w-full h-full backdrop-blur-sm absolute top-0 left-0 rounded-[1.25rem] group-hover:flex items-center justify-center gap-8 hidden ">
          <button onClick={handledRestore}>
            <Restore />
          </button>
          <button onClick={handleDelete}>
            <Delete />
          </button>
        </div>
      ) : (
        <div className="w-full h-full backdrop-blur-sm absolute top-0 left-0 rounded-[1.25rem] group-hover:flex items-center justify-center gap-8 hidden ">
          <Link
            to={
              draft
                ? `/drafts/${item.template_id}`
                : `/update/${item.template_id}`
            }
          >
            <Edit />
          </Link>
          {draft ? (
            <button onClick={handleDelete}>
              <Delete />
            </button>
          ) : (
            <button onClick={handledArchive}>
              <Archive />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Tile
