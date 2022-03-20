// const addBtn = document.querySelector('.addBtn');
// const lists = document.querySelector('.lists>ul');
// const form = document.querySelector('#form');

// function addTodoFunc() {
//     const todo = document.querySelector('.input--todo');
//     const li = document.createElement('li');
//     const deleteBtn = document.createElement('button');
//     deleteBtn.setAttribute('class', 'deleteBtn')
//     deleteBtn.textContent = '삭제';

//     li.textContent = todo.value;
//     li.appendChild(deleteBtn);

//     deleteBtn.addEventListener('click', () => {
//         lists.removeChild(li);
//     })
    
//     lists.appendChild(li);
//     todo.value = '';
// }

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     addTodoFunc();
// })


const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

/*
* 
*/
function onAdd() {
    const text = input.value;
    if(text === '') {
        input.focus();
        return;
    }
    const item = createItem(text);

    items.appendChild(item);

    item.scrollIntoView({block: 'center'});
    input.value= '';
    input.focus();
}

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const itemName = document.createElement('span');
    itemName.setAttribute('class', 'item__name');
    itemName.innerText = text;

    const itemDeleteBtn = document.createElement('button');
    itemDeleteBtn.setAttribute('class', 'item__delete');
    itemDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    itemDeleteBtn.addEventListener('click', () => {
        console.log(items);
        console.log(itemRow);
        items.removeChild(itemRow);
    });

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item__divider');

    item.appendChild(itemName);
    item.appendChild(itemDeleteBtn);

    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);

    return itemRow;
}

addBtn.addEventListener('click', () => {
    onAdd();
})

input.addEventListener('keypress', (event) => {
    if(event.keyCode === 13) {
        onAdd();
    }
})