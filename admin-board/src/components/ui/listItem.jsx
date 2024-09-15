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
import SiteListDropDown from './siteSettingDropDown'

const ListItem = ({
  item,
  isEditting,
  isDeleting,
  handleDeleting,
  cancelDelete,
  sites,
  is_environment_related,
  onItemSiteUpdate,
}) => {
  const [editableItem, setEditableItem] = useState({
    template_id: item?.template_id || '',
    is_environment_related: is_environment_related || false,
    keyword: item?.keyword || '',
    description: item?.description || '',
    sites: sites || [],
  })
  const [isEditing, setIsEditing] = useState(isEditting)
  const [isItemSiteSettingOpen, setIsItemSiteSettingOpen] = useState(false)
  const [isItemSiteSelectedAll, setIsItemSiteSelectedAll] = useState(true)
  //
  const [itemSites, setItemSites] = useState(
    item.sites.map((site) => site.list_item_site.site_id),
  )

  const Sites = useSelector((state) => state.site.sites)
  const regions = [...new Set(Sites.map((site) => site.region))]
  const dispatch = useDispatch()

  useEffect(() => {
    setEditableItem((prevItem) => ({ ...prevItem, sites }))
  }, [sites])

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

  const handleItemSiteSettingOpen = () => {
    setIsItemSiteSettingOpen(true)
  }
  const handleItemSiteSettingClose = () => {
    setIsItemSiteSettingOpen(false)
  }

  const handleSelectAllItemSites = () => {
    // Determine if all sites should be selected or deselected
    const shouldSelectAll = !isItemSiteSelectedAll

    // Get all site IDs for current regions
    const allSiteIdsInRegion = Sites.filter((site) =>
      // Make sure to check the region of the site if needed
      sites.includes(site.site_id),
    ).map((site) => site.site_id)

    // Update state based on the action
    if (shouldSelectAll) {
      // Select all sites
      setItemSites(allSiteIdsInRegion)
      setEditableItem({ ...editableItem, sites: allSiteIdsInRegion })
    } else {
      // Deselect all sites
      setItemSites([])
      setEditableItem({ ...editableItem, sites: [] })
    }

    // Toggle the "select all" state
    setIsItemSiteSelectedAll(shouldSelectAll)
  }

  const handleItemSiteCheck = (e) => {
    const siteId = parseInt(e.target.value)

    if (itemSites.includes(siteId)) {
      setItemSites((prev) => prev.filter((id) => id !== siteId))
      setEditableItem((prev) => ({
        ...prev,
        sites: prev.sites.filter((id) => id !== siteId),
      }))
      if (onItemSiteUpdate) {
        onItemSiteUpdate(true, item.listitem_id)
      }
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

  if (error) return <Error text="Failed to update, refresh and try again" />

  return (
    <div
      className="bg-gray-100 p-4 rounded-lg text-lg hover:shadow-lg hover:-translate-y-1 transform duration-300"
      style={
        isEditing
          ? {
              border: '1px solid #A6D7F5',
              boxShadow:
                '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              transform: 'translateY(-1px)',
            }
          : {}
      }
    >
      {isEditing ? (
        <div className="flex flex-col gap-7 mb-2">
          <div className="flex gap-8 items-start">
            {/* Key word filed */}
            <div className="flex flex-col gap-4">
              <label className="text-lg font-bold uppercase">Key word</label>
              <input
                value={editableItem.keyword}
                onChange={handleChange}
                name="keyword"
                className="w-fit p-3 rounded-lg"
              />{' '}
            </div>
            {/* site-listitem button */}
            <div className="flex flex-col relative">
              <button
                className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500]  w-fit h-fit mb-3"
                onClick={handleItemSiteSettingOpen}
              >
                Site Visibilty To List Item
              </button>
              {/* site-list pop-up */}
              {isItemSiteSettingOpen && (
                // <div className="flex items-center justify-center flex-col h-fit  z-[100] text-sm">
                //   <div className="w-fit bg-white rounded-xl p-8 shadow-2xl ">
                //     <div className="flex justify-around items-center gap-7">
                //       <button
                //         className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500]  tracking-wider"
                //         onClick={handleItemSiteSettingClose}
                //       >
                //         Done
                //       </button>
                //     </div>
                //     <div className="flex gap-2 mt-3 items-center">
                //       <input
                //         type="checkbox"
                //         className="scale-[1.5]"
                //         checked={isItemSiteSelectedAll}
                //         onChange={handleSelectAllItemSites}
                //       />
                //       <label className="text-xl font-[500] text-b-mid-grey ">
                //         All
                //       </label>
                //     </div>
                //     {regions.map((region, index) => {
                //       // Filter sites for the current region and check if there are any sites
                //       const filteredSites = Sites.filter(
                //         (site) =>
                //           site.region === region &&
                //           sites.includes(site.site_id),
                //       )

                //       // Only render the region if there are filtered sites
                //       if (filteredSites.length > 0) {
                //         return (
                //           <div key={index} className="my-6">
                //             <h4 className="font-[500] uppercase text-lg text-b-mid-grey mb-1">
                //               {region}
                //             </h4>
                //             <div className="flex gap-6 flex-wrap">
                //               {filteredSites.map((site) => (
                //                 <div key={site.site_id} className="flex gap-2">
                //                   <input
                //                     type="checkbox"
                //                     value={site.site_id}
                //                     checked={itemSites.includes(site.site_id)}
                //                     onChange={handleItemSiteCheck}
                //                     className="scale-[1.5]"
                //                   />
                //                   <label className="text-xl capitalize">
                //                     {site.site_name}
                //                   </label>
                //                 </div>
                //               ))}
                //             </div>
                //           </div>
                //         )
                //       }

                //       // Return null if there are no sites for this region
                //       return null
                //     })}
                //   </div>
                // </div>
                <SiteListDropDown
                  isItemSiteSelectedAll={isItemSiteSelectedAll}
                  handleSelectAllItemSites={handleSelectAllItemSites}
                  itemSites={itemSites}
                  handleItemSiteCheck={handleItemSiteCheck}
                  handleItemSiteSettingClose={handleItemSiteSettingClose}
                  sites={sites}
                />
              )}
            </div>
          </div>
          {/* description */}
          <label className="text-lg font-bold uppercase">Description</label>
          <textarea
            value={editableItem.description}
            onChange={handleChange}
            name="description"
            className="w-full p-3 rounded-lg min-h-[3rem]"
          />
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
