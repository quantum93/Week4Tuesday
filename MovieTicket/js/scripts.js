// ------------ Back-end logic ------------------
function ToDoList() {
  //currentId will be started with 1 rather than 0 because 0 is for empty array.
  // But be aware of independence of myTasks' index and index of currentId.
  // The index of myTasks is strating with zero but the currentId itself is starting with 1.
  // So, the array data of id 1 is the myTasks[0] rather than myTasks[1].
  this.myTasks = [];
  this.currentId = 0;
}

ToDoList.prototype.addTask = function(myTask) {
  myTask.id = this.assignId();
  this.myTasks.push(myTask);
}

ToDoList.prototype.assignId = function() {
  // Here, the first Id of myTasks is starting with 1 rather than 0. There is
  // no data array with index of zero.
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.findTask = function(id) {
  // Here the findTask index is starting with currentId number, which means 1 rather than 0.
  for (var i = 0; i < this.myTasks.length; i++) {
    if (this.myTasks[i]) {
      if (this.myTasks[i].id == id) {
        return this.myTasks[i];
      }
    }
  };
  return false;
}

ToDoList.prototype.deleteTask = function(id) {
  // Here the findTask index is starting with currentId number, which means 1 rather than 0.
  for(var i = 0; i < this.myTasks.length; i++) {
    if (this.myTasks[i]) {
      if (this.myTasks[i].id == id) {
        delete this.myTasks[i];
        return true;
      }
    }
  };
  return false;
}

function Task(task, when, where, withWhom) {
  this.task = task;
  this.when = when;
  this.where = where;
  this.withWhom = withWhom;
}

// Task.prototype.completed = function() {
  //   return this.task + " was completed at " + this.when;
  // }

  // ---------- User interface logic --------------
  var toDoList = new ToDoList();

  function displayTaskDetails(toDoListDisplay) {
    var myTasksList = $("ul#taskitems");
    var htmlFormyTasksInfo = "";
    toDoListDisplay.myTasks.forEach(function(myTask) {
      htmlFormyTasksInfo += "<li id=" + myTask.id + ">" + myTask.task + " " + myTask.when + " " + myTask.where + " " + myTask.withWhom + "</li>";
    });
    myTasksList.html(htmlFormyTasksInfo);
  }

  function showmyTask(taskId) {
    // The variable myTask is only connected with myTask in displayTaskDetails function
    // and later on myTask variable is redefined in jQuery loop in below.
    // This might be a great way to do in complied language but it works here.....
    var myTask = toDoList.findTask(taskId);
    $("#show-task").show();
    $(".task").html(myTask.task);
    $(".when").html(myTask.when);
    $(".where").html(myTask.where);
    $(".withWhom").html(myTask.withWhom);
    $(".ID").html(myTask.id);
    var buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + myTask.id + ">Delete</button>");
  }

  function attachmyTaskListeners() {
    $("ul#taskitems").on("click", "li", function() {
      showmyTask(this.id);
    });
    // Code below here is new!
    $("#buttons").on("click", ".deleteButton", function() {
      toDoList.deleteTask(this.id);
      $("#show-task").hide();
      displayTaskDetails(toDoList);
    });
  };


  $(document).ready(function() {
    attachmyTaskListeners()
    $("#display").submit(function(event) {
      event.preventDefault();
      var task = $("input#task").val()
      var when = $("input#when").val()
      var where = $("input#where").val()
      var withWhom = $("input#withWhom").val()
      var myTask = new Task(task,when,where,withWhom);
      toDoList.addTask(myTask);
      displayTaskDetails(toDoList)
      console.log(myTask);

    });

    // $("#hidden").click(function(event) {
      //   event.preventDefault();
      // $(".hidden").append(toDoList.myTasks[0].task);
      // $(".hidden").append(toDoList.myTasks[1].task);
      // $(".hidden").show();
      // });

    });
