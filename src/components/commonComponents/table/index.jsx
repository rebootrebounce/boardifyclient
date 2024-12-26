import React from "react";
import { useNavigate } from "react-router-dom";

const Table = ({
  data,
  columns,
  onDelete,
  currentPage,
  totalPages,
  setCurrentPage,
  user,
}) => {
  const navigate = useNavigate();
  const handleNavigation = (project) => {
    navigate(`/board/${project._id}`, { state: { project }});
  };
  
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs border-b-2 border-slate-300">
          <tr>
            {columns?.map((col, index) => (
              <th key={index} className="px-4 py-3">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="border-b-2 border-slate-300">
          {data?.length > 0 ? (
            data.map((item) => (
              <tr
                key={item._id}
                className="bg-white text-black cursor-pointer"
              >
                {columns?.map((col, index) => (
                  <td key={index} className="px-4 py-4 hover:underline" onClick={() => handleNavigation(item)}>
                    {item[col.accessor]}
                  </td>
                ))}
                <td className="px-4 py-2">
                  <button
                    disabled={user._id !== item.owner._id}
                    onClick={() => onDelete(item._id)}
                    className={`bg-red-500 text-white cursor-pointer px-4 py-1 rounded shadow mr-2 ${
                      user._id === item.owner._id ? "hover:bg-red-600" : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns?.length + 1}
                className="text-center py-4 text-black"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 mb-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled = {true}
                className={`px-3 py-1 mx-1 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
