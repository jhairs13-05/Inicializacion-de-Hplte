(function () {
    const METRICAS = {
        registros: { nombre: 'Registros', unidad: '' },
        petroleo: { nombre: 'Petróleo', unidad: 'bbl/día' },
        gas: { nombre: 'Gas total', unidad: 'Mm³/día' },
        agua: { nombre: 'Agua', unidad: 'bbl/día' }
    };
    const GRUPOS = { estado: 'estado', cuenca: 'cuenca', operador: 'operador' };
    const GRUPO_TITULO = { estado: 'estado', cuenca: 'cuenca', operador: 'operador (10 principales)' };
    const fmt = (n) => n.toLocaleString('es-EC', { maximumFractionDigits: 2 });
    const $ = (id) => document.getElementById(id);

    // Aviso inicial y menú
    const aviso = $('aviso');
    if (aviso && aviso.showModal) aviso.showModal();
    $('aviso-cerrar').addEventListener('click', () => aviso.close());
    $('menu-boton').addEventListener('click', (e) => {
        const menu = $('menu');
        menu.hidden = !menu.hidden;
        e.target.setAttribute('aria-expanded', String(!menu.hidden));
        e.target.textContent = menu.hidden ? 'Abrir menú' : 'Cerrar menú';
    });

    // Resumen
    $('kpi-registros').textContent = fmt(DATOS.total);
    $('kpi-pozos').textContent = fmt(DATOS.pozos);
    $('kpi-campos').textContent = fmt(DATOS.campos);
    $('kpi-operadores').textContent = fmt(DATOS.operadores);
    $('kpi-estados').textContent = fmt(DATOS.estados);

    // Mapa
    const mapa = L.map('mapa-brasil').setView([-10, -48], 4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: '&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    const marcadores = {};
    const cuencasPorEstado = {
        'Rio Grande do Norte': ['Potiguar'], 'Ceará': ['Potiguar'], 'Bahia': ['Recôncavo', 'Tucano Sul', 'Camamu'],
        'Sergipe': ['Sergipe'], 'Alagoas': ['Alagoas'], 'Espírito Santo': ['Espírito Santo'],
        'Amazonas': ['Solimões', 'Amazonas'], 'Maranhão': ['Parnaíba', 'Barreirinhas'], 'Paraná': ['Paraná']
    };

    function detalleEstado(nombre) {
        const d = DATOS.estado[nombre];
        return nombre + ': ' + fmt(d.registros) + ' registros (' + (100 * d.registros / DATOS.total).toFixed(1) + '%), ' +
            'petróleo ' + fmt(d.petroleo) + ' bbl/día, gas ' + fmt(d.gas) + ' Mm³/día, agua ' + fmt(d.agua) + ' bbl/día. ' +
            'Cuenca(s): ' + cuencasPorEstado[nombre].join(', ') + '.';
    }

    function seleccionarEstado(nombre) {
        $('mapa-detalle').textContent = detalleEstado(nombre);
        marcadores[nombre].openPopup();
        mapa.panTo(marcadores[nombre].getLatLng());
    }

    function dibujarMapa(metrica) {
        const nombres = Object.keys(DATOS.estado);
        const max = Math.max(...nombres.map((n) => DATOS.estado[n][metrica]));
        nombres.forEach((n) => {
            const d = DATOS.estado[n];
            const radio = 6 + 34 * Math.sqrt(d[metrica] / max);
            if (!marcadores[n]) {
                marcadores[n] = L.circleMarker([d.lat, d.lng], { weight: 2, fillOpacity: 0.55 }).addTo(mapa);
                marcadores[n].on('click', () => { $('mapa-detalle').textContent = detalleEstado(n); });
            }
            marcadores[n].setRadius(radio);
            marcadores[n].bindPopup('<strong>' + n + '</strong><br>' + METRICAS[metrica].nombre + ': ' +
                fmt(d[metrica]) + ' ' + METRICAS[metrica].unidad);
        });
    }

    const lista = $('mapa-lista');
    Object.keys(DATOS.estado).forEach((n) => {
        const li = document.createElement('li');
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = n;
        b.addEventListener('click', () => seleccionarEstado(n));
        li.appendChild(b);
        lista.appendChild(li);
    });

    dibujarMapa('registros');
    document.querySelectorAll('input[name="mapa-metrica"]').forEach((r) =>
        r.addEventListener('change', (e) => dibujarMapa(e.target.value)));

    // Gráfico de población
    const PALETA = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed', '#0891b2', '#db2777', '#65a30d', '#ea580c', '#4b5563', '#0d9488', '#9333ea'];
    let grafico;

    function dibujarGrafico() {
        const grupo = $('grafico-grupo').value;
        const metrica = $('grafico-metrica').value;
        const tipo = $('grafico-tipo').value;
        const datos = DATOS[GRUPOS[grupo]];
        const etiquetas = Object.keys(datos);
        const valores = etiquetas.map((k) => datos[k][metrica]);
        const m = METRICAS[metrica];
        const etiquetaEje = m.nombre + (m.unidad ? ' (' + m.unidad + ')' : '');

        if (grafico) grafico.destroy();
        grafico = new Chart($('grafico-poblacion'), {
            type: tipo,
            data: {
                labels: etiquetas,
                datasets: [{
                    label: etiquetaEje,
                    data: valores,
                    backgroundColor: etiquetas.map((_, i) => PALETA[i % PALETA.length])
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: tipo === 'bar' ? 'y' : 'x',
                plugins: {
                    legend: { display: tipo !== 'bar' },
                    title: { display: true, text: etiquetaEje + ' por ' + GRUPO_TITULO[grupo] },
                    tooltip: {
                        callbacks: {
                            label: (c) => {
                                const total = valores.reduce((a, b) => a + b, 0);
                                const pct = total ? ' (' + (100 * c.raw / total).toFixed(1) + '%)' : '';
                                return fmt(c.raw) + ' ' + m.unidad + pct;
                            }
                        }
                    }
                }
            }
        });

        $('grafico-leyenda').textContent = etiquetaEje + ' por ' + GRUPO_TITULO[grupo] +
            '. Pasa el cursor o toca una barra para ver el valor.';
        llenarTabla(grupo, datos);
    }

    function llenarTabla(grupo, datos) {
        $('tabla-titulo').textContent = 'Población por ' + GRUPO_TITULO[grupo];
        const cuerpo = document.querySelector('#tabla-poblacion tbody');
        cuerpo.innerHTML = '';
        Object.keys(datos).forEach((k) => {
            const d = datos[k];
            const tr = document.createElement('tr');
            [k, fmt(d.registros), (100 * d.registros / DATOS.total).toFixed(2) + '%', fmt(d.petroleo), fmt(d.gas), fmt(d.agua)]
                .forEach((v, i) => {
                    const td = document.createElement(i === 0 ? 'th' : 'td');
                    if (i === 0) td.scope = 'row';
                    td.textContent = v;
                    tr.appendChild(td);
                });
            cuerpo.appendChild(tr);
        });
    }

    ['grafico-grupo', 'grafico-metrica', 'grafico-tipo'].forEach((id) => $(id).addEventListener('change', dibujarGrafico));
    dibujarGrafico();
})();
