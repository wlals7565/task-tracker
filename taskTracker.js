const fs = require("fs");
const filePath = "./tasks.json";
const readJsonFile = require("./file_manager");

// CLI parameters
const args = process.argv.slice(2);

// valid commands array
const commands = ["add", "update", "delete", "mark", "list"];
// valid status array
const status = ["in-progress", "done", "todo"];
// valid args length

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

// func
// check args length
const checkArgsLength = (args, length, errorMessage = "wrong parameter") => {
  if (args.length !== length) {
    console.log(errorMessage);
    return process.exit(1);
  }
};
// writefile
const writefile = (jsonData) => {
  fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
    if (err) {
      console.log(`fail to write file `);
      return;
    }
    console.log("success to write file");
  });
};
// 업데이트 하는 부분
const printTaskList = (statusOption = undefined) => {
  if (!statusOption) {
    if (jsonData.length == 0) {
      console.log(`there is no task`);
      process.exit(1);
    } else {
      console.table(jsonData);
    }
  } else {
    if (!status.includes(statusOption)) {
      console.log("wrong status");
      return process.exit(1);
    } else {
      let newData = jsonData.filter((data) => data.status === statusOption);
      if (newData.length == 0) {
        console.log(`there is no task with status ${statusOption}`);
        process.exit(1);
      }
      console.table(newData);
    }
  }
};

// not found task with id
const notFoundTask = (id) => {
  console.log(`No task with id: ${id}`);
  process.exit(1);
};

// add
if (command === "add") {
  checkArgsLength(args, 2);
  let description = args[1];
  let lastId = jsonData[jsonData.length - 1]?.id || 0;
  let task = {
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "todo",
    id: ++lastId,
  };
  let newData = [...jsonData, task];
  writefile(newData);
}
// update
else if (command === "update") {
  checkArgsLength(args, 3);

  let newData = [...jsonData];

  let updateTask;
  let updateTaskId = args[1];

  for (let i = 0; i < jsonData.length; i++) {
    if (updateTaskId == jsonData[i].id) {
      updateTask = {
        id: jsonData[i].id,
        description: args[2],
        createdAt: jsonData[i].createdAt,
        updatedAt: new Date(),
        status: jsonData[i].status,
      };
      newData[i] = updateTask;
      break;
    }
  }
  if (!updateTask) {
    notFoundTask(updateTaskId);
  }

  writefile(newData);
}
// delete
else if (command === "delete") {
  checkArgsLength(args, 2);
  let currentLength = jsonData.length;
  let deleteTaskId = parseInt(args[1]);
  let newData = jsonData.filter((task) => task.id !== deleteTaskId);

  if (currentLength === newData.length) {
    console.log(`No task with id: ${deleteTaskId}`);
    process.exit(1);
  }
  writefile(newData);
}
// mark
else if (command === "mark") {
  checkArgsLength(args, 3);

  if (!status.includes(args[2])) {
    console.log("wrong status");
    return process.exit(1);
  }

  let newData = [...jsonData];

  let updateTask;
  let updateTaskId = args[1];

  for (let i = 0; i < jsonData.length; i++) {
    if (updateTaskId == jsonData[i].id) {
      updateTask = {
        id: jsonData[i].id,
        description: jsonData[i].description,
        createdAt: jsonData[i].createdAt,
        updatedAt: new Date(),
        status: args[2],
      };
      newData[i] = updateTask;
      break;
    }
  }
  if (!updateTask) {
    notFoundTask(updateTaskId);
  }

  writefile(newData);
}

// list
else if (command === "list") {
  if (args.length === 1) {
    printTaskList();
  } else if (args.length === 2) {
    let statusOption = args[1];
    printTaskList(statusOption);
  } else {
    console.log("wrong parameters");
    process.exit(1);
  }
}

// node ./taskTracker.js
