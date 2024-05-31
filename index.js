


let localdata = []


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("localdata") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    localdata = leadsFromLocalStorage
    render(localdata)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        localdata.push(tabs[0].url)
        localStorage.setItem("localdata", JSON.stringify(localdata) )
        render(localdata)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    localdata = []
    render(localdata)
})

inputBtn.addEventListener("click", function() {
    localdata.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("localdata", JSON.stringify(localdata) )
    render(localdata)
})