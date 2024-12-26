import React, { useState } from "react";

const ClusteredIcons = ({ members }) => {
  // State to track hovered member
  const [hoveredMember, setHoveredMember] = useState(null);

  // Generate a dynamic color based on the index
  const generateColor = (index) => {
    const hue = (index * 137) % 360; // Ensure a spread of colors by using a prime multiplier
    return `hsl(${hue}, 50%, 30%)`; // Use 70% saturation and 50% lightness for vibrant colors
  };

  return (
    <div className="relative flex w-52 ml-2">
      {members.map((member, index) => (
        <div
          key={member._id}
          className={`absolute w-10 h-10 rounded-full border-2 border-white flex items-center justify-center cursor-pointer ${hoveredMember === member ? 'z-999' : null}`}
          style={{
            backgroundColor: generateColor(index), // Dynamically set background color
            left: `${index * 20}px`, // Slightly offset each circle to overlap
            zIndex: hoveredMember === member ? 999 : members.length - index, // Higher index appears on top
          }}
          onMouseEnter={() => setHoveredMember(member)} // Set hovered member
          onMouseLeave={() => setHoveredMember(null)} // Reset hovered member
        >
          <span className="text-sm block font-semibold text-white uppercase">
            {member.userId.username.slice(0, 2)}
          </span>

          {/* Display the card when hovering */}
          {hoveredMember === member && (
            <div
              className="absolute top-12 left-0 bg-white p-4 shadow-lg rounded-md"
              style={{ zIndex: 999 }}
            >
              <p className="text-sm font-semibold text-gray-800">
                {member.userId.username}
              </p>
              <p className="text-xs text-gray-600">{member.userId.email}</p>
              <p className="text-xs text-gray-500">Role: {member.role}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClusteredIcons;