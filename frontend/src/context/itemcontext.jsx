import { createContext, useState } from "react";

export const itemcontext = createContext(null);
export const itemscount = createContext(null);

const ItemProvider = ({ children }) => {
  const [cartitems, setCartitems] = useState([]);
  const [itemcount, setItemcount] = useState([]);

  return (
    <itemcontext.Provider value={{ cartitems, setCartitems }}>
      <itemscount.Provider value={{ itemcount, setItemcount }}>
        {children}
      </itemscount.Provider>
    </itemcontext.Provider>
  );
};

export default ItemProvider;
