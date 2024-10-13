const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');

yargs.command({
  command: 'add',
  describe: 'Add a new task',
  builder: {
    title: {
      describe: 'Task title',
      demandOption: true,
      type: 'string',
    },
    description: {
      describe: 'Task description',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    addTask(argv.title, argv.description);
  },
});

yargs.command({
  command: 'delete',
  describe: 'Delete a task',
  builder: {
    title: {
      describe: 'Task title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deleteTask(argv.title);
  },
});

const addTask = (title, description) => {
  const tasks = loadTasks();
  if (tasks.filter(task => task.title !== title).length === tasks.length) {
    const newTask = { title, description };

    tasks.push(newTask);

    saveTasks(tasks);
    console.log(
      `Task added: ${title} with description: ${newTask.description}`
    );
  } else {
    console.log('This title already added');
  }
};

const deleteTask = title => {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter(task => task.title !== title);
  saveTasks(updatedTasks);
  console.log(`Task deleted: ${title}`);
};

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync('task.json');
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

const saveTasks = tasks => {
  const dataJSON = JSON.stringify(tasks, null, 2);
  fs.writeFileSync('task.json', dataJSON);
};

yargs.parse();
