import React, { Dispatch, createContext, useState } from "react";
import { generateId } from "../components/helper";
import { ITEM_SELECTION } from "../components/static/TimerList";

type AppContextType = {
  taskHistory: any[];
  onRemoveItem: (id: string) => void;
  currentTask: any;
  onAddTask: Dispatch<React.SetStateAction<any>>;
  timerList: any;
  setTimerList: Dispatch<React.SetStateAction<any>>;
};

const AppContext = createContext<AppContextType>({
  taskHistory: [],
  onRemoveItem: () => {},
  currentTask: {},
  onAddTask: (taskname: string) => {},
  timerList: {},
  setTimerList: () => {},
});

const AppProvider = ({ children }: any) => {
  const [taskHistory, setTaskHistory] = useState([] as any[]);
  const [currentTask, setCurrentTask] = useState({} as any);
  const [timerList, setTimerList] = useState(ITEM_SELECTION);

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

  const setTimerListHandler = (selected: any) => {
    // setTimerList(selected);
  };

  return (
    <AppContext.Provider
      value={{
        taskHistory,
        onRemoveItem,
        currentTask,
        onAddTask,
        timerList,
        setTimerList: setTimerList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
