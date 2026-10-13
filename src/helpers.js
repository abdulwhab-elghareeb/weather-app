export function createDOMElement(obj){
    const createdElement = document.createElement(obj.elemType);
    
    if (obj.textContent) createdElement.textContent = obj.textContent
    if (obj.className) createdElement.classList.add(obj.className)
    if (obj.id) createdElement.setAttribute("id", obj.id)
    if (obj.dataId) createdElement.dataset.id = obj.dataId
    if (obj.src) createdElement.src = obj.src
    if (obj.height || obj.width) createdElement.height = createdElement.width = obj.height
    if (obj.value) createdElement.value = obj.value
    if (obj.type) createdElement.type = obj.type
    if (obj.for) createdElement.htmlFor = obj.for
    if (obj.parent) obj.parent.appendChild(createdElement)
    if (obj.noValidate) createdElement.noValidate = obj.noValidate

    return createdElement
}
