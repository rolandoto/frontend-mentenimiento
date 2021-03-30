import React, { useState } from "react";
import { Input } from "../";
import { Close } from "@material-ui/icons";
import "./inputTasks.scss";

export const InputTask = ({ tasks = [], max = 5 }) => {
    const [task, setTask] = useState(tasks);
    const [clearInput, setClearInput] = useState(false);

    const generateRandomKey = (number) => {
        const posibleKeyChars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        let key = "";
        for (let i = 0; i < number; i++) {
            const random = Math.floor(
                Math.random() * (posibleKeyChars.length - 0)
            );
            key += posibleKeyChars[random];
        }

        return key;
    };

    const eHandleAddTask = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (task.length < max) {
                const newTask = e.target.value;
                setClearInput(true);

                setTimeout((_) => {
                    setClearInput(false);
                }, 200);

                if (newTask.length > 0) {
                    setTask([
                        ...task,
                        {
                            id: generateRandomKey(20),
                            name: e.target.value,
                        },
                    ]);
                } else {
                    window.alert("Debes especificar algo en la tarea.");
                }
            } else {
                window.alert(`No puedes subir mas de ${max} tareas.`);
            }
        }
    };

    const deleteSelectedTask = (key) => {
        const newTasks = task.filter((taskItem) => {
            return taskItem.id !== key;
        });

        setTask(newTasks);
    };

    const changeTaskValue = (key, value) => {
        setTask(
            task.map((taskSubItem) => {
                if (taskSubItem.index === key) {
                    taskSubItem.value = value;
                }

                return taskSubItem;
            })
        );
    };

    return (
        <div className="input_task_container">
            <input
                type="hidden"
                name="tasks"
                defaultValue={JSON.stringify(task)}
            />

            <Input
                key="SSSAA"
                type="text"
                placeholder="Tareas a realizar"
                animated
                min={0}
                max={999}
                height={50}
                onKeyPress={(e) => eHandleAddTask(e)}
                clear={clearInput}
            />
            {task.map((taskItem, index) => (
                <div key={taskItem.id} className="position_relative">
                    <Input
                        placeholder={"Tarea " + (index + 1)}
                        animated
                        min={1}
                        max={999}
                        defaultValue={taskItem.name}
                        onChange={(e) =>
                            changeTaskValue(taskItem.id, e.target.value)
                        }
                    />
                    <div
                        className="removeTask"
                        onClick={() => deleteSelectedTask(taskItem.id)}
                    >
                        <Close />
                    </div>
                </div>
            ))}
        </div>
    );
};
