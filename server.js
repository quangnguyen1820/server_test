const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [
    { id: 1, image: 'url', location: '0', sex: 'Nam', birthDay: '18/01/1998', cmnd: '01234578912', email: 'thanhquang8426', dateRange: '30/01/2020', phone: '0896679801', locationRange: "HCM", username: 'user1', password: 'password1', name: 'User One' },
    { id: 2, username: 'user2', password: 'password2', name: 'User Two' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === req.body.userName && u.password === req.body.password);

    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

app.get('/profile/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

app.put('/update-user', (req, res) => {
    const updatedUser = req.body;
    console.log("updatedUser", updatedUser)
    const existingUserIndex = users.findIndex(user => user.id === updatedUser.id);
    if (existingUserIndex !== -1) {
        users[existingUserIndex] = { ...users[existingUserIndex], ...updatedUser };
        res.send('User updated successfully');
    } else {
        res.status(404).send('User not found');
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});