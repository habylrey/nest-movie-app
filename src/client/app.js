const socket = io('http://localhost:3000');
const statusDiv = document.getElementById('status');
const startEditingBtn = document.getElementById('startEditing');
const stopEditingBtn = document.getElementById('stopEditing');
const errorDiv = document.getElementById('error');

function updateStatus(state) {
  if (state.isEditing) {
    if (state.editor && state.editor.contact) {
      statusDiv.innerHTML = `<p>Ресурс редактируется: ${state.editor.contact}</p>`;
    } else {
      statusDiv.innerHTML = `<p>Ресурс редактируется</p>`;
    }
    startEditingBtn.disabled = true;
    stopEditingBtn.disabled = false;
  } else {
    statusDiv.innerHTML = '<p>Ресурс свободен для редактирования</p>';
    startEditingBtn.disabled = false;
    stopEditingBtn.disabled = true;
  }
}

socket.on('roomIsFree', (data) => {
  statusDiv.innerHTML = `<p>${data.message}</p>`;
  startEditingBtn.disabled = false;
  stopEditingBtn.disabled = true;
});

socket.on('connect', () => {
  socket.emit('getEditingState');
});

socket.on('currentState', (state) => {
  updateStatus(state);
});

socket.on('connect_error', (err) => {
  errorDiv.textContent = 'Ошибка подключения к серверу WebSocket.';
  console.error('Ошибка подключения:', err);
});
