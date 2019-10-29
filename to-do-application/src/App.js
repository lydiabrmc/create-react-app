
import React, { Component } from "react";
import uuid from "uuid/v4";
import Header from "./Header1"
import AddTask from "./AddTask"
import TaskCount from "./TaskCount";
import TaskList from "./TaskList"
import CompleteTask from "./CompleteTask";
import SubHeader from "./SubHeader"
import "./App.css";


class App extends Component {
  state = {
    tasks: [
      {text: "do the dishes", completed: true, date: new Date(), id: uuid()},
      {text: "walk the cat", completed: false, date: new Date(), id: uuid()},
      {text: "buy oat milk", completed: false, date: new Date(), id: uuid()},
      {text: "print pictures", completed: true, date: new Date(), id: uuid()},
      {text: "hoover the cat's bed", completed: false, date: new Date(), id: uuid()},
    ]
  };

  addNewTask = (taskText) => {
    const tasksCopy = this.state.tasks.slice();
    const newTask ={
      text: taskText, 
      completed: false,
      date: new Date(),
      id: uuid(),
    };
    tasksCopy.push(newTask)
    this.setState({
      tasks: tasksCopy
    })
  };


  render() {
    const sortedTasks = this.state.tasks.sort((a,b) => {
      return b.date - a.date;
    })
    const completedTasks = sortedTasks.filter(tasks =>{
      return tasks.completed;
    });
    const incompleteTasks = sortedTasks.filter(tasks =>{
      return tasks.completed ? false : true;
    });
    const taskCount = this.state.tasks.reduce((prev, task) =>{
      return (!task.completed) ? prev + 1 : prev;
    }, 0)
    return (
      <div className="container">
        <Header />
        <AddTask addNewTaskFunc={this.addNewTask}/>
        <TaskCount count={taskCount}/>
        {incompleteTasks.map(task => {
          return <TaskList text={task.text} completed={task.completed} key={task.id} date={task.date}/>
        })}
        <SubHeader title="Completed Tasks"/>
        {completedTasks.map(task => {
          return <CompleteTask text={task.text} completed={task.completed} key={task.id}/>
        })}
      </div>
    );
  }
}

export default App;