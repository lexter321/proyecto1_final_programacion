async function buscarComponentes() {
    const query = document.getElementById("searchInput").value.trim();
    const contenedor = document.getElementById("componentes");
    contenedor.innerHTML = "<p>Cargando...</p>";

    try {
        const url = `https://jlcsearch.tscircuit.com/components/list.json?search=${query}`;
        const res = await fetch(url);
        const data = await res.json();

        console.log("Respuesta API:", data); // DEBUG

        // Validar que exista "components"
        if (!data.components || !Array.isArray(data.components)) {
            contenedor.innerHTML = `<p>No se pudo interpretar la respuesta de la API.</p>`;
            return;
        }

        const lista = data.components;

        // Si no hay resultados
        if (lista.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron componentes.</p>";
            return;
        }

        // Mostrar tarjetas
        contenedor.innerHTML = "";

        lista.slice(0, 20).forEach(comp => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h4>${comp.mfr || "Sin nombre"}</h4>
                <p><strong>Package:</strong> ${comp.package || "N/A"}</p>
                <p><strong>Stock:</strong> ${comp.stock || 0}</p>
                <p><strong>Precio:</strong> $${comp.price?.toFixed(3) || "0"}</p>
                <button onclick='agregarRecibo("${comp.mfr}", "${comp.price || 0}")'>
                    Añadir al recibo
                </button>
            `;

            contenedor.appendChild(card);
        });

    } catch (err) {
        contenedor.innerHTML = "<p>Error al buscar componentes.</p>";
        console.error("Error API:", err);
    }
}

function agregarRecibo(nombre, precio) {
    const lista = document.getElementById("lista");
    const item = document.createElement("p");
    item.textContent = `• ${nombre} - $${precio}`;
    lista.appendChild(item);
}

function borrarLista() {
    document.getElementById("lista").innerHTML = "";
}
