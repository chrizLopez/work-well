import React, { Dispatch, createContext, useState } from "react";
import { generateId } from "../components/helper";

type AppContextType = {
  taskHistory: any[];
  onRemoveItem: (id: string) => void;
  currentTask: any;
  onAddTask: Dispatch<React.SetStateAction<any>>;
};

const AppContext = createContext<AppContextType>({
  taskHistory: [],
  onRemoveItem: () => {},
  currentTask: {},
  onAddTask: (taskname: string) => {},
});

const AppProvider = ({ children }: any) => {
  const [taskHistory, setTaskHistory] = useState([] as any[]);
  const [currentTask, setCurrentTask] = useState({} as any);

  const onRemoveItem = (id: string) => {
    setTaskHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddTask = (taskname: string) => {
    const cTask = {
      id: generateId(),
      taskname,
      isChecked: false,
    };

    setTaskHistory((prev) => [...prev, cTask]);
    setCurrentTask(cTask);
  };

  return (
    <AppContext.Provider value={{ taskHistory, onRemoveItem, currentTask, onAddTask }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };