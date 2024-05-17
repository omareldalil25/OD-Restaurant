function toggleReservation(button) {
    const tableName = button.parentElement.querySelector('p').textContent;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (button.classList.contains('reserved')) {
        button.classList.remove('reserved');
        button.textContent = 'Reserve';
        document.getElementById('message').textContent = `${tableName} reservation for ${date} at ${time} has been cancelled.`;
    } else {
        button.classList.add('reserved');
        button.textContent = '✓';
        document.getElementById('message').textContent = `${tableName} has been successfully reserved for ${date} at ${time}!`;
    }
}
