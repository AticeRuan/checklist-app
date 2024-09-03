import { useEffect, useState } from 'react'
import Edit from '../svg/edit'
import Delete from '../svg/delete'
import Save from '../svg/save'
import { useUpdateSiteMutation } from '../../app/api/siteApi'

const OptionItem = ({
  handleDelete,
  handleUpdate = () => {},
  keys = [],
  item,
  id_key,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const [editableItem, setEditableItem] = useState({ ...item })

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (key, value) => {
    setEditableItem({ ...editableItem, [key]: value })
  }

  return (
    <div className="flex items-center border-t-2 w-full py-1">
      {keys?.map((key) => (
        <div key={key} className="flex-1">
          {isEditing ? (
            <input
              value={editableItem[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="text-xl text-b-active-blue font-[500]  border-2"
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
            onClick={() => {
              setIsEditing(false)
              handleUpdate(editableItem)
            }}
          >
            <Save width="30" />
          </button>
        ) : (
          <button onClick={handleEdit}>
            <Edit />
          </button>
        )}
        <button onClick={() => handleDelete(item[id_key])}>
          <Delete />
        </button>
      </div>
    </div>
  )
}

export default OptionItem
