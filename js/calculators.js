function calculateCubicaje() {
    const truckLength = parseFloat(document.getElementById('truckLength').value);
    const truckWidth = parseFloat(document.getElementById('truckWidth').value);
    const truckHeight = parseFloat(document.getElementById('truckHeight').value);
    const palletLength = parseFloat(document.getElementById('palletLength').value);
    const palletWidth = parseFloat(document.getElementById('palletWidth').value);
    const palletHeight = parseFloat(document.getElementById('palletHeight').value);

    if (isNaN(truckLength) || isNaN(truckWidth) || isNaN(truckHeight) ||
        isNaN(palletLength) || isNaN(palletWidth) || isNaN(palletHeight)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos.');
        return;
    }

    if (truckLength <= 0 || truckWidth <= 0 || truckHeight <= 0 ||
        palletLength <= 0 || palletWidth <= 0 || palletHeight <= 0) {
        alert('Todas las dimensiones deben ser mayores a cero.');
        return;
    }

    const truckVolume = truckLength * truckWidth * truckHeight;
    const palletVolume = palletLength * palletWidth * palletHeight;
    const palletsInLength = Math.floor(truckLength / palletLength);
    const palletsInWidth = Math.floor(truckWidth / palletWidth);
    const palletsInHeight = Math.floor(truckHeight / palletHeight);
    const palletsReal = palletsInLength * palletsInWidth * palletsInHeight;
    const palletsTheoretical = truckVolume / palletVolume;
    const usedSpace = palletsReal * palletVolume;
    const wastedSpace = truckVolume - usedSpace;
    const efficiency = (usedSpace / truckVolume) * 100;

    const resultDiv = document.getElementById('cubicajeResult');
    const resultText = document.getElementById('cubicajeResultText');

    resultText.innerHTML = `
        <div class="mb-3">Volumen del camión: <span class="text-info fs-5">${truckVolume.toFixed(2)} m³</span></div>
        <div class="mb-3">Volumen del pallet: <span class="text-info fs-5">${palletVolume.toFixed(2)} m³</span></div>

        <div class="border border-warning p-3 rounded mb-3">
            <div class="small text-warning mb-2">Distribución física:</div>
            <div class="small">
                <strong>Largo:</strong> ${palletsInLength} pallets (${truckLength.toFixed(2)}m ÷ ${palletLength}m)<br>
                <strong>Ancho:</strong> ${palletsInWidth} pallets (${truckWidth.toFixed(2)}m ÷ ${palletWidth}m)<br>
                <strong>Alto:</strong> ${palletsInHeight} pallets apilados (${truckHeight.toFixed(2)}m ÷ ${palletHeight}m)
            </div>
        </div>

        <div class="mt-4 mb-3">
            <div class="text-light mb-2">Cantidad real de pallets que caben:</div>
            <div class="result-highlight">${palletsReal} pallets</div>
        </div>

        <div class="border border-info p-3 rounded mt-3">
            <div class="small">
                <strong>Eficiencia de espacio:</strong> ${efficiency.toFixed(1)}%<br>
                <strong>Espacio utilizado:</strong> ${usedSpace.toFixed(2)} m³<br>
                <strong>Espacio desperdiciado:</strong> ${wastedSpace.toFixed(2)} m³<br>
                <span class="text-muted">(Cálculo teórico volumétrico: ${palletsTheoretical.toFixed(2)} pallets - no considera dimensiones reales)</span>
            </div>
        </div>
    `;

    resultDiv.style.display = 'block';
}

function resetCubicaje() {
    document.getElementById('truckLength').value = '';
    document.getElementById('truckWidth').value = '';
    document.getElementById('truckHeight').value = '';
    document.getElementById('palletLength').value = '';
    document.getElementById('palletWidth').value = '';
    document.getElementById('palletHeight').value = '';
    document.getElementById('cubicajeResult').style.display = 'none';
}

function calculateCEP() {
    const demand = parseFloat(document.getElementById('annualDemand').value);
    const orderCost = parseFloat(document.getElementById('orderCost').value);
    const holdingCost = parseFloat(document.getElementById('holdingCost').value);

    if (isNaN(demand) || isNaN(orderCost) || isNaN(holdingCost)) {
        alert('Por favor, completa todos los campos con valores numéricos válidos.');
        return;
    }

    if (demand <= 0 || orderCost <= 0 || holdingCost <= 0) {
        alert('Todos los valores deben ser mayores a cero.');
        return;
    }

    const cep = Math.sqrt((2 * demand * orderCost) / holdingCost);
    const numberOfOrders = demand / cep;
    const totalOrderCost = numberOfOrders * orderCost;
    const averageInventory = cep / 2;
    const totalHoldingCost = averageInventory * holdingCost;
    const totalCost = totalOrderCost + totalHoldingCost;

    const resultDiv = document.getElementById('cepResult');
    const resultText = document.getElementById('cepResultText');
    const detailsDiv = document.getElementById('cepDetails');

    resultText.innerHTML = `
        <div class="fs-3 text-success">CEP = ${Math.round(cep)} unidades</div>
    `;

    detailsDiv.innerHTML = `
        <div class="border border-success p-3 rounded">
            <h6 class="text-success">Detalles del Cálculo:</h6>
            <ul class="mb-0">
                <li>Número de pedidos al año: <strong>${numberOfOrders.toFixed(2)}</strong></li>
                <li>Costo total de pedidos: <strong>$${totalOrderCost.toFixed(2)}</strong></li>
                <li>Inventario promedio: <strong>${averageInventory.toFixed(2)} unidades</strong></li>
                <li>Costo total de mantener inventario: <strong>$${totalHoldingCost.toFixed(2)}</strong></li>
                <li>Costo total anual: <strong>$${totalCost.toFixed(2)}</strong></li>
            </ul>
        </div>
    `;

    resultDiv.style.display = 'block';
}

function resetCEP() {
    document.getElementById('annualDemand').value = '';
    document.getElementById('orderCost').value = '';
    document.getElementById('holdingCost').value = '';
    document.getElementById('cepResult').style.display = 'none';
}

function calculateVANTIR() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const discountRate = parseFloat(document.getElementById('discountRate').value) / 100;

    if (isNaN(initialInvestment) || isNaN(discountRate)) {
        alert('Por favor, ingresa la inversión inicial y la tasa de descuento.');
        return;
    }

    if (initialInvestment <= 0) {
        alert('La inversión inicial debe ser mayor a cero.');
        return;
    }

    const cashFlows = [];
    for (let i = 1; i <= 5; i++) {
        const cf = parseFloat(document.getElementById(`cashFlow${i}`).value);
        if (!isNaN(cf) && cf !== 0) {
            cashFlows.push(cf);
        }
    }

    if (cashFlows.length === 0) {
        alert('Por favor, ingresa al menos un flujo de caja.');
        return;
    }

    let van = -initialInvestment;
    let vanDetails = '<div class="border border-warning p-3 rounded text-start"><h6 class="text-warning">Cálculo del VAN:</h6><table class="table table-sm table-dark table-striped"><thead><tr><th>Año</th><th>Flujo ($)</th><th>Factor</th><th>Valor Presente ($)</th></tr></thead><tbody>';

    for (let i = 0; i < cashFlows.length; i++) {
        const year = i + 1;
        const factor = 1 / Math.pow(1 + discountRate, year);
        const presentValue = cashFlows[i] * factor;
        van += presentValue;

        vanDetails += `<tr><td>${year}</td><td>${cashFlows[i].toLocaleString('es-CL')}</td><td>${factor.toFixed(4)}</td><td>${presentValue.toLocaleString('es-CL', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td></tr>`;
    }

    vanDetails += `</tbody></table><p class="mb-0 mt-2"><strong>Inversión Inicial:</strong> -$${initialInvestment.toLocaleString('es-CL')}<br><strong>VAN Total:</strong> <span class="${van >= 0 ? 'text-success' : 'text-danger'} fs-5">$${van.toLocaleString('es-CL', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p></div>`;

    let tir = calculateTIR(initialInvestment, cashFlows);
    let interpretation = '<div class="border border-info p-3 rounded mt-3"><h6 class="text-info">Interpretación:</h6><ul class="mb-0">';

    if (van > 0) {
        interpretation += `<li><strong>VAN positivo:</strong> El proyecto genera valor y es rentable.</li>`;
    } else if (van < 0) {
        interpretation += `<li><strong>VAN negativo:</strong> El proyecto destruye valor y no es rentable.</li>`;
    } else {
        interpretation += `<li><strong>VAN igual a cero:</strong> El proyecto recupera exactamente la inversión.</li>`;
    }

    if (tir !== null) {
        interpretation += `<li><strong>TIR de ${(tir * 100).toFixed(2)}%:</strong> `;
        if (tir > discountRate) {
            interpretation += `Superior a la tasa de descuento (${(discountRate * 100).toFixed(1)}%), el proyecto es rentable.</li>`;
        } else if (tir < discountRate) {
            interpretation += `Inferior a la tasa de descuento (${(discountRate * 100).toFixed(1)}%), el proyecto no es rentable.</li>`;
        } else {
            interpretation += `Igual a la tasa de descuento, el proyecto es indiferente.</li>`;
        }
    }

    interpretation += '</ul></div>';

    const resultDiv = document.getElementById('vantirResult');
    const resultText = document.getElementById('vantirResultText');
    const detailsDiv = document.getElementById('vantirDetails');

    resultText.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="fs-5">VAN</div>
                <div class="fs-3 ${van >= 0 ? 'text-success' : 'text-danger'}">$${van.toLocaleString('es-CL', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
            <div class="col-md-6">
                <div class="fs-5">TIR</div>
                <div class="fs-3 ${tir && tir > discountRate ? 'text-success' : 'text-danger'}">${tir !== null ? (tir * 100).toFixed(2) + '%' : 'N/A'}</div>
            </div>
        </div>
    `;

    detailsDiv.innerHTML = vanDetails + interpretation;

    resultDiv.style.display = 'block';
}

function calculateTIR(initialInvestment, cashFlows) {
    let tir = 0.1; // Valor inicial del 10%
    const maxIterations = 1000;
    const tolerance = 0.0001;

    for (let i = 0; i < maxIterations; i++) {
        let npv = -initialInvestment;
        let derivative = 0;

        for (let j = 0; j < cashFlows.length; j++) {
            const year = j + 1;
            npv += cashFlows[j] / Math.pow(1 + tir, year);
            derivative -= (year * cashFlows[j]) / Math.pow(1 + tir, year + 1);
        }

        if (Math.abs(npv) < tolerance) {
            return tir;
        }

        if (derivative === 0) {
            return null;
        }

        tir = tir - npv / derivative;

        if (tir < -0.99) {
            return null;
        }
    }

    return tir;
}

function resetVANTIR() {
    document.getElementById('initialInvestment').value = '';
    document.getElementById('discountRate').value = '';
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`cashFlow${i}`).value = '';
    }
    document.getElementById('vantirResult').style.display = 'none';
}
