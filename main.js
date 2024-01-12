$(document).ready(function(){
    var form_slide = false;
    var list_count = 0;

    $('#list-add-input').hide();   

    //Expandir formulário
    $('header button').on('click', function(){  
        form_slide = !form_slide;   
        form_slide ? $('#list-add-input').slideDown() : $('#list-add-input').slideUp(); 
        $('#btn-new').toggle();    
        $('#btn-cancel').toggle();     
    })

    //Criar nova lista e adicionar na página
    $('#list-add-input').on('submit', function(e){
        e.preventDefault();  
        
        var add_list = `
        <div class="list-container">
            <ol>
                <div class="list-header">
                    <button type="button" class="btn-invisible-placeholder">&#10005;</button>
                    <span class="list-title">${$('#list-name-input').val()}</span>
                    <button type="button" class="btn-remove">&#10006;</button>
                </div>
            </ol>
            <form class="list-form">
                <input type="text" class="list-input" required placeholder="Tarefa">
                <button type="button" class="list-btn-new">&#10010; Adicionar item</button>
                <div class="list-form-buttons">
                    <button type="submit" class="list-btn-add">&#10004;</button>
                    <button type="button" class="btn-quit">&#10006;</button>
                </div>
            </form>
        </div>`

        $(add_list).appendTo('#lists');
        list_count += 1;
        $('#list-name-input').val('');      
        form_slide = !form_slide;              
        $('#list-add-input').slideUp();  
        $('#btn-new').toggle();     
        $('#btn-cancel').toggle();

        $('#empty_warning').hide();
    })

    //Adicionar funcionalidade para as listas. Aqui podemos ter múltiplos elementos iguais na página, então primeiro precisamos achar uma forma de especificar exatamente qual elemento queremos manipular.
    $('#lists').on('click', (e) => {
        const el = e.target;    
        const divEl = el.closest('.list-container');    

        //busca e armazena em constantes os elementos HTML das listas, todos esses elementos estão na div especificada acima, assim conseguimos especificar exatamente quais elementos queremos manipular.
        const btnNewEl = divEl.querySelector('.list-btn-new');
        const btnAddEl = divEl.querySelector('.list-btn-add');
        const btnQuitEl = divEl.querySelector('.btn-quit');
        const inputEl = divEl.querySelector('.list-input');
        const listEl = divEl.querySelector('ol');
        
        //Expandir ao clicar em adicionar
        if (el.classList.contains("list-btn-new")) {    
            $(btnNewEl).hide();     
            $(inputEl).slideDown();
            $(inputEl).focus();     
            
            $(btnAddEl).show();
            $(btnQuitEl).show();

            
            inputEl.style.display = 'flex';
            btnAddEl.style.display = 'flex';
        }

        //Cancelar ao clicar no botão de cancelar
        if (el.classList.contains("btn-quit")) {
            e.preventDefault();

            $(btnAddEl).hide();
            $(btnQuitEl).hide();    

            inputEl.style.display = 'block';
            $(inputEl).slideUp();

            $(btnNewEl).show();
            btnNewEl.style.display = 'flex';

            $(inputEl).val('');
        }

        //Adicionar o valor do input na lista
        if (el.classList.contains("list-btn-add") && inputEl.value != '') {
            e.preventDefault();
            $(btnAddEl).hide();
            $(btnQuitEl).hide();
            $(inputEl).hide();
            $(btnNewEl).show();
            btnNewEl.style.display = 'flex';

            var tarefa = $(inputEl).val();     
            var list_new = `
            <div class="li-line todo">
            <li class="todo">${tarefa}</li>
            <button type="button" class="li-remove">&#10006;</button>
            </div>`;   

            $(list_new).appendTo(listEl);   
            $('.li-line').fadeIn();       
            $('.li-line').css("display", "flex");     
            $(inputEl).val('');     
        }

        //Marcar tarefas
        if (el.classList.contains("todo")) {
            el.classList.toggle("done");

            if (el.classList.contains("li-line")) {
                el.querySelector('li').classList.toggle("done");
                el.classList.contains("done") ? $(el).children('li').css({"text-decoration" : "line-through", "text-decoration-thickness" : "2px"}) : $(el).children('li').css  ("text-decoration", "none");
            } else {
                el.closest('.li-line').classList.toggle("done");
                el.classList.contains("done") ? $(el).css({"text-decoration" : "line-through", "text-decoration-thickness" : "2px"}) : $(el).css("text-decoration", "none");
            }
        }

        //Remover tarefas
        if (el.classList.contains("li-remove")) {
            el.closest('.li-line').remove();
        }

        //Remover lista
        if (el.classList.contains("btn-remove")) {
            divEl.remove();
            list_count -= 1;

            if (list_count == 0) {
                $('#empty_warning').show();
            }
        }
    })
})