


let localdata = []


const inputEl = document.getElementById("input")
const inputBtn = document.getElementById("save")
const deleteBtn = document.getElementById("clr")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("localdata") )


if (leadsFromLocalStorage) {
    localdata = leadsFromLocalStorage
    render(localdata)
}




function main() {
    
    let tabBtn = document.getElementById("tab")
    tabBtn.addEventListener("click", function(){    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            localdata.push(tabs[0].url)
            localStorage.setItem("localdata", JSON.stringify(localdata) )
            render(localdata)
        })
    })
}

main()



function render(leads) {

const ulEl = document.getElementById("list")

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