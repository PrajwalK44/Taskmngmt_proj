import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ Inputdiv, setInputdiv, UpdatedData, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    setData({
      title: UpdatedData.title,
      desc: UpdatedData.desc,
    });
  }, [UpdatedData]);
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are requireed");
    } else {
      await axios.post(`http://localhost:8000/api/v2/create-task`, Data, {
        headers,
      });
      setData({ title: "", desc: "" });
      setInputdiv("hidden");
    }
  };
  const updateTask=async()=>{
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are requireed");
    } else {
      await axios.put(`http://localhost:8000/api/v2/update-task/${UpdatedData.id}`, Data, {
        headers,
      });
      setUpdatedData({
        id: "",
        title: "",
        desc: "",
      });
      setData({ title: "", desc: "" });
      setInputdiv("hidden");
    }
  }
  return (
    <>
      <div
        className={`${Inputdiv}  top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${Inputdiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div
            className="flex justify-end"
            onClick={() => {
              setInputdiv("hidden");
              setData({
                title: "",
                desc: "",
              });
              setUpdatedData({
                id: "",
                title: "",
                desc: "",
              });
            }}
          >
            <button className="text-2xl">
              <RxCross1 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder="Description.."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.desc}
            onChange={change}
          ></textarea>
          {UpdatedData.id==="" ? <button
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
            onClick={submitData}
          >
            Submit
          </button>
          : <button
          className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
          onClick={updateTask}
        >
          Update
        </button>
          }
          
          
        </div>
      </div>
    </>
  );
};

export default InputData;
