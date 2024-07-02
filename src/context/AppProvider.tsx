import React, { Dispatch, createContext, useState } from "react";
import { generateId } from "../components/helper";
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
});

const AppProvider = ({ children }: any) => {
  const [taskHistory, setTaskHistory] = useState([] as any[]);
  const [currentTask, setCurrentTask] = useState({} as any);
  const [timerList, setTimerList] = useState(ITEM_SELECTION);
  const [goals, setGoals] = useState([] as any[]);

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



    // const cTask = {
    //   id: generateId(),
    //   taskname,
    //   isChecked: false,
    // };



    // setTaskHistory((prev) => [...prev, cTask]);
    // setCurrentTask(cTask);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
