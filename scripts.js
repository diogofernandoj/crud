const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('#tbody')
const mName = document.querySelector('#m-name')
const mFunction = document.querySelector('#m-function')
const mSalary = document.querySelector('#m-salary')
const saveBtn = document.querySelector('#save-btn')

let items
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      closeModal()
    }
  }

  if (edit) {
    mName.value = items[index].name
    mFunction.value = items[index].function
    mSalary.value = items[index].salary
    id = index
  } else {
    mName.value = ''
    mFunction.value = ''
    mSalary.value = ''
  }
  
}
function closeModal() {
    id = undefined
    modal.classList.remove("active")
}

function editItem(index) {
    openModal(true, index)
}

function deleteItem(index) {
  items.splice(index, 1)
  setItemsDB()
  loaditems()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.function}</td>
    <td>R$ ${item.salary}</td>
    <td><i onclick="editItem(${index})" class='fa-solid fa-pen-to-square'></i> <i onclick="deleteItem(${index})" class='fa-solid fa-trash'></i></td>
  `
  tbody.appendChild(tr)
}

saveBtn.onclick = e => {
  
  if (mName.value == '' || mFunction.value == '' || mSalary.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    items[id].name = mName.value
    items[id].function = mFunction.value
    items[id].salary = mSalary.value
  } else {
    items.push({'name': mName.value, 'function': mFunction.value, 'salary': mSalary.value})
  }

  setItemsDB()

  closeModal()
  loaditems()
}

function loaditems() {
  items = getItemsDB()
  tbody.innerHTML = ''
  items.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItemsDB = () => JSON.parse(localStorage.getItem('dbEmployees')) ?? [{'name': 'Diogo Jorge', 'function': 'Desenvolvedor', 'salary': 1000}]
const setItemsDB = () => localStorage.setItem('dbEmployees', JSON.stringify(items))

loaditems()