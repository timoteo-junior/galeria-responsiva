document.addEventListener('DOMContentLoaded', function() {
    
    const inputAdicionar = document.getElementById('add-imagem');
    const botaoRemover = document.getElementById('remove-imagem');
    const botaoRestaurar = document.getElementById('restore-imagem');
    const galeria = document.getElementById('galeria-principal'); 
    
    let imagensApagadas = [];

    inputAdicionar.addEventListener('change', function(evento) {
        const arquivo = evento.target.files[0]; 
        if (arquivo) {
            const urlTemporaria = URL.createObjectURL(arquivo); 
            const novaImagem = document.createElement('img'); 
            novaImagem.src = urlTemporaria;
            galeria.appendChild(novaImagem); 
            inputAdicionar.value = ""; 
        }
    });

    let modoExclusao = false;

    botaoRemover.addEventListener('click', function() {
        modoExclusao = !modoExclusao; 

        if (modoExclusao) {
            botaoRemover.textContent = "Cancele ou clique na foto abaixo para apagar";
            botaoRemover.style.backgroundColor = "darkred";
            botaoRemover.style.color = "white";
            galeria.style.cursor = "crosshair"; 
        } else {
            botaoRemover.textContent = "Pressione para remover";
            botaoRemover.style.backgroundColor = "";
            botaoRemover.style.color = "black";
            galeria.style.cursor = "default";
        }
    });

    galeria.addEventListener('click', function(evento) {
        if (modoExclusao === true && evento.target.tagName === 'IMG') {
            
            imagensApagadas.push(evento.target);
            
            evento.target.remove(); 

            modoExclusao = false;
            botaoRemover.textContent = "Pressione para remover";
            botaoRemover.style.backgroundColor = "";
            botaoRemover.style.color = "black";
            galeria.style.cursor = "default";
        }
    });

    botaoRestaurar.addEventListener('click', function() {
        if (imagensApagadas.length > 0) {
            const ultimaImagemApagada = imagensApagadas.pop();
            
            galeria.appendChild(ultimaImagemApagada);
        } else {
            alert('Não há imagens para restaurar!');
        }
    });

});