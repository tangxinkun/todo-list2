var currentProjectId = 0;
var currentTaskId = -1;
initStorage();//执行initStorage初始化数据
showProject();
document.getElementById("task-list").innerHTML = createProjectTaskList(0);

function clickProject(element){
    //alert('我是点击获取的'+element);
    var oDiv1=document.getElementById("project-list");//获取div
    //alert('我是点击获取的'+oDiv1);
    var oLeftli=oDiv1.getElementsByTagName("li");//获取点击处的
    //alert(oLeftli);
    cancelActive(document.getElementById("project-list"));//取消所有li的类名，取消格式
    addClass(element,'active')//为点击处加样式，跳转到addclass
    //alert(element.classList);
    initStorage();//执行initStorage初始化数据

    var newProjectId = element.getAttribute("data-projectid");//拿到当前的data-projectid

    // 如果选中的是不同的目录
    if (currentProjectId !== newProjectId) {
        currentTaskId = -1;
        currentProjectId = newProjectId; //把当前的data-projectid保存成currentProjectId
    }

    addClass(document.getElementById("content-mask"), "not-selected");  //content-mask右侧选为没有选择

    var projectName = "";
    var projectArray = getProject();//返回的是一堆对象。这个对象是task对象
    for (var i = 0; i < projectArray.length; i++) {//确定currentprojectid和task中的id对应

        if (projectArray[i].id == currentProjectId) {
            projectName = projectArray[i].name;
            break;
        }
    }
    var titleElement = document.getElementById("project-name").getElementsByTagName("h3")[0];
    titleElement.innerHTML = projectName;//json中的title
    // 修改输入框内的提示信息
    document.getElementById("add-task-input").setAttribute("placeholder",
        '添加任务至"' + projectName + '"');
    // 修改显示的任务列表
    showTaskList();//显示tasklist
}
function showTaskList() {
    document.getElementById("task-list").innerHTML = createProjectTaskList(currentProjectId);//将tasklist的innerhtml重建
}

// 创建一个目录下的列表用于显示
function createProjectTaskList(projectId) {
    var unfinishedListHTML = "<ul>";
    var finishedListHTML = '<div id="finished-task"><h5>已完成</h5>';

    var tasksArray = getTask(); //task的obj拿过来
    alert(tasksArray);
    tasksArray = tasksArray.reverse();//

    var liStr;
    for (var i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].parent == projectId) {//parent对应projectID
            if (!tasksArray[i].finish) {  //如果finish了

                liStr = '<li' + ' data-taskid="' + tasksArray[i].id + '" '
                    + 'class="title-list"'
                    + ' onclick="clickTask(this);">'
                    + '<i class="fa fa-fw fa-square-o" onclick="checkTask(this);"></i>'
                    + '<span class="task-title">'
                    + tasksArray[i].title
                    + '</span>'
                    + '<i class="fa fa-edit" onclick="editTaskTitle(this);"></i></li>';
                unfinishedListHTML += liStr;
            } else {  //如果没有finish

                liStr = '<li' + ' data-taskid="' + tasksArray[i].id + '" '
                    + 'class="title-list finished"'
                    + ' onclick="clickTask(this);">'
                    + '<i class="fa fa-fw fa-check-square-o" onclick="checkTask(this);"></i>'
                    + '<span class="task-title">'
                    + tasksArray[i].title
                    + '</span>'
                    + '<i class="fa fa-edit" onclick="editTaskTitle(this);"></i></li>';
                finishedListHTML += liStr;
            }
        }
    }
    unfinishedListHTML += "</ul>";
    finishedListHTML += "</ul></div>";

    return unfinishedListHTML + finishedListHTML;
}
function getTask() {
    return JSON.parse(localStorage.task);//parse用于从一个字符串中解析出json对象
}


function getProject() {
    return JSON.parse(localStorage.project);
}
function cancelActive(element) {
    var lists = element.getElementsByTagName("li");
    //alert(lists.length);
    for (var i = 0; i < lists.length; i++) {
        removeClass(lists[i], "active");//删除制定dom元素的样式
    }
}
function removeClass(element, oldClassName) {
    if (element.classList) {//如果有类名，那么直接remove
        element.classList.remove(oldClassName);
    } /*


    else if (hasClass(element, oldClassName)) { //如果没有类名，判断hasclass
        var re = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
        element.className = element.className.replace(re, ' ');
    }
    */
}
function hasClass(element, className) {
    if (element.classList) {//再次判断classname不为空
        return element.classList.contains(className);// 如果已经是这个active 返回ture，不是则返回false
        /* 检查是否含有某个CSS类
        classList 属性返回元素的类名，作为 DOMTokenList 对象。
        该属性用于在元素中添加，移除及切换 CSS 类。
        classList 属性是只读的，但你可以使用 add() 和 remove() 方法修改它。
         */
    }
    var re = new RegExp('(\\s|^)' + className + '(\\s|$)');//含有className 首尾有空白符或者什么都没有的的字符串
    return !!element.match(re);//确保返回值是 Boolean 类型而已, 取了两次非
}

function addClass(element, newClassName) {
    //alert(element.classList);// 弹出来此时的classname
    if (element.classList) {//如果classname为空，添加classname
        element.classList.add(newClassName);
    }

    /*else if (!hasClass(element, newClassName)) {//如果classname不为空，那么判断hasclass,hasclass判断已有的是不是和new的一样
        element.className += " " + newClassName;
    }
    */
}



function initStorage() {
    if (!localStorage.project || !localStorage.task) {//project、task只要有一个为真，那么直接执行
        var projectJson = [{
            "id": 0,
            "name": "学习前端",
            "child": [0,1]
        }, {
            "id": 1,
            "name": "娱乐",
            "child": [2]
        }];

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

        localStorage.project = JSON.stringify(projectJson);//stringify()用于从一个对象解析出字符串

        localStorage.task = JSON.stringify(taskJson);//stringify()用于从一个对象解析出字符串

        alert(localStorage.project);

        alert(localStorage.task)
    }
}//初始化，把对象里面的一堆属性化成字符串
function showProject() {
    var projectArray = getProject();
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






