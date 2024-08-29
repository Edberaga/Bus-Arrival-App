const bus = [];

async function searchBus() {
    isLoading('block');
    const id = document.getElementById('bus-number').value;
    const url = await fetch(`https://sg-bus-arrivals-sigma-schoolsc1.replit.app/?id=${id}`);
    
    if(!url.ok) {
        alert("Invalid bus number. Please try again.");
        isLoading('none')
        return;
    }
    const res = await url.json();
    isLoading('none');

    for(const data of res.services) {
        bus.push({
            bus_no: data.bus_no,
            next_bus_mins: data.next_bus_mins
        });
    }
    
    displayBus();
}

function displayBus() {
    const display = document.getElementById('display-data');
    display.style.display = 'block';

    const list = document.getElementById("display-bus-info");
    for(const data of bus) {
        const li = document.createElement("li");
        li.textContent = `Bus No: ${data.bus_no}, Next Bus: ${data.next_bus_mins} minutes`;
        list.appendChild(li);
    }
}

function isLoading(text) {
    const loading = document.getElementById('loading');
    loading.style.display = text;
}