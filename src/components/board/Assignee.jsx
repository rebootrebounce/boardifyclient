import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import DropDown from "./DropDown";
import { CiSquarePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
const Assignee = ({ dueDate, id, fetch, setEditDataItem, editData, membersData, assigneeData }) => {
  const date = new Date(dueDate);
  const formattedDate = date.toLocaleDateString("en-GB");
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setEditDataItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    try {
      const response = await axiosInstance.put(`/task/${id}`, {
        dueDate: value,
      });
      const responseData = response.data.message;
      toast.success(responseData);
      fetch();
    } catch (error) {
      console.error(error);
    }
  };
  const [toggleDrop, setToggleDrop] = useState(false)

  const handleDrop = () => {
    setToggleDrop(prev => !prev)
  }
  const assigneeName = membersData?.find((item) => {
    return item._id === assigneeData
  })
  return (
    <div className="border-2 w-full pl-4 py-8 mt-4">
      <div className="relative flex justify-between w-4/5 mb-2">
      {!editData.assignedTo ? <>
        <span>Assignee</span>
        <span className="flex items-center">
          <FaUserCircle />
          <span className="ml-1">Unassigned</span>

        </span></> : <><span>Assignee</span><span className="flex items-center"><FaUserCircle /><span className="ml-2 capitalize">{assigneeName.userId.username}</span></span></> }
        <button onClick={handleDrop}>{toggleDrop ? <span><CiCircleMinus /></span> : <span><CiSquarePlus /></span>}</button>
        {toggleDrop ? <DropDown setToggleDrop={setToggleDrop} membersData={membersData} id={id} fetch={() => fetch()}/> : null}
      </div>
      <hr />
      <div className="flex justify-between w-4/5 mt-4">
        <span>Reporter</span>
        <span className="flex items-center">
          <FaUserCircle />
          <span className="ml-1">{editData?.createdBy?.username}</span>
        </span>
      </div>
      <div>
        <div className="mt-6 flex items-baseline">
          Due Date:{" "}
          <p className="mx-2">{formattedDate === 'Invalid Date' ?  "select Due Date" : formattedDate}</p>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={handleChange}
            className="rounded-sm px-2 py-1 cursor-pointer border text-transparent focus:text-black w-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Assignee;
