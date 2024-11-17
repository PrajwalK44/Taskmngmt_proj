import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Cards = ({ home, setInputdiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleCompleteTask = async (id) => {
    try {
      // Make the PUT request and capture the response
      const response = await axios.put(
        `http://localhost:8000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );

      alert(response.data.message);
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };
  const handleImportant = async (id) => {
    try {
      // Make the PUT request and capture the response
      const response = await axios.put(
        `http://localhost:8000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v2/delete-task/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputdiv("fixed");
    setUpdatedData({
      id: id,
      title: title,
      desc: desc,
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div className="bg-gray-700 rounded-xl p-4" key={items._id}>
            <h3 className="text-xl font-semibold"> {items.title}</h3>
            <p className="text-gray-300 my-2">{items.desc}</p>
            <div className="mt-4 flex items-center gap-4">
              <button
                className={`${
                  items.complete === false ? "bg-red-400" : "bg-green-800"
                }  p-2 rounded-xl w-3/6`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "Incomplete"}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl flex justify-around">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>
                <button
                  onClick={() =>
                    handleUpdate(items._id, items.title, items.desc)
                  }
                >
                  <FaEdit />
                </button>

                <button onClick={() => deleteTask(items._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="bg-gray-700 rounded-xl p-4 flex flex-col gap-4 justify-center items-center"
          onClick={() => setInputdiv("fixed")}
        >
          <div className="text-5xl hover:cursor-pointer">
            <CiCirclePlus />
          </div>
          <h2 className="text-2xl text-gray-300">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
