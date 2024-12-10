export const AddDistrict = () => {
  return (
    <>
      <diV className="bg-white w-full m-4 p-4">
        <form>
          <div className="flex justify-between gap-5">
            <diV className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District Id
              </label>
              <input
                type="text"
                placeholder="Enter State Id"
                className="border-gray-600 block w-full px-4 py-2 border"
              />
            </diV>
            <diV className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District Name
              </label>
              <input
                type="text"
                placeholder="Enter State Name"
                className="border-gray-600 block w-full px-4 py-2 border"
              />
            </diV>
          </div>
          <div className="flex justify-between gap-5">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </form>
      </diV>
    </>
  );
};
