import React from "react";
import Cards from "../components/Home/Cards";
import { CiCirclePlus } from "react-icons/ci";
import InputData from "../components/Home/InputData";
import { useState, useEffect } from "react";
import axios from "axios";

const Alltasks = () => {
  const [Inputdiv, setInputdiv] = useState("hidden");
  const[Data, setData]=useState();
  const[UpdatedData, setUpdatedData]=useState({
    id:"",
    title:"",
    desc:""
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v2/get-all-tasks",
        {
          headers
        }
      );
      setData(response.data.data)
    };
    fetch();
  });
  return (
    <>
      <div>
        <div className="w-full flex justify-end p-4 ">
          <button onClick={()=>setInputdiv("fixed")}>
            <CiCirclePlus className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        {Data && (<Cards home={"true"} setInputdiv={setInputdiv} data={Data.tasks} setUpdatedData={setUpdatedData} />)}
      </div>
      <InputData Inputdiv={Inputdiv} setInputdiv={setInputdiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData}/>
    </>
  );
};

export default Alltasks;
