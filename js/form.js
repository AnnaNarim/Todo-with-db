const root = document.getElementById('root');
const API_URL = 'http://localhost:3000/api/todos';
const API_URL_INDEX = 'http://localhost:3000/api/todos/';

const formComponent = () => `
          <h1>My todos</h1>
          <p id='unfilled' style='color: red'></p>
          <input type='text' id='addInput'>
          <button id='addB' onclick='add()'>Add</button>
        `;
const add = () => {
  const text = document.getElementById('addInput').value;
  if (text === '') {
    document.getElementById('unfilled').innerHTML = 'Input field is empty';
  } else {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then(console.log('success'))
      .then(getdata())
      .then(console.log('after success'))
      .catch(console.error);
  }
};
const getdata = () => {
  fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => { console.log('getdata', resp); return resp; })
    .then(resp => resp.json())
    .then((data) => {
      root.innerHTML = formComponent();
      root.innerHTML += makeListComponent(data);
      return root;
    })
    .catch(console.error);
  return true;
};

const makeListComponent = (data) => {
  if (data) {
    return `
      <ul>
        ${data.map((item) => {
    if (item.active === 1) {
      return `<li>${item.todo}</li>
            <button onclick='edit(this, ${item.id})'>Edit</button>
            <button onclick='deleteTodo(this, ${item.id})'>Delete</button>
            `;
    }
  }).join('')
}
      </ul>
    `;
  }
};
const edit = (e, index) => {
  document.getElementById('addInput').value = e.previousSibling.previousSibling.innerHTML;
  document.getElementById('addB').innerHTML = 'Update';
  document.getElementById('addB').onclick = () => update(index);
};
const update = (index) => {
  const value = document.getElementById('addInput').value;
  if (value === '') {
    document.getElementById('unfilled').innerHTML = 'Input field is empty';
  } else {
    fetch(API_URL_INDEX + index, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value, id: index }),
    })
      .then(getdata());
    document.getElementById('addB').innerHTML = 'Add';
    document.getElementById('addB').onclick = () => add();
  }
};
const deleteTodo = (e, index) => {
  fetch(API_URL_INDEX + index, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: index }),
  })
    .then(getdata());
};
getdata();
