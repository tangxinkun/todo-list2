var currentProjectId=-1;
initGetProject();//获得字符串项目列表str类型 localstage.project
alert(localStorage.project);
initGetTask(); //获得字符串任务列表string localstage.task
alert(localStorage.task);

function clickProject(element) {


    oProject=getObejectProject();//获得project对象
    //alert(typeof oProject);
    //alert(oProject[0].name);
    oTask  =getObjectTask();//获得task对象
    //alert(oTask.length);
    //alert(typeof oTask);
    //alert(oTask[1].id);
    oDiv = document.getElementById("project-list");
    cancelActive(oDiv, "")
    addClass(element, "active");
    var nClickProjectNumber=element.getAttribute("data-projectid");
    if (currentProjectId !== nClickProjectNumber) {
        currentProjectId = nClickProjectNumber; //把当前的data-projectid保存成currentProjectId
    }
    alert(currentProjectId);
    var titleElement = document.getElementById("project-name").getElementsByTagName("h3")[0];
    alert(oProject[currentProjectId].id);
    titleElement.innerHTML=oProject[currentProjectId].name;
    document.getElementById("add-task-input").setAttribute("placeholder",
        '添加任务至"' + oProject[currentProjectId].name + '"');
    showTaskList(oTask);

    //alert(nClickProjectNumer);

}//点击项目列表
function initGetProject() {


    var localProject = new Object();
        localProject.project = 0;
    var projectJson = [{
            "id": 0,
            "name": "学习前端",
            "child": [0, 1]
        }, {
            "id": 1,
            "name": "娱乐",
            "child": [2]
        }];
    localStorage.project = JSON.stringify(projectJson);//stringify()用于从一个对象解析出字符串

    }//获得项目列表string
function getObejectProject() {

    return JSON.parse(localStorage.project)

}//获得项目对象
function initGetTask() {
    var localTask=new Object();
    localTask.task=0;
    var taskJson = [{
            "id": 0,
            "parent": 0,
            "finish": false,
            "title": "学习Bootstrap",
            "content": "学习Bootstrap官网教程\n写Bootstrap demo",
            "due-date": null
        }, {
            "id": 1,
            "parent": 0,
            "finish": false,
            "title": "完成Todolist",
            "content": "这里还是什么内容也没有",
            "due-date": null
        }, {
            "id": 2,
            "parent": 1,
            "finish": false,
            "title": "看电影",
            "content": "这里也是什么内容也没有",
            "due-date": null
        }
        ];
    localStorage.task=JSON.stringify(taskJson);
    }//获得任务列表string
function getObjectTask() {
    return JSON.parse(localStorage.task)

}//获得项目对象
function addClass(elem,newclassname) {

   // alert(newclassname);
    elem.className="active";
   // elem.className="newclassname"; 如何在newclass两头加上双引号

}//增加样式
function cancelActive(ele,oldclassname) {


    //alert(ele);
    oLi=ele.getElementsByTagName("li");
    //alert(oLi.length);
    for(var i=0;i  <  oLi.length;i++){

       oLi[i].className="";
   }
  //just github
}//取消样式
//新建project列表和task列表
function showTaskList(element) {
    document.getElementById("task-list").innerHTML = createProjectTaskList(currentProjectId,element);//将tasklist的innerhtml重建
}//点击项目，显示任务列表

// 创建一个目录下的列表用于显示
function createProjectTaskList(projectId,oTask) {
    var unfinishedListHTML = "<ul>";
    var finishedListHTML = '<div id="finished-task"><h5>已完成</h5>';

    //var tasksArray = getTask(); //task的obj拿过来
   // alert(tasksArray);
    //tasksArray = tasksArray.reverse();//

    var liStr;
    for (var i = 0; i < oTask.length; i++) {
        if (oTask[i].parent == currentProjectId) {//parent对应projectID
            if (!oTask[i].finish) {  //如果finish了

                liStr = '<li' + ' data-taskid="' + oTask[i].id + '" '
                    + 'class="title-list"'
                    + ' onclick="clickTask(this);">'
                    + '<i class="fa fa-fw fa-square-o" onclick="checkTask(this);"></i>'
                    + '<span class="task-title">'
                    + oTask[i].title
                    + '</span>'
                    + '<i class="fa fa-edit" onclick="editTaskTitle(this);"></i></li>';
                unfinishedListHTML += liStr;
            } else {  //如果没有finish

                liStr = '<li' + ' data-taskid="' + oTask[i].id + '" '
                    + 'class="title-list finished"'
                    + ' onclick="clickTask(this);">'
                    + '<i class="fa fa-fw fa-check-square-o" onclick="checkTask(this);"></i>'
                    + '<span class="task-title">'
                    + oTask[i].title
                    + '</span>'
                    + '<i class="fa fa-edit" onclick="editTaskTitle(this);"></i></li>';
                finishedListHTML += liStr;
            }
        }
    }
    unfinishedListHTML += "</ul>";
    finishedListHTML += "</ul></div>";

    return unfinishedListHTML + finishedListHTML;
}//创建任务列表
function addProject() {
    var name=prompt("请输入项目名称");
    //alert(name);
    oProject=getObejectProject();//获取对象
    var oNewProject={};
    oNewProject.name=name;
    oNewProject.child=[];
    oNewProject.id=oProject[oProject.length-1].id+1;
    oProject.push(oNewProject);//添加新对象
    updateProject(oProject);//更新localstorge.project
    showProject();
    //oNewProject.push(oProject);
    //alert(oProject)
    addedproject=document.getElementById("project-" + oNewProject.id);
    clickProject(addedproject);
}
function updateProject(projects) {
    localStorage.project = JSON.stringify(projects);
}//更新localstorge.project
function updateTask(tasks) {

    localStorage.project = JSON.stringify(tasks);

}
function showProject() {
    var projectArray = getObejectProject();;
    var projectHTML = "<ul>";
    var liStr;
    for (var i = 0; i < projectArray.length; i++) {
        var id = projectArray[i].id;
        liStr = '<li id="project-'
            + id + '" data-projectid=' + id + ' onclick="clickProject(this)">'
            + '<i class="fa fa-bars"></i>'
            + '<span>'
            + projectArray[i].name
            + '</span><i class="fa fa-ellipsis-h" onclick="showDropdownMenu(this);"></i></li>';
        projectHTML += liStr;
    }
    projectHTML += '<li onclick="addProject()"><i class="fa fa-plus-circle"></i><span>创建清单</span></li></ul>';
    document.getElementById("project-list").innerHTML = projectHTML;
}
document.getElementById("add-task-input").onkeydown=function (event) {
    if (event.keyCode == 13) {
        if (this.value === "") {return;}
        if (currentProjectId === -1) {
            alert("请选择一个目录后再操作");
            return;
        }
        var title = this.value;
        alert(this);
        alert(title);
        this.value = "";
        var taskObject = {};
        taskObject.finish = false;
        taskObject.title = title;
        taskObject.parent = currentProjectId;
        alert(taskObject.parent);
        alert(typeof taskObject);
        addTask(taskObject);
        oTask=getObjectTask();
        showTaskList(oTask);
    }
}
function addTask(ele) {
    oTask=getObjectTask();
    oTask.push(ele);
    updateTask(oTask);
    alert(localStorage.task)
}

