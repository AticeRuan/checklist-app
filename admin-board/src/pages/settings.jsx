import OptionGroup from '../components/ui/optionGroup'
import { useSelector, useDispatch } from 'react-redux'
//import site related actions and hooks
import {
  useUpdateSiteMutation,
  useDeleteSiteMutation,
  useAddSiteMutation,
} from '../app/api/siteApi'
import {
  updateSite as updateSiteAction,
  deleteSite as deleteSiteAction,
  addSite as addSiteAction,
} from '../app/features/site/siteSlice'
//import category related actions and hooks
import {
  updateCategory as updateCategoryAction,
  deleteCategory as deleteCategoryAction,
  addCategory as addCategoryAction,
} from '../app/features/category/categorySlice'
import {
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
} from '../app/api/categoryApi'
//import user related actions and hooks
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} from '../app/api/userApi'
import {
  addUser as addUserAction,
  deleteUser as deleteUserAction,
  updateUserRole as updateUserRoleAction,
} from '../app/features/user/userSlice'

//import ip address related actions and hooks
import {
  useAddIpAddressMutation,
  useDeleteIpAddressMutation,
  useUpdateIpAddressMutation,
} from '../app/api/ipAddress'
import {
  addIpAddress as addIpAddressAction,
  deleteIpAddress as deleteIpAddressAction,
  updateIpAddress as updateIpAddressAction,
} from '../app/features/ipAddress/ipAddressSlice'

const Settings = () => {
  const dispatch = useDispatch()

  //handle site settings logic
  const site = useSelector((state) => state.site.sites)
  const site_keys = ['site_name', 'region']
  const [updateSite] = useUpdateSiteMutation()
  const [deleteSite] = useDeleteSiteMutation()
  const [addSite] = useAddSiteMutation()

  const handleSiteUpdate = async (updatedItem) => {
    try {
      await updateSite({
        id: updatedItem.site_id,
        site_name: updatedItem.site_name,
        region: updatedItem.region,
      })
      dispatch(
        updateSiteAction({
          id: updatedItem.site_id,
          site_name: updatedItem.site_name,
          region: updatedItem.region,
        }),
      )
    } catch (error) {
      console.error('Error while updating site:', error)
    }
  }

  const handleSiteDelete = async (id) => {
    try {
      await deleteSite(id)
      dispatch(deleteSiteAction(id))
    } catch (error) {
      console.error('Error while deleting site:', error)
    }
  }

  const handleSiteCreate = async (newSite) => {
    try {
      const newItem = await addSite(newSite)
      dispatch(addSiteAction(newItem.data))
    } catch (error) {
      console.error('Error while adding site:', error)
    }
  }

  //handle user settings logic
  const users = useSelector((state) => state.user.users)
  const user_keys = ['user_name', 'role']
  const [addUser] = useAddUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUserRole] = useUpdateUserRoleMutation()

  const handleUserCreate = async (newUser) => {
    const password = '1234Abc!'
    const data = { ...newUser, password }

    try {
      const newItem = await addUser(data)

      dispatch(addUserAction(newItem.data))
    } catch (error) {
      console.error('Error while adding user:', error)
    }
  }

  const handleUserDelete = async (id) => {
    try {
      await deleteUser(id)
      dispatch(deleteUserAction(id))
    } catch (error) {
      console.error('Error while deleting user:', error)
    }
  }

  const handleUserRoleUpdate = async (updatedItem) => {
    try {
      await updateUserRole({
        id: updatedItem.user_id,
        role: updatedItem.role,
      })
      dispatch(
        updateUserRoleAction({
          id: updatedItem.user_id,
          role: updatedItem.role,
        }),
      )
    } catch (error) {
      console.error('Error while updating user role:', error)
    }
  }

  //handle category settings logic
  const categories = useSelector((state) => state.category.categories)
  const category_keys = ['name', 'duration']
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [addCategory] = useAddCategoryMutation()
  const handleCategoryUpdate = async (updatedItem) => {
    try {
      await updateCategory({
        id: updatedItem.category_id,
        category_name: updatedItem.category_name,
        duration: updatedItem.duration,
      })
      dispatch(
        updateCategoryAction({
          id: updatedItem.category_id,
          category_name: updatedItem.category_name,
          duration: updatedItem.duration,
        }),
      )
    } catch (error) {
      console.error('Error while updating category:', error)
    }
  }

  const handleCategoryDelete = async (id) => {
    try {
      if (id) {
        await deleteCategory(id)
      } else {
        console.error('Attempted to delete a category with an undefined ID')
      }

      dispatch(deleteCategoryAction(id))
    } catch (error) {
      console.error('Error while deleting category:', error)
    }
  }

  const handleCategoryCreate = async (newCategory) => {
    try {
      const newItem = await addCategory(newCategory)

      dispatch(addCategoryAction(newItem.data))
    } catch (error) {
      console.error('Error while adding category:', error)
    }
  }

  //handle ip address settings logic
  const ipAddresses = useSelector((state) => state.ipAddress.ipAddresses)
  const ip_keys = ['site_name', 'ip_address']
  const [addIpAddress] = useAddIpAddressMutation()
  const [deleteIpAddress] = useDeleteIpAddressMutation()
  const [updateIpAddress] = useUpdateIpAddressMutation()

  const handleIpAddressCreate = async (newIpAddress) => {
    try {
      const newItem = await addIpAddress(newIpAddress)
      dispatch(addIpAddressAction(newItem.data))
    } catch (error) {
      console.error('Error while adding ip address:', error)
    }
  }

  const handleIpAddressDelete = async (id) => {
    try {
      await deleteIpAddress(id)
      dispatch(deleteIpAddressAction(id))
    } catch (error) {
      console.error('Error while deleting ip address:', error)
    }
  }

  const handleIpAddressUpdate = async (updatedItem) => {
    try {
      await updateIpAddress({
        id: updatedItem.ip_address_id,
        ip_address: updatedItem.ip_address,
      })
      dispatch(
        updateIpAddressAction({
          id: updatedItem.ip_address_id,
          ip_address: updatedItem.ip_address,
          location: updatedItem.location,
        }),
      )
    } catch (error) {
      console.error('Error while updating ip address:', error)
    }
  }

  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
      <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem]">
        Settings
      </h1>
      <div className=" flex items-center flex-col gap-16 justify-center w-full ">
        <OptionGroup
          title="Sites"
          data={site}
          keys={site_keys}
          handleDelete={(id) => handleSiteDelete(id)}
          handleUpdate={(updatedItem) => handleSiteUpdate(updatedItem)}
          id_key="site_id"
          handleCreate={(newSite) => handleSiteCreate(newSite)}
        />
        <OptionGroup
          title="Users"
          data={users}
          keys={user_keys}
          handleDelete={(id) => handleUserDelete(id)}
          handleUpdate={(updatedItem) => handleUserRoleUpdate(updatedItem)}
          id_key="user_id"
          handleCreate={(newUser) => handleUserCreate(newUser)}
        />
        <OptionGroup
          title="Categories"
          data={categories}
          keys={category_keys}
          handleDelete={(id) => handleCategoryDelete(id)}
          handleUpdate={(updatedItem) => handleCategoryUpdate(updatedItem)}
          id_key="category_id"
          handleCreate={(newCategory) => handleCategoryCreate(newCategory)}
        />
        <OptionGroup
          title="IP Address Range"
          data={ipAddresses}
          keys={ip_keys}
          handleDelete={(id) => handleIpAddressDelete(id)}
          handleUpdate={(updatedItem) => handleIpAddressUpdate(updatedItem)}
          id_key="ip_address_id"
          handleCreate={(newIpAddress) => handleIpAddressCreate(newIpAddress)}
        />
      </div>
      <div className="w-screen h-screen flex items-center justify-center">
        Processing
      </div>
    </div>
  )
}

export default Settings
