import React from 'react'
import Edit from '../svg/edit'
import Save from '../svg/save'
import Delete from '../svg/delete'
import { useState } from 'react'
import { Tick } from '../svg/tick'
import Popup from './popup'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  useUpdateListItemMutation,
  useDeleteListItemMutation,
} from '../../app/api/listitemApi'
import {
  updateListitem as updateListItemAction,
  deleteListitem as deleteListItemAction,
} from '../../app/features/listitem/listitemSlice'

import Loading from './loading'
import Error from './error'
import Cancel from '../svg/cancel'

const ListItem = ({
  item,
  isEditting,
  isDeleting,
  handleDeleting,
  cancelDelete,
  sites,
  is_environment_related,
}) => {
  const [editableItem, setEditableItem] = useState({
    template_id: item?.template_id || '',
    is_environment_related: is_environment_related || false,
    keyword: item?.keyword || '',
    description: item?.description || '',
    sites: sites || [],
  })
  const [isEditing, setIsEditing] = useState(isEditting)
  const handleChange = (e) => {
    setEditableItem({ ...editableItem, [e.target.name]: e.target.value })
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  useEffect(() => {
    console.log('editableItem', editableItem)
    console.log('item on drop', item)
  }, [editableItem, item])

  useEffect(() => {
    setEditableItem((prevItem) => ({
      ...prevItem,
      sites: sites,
    }))
  }, [sites])

  const Sites = useSelector((state) => state.site.sites)
  const regions = [...new Set(Sites.map((site) => site.region))]
  const [isItemSiteSettingOpen, setIsItemSiteSettingOpen] = useState(false)
  const [isItemSiteSelectedAll, setIsItemSiteSelectedAll] = useState(false)
  const [itemSites, setItemSites] = useState([])
  const handleItemSiteSettingOpen = () => {
    setIsItemSiteSettingOpen(true)
  }
  const handleItemSiteSettingClose = () => {
    setIsItemSiteSettingOpen(false)
  }

  const handleSelectAllItemSites = () => {
    setIsItemSiteSelectedAll((prev) => !prev)
    if (!isItemSiteSelectedAll) {
      setItemSites([])
      setEditableItem({ ...editableItem, sites: [] })
    } else {
      setItemSites(Sites.map((site) => site.site_id))
      setEditableItem({
        ...editableItem,
        sites: Sites.map((site) => site.site_id),
      })
    }
  }

  const handleItemSiteCheck = (e) => {
    const siteId = parseInt(e.target.value)
    if (itemSites.includes(siteId)) {
      setItemSites((prev) => prev.filter((id) => id !== siteId))
      setEditableItem((prev) => ({
        ...prev,
        sites: prev.sites.filter((id) => id !== siteId),
      }))
    } else {
      setItemSites((prev) => [...prev, siteId])
      setEditableItem((prev) => ({
        ...prev,
        sites: [...prev.sites, siteId],
      }))
    }
  }

  const [updateListItem, { isLoading: updateLoading, error: updateError }] =
    useUpdateListItemMutation()
  const [deleteListItem, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteListItemMutation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (updateLoading || deleteLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [updateLoading, deleteLoading])

  useEffect(() => {
    if (updateError || deleteError) {
      setError(updateError || deleteError)
    }
  }, [updateError, deleteError])

  const dispatch = useDispatch()

  const handleUpdate = async () => {
    try {
      const payload = {
        id: item.listitem_id,
        ...editableItem,
      }
      const udpatedItem = await updateListItem(payload)
      dispatch(updateListItemAction(udpatedItem))
    } catch (error) {
      console.error('Error while updating list item:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteListItem(item.listitem_id)
      dispatch(deleteListItemAction(item.listitem_id))
    } catch (error) {
      console.error('Error while deleting list item:', error)
    }
  }

  if (isLoading) return <Loading text="Processing" />
  if (error) return <Error text="Failed to update, refresh and try again" />

  return (
    <div
      className="bg-gray-100 p-4 rounded-lg text-lg relative"
      style={{ border: isEditing ? '1px solid #A6D7F5' : '' }}
    >
      {isEditing ? (
        <div className="flex flex-col gap-7 mb-2">
          <div className="flex gap-8 items-end">
            <div className="flex flex-col gap-4">
              <label className="text-lg font-bold uppercase">Key word</label>
              <input
                value={editableItem.keyword}
                onChange={handleChange}
                name="keyword"
                className="w-fit p-3 rounded-lg"
              />{' '}
            </div>
            <button
              className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500]  w-fit h-fit mb-3"
              onClick={handleItemSiteSettingOpen}
            >
              Site Visibilty To List Item
            </button>
          </div>
          <label className="text-lg font-bold uppercase">Description</label>
          <textarea
            value={editableItem.description}
            onChange={handleChange}
            name="description"
            className="w-full p-3 rounded-lg min-h-[3rem]"
          />
          {isItemSiteSettingOpen && (
            <div className="w-screen min-h-screen absolute top-0 left-0 flex items-center justify-center flex-col h-fit backdrop-brightness-75 z-50">
              <div className="w-fit bg-white rounded-xl p-8 shadow-2xl ">
                <div className="flex justify-around items-center gap-7">
                  <h2 className="text-2xl tracking-wider font-bold text-b-active-blue uppercase">
                    Set Site Visibility
                  </h2>
                  <button
                    className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500]  tracking-wider"
                    onClick={handleItemSiteSettingClose}
                  >
                    Done
                  </button>
                </div>
                <div className="flex gap-2 mt-3 items-center">
                  <input
                    type="checkbox"
                    className="scale-[1.5]"
                    checked={isItemSiteSelectedAll}
                    onChange={handleSelectAllItemSites}
                  />
                  <label className="text-xl font-[500] text-b-mid-grey ">
                    All
                  </label>
                </div>
                {regions.map((region, index) => (
                  <div key={index} className="my-6 ">
                    <h4 className="font-[500] uppercase text-lg text-b-mid-grey mb-1">
                      {region}
                    </h4>
                    <div className=" flex gap-6 flex-wrap">
                      {Sites.filter((site) => site.region === region).map(
                        (site) => (
                          <div key={site.site_id} className="flex gap-2">
                            <input
                              type="checkbox"
                              value={site.site_id}
                              checked={itemSites.includes(site.site_id)}
                              onChange={handleItemSiteCheck}
                              className="scale-[1.5]"
                            />
                            <label className="text-xl capitalize">
                              {site.site_name}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <h3 className="font-semibold mb-2 capitalize">{item.keyword}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
        </>
      )}
      <div className="flex justify-end space-x-2">
        {isEditing ? (
          <button
            onClick={() => {
              setIsEditing(false)
              handleUpdate()
            }}
          >
            <Tick width="30" />
          </button>
        ) : (
          <button className="" onClick={handleEdit}>
            <Edit />
          </button>
        )}
        <button className="" onClick={handleDeleting}>
          <Delete />
        </button>
      </div>
      {isDeleting && (
        <div className="w-full h-full absolute top-0 left-0 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-5">
          <p className="text-xl font-[500]">Deleting item?</p>
          <div className="flex gap-4 items-center justify-center ">
            <button onClick={handleDelete}>
              <Tick />
            </button>
            <button onClick={cancelDelete}>
              <Cancel />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListItem
