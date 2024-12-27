import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import EditBoard from "./EditBoard";
import ClusteredIcons from "./ClusteredIcons";
import ClusteredSmall from "./ClusteredSmall"
import { useUser } from "../../context/UserContext";
import DueDate from "./DueDate";

const InitialTask = {
  title: "",
  list: "",
  status: "",
  priority: "low",
  userId: "",
};

const Board = () => {
  const {user} = useUser()
  const { projectId } = useParams();
  const location = useLocation();
  const { project } = location.state || {};
  const [toggleTask, setToggleTask] = useState(false);
  const [toggleOpen, setToggleOpen] = useState({});
  const [toggleCritical, setToggleCritical] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [listData, setListData] = useState({
    name: "",
  });
  const [taskData, setTaskData] = useState(InitialTask);
  const [taskListData, setTaskListData] = useState([]);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState();
  const [priorityType, setPriorityType] = useState()
  useEffect(() => {
    const output = data?.reduce((acc, item) => {
      acc[item.name.toLowerCase()] = false;
      return acc;
    }, {});
    setToggleOpen(output || {});
  }, [data]);

  const handleEditTask = (taskEditData, name) => {
    setEditData(taskEditData);
    setPriorityType(name)
    setToggleEdit(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setListData({ name: value });
  };

  useEffect(() => {
    fetchList();
    fetchTask();
  }, []);

  const fetchList = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/listdata", {
        project: projectId,
      });
      setData(response.data.LisData);
    } catch (error) {
      toast.error(error);
    }
  }, [projectId]);

  const fetchTask = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/taskdata", {
        project: projectId,
      });
      setTaskListData(response.data.LisData || []);
    } catch (error) {
      toast.error(error);
    }
  }, [projectId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const finalData = {
      name: listData.name,
      board: projectId,
    };
    try {
      const response = await axiosInstance.post("/list", finalData);
      toast.success(response.data.message);
      setListData({ name: "" });
      setToggleTask(false);
      fetchList();
    } catch (error) {
      toast.error(error);
    }
  };
  const handleInput = (e) => {
    setTaskData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };
  const handleToggleOpen = (name, task) => {
    setToggleCritical(false);
    setTaskData(InitialTask);
    setToggleOpen((prevState) => {
      // Create a new object where all keys are set to false
      const allFalse = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Set only the clicked key to true
      return {
        ...allFalse,
        [name]: true,
      };
    });
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      status: name, // Update only the priority field
    }));
  };
  const handleToggleClose = (name) => {
    setTaskData(InitialTask);
    setToggleOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name], // Toggle the boolean value
    }));
  };

  const handleCritical = (name) => {
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      priority: name, // Update only the priority field
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, status, priority } = taskData;
    console.log(user, "user")

    const finalData = {
      title,
      list: projectId,
      status,
      priority,
      userId: user._id
    };
    try {
      if (!finalData.title || !finalData.status || !finalData.priority || !finalData.userId) {
        toast.error("TItle, List, Status & Priority are reqired ");
      }
      const response = await axiosInstance.post("/task", finalData);
      handleToggleClose(finalData.status);
      setToggleTask(false);
      setToggleCritical(false);
      setTaskData(InitialTask);
      
      fetchTask();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="px-8 py-6 bg-gray-50 min-h-screen overflow-hidden">
      {toggleEdit ? (
        <EditBoard
          setToggleEdit={setToggleEdit}
          editData={editData}
          keyid={project.key}
          fetchTask={fetchTask}
          membersData={project.members}
          data={data}
          statusType={priorityType}
        />
      ) : null}
      {/* Breadcrumb Navigation */}
      <nav className="text-sm mb-4 text-gray-600">
        <Link to="/projects" className="hover:underline text-blue-600">
          Projects
        </Link>{" "}
        / <span className="font-medium text-gray-800">{project.name}</span>
      </nav>

      {/* Board Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {project.name} Board
        </h1>
      </div>

      {/* Board Content */}
      <div className="rounded-lg h-full">
        <div className="text-xl font-semibold mb-4 text-gray-800 flex">
          <input
            type="search"
            className="px-2 py-1 border rounded-md focus:outline-none focus:ring-blue-500"
            placeholder="Search..."
          />{" "}
          <ClusteredIcons members={project.members} editData={editData}/>
        </div>

        {/* Scrollable Lists Section */}
        <div className="flex h-[calc(100vh-200px)] gap-4 overflow-auto p-4 bg-gray-100 rounded-md">
          {/* Lists Container */}
          {data?.map((item, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-64 h-full z-2 bg-white rounded-md shadow-md overflow-y-auto hide-scrollbar 
                            [&::-webkit-scrollbar]:w-0
                          [&::-webkit-scrollbar-track]:bg-gray-100
                          [&::-webkit-scrollbar-thumb]:bg-gray-300
                          dark:[&::-webkit-scrollbar-track]:bg-neutral-500
                          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-200"
            >
              <h3 className="text-md flex justify-between font-semibold text-gray-400 mb-2 shadow-sm bg-white sticky top-0 left-0 px-5 py-3 uppercase w-full">
                {item.name}
              </h3>
              <div className="text-sm text-gray-600 z-0">
                {taskListData?.map((task) => {
                  if (task.status === item.name) {
                    return (
                      <div
                        key={task._id}
                        // className="bg-yellow-50 m-2 p-2 group hover:bg-slate-200 cursor-pointer"
                        className={`${
                          {
                            low: "bg-slate-100",
                            medium: "bg-yellow-100",
                            high: "bg-red-100",
                            default: "bg-blue-100",
                          }[task.priority || "default"]
                        } m-2 p-2 group hover:bg-blue-200 cursor-pointer relative`}
                        onClick={() => handleEditTask(task, item)}
                      >
                        <span className="flex items-center text-sm font-semibold text-gray-600 uppercase">
                          {task.title}
                          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                            <FaEdit />
                          </span>
                        </span>
                        <div className="mt-1 ml-1 truncate">{task.description}</div>
                        <div className="flex items-center mt-2">
                          <span
                            className={
                              {
                                low: "text-slate-400",
                                medium: "text-yellow-500",
                                high: "text-red-500",
                                default: "text-blue-500",
                              }[task.priority || "default"]
                            }
                          >
                            <FaCheckSquare />
                          </span>
                          <span className="ml-2">
                            {project.key}
                            {task.position}
                          </span>
                          <span className="ml-4 text-xs font-semibold">{task.dueDate ? DueDate(task.dueDate) : "_ /_ /_ _"}<span className="uppercase">{" "}d/m/y</span></span>
                        </div>
                        {/* <span className="absolute right-2 bottom-0"><ClusteredIcons members={project.members} /></span> */}
                        {/* <ClusteredSma members={project.members} /> */}
                        <div className="relative"><span className="text-xs"></span><ClusteredSmall members={project.members} task={task}/></div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="flex items-center rounded-sm bg-gray-100 hover:bg-white cursor-pointer m-2">
                {toggleOpen[item?.name] ? (
                  <div className="w-full border-2 border-solid border-blue-500">
                    <span className="flex justify-between p-2">
                      <input
                        type="text"
                        placeholder="Task Name"
                        className="pl-2 w-full"
                        onChange={handleInput}
                        value={taskData.title}
                      />
                      <span
                        className="bg-red-500 text-center pb-1 px-2 text-white font-bold text-lg rounded-sm h-6"
                        value={item.name}
                        onClick={() => handleToggleClose(item.name)}
                      >
                        -
                      </span>
                    </span>
                    <span className="flex justify-between  py-4 hover:bg-gray-100 p-2">
                      <div
                        className="relative flex items-center hover:bg-slate-300 px-2 rounded-sm py-1"
                        onClick={() => setToggleCritical((prev) => !prev)}
                      >
                        <span
                          className={
                            {
                              low: "text-slate-400",
                              medium: "text-yellow-500",
                              high: "text-red-500",
                              default: "text-blue-500",
                            }[taskData.priority || "default"]
                          }
                        >
                          <FaCheckSquare />
                        </span>
                        <span className="pl-1">
                          {toggleCritical ? <FaAngleUp /> : <FaAngleDown />}
                        </span>
                        {toggleCritical ? (
                          <div className="absolute flex flex-col -bottom-28 left-0 bg-slate-300 rounded-md shadow-lg overflow-hidden">
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
                      <span className="bg-blue-600 px-2 rounded-sm">
                        <button
                          className="text-white font-semibold"
                          onClick={handleSubmit}
                        >
                          Create
                        </button>
                      </span>
                    </span>
                  </div>
                ) : (
                  <span
                    onClick={() => handleToggleOpen(item.name, item)}
                    className="pb-1 pl-1 w-full text-gray-100 hover:text-gray-400"
                  >
                    <span className="text-xl text-gray-300 font-bold pr-2 text-center">
                      +
                    </span>
                    <span className="font-semibold ">Create Task</span>
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Task Input Section */}
          <div className="w-52">
            {toggleTask ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={listData.name}
                  onChange={handleChange}
                  placeholder="Enter task name"
                  className="border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                />
                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                    onClick={handleCreate}
                  >
                    Add
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() => setToggleTask((prev) => !prev)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-blue-600 px-4 py-2 rounded-md text-xl cursor-pointer text-white font-bold hover:bg-blue-700"
                onClick={() => setToggleTask((prev) => !prev)}
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
