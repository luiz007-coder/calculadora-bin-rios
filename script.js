        let isBinaryMode = true;
        let operation = null;

        // função de binário p dec
        function convertToDecimal() {
            let binInput = document.getElementById('binInput').value;
            let binToDecResult = document.getElementById('binToDecResult');
            if (binInput === "") {
                binToDecResult.textContent = '0';
                binToDecResult.style.color = 'white';
            } else if (/^[01]+$/.test(binInput)) {
                binToDecResult.textContent = parseInt(binInput, 2);
                binToDecResult.style.color = 'white';
            } else {
                binToDecResult.textContent = 'Binário inválido';
                binToDecResult.style.color = 'red';
            }
        }

        // função de dec p binário
        function convertToBinary() {
            let decInput = document.getElementById('decInput').value;
            let decToBinResult = document.getElementById('decToBinResult');
            if (decInput === "") {
                decToBinResult.textContent = '0';
                decToBinResult.style.color = 'white';
            } else if (!isNaN(decInput) && decInput.trim() !== "" && Number(decInput) >= 0) {
                decToBinResult.textContent = parseInt(decInput).toString(2);
                decToBinResult.style.color = 'white';
            } else {
                decToBinResult.textContent = 'Decimal inválido';
                decToBinResult.style.color = 'red';
           }
        }
        // aqui é p alternar entre binário e dec
        function toggleBinaryDecimal() {
            isBinaryMode = !isBinaryMode;
            const button = document.querySelector('.toggle-btn');
            const calcTitle = document.getElementById('calcTitle');
            if (isBinaryMode) {
                button.textContent = 'Alternar para decimal';
                calcTitle.textContent = 'Calculadora binária';
                document.getElementById('binInputA').setAttribute('placeholder', 'Binário A');
                document.getElementById('binInputB').setAttribute('placeholder', 'Binário B');
            } else {
                button.textContent = 'Alternar para binário';
                calcTitle.textContent = 'Calculadora decimal';
                document.getElementById('binInputA').setAttribute('placeholder', 'Decimal A');
                document.getElementById('binInputB').setAttribute('placeholder', 'Decimal B');
            }
        }

        // setar a operação(+ - * /)
        function setOperation(op) {
            operation = op;
            calculate();
        }

        // função calc binário ou dec
        function calculate() {
            let inputA = document.getElementById('binInputA').value;
            let inputB = document.getElementById('binInputB').value;
            let calcResult = document.getElementById('binCalcResult');

            if (inputA === "" || inputB === "") {
                calcResult.textContent = '0';
                return;
            }

            // binário p dec
            if (operation && isBinaryMode && /^[01]+$/.test(inputA) && /^[01]+$/.test(inputB)) {
                let numA = parseInt(inputA, 2);
                let numB = parseInt(inputB, 2);
                let result;
                if (operation === 'sum') result = numA + numB;
                else if (operation === 'subtract') result = numA - numB;
                else if (operation === 'multiply') result = numA * numB;
                else if (operation === 'divide') result = numB !== 0 ? numA / numB : "Erro";
                calcResult.textContent = result.toString(2);
                calcResult.style.color = 'white';
            } else if (operation && !isBinaryMode && !isNaN(inputA) && !isNaN(inputB)) {
                // calc dec aqui
                let numA = parseFloat(inputA);
                let numB = parseFloat(inputB);
                let result;
                if (operation === 'sum') result = numA + numB;
                else if (operation === 'subtract') result = numA - numB;
                else if (operation === 'multiply') result = numA * numB;
                else if (operation === 'divide') result = numB !== 0 ? numA / numB : "Erro";
                calcResult.textContent = result;
                calcResult.style.color = 'white';
            } else {
                calcResult.textContent = 'Inválido';
                calcResult.style.color = 'red';
            }
        }

        function resetResultIfEmpty() {
            let inputA = document.getElementById('binInputA').value;
            let inputB = document.getElementById('binInputB').value;
            let calcResult = document.getElementById('binCalcResult');

            if (inputA === "" || inputB === "") {
                calcResult.textContent = '0'; 
                calcResult.style.color = 'white'; 
            }
        }

        // função p abrir menu ajuda
        function toggleHelpPanel() {
            const helpPanel = document.getElementById('helpPanel');
            if (helpPanel.style.display === 'none' || helpPanel.style.display === '') {
            helpPanel.style.display = 'block';
            } else {
            helpPanel.style.display = 'none';
            }
        }

        const buttons = document.querySelectorAll('button, .toggle-btn, .help-btn');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        button.blur();
    });
});

function startCalculadora() {
            document.getElementById('welcomeContainer').style.transform = 'translateY(-100%)';
            setTimeout(() => {
                document.getElementById('welcomeContainer').style.display = 'none';
                document.getElementById('mainContent').style.display = 'flex';
            }, 500);
        }

        document.getElementById('binInputA').addEventListener('input', resetResultIfEmpty);
        document.getElementById('binInputB').addEventListener('input', resetResultIfEmpty);