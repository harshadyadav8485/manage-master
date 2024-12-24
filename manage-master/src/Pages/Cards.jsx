import { useState, useEffect } from "react";

export const Cards = () => {
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false,
  });
  const [selectAll, setSelectAll] = useState(false);
  const handelselectAll = (event) => {
    const { checked } = event.target;

    setSelectAll(checked);
    setCheckedItems({
      item1: checked,
      item2: checked,
      item3: checked,
    });

    // if (!checked) {
    //   setSelectAll(false);
    //   setCheckedItems({
    //     item1: false,
    //     item2: false,
    //     item3: false,
    //   });
    // }
  };

  useEffect(() => {
    const allChecked = Object.values(checkedItems).every((value) => value);
    setSelectAll(allChecked);
  }, [checkedItems]);

  const handelChange = (e) => {
    const { name, checked } = e.target;

    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));

    if (name === "item1" || name === "item2" || name === "item3") {
      if (!checked) {
        setSelectAll(false);
      }
    }
    if (name === "item1" || name === "item2" || name === "item3") {
      if (checked) {
        setSelectAll(true);
      }
    }
  };

  return (
    <>
      <div className="flex bg-gray-400 justify-between p-10">
        <div>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handelselectAll}
          />
          <label>select All</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="item1"
            checked={checkedItems.item1}
            onChange={handelChange}
          />
          <label>Item 1</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="item2"
            checked={checkedItems.item2}
            onChange={handelChange}
          />
          <label>Item 2</label>
        </div>{" "}
        <div>
          <input
            type="checkbox"
            name="item3"
            checked={checkedItems.item3}
            onChange={handelChange}
          />
          <label>Item 3</label>
        </div>
      </div>
      <p>Item 1 {checkedItems.item1 ? "checked" : "Unchecked"}</p>
      <p>Item 2 {checkedItems.item2 ? "checked" : "Unchecked"}</p>
      <p>Item 3 {checkedItems.item3 ? "checked" : "Unchecked"}</p>
    </>
  );
};
