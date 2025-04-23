        let isBinaryMode = true;
        let operation = null;

        // função de binário p dec
        function convertToDecimal() {
            let binInput = document.getElementById('binInput').value;
            let binToDecResult = document.getElementById('binToDecResult');
            if (binInput === "") {
                binToDecResult.textContent = '0';
                binToDecResult.style.color = '#dcddde';
            
                document.getElementById('calculationSteps').textContent = "";
                document.getElementById('stepsTitle').textContent = "Operação:";
                return;
            } else if (/^[01]+$/.test(binInput)) {
                let decimal = parseInt(binInput, 2);
                binToDecResult.textContent = decimal;
                binToDecResult.style.color = '#dcddde';
                document.getElementById('binInput').classList.remove('input-error');
                
                // mostra o passo a passo
                let steps = ``;
                steps += `Número binário: ${binInput}\n\n`;
                steps += `Cálculo:\n`;

                const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
                
                for (let i = 0; i < binInput.length; i++) {
                    let bit = binInput[i];
                    let power = binInput.length - 1 - i;
                    let powerStr = power.toString();
                    let powerFormatted = '';
                    for (let char of powerStr) {
                        powerFormatted += superscripts[parseInt(char)];
                    }
                    
                    steps += `${bit} × 2${powerFormatted} = ${bit * Math.pow(2, power)}\n`;
                }
                
                steps += `\nSoma total: ${decimal}`;
                
                document.getElementById('calculationSteps').textContent = steps;
                document.getElementById('stepsTitle').textContent = "Conversão binário → decimal";
            } else {
                binToDecResult.textContent = '0';
                binToDecResult.style.color = '#ED4245';
                document.getElementById('binInput').classList.add('input-error');
                showToast('Entrada inválida! Utilize apenas 0 ou 1.', 'error');
            }
        }

        // função de dec p binário
        function convertToBinary() {
            let decInput = document.getElementById('decInput').value;
            let decToBinResult = document.getElementById('decToBinResult');
            if (decInput === "") {
                decToBinResult.textContent = '0';
                decToBinResult.style.color = '#dcddde';
            
                document.getElementById('calculationSteps').textContent = "";
                document.getElementById('stepsTitle').textContent = "Operação:";
                return;
            } else if (!isNaN(decInput) && decInput.trim() !== "" && Number(decInput) >= 0) {
                let decimal = parseInt(decInput);
                document.getElementById('decInput').classList.remove('input-error');
                let binary = decimal.toString(2);
                decToBinResult.textContent = binary;
                decToBinResult.style.color = '#dcddde';
                
                // mostra o passo a passo
                let steps = ``;
                steps += `Número decimal: ${decimal}\n\n`;
                steps += `Divisões sucessivas por 2:\n`;
                
                let num = decimal;
                let remainders = [];
                while (num > 0) {
                    let remainder = num % 2;
                    remainders.unshift(remainder);
                    steps += `${num} ÷ 2 = ${Math.floor(num / 2)} (<span class="resto">resto ${remainder}</span>)\n`;
                    num = Math.floor(num / 2);
                }
                
                steps += `\nRestos lidos de baixo para cima: <span class="resto">${remainders.join('')}</span>`;
                
                document.getElementById('calculationSteps').innerHTML = steps;
                document.getElementById('stepsTitle').textContent = "Conversão decimal → binário";
            } else {
                decToBinResult.textContent = '0';
                decToBinResult.style.color = '#ED4245';
                document.getElementById('decInput').classList.add('input-error');
                showToast('Entrada inválida! Utilize apenas números.', 'error');
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
            document.getElementById('binInputA').classList.remove('input-error');
            document.getElementById('binInputB').classList.remove('input-error');
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
                    steps += `<span class="sum-color">Soma:\n${numA} + ${numB} = ${result}\n\n</span>`;
                } else if (operation === 'subtract') {
                    result = numA - numB;
                    operationSymbol = '-';
                    steps += `<span class="subtract-color">Subtração:\n${numA} - ${numB} = ${result}\n\n</span>`;
                } else if (operation === 'multiply') {
                    result = numA * numB;
                    operationSymbol = '×';
                    steps += `<span class="multiply-color">Multiplicação:\n${numA} × ${numB} = ${result}\n\n</span>`;
                } else if (operation === 'divide') {
                    if (numB !== 0) {
                        result = numA / numB;
                        operationSymbol = '÷';
                        steps += `<span class="divide-color">Divisão:\n${numA} ÷ ${numB} = ${result}\n\n</span>`;
                    } else {
                        result = "?";
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
                
                stepsTitle.innerHTML = `Operação: <span class="${operation}-color">${inputA} ${operationSymbol} ${inputB}</span>`;
                calculationSteps.innerHTML = steps;
            } else if (operation && !isBinaryMode && !isNaN(inputA) && !isNaN(inputB)) {
                // calc dec aqui
                let numA = parseFloat(inputA);
                let numB = parseFloat(inputB);
                let result;
                let operationSymbol = '';
                let steps = `Operação decimal:\n\n`;
                steps += `Decimal A: ${numA}\n`;
                steps += `Decimal B: ${numB}\n\n`;
                
                if (operation === 'sum') {
                    result = numA + numB;
                    operationSymbol = '+';
                    steps += `<span class="sum-color">Soma:\n${numA} + ${numB} = ${result}\n\n</span>`;
                } else if (operation === 'subtract') {
                    result = numA - numB;
                    operationSymbol = '-';
                    steps += `<span class="subtract-color">Subtração:\n${numA} - ${numB} = ${result}\n\n</span>`;
                } else if (operation === 'multiply') {
                    result = numA * numB;
                    operationSymbol = '×';
                    steps += `<span class="multiply-color">Multiplicação:\n${numA} × ${numB} = ${result}\n\n</span>`;
                } else if (operation === 'divide') {
                    if (numB !== 0) {
                        result = numA / numB;
                        operationSymbol = '÷';
                        steps += `<span class="divide-color">Divisão:\n${numA} ÷ ${numB} = ${result}\n\n</span>`;
                    } else {
                        result = "Erro: divisão por zero";
                    }
                }                
                
                stepsTitle.innerHTML = `Operação: <span class="${operation}-color">${numA} ${operationSymbol} ${numB}</span>`;
                calculationSteps.innerHTML = steps;
                
                if (result !== "Erro: divisão por zero") {
                    calcResult.textContent = result;
                    calcResult.style.color = '#dcddde';
                } else {
                    calcResult.textContent = result;
                    calcResult.style.color = '#ED4245';
                }
            } else {
                calcResult.textContent = '#?';
                calcResult.style.color = '#ED4245';
                stepsTitle.textContent = "Operação:";
                document.getElementById('binInputA').classList.add('input-error');
                document.getElementById('binInputB').classList.add('input-error');
                calculationSteps.textContent = "O que era pra ser isso?";
                showToast('Entradas inválidas para o modo atual.', 'error');
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
            if (helpPanel.style.display === 'block') {
                helpPanel.style.display = 'none';
            } else {
                helpPanel.style.display = 'block';
            }
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('helpPanel').style.display = 'none';
            enableResultClickToReverse(); 
        });

        const buttons = document.querySelectorAll('button, .toggle-btn, .help-btn');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                button.blur();
            });
        });

        document.getElementById('binInputA').addEventListener('input', resetResultIfEmpty);
        document.getElementById('binInputB').addEventListener('input', resetResultIfEmpty);

        function showToast(message, type = '') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
        
            toastMessage.textContent = message;
            toast.className = `toast visible ${type}`;
        
            setTimeout(() => {
                toast.className = 'toast hidden';
            }, 3000);
        }

        function validarCalcInputs() {
            const inputA = document.getElementById('binInputA');
            const inputB = document.getElementById('binInputB');
        
            if (isBinaryMode) {
                /^[01]+$/.test(inputA.value) || inputA.value === ""
                    ? inputA.classList.remove('input-error')
                    : inputA.classList.add('input-error');
        
                /^[01]+$/.test(inputB.value) || inputB.value === ""
                    ? inputB.classList.remove('input-error')
                    : inputB.classList.add('input-error');
            } else {
                !isNaN(inputA.value) || inputA.value === ""
                    ? inputA.classList.remove('input-error')
                    : inputA.classList.add('input-error');
        
                !isNaN(inputB.value) || inputB.value === ""
                    ? inputB.classList.remove('input-error')
                    : inputB.classList.add('input-error');
            }
        }

        document.getElementById('binInputA').addEventListener('input', validarCalcInputs);
        document.getElementById('binInputB').addEventListener('input', validarCalcInputs);
