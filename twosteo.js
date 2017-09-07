
initStorage();
alert("我执行完了第一个init");
alert(localStorage.project);//为何这个projec没有了呢
function clickProject(element) {

    // alert(element);
    initStorage();
    //alert(localStorage.project);
    oDiv = document.getElementById("project-list");
    cancelActive(oDiv, "")
    addClass(element, "active");
    //element.className="active"
    //var oInit=new initStorage();
    //alert(typeof oInit);
    //alert(oInit.oProject)
    oProject=getProject(); //获得所有的project
    //oTask   =getTask();    //获得所有的task
    //alert(typeof oProject);
   // alert(oProject);
    //alert(oTask[0].id);
}

    function initStorage() {


        var localStorage = new Object();
        localStorage.project = 0;
        localStorage.task = 0;

        var projectJson = [{
            "id": 0,
            "name": "学习前端",
            "child": [0, 1]
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
        return alert(localStorage.project);

    }

    function getProject() {
        alert("1");
        initStorage();

        alert(typeof localStorage.project);
        //return localStorage.project
        //return JSON.parse(localStorage.project)
        return localStorage.project
    }
    function getTask() {
        initStorage();
        alert(localStorage.task);
        return  JSON.parse(localStorage.task)

    }

        //return alert("1");
        //return alert(2);


function addClass(elem,newclassname) {

   // alert(newclassname);
    elem.className="active";
   // elem.className="newclassname"; 如何在newclass两头加上双引号

}
function cancelActive(ele,oldclassname) {


    //alert(ele);
    oLi=ele.getElementsByTagName("li");
    //alert(oLi.length);
    for(var i=0;i  <  oLi.length;i++){

       oLi[i].className="";
   }
  //just github
}

//新建project列表和task列表
