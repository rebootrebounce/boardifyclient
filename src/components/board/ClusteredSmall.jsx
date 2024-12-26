import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const ClusteredSmall = ({ members, task }) => {
  // State to track hovered member
  const [hoveredMember, setHoveredMember] = useState(null);
  const assignedData = members.find((item) => task.assignedTo === item._id)

  return (
    <div className="absolute bottom-6 right-9 flex">
      {/* {assignedMember.map((member, index) => ( ))} */}
      <div
          key={assignedData?._id}
          className={`absolute w-7 h-7 rounded-full border-2 bg-slate-500 border-white flex items-center justify-center cursor-pointer ${hoveredMember === members ? 'z-999' : null}`}
          
          onMouseEnter={() => setHoveredMember(members)} // Set hovered member
          onMouseLeave={() => setHoveredMember(null)} // Reset hovered member
        >
          <span className="text-xs block text-white uppercase">
            {/* {member.userId.username.slice(0, 2)} */}<FaUser />
          </span>

          {hoveredMember === members && (
            <div
              className="absolute top-8 right-0 bg-white p-4 shadow-lg rounded-md"
              style={{ zIndex: 999 }}
            >
              <p className="text-sm font-semibold text-gray-800">
                {members?.userId?.username}
              </p>
              <p className="text-xs text-gray-600">{assignedData?.userId?.email}</p>
              <p className="text-xs text-gray-500">Role: {assignedData?.role}</p>
            </div>
          )}
        </div>
    </div>
  );
};

export default ClusteredSmall;