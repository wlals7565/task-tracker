const fs = require("fs");
const filePath = "./tasks.json";
const readJsonFile = require("./file_manager");

// CLI parameters
const args = process.argv.slice(2);

// valid commands array
const commands = ["add", "update", "delete", "mark", "list"];
const status = ["in-progress", "done", "todo"]

// no args
if (args.length <= 0) {
  console.log("help");
  process.exit(1);
}
// command
const command = args[0].toLowerCase();

// verify valid command
if (!commands.includes(command)) {
  console.log(`${command} isn't exist`);
  process.exit(1);
}

// if tasks.json not exist
if (!fs.existsSync("./tasks.json")) {
  fs.writeFileSync("./tasks.json", "[]");
}

// data
const jsonData = readJsonFile(filePath);

// add
if (command === "add") {
  if (args.length !== 2) {
    console.log("wrong parameter");
    return process.exit(1);
  }
  let description = args[1];
  let lastId = jsonData[jsonData.length - 1]?.id || 0;
  let task = {
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "todo",
    id: ++lastId,
  };
  jsonData.push(task);
  fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
    if (err) {
      console.log(`Error: can't add task `);
      return;
    }
    console.log("Successfully add task");
  });
}
// update
else if (command === "update") {
  console.log(args);
  if (args.length !== 3) {
    console.log("wrong parameter");
    return process.exit(1);
  }
  let updateTask;
  let updateTaskId = args[1];
  for (const task of jsonData) {
    if (updateTaskId == parseInt(task.id)) {
      console.log("taskID: " + task.id);
      updateTask = task;
      updateTask.description = args[2];
      break;
    }
  }
  if (!updateTask) {
    console.log(`No task with id: ${updateTaskId}`);
    process.exit(1);
  }
  fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
    if (err) {
      console.log(`Error: can't update task `);
      return;
    }
    console.log("Successfully update task");
  });
}
// delete
else if (command === "delete") {
  if (args.length !== 2) {
    console.log("wrong parameter");
    return process.exit(1);
  }
  let currentLength = jsonData.length;
  let deleteTaskId = parseInt(args[1]);
  let newData = jsonData.filter((task)=> task.id !== deleteTaskId);
  console.log(newData)
  if(currentLength === newData.length) {
    console.log(`No task with id: ${deleteTaskId}`)
    process.exit(1)
  }
  fs.writeFile(filePath, JSON.stringify(newData), (err) => {
    if (err) {
      console.log(`Error: can't update task `);
      return;
    }
    console.log("Successfully update task");
  });
}
// mark
else if (command === "mark") {
  if (args.length !== 3) {
    console.log("wrong parameter");
    return process.exit(1);
  }
  if(!status.includes(args[2])) {
    console.log('wrong status');
    return process.exit(1);
  }
  let updateTask;
  let updateTaskId = args[1];
  for (const task of jsonData) {
    if (updateTaskId == parseInt(task.id)) {
      console.log("taskID: " + task.id);
      updateTask = task;
      updateTask.status = args[2];
      break;
    }
  }
  fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
    if (err) {
      console.log(`Error: can't update task status`);
      return;
    }
    console.log("Successfully update task status");
  })
  if (!updateTask) {
    console.log(`No task with id: ${updateTaskId}`);
    process.exit(1);
  }
}
// list
else if (command === "list") {
  if (args.length === 1) {
    if(jsonData.length == 0) {
      console.log(`there is no task`);
      process.exit(1);
    }
    for(let i=0; i<jsonData.length; i++){
      console.log(jsonData[i]);
    }
  }
  else if (args.length === 2){
    let statusOption = args[1];
    if(!status.includes(statusOption)) {
      console.log('wrong status');
      return process.exit(1);
    }
    let newData = jsonData.filter((data) => data.status === statusOption);
    if(newData.length == 0) {
      console.log(`there is no task with status ${statusOption}`);
      process.exit(1);
    }
    for(let i=0; i<newData.length; i++) {
      console.log(newData[i]);
    }
  }
  else {
    console.log('wrong parameters');
    process.exit(1)
  }
}

// node ./taskTracker.js