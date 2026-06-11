import React from "react";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ name, image, category, price,  id }) => {

    const navigate = useNavigate();

    // console.log({
    //     id,
    //     name,
    //     image,
    //     category,
    //     price,
    //     promptDescription,
    //     promptData,
    // });

    const handleClick = (id) =>{
        navigate(`/prompt/${id}`);
    }

    return (
        <div className="card m-2 mb-7 min-w-56 bg-base-100 shadow-xl">
            <figure><img src={image} className="h-64 w-64" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name.substring(0,15)}</h2>
                <div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{category}</span>
                </div>
                <p>Credit:  {price}</p>
                <div className="card-actions justify-start">

                    <button type="button"
                    onClick={()=>handleClick(id)}
                     className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        View
                    </button>

                </div>
            </div>
        </div>
    );
};

export default HomeCard;