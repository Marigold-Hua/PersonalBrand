/* 
1. Focus user input: Add task - drag and drop (or form to add task info), add gradient (hardcode colors for now)
2. Get gradient working
3. Implement transition: Gradient merge (in CSS) 
4. Make calendar responsive (ex: on collapse - days take up whole screen) - time embedded in day
5. Implement projects

Purposes: 
1. Starting small --> build - Step one thing --> add cal
2. Key: *** Fuzzy view of time/deadlines - make people feel better about the way they are productive

Check rubric!!!

APIs and Libraries to Check Out
1. Figure out how to integrate with gcal?

*/

let startTime = 17;
let endTime = 21;
let projectNum = 0;
let projectSelected; //so that whenever projectNum is updated, project select is out of range. 
let projectList;

//const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const colorArray = ['#76da71', '#71daac','#71cfda', '#719bda', '#7371da', '#c071da'];
const projectNames = ['Exercise', 'PUI Project', 'Webtoon', 'Meals', 'Social', 'Research'];

//Call function to generate calendar once webpage loads
document.addEventListener('DOMContentLoaded', makeCalendar);

//Call function to add project when project button is clicked
document.querySelector('#add-project-button').addEventListener('click', addProject);

/* In-progress: Tests for triggering addTask on click within calendar times
//Use event delegation to pass clicks from each nested element of the week (from week container to quarter)
//Select all elemnts with a corresponding class
const allWeek = document.querySelector('.week-container');
const allDay = document.querySelectorAll('.day');
const allHour = document.querySelectorAll('.hour');
const allQuarter = document.querySelectorAll('.quarter');

//Add event listner to week
allWeek.addEventListener('click', test)
//Add event 
/* //Add event listner to each quarter
console.log
quarters.forEach(quarter => {
quarter.addEventListener('click', addTask); 
});
*/
//Get all elements with quarter class
const allQuarters = document.querySelectorAll('.quarter');

//Add event listner to each quarter
allQuarters.forEach(quarter => {
quarter.addEventListener('click', test); 
});

//test event delegaton
function test(event){
    event.stopPropagation();
    console.log('working');
}


//Function calls all functions used to make calendar
function makeCalendar(){
    makeTimeKey();
    makeWeek();
}

//Generates time key
function makeTimeKey(){
    // Get the time key container element
    const timeKey = document.querySelector('.time-key');

    //Add header to time key 
    const timeKeyHeader = document.createElement('div');
    timeKeyHeader.className = 'cal-header';
    timeKeyHeader.innerText = 'Time';
    timeKey.append(timeKeyHeader);

    //Add hour label for each out 
    for (h = startTime; h < endTime+1; h++){
        //Create current hour
        const newHour = document.createElement('div');
        newHour.className = 'hourLabel';

        //Add AM and PM indicators 
        if (h < 12) {
            newHour.innerText = h + ':00 AM';
        }
        else {
            newHour.innerText = h-12 + ':00 PM';
        }

        //Add current hour to hour container
        timeKey.append(newHour);
    }

 }

 //Generates week 
function makeWeek(){

    // Get the week container element
    const container = document.querySelector('.week-container');

    //Generate day within week container
    for (day in dayArray){

        //Create new day
        const newDay = document.createElement('div');
        newDay.className = 'day';
        newDay.id = dayArray[day];
        container.append(newDay);

        //Create heading of day
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.innerText = dayArray[day];
        newDay.append(dayHeader);

        //Generate time for day, starting with hours
        //Create container for hours within day
        const hourContainer = document.createElement('div');
        hourContainer.className = 'hourContainer';
        hourContainer.id = dayArray[day] + '-hourContainer';

        //Add hour container to day 
        newDay.append(hourContainer);

        //Generate hours
        for (h = startTime; h < endTime+1; h++){

            //Create current hour
            const newHour = document.createElement('div');
            newHour.className = 'hour';
            newHour.id = dayArray[day] + '-' + h;

            //Add current hour to hour container
            hourContainer.append(newHour);

            //Generate quarters
            for (q = 0; q < 4; q++){

                //Create current quarter
                const quarterContainer = document.createElement('div');
                quarterContainer.className = 'quarter';
                quarterContainer.id = dayArray[day] + '-' + h + '-' + q; 

                //Append quarter to hour container
                newHour.appendChild(quarterContainer);
            }
        }

    }
  };
  
  /* Functions involved in managing projects */
  
  //Adds project, including associated event listner
  function addProject(){
    //Evaluate if project is within limit
    if (projectNum < colorArray.length){
    //Make clone of project template
        const template = document.querySelector('#project-template');
        const clone = template.content.cloneNode(true);
        const project = clone.querySelector(".project");

        //Change project ID and formatting
        project.id = "project-" + projectNum;
        project.innerText = projectNames[projectNum];
        project.style.color = colorArray[projectNum % (colorArray.length)];
        project.style.border = colorArray[projectNum % (colorArray.length)] + " solid 3px";

        //Call function that clears the project selected
        clearProjectSelected();

        // Update number of projects
        projectNum++;

        //Add cloned project to DOM
        const projectManager = document.querySelector('#project-manager');
        projectManager.append(project);

        //Add event listner to new project - work in progress -
        document.querySelector('#'+project.id).addEventListener('click', updateProjectSelected);
        /*
        //Update event listners and project list
        projectList = document.querySelectorAll('.project');
        updateProjectEventListeners();
        */
    }
    else {
        projectLimit();
    }
  }

  //What happends when project limit is reached - message to console (for now)
  function projectLimit(){
    console.log("Project limit reached");
  }

  //Clears projectSelected (+1 to projectNum, making it out of bounds of later logic)
  function clearProjectSelected(){
    projectSelected = projectNum + 1;
  }

  //Keeps track of which project is currently selected  - work in progress -
  function updateProjectSelected(event){

    /* Test to get project id number from id
    currentProject = project.id;
    const projectInfo = projectID.split('-');

    console.log(projectInfo[1]);
    */

    //Connects to id of project that triggered the event
    var projectInfo = event.target.id.split('-');
    projectSelected = projectInfo;
  }
