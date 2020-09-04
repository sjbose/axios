// import axios from 'axios';
const axios = require('axios');

// GET REQUEST
//*METHOD-1

function getTodos() {
  axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
    params: {
      _limit: 5
    }
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
//*METHOD-2
// function getTodos() {
//   /**mentioning .get method is option as the default req method is get  */
//   axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
//     .then(res => showOutput(res))
//     .catch(err => console.log(err));
// }
//*FETCH
// function getTodos() {
//   fetch('https://jsonplaceholder.typicode.com/todos?_limit=1').then(response => response.json()).then(data => console.log(data));
// }

// POST REQUEST
//*METHOD-1
// function addTodo() {
//   axios({
//     method: 'post',
//     url: 'https://jsonplaceholder.typicode.com/todos',
//     data: {
//       title: 'new todo',
//       completed: false
//     }

//   })
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// }
//*METHOD-2
function addTodo() {

  axios.post('https://jsonplaceholder.typicode.com/todos', { title: 'new todo2', completed: false })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// PUT/PATCH REQUEST
//*METHOD-1
// function updateTodo() {
//   axios({
//     method: 'put',
//     url: 'https://jsonplaceholder.typicode.com/todos/1',
//     data: {
//       title: 'updated todo',
//       completed: false
//     }

//   })
//     .then(res => showOutput(res))
//     .catch(err => console.log(err));
// }
//*METHOD-2
// function updateTodo() {
//   axios({
//     method: 'patch',
//     url: 'https://jsonplaceholder.typicode.com/todos/1',
//     data: {
//       title: 'updated todo',
//       completed: false
//     }

//   })
//     .then(res => showOutput(res))
//     .catch(err => console.log(err));
// }
//*METHOD-3
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
    title: 'updated todo',
    completed: false
  })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// DELETE REQUEST
// //*METHOD-1
// function removeTodo() {
//   axios({
//     method: 'delete',
//     url: 'https://jsonplaceholder.typicode.com/todos/1',
//     data: null
//   })
//     .then(res => showOutput(res))
//     .catch(err => console.log(err));
// }
//*METHOD-2
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1', { data: null })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ]).then(res => {
    console.log(res[0]);
    console.log(res[1]);
    showOutput(res[1]);
  })
}

// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    header: {
      'Content-Type': 'application/json',
      Authorization: 'TOKEN'
    }
  }
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New todo',
    completed: false
  }, config).then(res => showOutput(res)).catch(err => console.log(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  axios.get('https://jsonplaceholder.typicode.com/todoss').then(res => showOutput(res))
    .catch(err => {
      if (error.response) {
        console.log(err.response.status);
        console.log(err.response.headers);
        console.log(err.response.data);
      }
    })
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
      config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
