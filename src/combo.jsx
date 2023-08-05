import { useState } from "react";
import { Combobox } from "@headlessui/react";

function Combo(props ) {
  const [selectedItemState, setSelectedItem] = useState("");
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? props.items
      : props.items.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedItemState} onChange={(tex)=>{setSelectedItem(tex) ; props.inputHandler(tex)}}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <div className="w-full">
        <Combobox.Options>
          {filteredItems.map((item) => (
            <div className="p-1 border-b-2 border-l-2 border-r-2  border-blue-400 hover:cursor-pointer bg-white w-full">
              <Combobox.Option key={item} value={item}>
                {item}
              </Combobox.Option>
            </div>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
export default Combo;
