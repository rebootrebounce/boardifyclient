import React, { useCallback, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { CgProfile } from "react-icons/cg";
import { toast } from 'react-toastify';
import { IoIosSearch } from "react-icons/io";

const ProjectForm = ({ setIsModalOpen, fetchFun }) => {
  const [newProject, setNewProject] = useState({
    name: "",
    key: "",
    type: "",
    description: "",
    members: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };
  const handleMembersChange = (selectedMember) => {
    const remainingUser = users.filter(
      (user) => user._id !== selectedMember._id
    );
    setUsers(remainingUser);
    setNewProject((prev) => {
      const isMemberPresent = prev.members.some(
        (member) => member._id === selectedMember._id
      ); // Ensure comparison is using _id consistently
  
      if (isMemberPresent) {
        // If member exists, remove them
        return {
          ...prev,
          members: prev.members.filter(
            (member) => member._id !== selectedMember._id
          ),
        };
      } else {
        // Add the member to the members list
        return {
          ...prev,
          members: [...prev.members, selectedMember],
        };
      }
    });
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Function to fetch users
  const fetchUsers = async (query) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        "/user",
        { user: query },
        {
          withCredentials: true,
        }
      );
      setUsers(response.data.users);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setIsLoading(false);
    }
  };

  // Debounced version of fetchUsers
  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 2000), []);

  // Handle input change for search
  const handleInputSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== "") {
      debouncedFetchUsers(value);
    } else {
      setUsers([]); // Clear users if input is empty
    }
  };

  const handleCreateProject = async () => {
    if(!newProject.name){
      return toast.error("Project Name is Required.")
    }
    if(!newProject.key){
      return toast.error("Project key is Required.")
    }
    if(!newProject.type){
      return toast.error("Project type is Required.")
    }
    const finalData = {
      name:newProject.name,
      description: newProject.description,
      key: newProject.key,
      members: newProject.members.map((member) => {
        return {
          userId: member._id,
        };
      }),
    }
    try {
      const response = await axiosInstance.post('/project', finalData)
      toast.success(response?.data?.message)
      setIsModalOpen(false)
      fetchFun()
    } catch(error){
      toast.error(error)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
        <div className="relative z-0 w-full mb-5 group flex">
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={newProject.name}
            onChange={handleInputChange}
            className="block mr-2 py-2.5 px-0 w-full text-base items-baseline rounded-b focus:outline-none  border-b-2 border-slate-200"
          />
          <input
            type="text"
            name="key"
            placeholder="Project Key"
            value={newProject.key}
            onChange={handleInputChange}
            className="block ml-2 py-2.5 px-0 w-full text-base items-baseline rounded-b focus:outline-none  border-b-2 border-slate-200"
          />
        </div>
        <div className="relative z-0 w-full mb-5 group flex items-baseline rounded-b focus:outline-none  border-b-2 border-slate-200">
          <select
            name="type"
            value={newProject.type}
            onChange={handleInputChange}
            className="block mr-2 py-2.5 px-0 w-full text-base text-slate-400"
          >
            <option value="" disabled className="ml-6">
              Select Project Lead
            </option>
            <option value="Admin">Admin</option>
            <option value="Collaborator">Collaborator</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
        <div className="relative w-full flex items-baseline rounded-b focus:outline-none  border-b-2 border-slate-200 ">
          <span className="text-slate-400 mr-2">
          <IoIosSearch />
          </span>
          <input
            type="search"
            name="members"
            placeholder={"Search Members..."}
            value={searchTerm}
            onChange={handleInputSearchChange}
            className=" w-full outline-none text-base "
            // className="block py-2.5 px-0  w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {isLoading && (
            <p className="text-sm text-gray-900 mt-2">Loading...</p>
          )}
          <ul className="absolute left-0 mt-2 w-full shadow-lg bg-white z-10 max-h-40 overflow-y-auto">
            {users.map((user) => (
              <li
                key={user.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer z-50 text-gray-900 flex items-center justify-between"
                onClick={() => handleMembersChange(user)}
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    <CgProfile />
                  </span>
                  {user.username}
                </div>
                <button className="bg-green-600 px-2 rounded-sm text-white font-bold">
                  +
                </button>
              </li>
              // onClick={ handleMembersChange(user)}
            ))}
            {!isLoading && users.length === 0 && searchTerm && (
              <li className="px-4 py-2 text-gray-500">No results found.</li>
            )}
          </ul>
          {newProject?.members.map((user) => (
              <li
              key={user.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer z-50 bg-slate-300 text-gray-900 flex items-center justify-between"
              onClick={() => handleMembersChange(user)}
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <CgProfile />
                </span>
                {user.username}
              </div>
              <button className="bg-red-600 px-2 rounded-sm text-white font-bold">
                x
              </button>
            </li>
            ))}
        </div>
        <div className="mb-4">
          <textarea
            onChange={handleInputChange}
            id="message"
            name="description"
            rows="4"
            value={newProject.description}
            className="block ml-2 py-2.5 px-0 w-full text-base items-baseline rounded-b focus:outline-none  border-b-2 border-slate-200"
            placeholder="Add description..."
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProject}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
