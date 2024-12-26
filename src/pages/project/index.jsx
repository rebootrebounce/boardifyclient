import React, { useEffect, useState } from "react";
import Table from "../../components/commonComponents/table";
import ProjectForm from "./ProjectForm";
import axiosInstance from "../../api/axiosInstance";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

const Projects = ({ itemsPerPage = 5 }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useUser()

  useEffect(() => { 
    projectsData()
  }, [])
  const projectsData = async () => {
    const res = await axiosInstance.get('/get-projects')
    const data = res.data.projects
    setData(data)
  }

  const columns = [
    { header: "ID", accessor: "_id" },
    { header: "Project Name", accessor: "name" },
    { header: "Key", accessor: "key" },
  ];

  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const currentData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    // try {
    //   const response = await axiosInstance.delete(`/project/${id}`)
    //   projectsData()
    //   toast.success(response.data.message)
    // } catch(error) {
    //   console.error(error)
    // }
    toast.warning(`Cannot delete this project ${id}`)
  };



  return (
    <div className="px-10 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-slate-600">Projects</h1>

      {/* Search Bar and Create Project Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-1/3"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
        >
          Create Project
        </button>
      </div>

      {/* Table Component */}
      <Table
        data={currentData}
        columns={columns}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        user={user}
      />

      {/* Modal for Creating Project */}
      {isModalOpen && <ProjectForm setIsModalOpen={setIsModalOpen} fetchFun={() => projectsData()}/>}
    </div>
  );
};

export default Projects;
