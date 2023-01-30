const main = document.querySelector('main')
const root = document.querySelector(':root')
const inputForCalc = document.getElementById('inputForCalc')
const result = document.getElementById('resultFinal')
const copy = document.getElementById('copy')

//Troca de tema setando propriedades de variaveis do css 
document.getElementById('switchTheme').addEventListener('click', function () {
    if (main.dataset.theme === 'dark') {
        root.style.setProperty("--bg-color", "#f1f5f9")
        root.style.setProperty("--border-color", "#aaa")
        root.style.setProperty("--font-color", "#212529")
        root.style.setProperty("--primary-color", "#26834a")
        main.dataset.theme = "light"
    }else {
        root.style.setProperty("--bg-color", "#212529")
        root.style.setProperty("--border-color", "#666")
        root.style.setProperty("--font-color", "#f1f5f9")
        root.style.setProperty("--primary-color", "#4dff91")
        main.dataset.theme = "dark"
    }
})

//um array com todas teclas que podem ser usadas no teclado
const allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9","0", " ( ", " ) ", " / ", " * ", " - ", " + ", ".", " % "]


inputForCalc.addEventListener('keydown', function (ev) {
    ev.preventDefault()
    if (allowedKeys.includes(ev.key)) {
        inputForCalc.value += ev.key
        return
    }
    if (ev.key === "Backspace") {
        inputForCalc.value = inputForCalc.value.slice(0, -1)
    }
    if (ev.key === "Enter") {
        calculate()
    }
})

document.querySelectorAll('.charKey').forEach(function(charKeyBtn){
    charKeyBtn.addEventListener('click', function () {
        const value = charKeyBtn.dataset.value
        inputForCalc.value += value 
    })
})

document.getElementById('clear').addEventListener('click', function () {
    inputForCalc.value = ''
    inputForCalc.focus()
})

document.getElementById('equal').addEventListener('click', calculate)

function calculate () {
    result.value = 'ERRO'
    result.classList.add("erro")
    const resultEval = eval(inputForCalc.value)
    result.value = resultEval
    result.classList.remove("erro")
}

copy.addEventListener('click', function () {
    navigator.clipboard.writeText(result.value)
    if(copy.innerText === 'Copiar'){
        copy.classList.add('success')
        copy.innerText = 'Copiado!'
    }else {
        copy.classList.remove('success')
        copy.innerText = 'Copiar'
    }
})