import React from 'react'
import { useSelector } from 'react-redux'
const SiteListDropDown = ({
  isItemSiteSelectedAll,
  handleSelectAllItemSites,
  itemSites,
  handleItemSiteCheck,
  handleItemSiteSettingClose,
  sites,
}) => {
  const Sites = useSelector((state) => state.site.sites)
  const regions = [...new Set(Sites?.map((site) => site.region))]

  return (
    <div className="flex items-center justify-center flex-col h-fit z-[100]">
      <div className="w-fit bg-white rounded-xl p-8 shadow-2xl">
        <div className="flex justify-around items-center gap-7">
          <h2 className="text-2xl tracking-wider font-bold text-b-active-blue uppercase">
            Set Site Visibility
          </h2>
          <button
            className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500] tracking-wider"
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
          <label className="text-xl font-[500] text-b-mid-grey">All</label>
        </div>
        {regions.map((region, index) => {
          const filteredSites = Sites.filter(
            (site) => site.region === region && sites.includes(site.site_id),
          )
          console.log('filteredSites', filteredSites)
          if (filteredSites.length > 0) {
            return (
              <div key={index} className="my-6">
                <h4 className="font-[500] uppercase text-lg text-b-mid-grey mb-1">
                  {region}
                </h4>
                <div className="flex gap-6 flex-wrap">
                  {filteredSites.map((item) => (
                    <div key={item.site_id} className="flex gap-2">
                      <input
                        type="checkbox"
                        value={item.site_id}
                        checked={itemSites.includes(item.site_id)}
                        onChange={handleItemSiteCheck}
                      />
                      <label className="text-lg text-b-mid-grey">
                        {item.site_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default SiteListDropDown
