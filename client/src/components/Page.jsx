// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

function Page() {
    // Define initial items without "id" field
    const greenArray = JSON.parse(localStorage.getItem("greenItems")) || [];
    const redArray = JSON.parse(localStorage.getItem("redItems")) || [];

    // Use a single state for both green and red items
    const [items, setItems] = useState({
        green: greenArray,
        red: redArray,
    });

    // Use a single input state for both green and red
    const [input, setInput] = useState({
        green: "",
        red: "",
    });

    useEffect(() => {
        localStorage.setItem("greenItems", JSON.stringify(items.green));
        localStorage.setItem("redItems", JSON.stringify(items.red));
    }, [items]);

    const toOpposite = (color) => {
        const selectedItems = items[color].filter((item) => item.isSelected);
        setItems((prevItems) => ({
            ...prevItems,
            [color]: prevItems[color].filter((item) => !item.isSelected),
            [getOppositeColor(color)]: [
                ...prevItems[getOppositeColor(color)],
                ...selectedItems.map((item) => ({ ...item, isSelected: false })),
            ],
        }));
    };

    const toggleSelection = (color, index) => {
        setItems((prevItems) => ({
            ...prevItems,
            [color]: prevItems[color].map((item, i) =>
                i === index ? { ...item, isSelected: !item.isSelected } : item
            ),
        }));
    };

    const handleInput = (color, e) => {
        e.preventDefault();
        if (input[color].trim() !== "") {
            setItems((prevItems) => ({
                ...prevItems,
                [color]: [
                    ...prevItems[color],
                    { name: input[color].trim(), isSelected: false },
                ],
            }));
            setInput((prevInput) => ({ ...prevInput, [color]: "" }));
        }
    };

    const getOppositeColor = (color) => (color === "green" ? "red" : "green");

    return (
        <div className="flex justify-between h-[calc(100vh-40px)] m-5 p-4">
            {/* Green Column */}
            <div className="flex flex-col gap-5 w-5/12 p-10 bg-green-300 rounded-lg">
                <form className="flex gap-5" onSubmit={(e) => handleInput("green", e)}>
                    <input className="pl-2 rounded-lg focus:outline-none" type="text" placeholder="enter something..." value={input.green} onChange={(e) => setInput({ ...input, green: e.target.value })}/>
                    <button className="bg-green-200 p-2 rounded-lg hover:bg-green-100" type="submit" >Add</button>
                </form>
                <ul className="text-xl">
                    {items.green.map((greenItem, index) => (
                        <li className="flex m-1 gap-1 mt-5" key={index} onClick={() => toggleSelection("green", index)} >
                            <input type="checkbox" checked={greenItem.isSelected} readOnly />
                            <h3>{greenItem.name}</h3>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Middle Buttons */}
            <div className="flex w-1/12 flex-col justify-center p-1 gap-10">
                <button onClick={() => toOpposite("green")} className="flex justify-center bg-red-300 rounded-md py-2 px-6 hover:bg-red-400 active:bg-red-300" >
                    <img className="w-10" src={"/assets/icons/right-arrow.png"} alt="right" />
                </button>
                <button onClick={() => toOpposite("red")} className="flex justify-center bg-green-300 rounded-md py-2 px-6 hover:bg-green-400 active:bg-green-300" >
                    <img className="w-10" src={"/assets/icons/left-arrow.png"} alt="left" />
                </button>
            </div>

            {/* Red Column */}
            <div className="flex flex-col gap-5 w-5/12 p-10 bg-red-300 rounded-lg">
                <form className="flex gap-5" onSubmit={(e) => handleInput("red", e)}>
                    <input className="pl-2 rounded-lg focus:outline-none" type="text" placeholder="enter something..." value={input.red} onChange={(e) => setInput({ ...input, red: e.target.value })}/>
                    <button className="bg-red-200 p-2 rounded-lg hover:bg-red-100" type="submit">Add</button>
                </form>
                <ul className="text-xl">
                    {items.red.map((redItem, index) => (
                        <li className="flex m-1 gap-1 mt-5" key={index} onClick={() => toggleSelection("red", index)} >
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
