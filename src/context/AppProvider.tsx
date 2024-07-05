import React, { Dispatch, createContext, useState } from "react";
import { ITEM_SELECTION } from "../components/static/TimerList";

type AppContextType = {
  taskHistory: any[];
  onRemoveItem: (id: string) => void;
  currentTask: any;
  onAddTask: (taskname: string, id: string) => void;
  timerList: any;
  setTimerList: Dispatch<React.SetStateAction<any>>;
  goals: any[];
  setGoals: Dispatch<React.SetStateAction<any>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
  showLoader: boolean;
  setShowLoader: Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<AppContextType>({
  taskHistory: [],
  onRemoveItem: () => {},
  currentTask: {},
  onAddTask: (taskname: string, id: string) => {},
  timerList: {},
  setTimerList: () => {},
  goals: [],
  setGoals: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  showLoader: false,
  setShowLoader: () => {},
  token: "",
  setToken: () => {},
});

const AppProvider = ({ children }: any) => {
  const [taskHistory, setTaskHistory] = useState([] as any[]);
  const [currentTask, setCurrentTask] = useState({} as any);
  const [timerList, setTimerList] = useState(ITEM_SELECTION);
  const [goals, setGoals] = useState([] as any[]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [token, setToken] = useState("");

  const onRemoveItem = (id: string) => {
    setTaskHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddTask = (taskname: string, id: string) => {
    // add task to specific goal
    const ind = goals.findIndex((item) => item.id === id);
    const goal = goals[ind];
    const tasks = goal.tasks;
    const newTask = {
      id: tasks.length + 1,
      name: taskname,
    };
    goal.tasks = [...tasks, newTask];
    const newGoals = [...goals];
    newGoals[ind] = goal;
    setGoals(newGoals);
  };

  const setTimerListHandler = (newVal: any) => {
    setTimerList(newVal);
  };

  return (
    <AppContext.Provider
      value={{
        taskHistory,
        onRemoveItem,
        currentTask,
        onAddTask,
        timerList,
        setTimerList: setTimerListHandler,
        goals,
        setGoals,
        isLoggedIn,
        setIsLoggedIn,
        showLoader,
        setShowLoader,
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
