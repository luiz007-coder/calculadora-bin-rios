        let isBinaryMode = true;
        let operation = null;

        // função de binário p dec
        function convertToDecimal() {
            let binInput = document.getElementById('binInput').value;
            let binToDecResult = document.getElementById('binToDecResult');
            if (binInput === "") {
                binToDecResult.textContent = '0';
                binToDecResult.style.color = '#dcddde';
            } else if (/^[01]+$/.test(binInput)) {
                let decimal = parseInt(binInput, 2);
                binToDecResult.textContent = decimal;
                binToDecResult.style.color = '#dcddde';
                
                // Mostrar passo a passo
                let steps = `Conversão de binário para decimal:\n\n`;
                steps += `Número binário: ${binInput}\n\n`;
                steps += `Cálculo:\n`;
                
                for (let i = 0; i < binInput.length; i++) {
                    let bit = binInput[i];
                    let power = binInput.length - 1 - i;
                    steps += `${bit} × 2^${power} = ${bit * Math.pow(2, power)}\n`;
                }
                
                steps += `\nSoma total: ${decimal}`;
                
                document.getElementById('calculationSteps').textContent = steps;
                document.getElementById('stepsTitle').textContent = "Conversão binário → decimal";
            } else {
                binToDecResult.textContent = 'Binário inválido';
                binToDecResult.style.color = '#ED4245';
            }
        }

        // função de dec p binário
        function convertToBinary() {
            let decInput = document.getElementById('decInput').value;
            let decToBinResult = document.getElementById('decToBinResult');
            if (decInput === "") {
                decToBinResult.textContent = '0';
                decToBinResult.style.color = '#dcddde';
            } else if (!isNaN(decInput) && decInput.trim() !== "" && Number(decInput) >= 0) {
                let decimal = parseInt(decInput);
                let binary = decimal.toString(2);
                decToBinResult.textContent = binary;
                decToBinResult.style.color = '#dcddde';
                
                // Mostrar passo a passo
                let steps = `Conversão de decimal para binário:\n\n`;
                steps += `Número decimal: ${decimal}\n\n`;
                steps += `Divisões sucessivas por 2:\n`;
                
                let num = decimal;
                let remainders = [];
                while (num > 0) {
                    let remainder = num % 2;
                    remainders.unshift(remainder);
                    steps += `${num} ÷ 2 = ${Math.floor(num / 2)} (resto ${remainder})\n`;
                    num = Math.floor(num / 2);
                }
                
                steps += `\nRestos lidos de baixo para cima: ${remainders.join('')}`;
                
                document.getElementById('calculationSteps').textContent = steps;
                document.getElementById('stepsTitle').textContent = "Conversão Decimal → Binário";
            } else {
                decToBinResult.textContent = 'Decimal inválido';
                decToBinResult.style.color = '#ED4245';
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
            resetResultIfEmpty();
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
            let stepsTitle = document.getElementById('stepsTitle');
            let calculationSteps = document.getElementById('calculationSteps');
        
            if (inputA === "" || inputB === "") {
                calcResult.textContent = '0';
                return;
            }
        
            // binário p dec
            if (operation && isBinaryMode && /^[01]+$/.test(inputA) && /^[01]+$/.test(inputB)) {
                let numA = parseInt(inputA, 2);
                let numB = parseInt(inputB, 2);
                let result;
                let operationSymbol = '';
                let steps = `Operação binária:\n\n`;
                steps += `Binário A: ${inputA} (${numA} em decimal)\n`;
                steps += `Binário B: ${inputB} (${numB} em decimal)\n\n`;
                
                if (operation === 'sum') {
                    result = numA + numB;
                    operationSymbol = '+';
                    steps += `Soma:\n${numA} + ${numB} = ${result}\n\n`;
                } else if (operation === 'subtract') {
                    result = numA - numB;
                    operationSymbol = '-';
                    steps += `Subtração:\n${numA} - ${numB} = ${result}\n\n`;
                } else if (operation === 'multiply') {
                    result = numA * numB;
                    operationSymbol = '×';
                    steps += `Multiplicação:\n${numA} × ${numB} = ${result}\n\n`;
                } else if (operation === 'divide') {
                    if (numB !== 0) {
                        result = numA / numB;
                        operationSymbol = '÷';
                        steps += `Divisão:\n${numA} ÷ ${numB} = ${result}\n\n`;
                    } else {
                        result = "Erro: divisão por zero";
                    }
                }
                
                if (result !== "Erro: divisão por zero") {
                    steps += `Resultado em decimal: ${result}\n`;
                    steps += `Resultado em binário: ${result.toString(2)}`;
                    calcResult.textContent = result.toString(2);
                    calcResult.style.color = '#dcddde';
                } else {
                    steps += result;
                    calcResult.textContent = result;
                    calcResult.style.color = '#ED4245';
                }
                
                stepsTitle.textContent = `Operação binária: ${inputA} ${operationSymbol} ${inputB}`;
                calculationSteps.textContent = steps;
            } else if (operation && !isBinaryMode && !isNaN(inputA) && !isNaN(inputB)) {
                // calc dec aqui
                let numA = parseFloat(inputA);
                let numB = parseFloat(inputB);
                let result;
                let operationSymbol = '';
                let steps = `Operação Decimal:\n\n`;
                steps += `Decimal A: ${numA}\n`;
                steps += `Decimal B: ${numB}\n\n`;
                
                if (operation === 'sum') {
                    result = numA + numB;
                    operationSymbol = '+';
                    steps += `Soma:\n${numA} + ${numB} = ${result}\n\n`;
                } else if (operation === 'subtract') {
                    result = numA - numB;
                    operationSymbol = '-';
                    steps += `Subtração:\n${numA} - ${numB} = ${result}\n\n`;
                } else if (operation === 'multiply') {
                    result = numA * numB;
                    operationSymbol = '×';
                    steps += `Multiplicação:\n${numA} × ${numB} = ${result}\n\n`;
                } else if (operation === 'divide') {
                    if (numB !== 0) {
                        result = numA / numB;
                        operationSymbol = '÷';
                        steps += `Divisão:\n${numA} ÷ ${numB} = ${result}\n\n`;
                    } else {
                        result = "Erro: divisão por zero";
                    }
                }
                
                stepsTitle.textContent = `Operação decimal: ${numA} ${operationSymbol} ${numB}`;
                calculationSteps.textContent = steps;
                
                if (result !== "Erro: divisão por zero") {
                    calcResult.textContent = result;
                    calcResult.style.color = '#dcddde';
                } else {
                    calcResult.textContent = result;
                    calcResult.style.color = '#ED4245';
                }
            } else {
                calcResult.textContent = 'Entrada inválida';
                calcResult.style.color = '#ED4245';
                stepsTitle.textContent = "Operação";
                calculationSteps.textContent = "Entrada inválida para o modo atual";
            }
        }

        function resetResultIfEmpty() {
            let inputA = document.getElementById('binInputA').value;
            let inputB = document.getElementById('binInputB').value;
            let calcResult = document.getElementById('binCalcResult');
        
            if (inputA === "" || inputB === "") {
                calcResult.textContent = '0'; 
                calcResult.style.color = '#dcddde'; 
            }
        }

        // função p abrir menu ajuda
        function toggleHelpPanel() {
            const helpPanel = document.getElementById('helpPanel');
            helpPanel.style.display = helpPanel.style.display === 'none' ? 'block' : 'none';
        }

        const buttons = document.querySelectorAll('button, .toggle-btn, .help-btn');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                button.blur();
            });
        });

        document.getElementById('binInputA').addEventListener('input', resetResultIfEmpty);
        document.getElementById('binInputB').addEventListener('input', resetResultIfEmpty);
