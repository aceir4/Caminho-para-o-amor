const noivo = document.querySelector("#noivo");
const noiva = document.querySelector("#noiva");

noiva.addEventListener("click", () => {
    noiva.classList.add("selecionado")
    noivo.classList.remove("selecionado")
})

noivo.addEventListener("click", () => {
    noiva.classList.remove("selecionado")
    noivo.classList.add("selecionado")
})

function openSection(page){

    if(page == 'convidados'){
        window.location.href = "./fornecedor.html"
    }else if(page == 'calendario'){
        window.location.href = "./calendario.html"
    }else if(page == 'orcamentos'){
        window.location.href = "./orcamento.html"
    }else if(page == 'contratos'){
        window.location.href = "./contrato.html"
    }

}
