import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import TimeAgo from "./TimeAgo";

const Comments = ({editData, commentData, fetchComments}) => {
  const { user } = useUser();
  const [createComment, setCreateComment] = useState("")
  const handleInput = (e) => {
    setCreateComment(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!createComment){
        toast.error('Enter some comments..')
    }
    const finalData = {
        content: createComment,
        task: editData._id,
        createdBy: user._id || user.id,
    }
    try{
        const response = await axiosInstance.post('/comment', finalData)
        fetchComments()
        setCreateComment("")
        toast.success(response.data.message)
    } catch(error){
        console.error(error)
        toast.error(error)
    }
  }
  return (
    <div className="mt-6 h-52 overflow-x-hidden overflow-y-auto hide-scrollbar 
                            [&::-webkit-scrollbar]:w-1
                          [&::-webkit-scrollbar-track]:bg-gray-50
                          [&::-webkit-scrollbar-thumb]:bg-gray-100
                          dark:[&::-webkit-scrollbar-track]:bg-neutral-100
                          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
      <div className="flex items-center">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300 uppercase cursor-pointer">
            {user.username.slice(0, 2)}
          </span>
        </div>
        <div className="w-full">
          <textarea
            type="text"
            value={createComment}
            className="hover:bg-gray-100 w-1/2 outline-none focus:outline-none px-2 py-1 ml-2"
            placeholder="Add a comment..."
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="mt-4 ml-14">
        <button className="mr-2 px-2 bg-blue-500 rounded-sm py-0.5 font-medium hover:bg-blue-600 text-slate-100" onClick={handleSubmit}>
          Save
        </button>
        <button className="mr-2 px-2 hover:bg-gray-200 rounded-sm font-medium py-0.5 text-slate-700">
          Cancel
        </button>
      </div>
      <div className="mt-6">
      {commentData?.slice().reverse().map((item) => {
        return (
          <div key={item.createdAt}>
            <div className="mt-2 flex items-center">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300 uppercase cursor-pointer">
                  {item.createdBy.username.slice(0, 2)}
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="ml-2 text-md font-semibold text-slate-800">
                  {item.createdBy.username}
                </span>
                <span className="ml-2 text-sm text-slate-600">
                  {TimeAgo(item.createdAt)}
                </span>
              </div>
            </div>
            <p className="flex items-center ml-16 text-sm">
              <span className="ml-2">{item.content}</span>
            </p>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Comments;
