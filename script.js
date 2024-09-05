let taskList = [];
const RANDOM_STRING_LENGTH = 6;

const addTask = (myForm) => {
  //   console.log("Task Added");
  //   const taskElement = document.getElementById("task");
  //   console.log(taskElement.value);
  //   console.log(myForm);
  const formData = new FormData(myForm);
  const task = formData.get("task");
  const hour = parseInt(formData.get("hour"));
  const type = formData.get("type");

  //   console.log(type);

  if (task == "" || hour == "") {
    alert("please enter the valid input.");
    return;
  }

  //   console.log(formData);
  //   console.log(myForm);
  //   console.log(formData.get("task"));
  const id = getRandomUniqueID();
  //   console.log("object", id);
  const taskObj = {
    id,
    task,
    hour,
    type,
  };

  taskList.push(taskObj);
  myForm.reset();
  displayGoodList();
};

const displayGoodList = () => {
  const goodListElement = document.getElementById("goodList");

  let goodListElementContent = "";
  let goodIndex = 0;
  taskList.map((item, index) => {
    if (item.type == "good") {
      goodIndex = goodIndex + 1;
      goodListElementContent += `
    <tr>
                  <th scope="row">${goodIndex}</th>
                  <td>${item.task}</td>
                  <td>${item.hour} hrs</td>
                  <td class="text-end">
                    <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')">

                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-success" onclick="switchTask('${item.id}')">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
    }
  });
  goodListElement.innerHTML = goodListElementContent;
  const totalHours = getTotalHours();
  const totalHourElement = document.getElementById("totalHour");

  totalHourElement.innerText = totalHours;

  //Bad Hours
  const badListElement = document.getElementById("badList");

  let badListElementContent = "";
  let badIndex = 0;
  taskList.map((item, index) => {
    if (item.type == "bad") {
      badIndex = badIndex + 1;
      badListElementContent += `
      <tr>
                  <th scope="row">${badIndex}</th>
                  <td>${item.task}</td>
                  <td>${item.hour} hrs</td>
                  <td class="text-end">
                    <button type="button" class="btn btn-warning" onclick="switchTask('${item.id}')">
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>`;
    }
  });
  badListElement.innerHTML = badListElementContent;
};

const getTotalHours = () => {
  let totalHours = taskList.reduce((acc, item) => {
    return acc + item.hour;
  }, 0);
  return totalHours;
};

const deleteTask = (id) => {
  taskList = taskList.filter((task) => {
    return task.id != id;
  });

  displayGoodList();
};

const getRandomUniqueID = () => {
  let stringGenerator =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

  let randomString = "";
  for (i = 0; i < RANDOM_STRING_LENGTH; i++) {
    let randomIndex = Math.floor(Math.random() * stringGenerator.length);
    randomString = randomString + stringGenerator[randomIndex];
  }

  return randomString;
};

const switchTask = (id) => {
  console.log(switchTask);
  let task = taskList.find((task) => task.id == id);
  task.type = task.type == "good" ? "bad" : "good";
  displayGoodList();
};
const displayDataFromLocalStorage = () => {
  let tempList = JSON.parse(localStorage.getItem("tastList"));
  taskList = tempList ? tempList : [];
  displayGoodList();
};
