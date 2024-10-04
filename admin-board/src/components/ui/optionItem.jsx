import { useEffect, useState } from 'react'
import Edit from '../svg/edit'
import Delete from '../svg/delete'
import Save from '../svg/save'
import { useUpdateSiteMutation } from '../../app/api/siteApi'
import { Restore } from '../svg/restore'
import Popup from './popup'
import Loader from '../svg/loader'

const OptionItem = ({
  handleDelete = () => {},
  handleUpdate = () => {},
  keys = [],
  item,
  id_key,
  isUser = false,
  handleReset = () => {},
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const [editableItem, setEditableItem] = useState({ ...item })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (key, value) => {
    setEditableItem({ ...editableItem, [key]: value })
  }

  const handleUpdateClick = async () => {
    setLoading(true) // Start loading
    await handleUpdate(editableItem)
    setLoading(false) // End loading
  }

  const handleDeleteClick = async () => {
    setLoading(true) // Start loading
    await handleDelete(item[id_key])
    setLoading(false) // End loading
  }

  return (
    <div className="flex items-center border-t-2 w-full py-1 relative">
      {keys?.map((key) => (
        <div key={key} className="flex-1">
          {isEditing && key != 'user_name' ? (
            <input
              value={editableItem[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="text-xl text-b-active-blue font-[500]  border-2"
              required
              // type={key === 'duration' ? 'text' : 'number'}
            />
          ) : (
            <p className="text-xl capitalize font-[500] ">
              {editableItem[key]}
            </p>
          )}
        </div>
      ))}
      <div className="flex items-center gap-3 justify-start flex-1">
        {isEditing ? (
          <button
            disabled={loading}
            onClick={() => {
              setIsEditing(false)
              handleUpdateClick()
            }}
          >
            <Save width="30" />
          </button>
        ) : (
          <button onClick={handleEdit}>
            <Edit />
          </button>
        )}
        <button onClick={() => handleDeleteClick()}>
          <Delete />
        </button>
        {isUser && (
          <button onClick={() => handleReset(item[id_key])}>
            <Restore width="28" />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex text-b-mid-blue font-[500] gap-4 items-center justify-center text-lg absolute top-0 left-0 w-full backdrop-blur-sm h-full">
          <div className="animate-spin">
            <Loader />
          </div>
          <p>Processing</p>
        </div>
      )}
    </div>
  )
}

export default OptionItem
