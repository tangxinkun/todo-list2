function clickProject(element) {

   // alert(element);
    oDiv=document.getElementById("project-list");
   cancelActive(oDiv,"")
    addClass(element,"active")
    //element.className="active"


}
function addClass(elem,newclassname) {

   // alert(newclassname);
    elem.className="active";
   // elem.className="newclassname"; 如何在newclass两头加上双引号

}
function cancelActive(ele,oldclassname) {


    alert(ele);
    oLi=ele.getElementsByTagName("li");
    alert(oLi.length);
    for(var i=0;i  <  oLi.length;i++){

       oLi[i].className="";
   }
  //just github
}