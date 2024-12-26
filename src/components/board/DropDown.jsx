import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const DropDown = ({ membersData, id, fetch, setToggleDrop }) => {

  const handleChange = async (value) => {
    try {
      const response = await axiosInstance.put(`/task/${id}`, {
        assignedTo: value,
      });
      const responseData = response.data.message;
      fetch()
      toast.success(responseData);
      setToggleDrop(false)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="absolute top-6 w-full py-4 px-2 bg-white border cursor-pointer">
      {membersData.map((item) => {
        return (
            <div
            key={item._id}
            className="flex items-center mb-2 hover:bg-slate-400 py-2 px-1 rounded-sm bg-slate-100 hover:text-white capitalize group"
            onClick={() => handleChange(item._id)}
          >
            <span
              className="w-5 h-5 bg-slate-600 group-hover:bg-slate-100 group-hover:text-slate-600 rounded-full text-xs text-gray-100 flex items-center justify-center mr-2"
            >
              <FaUserLarge />
            </span>
            <span>{item.userId.username}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DropDown;
