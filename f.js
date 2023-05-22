const userForm = document.querySelector('#user-form');
const userTable = document.querySelector('#user-table tbody');

let users = [];

// Add user to table and array
userForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const name = userForm.elements.name.value;
	const id = userForm.elements.id.value;
	const country = userForm.elements.country.value;
	const languages = userForm.elements.languages.value;

	const user = { name, id, country, languages };
	users.push(user);
	renderUsers();
	userForm.reset();
});

// Render users in table
function renderUsers() {
	userTable.innerHTML = '';
	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${user.name}</td>
			<td>${user.id}</td>
			<td>${user.country}</td>
			<td>${user.languages}</td>
			<td><button data-index="${i}">Delete</button></td>
		`;
		userTable.appendChild(row);
	}
}

// Delete user from array and table
userTable.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const index = e.target.dataset.index;
		users.splice(index, 1);
		renderUsers();
	}
});

// Update user in array and table
userTable.addEventListener('dblclick', (e) => {
	if (e.target.tagName === 'TD') {
		const input = document.createElement('input');
		input.value = e.target.textContent;
		e.target.textContent = '';
		e.target.appendChild(input);
		input.addEventListener('blur', () => {
			const newValue = input.value;
			const property = e.target.cellIndex;
			const index = e.target.parentNode.rowIndex - 1;
			users[index][property] = newValue;
			renderUsers();
		});
	}
});

// Initialize user table
renderUsers();