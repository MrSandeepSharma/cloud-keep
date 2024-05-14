import { useState } from "react";
import Input from "./Input";
import DetectOutsideClick from "../DetectOutsideClick";
import { IoSearchOutline } from "react-icons/io5";

function InputSearch({ className = "", data = [], dataType = "file", fileOpen = () => {}, ...rest }) {
    const [value, setValue] = useState("");
    const [showResults, setShowResults] = useState(false);

    function handleChange(e) {
        const newValue = e.target.value;
        setValue(newValue);
        setShowResults(!!newValue); // Shorter way to set showResults
    }

    return (
        <DetectOutsideClick onClick={() => setShowResults(false)}>
            <div className={`search__container ${className}`}>
                <Input
                    icon={<IoSearchOutline className="icon" />}
                    type="search"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setShowResults(true)}
                    {...rest}
                />
                {showResults && (
                    <ul>
                        {data
                            .filter(item =>
                                (dataType === "starred" || dataType === "bin" ? item[0][0][0].name : item[0].name)
                                .toLowerCase()
                                .includes(value.toLowerCase())
                            )
                            .map((item, index) => {
                                const itemName =
                                    dataType === "starred" || dataType === "bin"
                                        ? item[0][0][0].name
                                        : item[0].name;
                                const itemId = 
                                    dataType === "starred" || dataType === "bin"
                                    ? item[0][0][1]
                                    : item[1];
                                return (
                                    <li key={index} data-fileid={itemId} onClick={fileOpen}>
                                        {itemName}
                                    </li>
                                );
                            })}
                        {value &&
                            data
                                .filter(item =>
                                    (dataType === "starred" || dataType === "bin" ? item[0][0][0].name : item[0].name)
                                    .toLowerCase()
                                    .includes(value.toLowerCase())
                                )
                                .length === 0 && (
                                <li style={{ fontStyle: "italic" }}>No matching results</li>
                            )}
                    </ul>
                )}
            </div>
        </DetectOutsideClick>
    );
}

export default InputSearch;
