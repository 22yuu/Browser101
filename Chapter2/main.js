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

let id = 0; // 이렇게 고유한 아이디 값을 정수값을 지정해주는 것보다 UUID, 오브젝트에 있는 해시코드를 이용해서 고유한 아이디를 만드는 것이 좋다.
function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');
    itemRow.setAttribute('data-id', id);
    itemRow.innerHTML = `
        <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
        <div class="item__divider"></div>
    `
    // const item = document.createElement('div');
    // item.setAttribute('class', 'item');

    // const itemName = document.createElement('span');
    // itemName.setAttribute('class', 'item__name');
    // itemName.innerText = text;

    // const itemDeleteBtn = document.createElement('button');
    // itemDeleteBtn.setAttribute('class', 'item__delete');
    // itemDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // itemDeleteBtn.addEventListener('click', () => {
    //     console.log(items);
    //     console.log(itemRow);
    //     items.removeChild(itemRow);
    // });

    // const itemDivider = document.createElement('div');
    // itemDivider.setAttribute('class', 'item__divider');

    // item.appendChild(itemName);
    // item.appendChild(itemDeleteBtn);

    // itemRow.appendChild(item);
    // itemRow.appendChild(itemDivider);

    id++;
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

items.addEventListener('click', event => {
    const id = event.target.dataset.id;
    if(id) {
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`)
        toBeDeleted.remove();
    }
})