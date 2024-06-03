

let data = []

var savelists = ""

const local = JSON.parse( localStorage.getItem("data") )

if (local) {
    data = local
    render(data)
}



function render(links) {
    
    savelists = ""

    const list = document.getElementById("list")

    for (let i = 0; i < links.length; i++) {
        if (links[i] != "") {
            savelists += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
            
        `
        }
    }
    list.innerHTML = savelists
}




document.getElementById("clr").addEventListener("dblclick", function() {

    localStorage.clear()
    data = []
    render(data)
})



document.getElementById("tab").addEventListener("click", function () {    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        data.push(tabs[0].url)
        localStorage.setItem("data", JSON.stringify(data) )
        render(data)
    })
})


document.getElementById("save").addEventListener("click", function() {
    const input = document.getElementById("input")

    data.push(input.value)
    input.value = ""
    localStorage.setItem("data", JSON.stringify(data) )
    render(data)
})