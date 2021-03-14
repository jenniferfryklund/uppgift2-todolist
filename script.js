
// let title = document.createElement(p);
// title.innerText = todoInput.title

// let buttonDone = document.createElement('button');
// buttonDone.classList.add('btn', 'btn-danger');
// buttonDone.innertext = 'Not finnished'
// buttonDone.add.addEventListener('click', () => {
//     card.classList.remove('undone');
//     card.classList.remove('done');
//     // todo.completed = !todo.completed;
// });


// let buttonNotDone = document.createElement('button');
// buttonNotDone.classList.add('btn', 'btn-dark');
// buttonNotDone.innertext = 'Not finnished'
// buttonNotDone.add.addEventListener('click', () => {
//     card.classList.remove('done');
//     card.classList.remove('undone');
// });


// let buttonDelete = document.createElement('button');
// buttonDelete.classList.add('btn', 'btn-danger');
// buttonDelete.innertext = 'Not finnished'
// buttonDelete.add.addEventListener('click', () => {
//     card.classList.remove('undone');
//     card.classList.remove('done')
// });





const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];

const fetchTodos = () => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(res => res.json())
        .then(data => {
            todos = data;
            // console.log(todos);
            listTodos();
        })
}
fetchTodos();


const listTodos = () => {
    output.innerHTML = '';
    todos.forEach(todo => {
        // let template = `
        // <div class="card p-3 my-2">
        //   <div class="d-flex justify-content-between align-items-center">
        //     <h3>${todo.title}</h3>
        //     <button class="btn btn-danger">X</button>
        //   </div>
        // </div>
        // `
        // output.insertAdjacentHTML('beforeend', template)
        // output.innerHTML += template;
        newTodo(todo);
    })
}

const newTodo = (todo) => {

    let card = document.createElement('div');
    card.classList.add('card', 'p-3', 'my-2');

    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    let title = document.createElement('h3');
    title.innerText = todo.title;

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-danger');
    button.innerText = 'X';
    button.addEventListener('click', () => {
        console.log(todo.id)
    })

    innerCard.appendChild(title);
    innerCard.appendChild(button);
    card.appendChild(innerCard);
    output.appendChild(card);

}


const createTodo = (title) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title,
            completed: false
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let newTodo = {
                ...data,
                id: Date.now().toString()
            }
            console.log(newTodo);
            todos.unshift(newTodo);
            listTodos();
        })
}


form.addEventListener('submit', e => {
    e.preventDefault();

    createTodo(input.value);
    // input.value = '';
    form.reset();
})
