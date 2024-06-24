document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticketForm');
    const ticketList = document.getElementById('ticketList');

    ticketForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;

        if (title && description && priority) {
            const success = await createTicket(title, description, priority);
            if (success) {
                ticketForm.reset(); // Limpiar el formulario después de enviar el ticket
                console.log('Formulario limpiado');
            }
        }
    });

    async function createTicket(title, description, priority) {
        try {
            const response = await fetch('/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, priority })
            });

            if (response.ok) {
                const ticket = await response.json();
                addTicketToList(ticket);
                return true;
            } else {
                console.error('Error al crear el ticket');
                return false;
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            return false;
        }
    }

    function addTicketToList(ticket) {
        const li = document.createElement('li');
        li.textContent = `${ticket.title} (${ticket.priority}): ${ticket.description}`;
        ticketList.appendChild(li);
    }

    async function loadTickets() {
        try {
            const response = await fetch('/tickets');
            if (response.ok) {
                const tickets = await response.json();
                tickets.forEach(addTicketToList);
            } else {
                console.error('Error al cargar los tickets');
            }
        } catch (error) {
            console.error('Error al cargar los tickets:', error);
        }
    }

    loadTickets();
});

