import { useState } from "react";

const data = [
  {
    id: 1,
    name: "珍珠奶茶",
    descri: "香濃奶茶搭配QQ珍珠",
    price: 50,
    stock: 20,
  },
  {
    id: 2,
    name: "冬瓜檸檬",
    descri: "清新冬瓜配上新鮮檸檬",
    price: 45,
    stock: 18,
  },
  {
    id: 3,
    name: "翡翠檸檬	",
    descri: "綠茶與檸檬的完美結合",
    price: 55,
    stock: 34,
  },
  {
    id: 4,
    name: "四季春茶",
    descri: "香醇四季春茶，回甘無比	",
    price: 45,
    stock: 10,
  },
  {
    id: 5,
    name: "阿薩姆奶茶",
    descri: "阿薩姆紅茶搭配香醇鮮奶",
    price: 50,
    stock: 25,
  },
  {
    id: 6,
    name: "檸檬冰茶",
    descri: "檸檬與冰茶的清新組合",
    price: 45,
    stock: 20,
  },
  {
    id: 7,
    name: "芒果綠茶",
    descri: "芒果與綠茶的獨特風味	",
    price: 55,
    stock: 18,
  },
  {
    id: 8,
    name: "抹茶拿鐵",
    descri: "抹茶與鮮奶的絕配",
    price: 60,
    stock: 20,
  },
];

function DataTable() {
  const [menu, setMenu] = useState(data);
  const [count, setCount] = useState();
  const [editItem, setEditItem] = useState(null);
  // 判斷stocks是否為負值，改為 0
  const checkStock = (stocks) => {
    stocks.forEach((item) => {
      item.stock = item.stock < 0 ? 0 : item.stock;
    });
  };
  //庫存+1
  function handleOnClickAdd(item) {
    const newMenu = menu.map((newItem) => {
      return newItem.id === item.id
        ? { ...newItem, stock: newItem.stock + 1 }
        : newItem;
    });
    checkStock(newMenu);
    setMenu(newMenu);
  }
  //庫存-1
  function handleOnClickMin(item) {
    const newMenu = menu.map((newItem) => {
      return newItem.id === item.id
        ? { ...newItem, stock: newItem.stock - 1 }
        : newItem;
    });
    checkStock(newMenu);
    setMenu(newMenu);
  }

  //編輯
  function hanldEditClick(itemId) {
    setEditItem(itemId);
  }
  //儲存
  function handleSaveClick() {
    setEditItem(null);
  }
  //更新item名稱
  function handleNameEdit(item, newName) {
    const newMenu = menu.map((newItem) =>
      newItem.id === item.id ? { ...newItem, name: newName } : newItem
    );
    setMenu(newMenu);
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">編輯</th>
            <th scope="col">品項</th>
            <th scope="col">描述</th>
            <th scope="col">價格</th>
            <th scope="col">庫存</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item) => (
            <tr key={item.id}>
              {/* 編輯按鈕 */}
              <td>
                {editItem === item.id ? (
                  <button onClick={handleSaveClick}>save</button>
                ) : (
                  //不在編輯中,顯示編輯按鈕
                  <button onClick={() => hanldEditClick(item.id)}>Edit</button>
                )}
              </td>
              {/* {名稱} */}
              <td>
                {editItem === item.id ? (
                  //正在編輯中顯示編緝的輸入框
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleNameEdit(item, e.target.value)}
                  />
                ) : (
                  //不在編輯中 顯示初始值
                  item.name
                )}
              </td>
              <td>{item.descri}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleOnClickMin(item)}>-</button>
                {item.stock}
                <button onClick={() => handleOnClickAdd(item)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
