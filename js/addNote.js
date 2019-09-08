let noteName = document.getElementById("noteName");
let noteDesc = document.getElementById("noteDesc");
let noteBtn = document.getElementById("noteBtn");
let currentIndex = 0;
let searchInp = document.getElementById("searchInp");
let noteContainer;

if(localStorage.getItem("notes") == null)
{
    noteContainer = [];
}
else
{
    noteContainer = JSON.parse(localStorage.getItem("notes"));
    displayNote();
}

noteBtn.onclick = function(){
    if(noteBtn.innerHTML == "Add Note")
    {
        addNote();
        displayNote();
    }
    else
    {
        updateNote();
        displayNote();
    }
}

function addNote(){
    note =
    {
        name:noteName.value,
        desc:noteDesc.value
    }
    noteContainer.push(note);
    localStorage.setItem("notes" , JSON.stringify(noteContainer))
    
}

function displayNote(){
    let cols ="";
    for(let i= 0; i< noteContainer.length; i++)
    {
        cols+=`<div class="col-md-6 py-4 text-center text-white">
        <h3 class="bg-secondary pb-2">${noteContainer[i].name}</h3>
        <textarea cols="74">${noteContainer[i].desc}</textarea>
        <button onclick="deleteNote(${i})" class="btn btn-danger my-2 mx-2">Delete</button>
        <button onclick="setNote(${i})" class="btn btn-light my-2">Update</button>
    </div>
    `
    }
    document.getElementById("rowDate").innerHTML = cols;
}
function setNote(i)
{
    noteName.value = noteContainer[i].name; 
    noteDesc.value = noteContainer[i].desc;

    noteBtn.innerHTML = "Update Note";
    currentIndex = i;
}
function updateNote()
{
    noteContainer[currentIndex].name = noteName.value;
    noteContainer[currentIndex].desc = noteDesc.value;

    noteBtn.innerHTML = "Add Note";
    localStorage.setItem("notes" , JSON.stringify(noteContainer))

}
function deleteNote(id)
{
    noteContainer.splice(id , 1);
    displayNote();
    localStorage.setItem("notes" , JSON.stringify(noteContainer))

}
searchInp.onkeydown = function(){
    searchRow(searchInp.value);
}
function searchRow(term){
    let rowSearch="";
    for(let i= 0; i< noteContainer.length; i++)
    {
        if(noteContainer[i].name.includes(term))
        {
            rowSearch+= `<div class="col-md-6 py-4 text-center text-white">
            <h3 class="bg-secondary pb-2">${noteContainer[i].name}</h3>
            <textarea cols="74">${noteContainer[i].desc}</textarea>
            <button onclick="deleteNote(${i})" class="btn btn-danger my-2 mx-2">Delete</button>
            <button class="btn btn-light my-2">Update</button>
        </div>
        `
        }
    }
    document.getElementById("searchRow").innerHTML= rowSearch;
}