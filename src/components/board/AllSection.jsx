import React from "react";
import { useUser } from "../../context/UserContext";
import TimeAgo from "./TimeAgo";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const AllSection = ({ commentData, editData }) => {
  const { user } = useUser();
  const userName = editData?.createdBy?.username
  return (
    <div className="mt-4 overflow-scroll h-56 overflow-x-hidden overflow-y-auto hide-scrollbar 
                            [&::-webkit-scrollbar]:w-1
                          [&::-webkit-scrollbar-track]:bg-gray-50
                          [&::-webkit-scrollbar-thumb]:bg-gray-100
                          dark:[&::-webkit-scrollbar-track]:bg-neutral-100
                          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
      {commentData?.slice().reverse().map((item) => {
        return (
          <div key={item.createdAt} className="py-2">
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
                <p className="text-sm ml-2 text-gray-600">
                  added a{" "}
                  <span className="text-slate-800 text-base font-medium">
                    Comment
                  </span>
                </p>
                <span className="ml-2 text-sm text-slate-600">
                  {TimeAgo(item.createdAt)}
                </span>
                <span className="uppercase text-xs p-0.5 font-medium ml-4 text-slate-700 bg-slate-300 rounded-sm">
                  Comments
                </span>
              </div>
            </div>
            <p className="flex items-center ml-16 text-sm">
              <MdOutlineArrowRightAlt />
              <span className="ml-2 text-sm text-slate-600 font-normal">{item.content}</span>
            </p>
          </div>
        );
      })}
      <div className="mt-2 flex items-center">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300 uppercase cursor-pointer">
            {userName ? userName.slice(0, 2) : user.username.slice(0,2)}
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="ml-2 text-md font-semibold text-slate-800">
            {userName || user.username}
          </span>
          <p className="text-sm ml-2 text-gray-600">
            created the{" "}
            <span className="text-slate-800 text-base font-medium">Issue</span>
          </p>
          <span className="ml-2 text-sm text-slate-600">
            {TimeAgo(editData.createdAt)}
          </span>
          <span className="uppercase text-xs p-0.5 font-medium ml-4 text-slate-700 bg-slate-300 rounded-sm">
            history
          </span>
        </div>
      </div>
    </div>
  );
};

export default AllSection;
