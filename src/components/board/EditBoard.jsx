import React, { useCallback, useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import AllSection from "./AllSection";
import Comments from "./Comments";
import HistorySection from "./HistorySection";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Assignee from "./Assignee";

const EditBoard = ({ setToggleEdit, editData, keyid, fetchTask, data, statusType, membersData }) => {
  const task = editData._id;
  const [activity, setActivity] = useState("All");
  const [commentData, setCommentData] = useState([]);
  const [editDataItem, setEditDataItem] = useState({
    title: editData?.title || "",
    description: editData?.description || "",
    dueDate: editData?.dueDate || "",
    comment: "",
    assignedTo: editData.assignedTo || "",
    status: statusType.name || "",
    priority: editData?.priority || "",
  });
  const [editToggle, setEditToggle] = useState({
    title: false,
    priority: false,
  });
  useEffect(() => {
    fetchComments();
  }, [editData]);
  const handleCritical = async (name) => {
    setEditDataItem((prevTaskData) => ({
      ...prevTaskData,
      priority: name, // Update only the priority field
    }));
    try {
      const response = await axiosInstance.put(`/task/${editData._id}`, {
        priority: name,
      });
      const responseData = response.data.message;
      toast.success(responseData);
      fetchTask();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatus = async (name) => {
    setEditDataItem((prevTaskData) => ({
      ...prevTaskData,
      status: name, // Update only the priority field
    }));
    try {
      const response = await axiosInstance.put(`/task/${editData._id}`, {
        status: name,
      });
      const responseData = response.data.message;
      toast.success(responseData);
      fetchTask();
    } catch (error) {
      console.error(error);
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/comment-list", { task });
      const resData = response.data.comments;
      setCommentData(resData);
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDataItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDesc = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    try {
      const response = await axiosInstance.put(`/task/${editData._id}`, {
        [name]: editDataItem[name],
      });
      const responseData = response.data.message;
      toast.success(responseData);
      fetchTask();
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };
  return (
    <div>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-4xl p-6 rounded shadow-lg pb-6 relative">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              {/* <h2 className="text-xl font-semibold mr-4">{editData.title}</h2> */}
              <input
                type="text"
                name="title"
                className="hover:bg-gray-100 w-full outline-none text-2xl focus:outline-none px-2"
                placeholder="Add a description..."
                onChange={handleChange}
                onBlur={handleDesc}
                value={editDataItem.title}
              />
              
            </div>
            <button
              onClick={() => setToggleEdit(false)}
              className="text-gray-500 hover:text-gray-800  cursor-pointer pt-4 pl-4"
            >
              ✕
            </button>
          </div>
          <div>
            {/* Content Area */}
            <div className="pl-2">
              <h2 className="font-semibold text-slate-700">Description</h2>
              <textarea
                type="text"
                name="description"
                className="hover:bg-gray-100 w-1/2 outline-none focus:outline-none px-2 py-1 mt-2"
                placeholder="Add a description..."
                onChange={handleChange}
                onBlur={handleDesc}
                value={editDataItem.description}
              />
            </div>
            <div className="mt-8 font-semibold text-slate-600 pl-2">
              Activity
            </div>
            <div className="mt-2 pl-2">
              <span className="mr-2 text-center">Show:</span>
              <span
                className={`px-2 pb-0.5 mr-2 cursor-pointer bg-slate-200 font-medium rounded-sm text-center ${
                  activity === "All"
                    ? "bg-blue-200 text-blue-600"
                    : "bg-slate-200"
                }`}
                onClick={() => setActivity("All")}
              >
                All
              </span>
              <span
                className={`px-2 mr-2 pb-0.5 bg-slate-200 rounded-sm cursor-pointer font-medium ${
                  activity === "Comments"
                    ? "bg-blue-200 text-blue-600"
                    : "bg-slate-200"
                }`}
                onClick={() => setActivity("Comments")}
              >
                Comments
              </span>
            </div>
            {activity === "All" ? (
              <AllSection commentData={commentData} editData={editData}/>
            ) : activity === "Comments" ? (
              <Comments
                editData={editData}
                commentData={commentData}
                fetchComments={fetchComments}
              />
            ) : (
              <HistorySection />
            )}
            <div className="flex flex-col w-1/3 items-start justify-start absolute top-9 right-10">
              <div className="flex">
              <div className="flex cursor-pointer items-center uppercase bg-slate-100 hover:bg-slate-300 text-slate-700 px-3  rounded-sm" onClick={() =>
                  setEditToggle((prev) => ({
                    ...prev,
                    title: !editToggle.title,
                  }))
                }>
                {editDataItem.status}{" "}
                <span className="ml-1">
                  {/* <MdOutlineKeyboardArrowDown /> */}
                  {editToggle.title ? <FaAngleUp /> : <FaAngleDown />}
                </span>
                {editToggle.title ? (
                  <div className="absolute flex flex-col top-9 left-0 bg-slate-300 rounded-md shadow-lg  overflow-hidden w-20 z-999" style={{"z-index": "999"}}>
                    {data.map((items) => {

                      if(items.name !== editDataItem.status) {
                      return <span
                      key={items.name}
                      onClick={() => handleStatus(items.name)}  
                      className="bg-slate-100 p-2 hover:bg-slate-200 text-xs cursor-pointer uppercase text-gray-700 font-semibold transition-all text-center"
                    >
                      {items.name}
                    </span> 
                    }
                    })}
                    
                  </div>
                ) : null}
              </div>
              <div
                className="relative flex items-center hover:bg-blue-200 px-2 rounded-sm py-1 ml-2 cursor-pointer"
                style={{"z-index": "999"}}
                onClick={() =>
                  setEditToggle((prev) => ({
                    ...prev,
                    priority: !editToggle.priority,
                  }))
                }
              >
                <span
                  className={
                    {
                      low: "text-slate-400",
                      medium: "text-yellow-500",
                      high: "text-red-500",
                      default: "text-blue-500",
                    }[editDataItem.priority || "default"]
                  }
                >
                  <FaCheckSquare />
                </span>
                <span className="ml-2">
                  {keyid}
                  {editData.position}
                </span>
                <span className="pl-1">
                  {editToggle.priority ? <FaAngleUp /> : <FaAngleDown />}
                </span>
                {editToggle.priority ? (
                  <div className="absolute flex flex-col -bottom-28 left-0 bg-slate-300 rounded-md shadow-lg overflow-hidden z-999">
                    <span
                      onClick={() => handleCritical("low")}
                      className="bg-slate-100 p-2 hover:bg-slate-200 cursor-pointer text-gray-700 font-semibold text-sm transition-all text-center"
                    >
                      Low
                    </span>
                    <span
                      onClick={() => handleCritical("medium")}
                      className="bg-yellow-200 p-2 hover:bg-yellow-300 cursor-pointer text-yellow-800 font-semibold text-sm transition-all text-center"
                    >
                      Medium
                    </span>
                    <span
                      onClick={() => handleCritical("high")}
                      className="bg-red-500 p-2 hover:bg-red-600 cursor-pointer text-white font-semibold transition-all text-sm text-center"
                    >
                      High
                    </span>
                  </div>
                ) : null}
              </div>
              </div>
              <Assignee dueDate={editDataItem.dueDate} assigneeData={editDataItem.assignedTo} id={editData._id} fetch={() => fetchTask()} setEditDataItem={setEditDataItem} editData={editData} membersData={membersData}/> 
            </div>
            {/* Add other fields here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
