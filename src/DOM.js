import { createDOMElement } from "./helpers.js";

function createSearchForm(){
    const form = createDOMElement({elemType:"form", noValidate: true })
    const div = document.createElement("div")
    const label = createDOMElement({elemType:"label", for:"search-location", textContent:"Search"})
    const searchInput = createDOMElement({elemType:"input", id:"search-location"})
    const submitBtn = createDOMElement({elemType:"button", textContent:"search"})

    div.append(label, searchInput)
    form.append(div, submitBtn)
    document.body.append(form)

    return form
}

export { createSearchForm }