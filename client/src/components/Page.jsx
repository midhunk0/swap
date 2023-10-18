// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function Page() {
    const greenArray = [
        {
            id: 1,
            name: "text 1",
        },
        {
            id: 2,
            name: "text 2",
        },
        {
            id: 3,
            name: "text 3",
        },
        {
            id: 4,
            name: "text 4",
        },
    ];
    const redArray = [
        {
            id: 5,
            name: "text 5",
        },
        {
            id: 6,
            name: "text 6",
        },
        {
            id: 7,
            name: "text 7",
        },
        {
            id: 8,
            name: "text 8",
        },
  ];
  const [greenItems, setGreenItems] = useState(greenArray);
  const [redItems, setRedItems] = useState(redArray);
  const [greenInput, setGreenInput] = useState("");
  const [redInput, setRedInput] = useState("");

    const toRed = () => {
        const selectedItems = greenItems.filter((item) => item.isSelected);
        setGreenItems(greenItems.filter((item) => !item.isSelected));
        setRedItems([...redItems, ...selectedItems.map((item) => ({ ...item, isSelected: false }))]);
    };

    const toGreen = () => {
        const selectedItems = redItems.filter((item) => item.isSelected);
        setRedItems(redItems.filter((item) => !item.isSelected));
        setGreenItems([...greenItems, ...selectedItems.map((item) => ({ ...item, isSelected: false }))]);
    };

    const toggleSelection = (id, color) => {
        const updateItems = (items) =>
        items.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item));
        setGreenItems((prevItems) => (color === "green" ? updateItems(prevItems) : prevItems));
        setRedItems((prevItems) => (color === "red" ? updateItems(prevItems) : prevItems));
    };


    const handleGreenInput = () => {
        if(greenInput.trim() !== ""){
            const newGreenItem = {
                id: greenItems.length + 1,
                name: greenInput.trim()
            }
            setGreenItems([...greenItems, newGreenItem]);
            setGreenInput("");
        }
    }

    const handleRedInput = () => {
        if(redInput.trim() !== ""){
            const newRedItem = {
                id: greenItems.length + redItems.length + 1,
                name: redInput.trim()
            }
            setRedItems([...redItems, newRedItem]);
            setRedInput("");
        }
    }
  
    return (
        <div className="flex justify-between h-[calc(100vh-40px)] m-5 p-4 bg-gray-100 rounded-xl">
            <div className="flex flex-col gap-5 w-5/12 p-10 bg-green-300 rounded-lg">
                <ul className="text-xl">
                <div className="flex gap-5">
                    <input className="pl-2 rounded-lg focus:outline-none" type="text" placeholder="enter something..." value={greenInput} onChange={(e) => setGreenInput(e.target.value)}/>
                    <button className="bg-green-200 p-2 rounded-lg hover:bg-green-100" onClick={handleGreenInput}>Add</button>
                </div>
                {greenItems.map((greenItem) => (
                    <li className="flex m-1 gap-1 mt-5" key={greenItem.id} onClick={() => toggleSelection(greenItem.id, "green")}>
                        <input type="checkbox" checked={greenItem.isSelected} readOnly />
                        <h3>{greenItem.name}</h3>
                    </li>
                ))}
                </ul>
            </div>
            <div className="flex w-1/12 flex-col justify-center p-1 gap-10">
                <button onClick={toRed} className="flex justify-center bg-red-300 rounded-md py-2 px-6 hover:bg-red-400 active:bg-red-300">
                    <img className="w-10" src={"/assets/icons/right-arrow.png"} alt="right"/>
                </button>
                <button onClick={toGreen} className="flex justify-center bg-green-300 rounded-md py-2 px-6 hover:bg-green-400 active:bg-green-300">
                    <img className="w-10" src={"/assets/icons/left-arrow.png"} alt="left"/>
                </button>
            </div>
            <div className="flex flex-col gap-5 w-5/12 p-10 bg-red-300 rounded-lg">
                <div className="flex gap-5">
                    <input className="pl-2 rounded-lg focus:outline-none" type="text" placeholder="enter something..." value={redInput} onChange={(e) => setRedInput(e.target.value)}/>
                    <button className="bg-red-200 p-2 rounded-lg hover:bg-red-100" onClick={handleRedInput}>Add</button>
                </div>
                <ul className="text-xl">
                {redItems.map((redItem) => (
                    <li className="flex m-1 gap-1 mt-5" key={redItem.id} onClick={() => toggleSelection(redItem.id, "red")}>
                        <input type="checkbox" checked={redItem.isSelected} readOnly />
                        <h3>{redItem.name}</h3>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default Page;
