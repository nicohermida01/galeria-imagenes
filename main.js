const grid = new Muuri('.grid', {
    layout: {
        rounding: false,
    }
});


// Evento al cargar la pagina
window.addEventListener('load', () => {
    grid.refreshItems().layout();
    // Cuando tenga todas las imagenes cargadas ==> las muestra
    document.getElementById('grid').classList.add('imagenes-cargadas');


    // ######################################################################################################
    // ##################################### Evento: click en categoria #####################################
    // ######################################################################################################

    // Obtengo todos los enlaces del nav categorias
    const enlaces = document.querySelectorAll('#categorias a')
    // Para cada enlace ==> 
    enlaces.forEach((elemento) => {

        // Evento click del enlace
        elemento.addEventListener('click', (evento) => {
            // Le saco su accion por defecto
            evento.preventDefault();

            // Le saco la clase .activo al enlace que la tiene
            enlaces.forEach((enlace) => enlace.classList.remove('activo')); // Esta linea solo se va a ejecutar una vez

            // Obtengo el enlace que fue clickeado y le agrego la clase .activo
            evento.target.classList.add('activo'); 

            // Obtengo la categoria del enlace clickeado
            const categoria = evento.target.innerHTML.toLowerCase();
            
            // Realizo el filtrado de la categoria
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });

    // ######################################################################################################
    // ############################## Evento: escribir en la barra de busqueda ##############################
    // ######################################################################################################

    // Por cada vez que el usuario escribe una letra ==>
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {

        // Obtengo el string que haya ingresado el usuario
        const busqueda = evento.target.value;

        // Obtengo las etiquetas para filtrar con la busqueda
        // Para cada item del grid (cada imagen) obtengo su dataset(conjunto de atributos data-) ==> me quedo con el de etiquetas y veo si existe en 'busqueda' (.includes(busquea))
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });

    // ######################################################################################################
    // ######################################## Evento: abrir imagen ########################################
    // ######################################################################################################

    //Obtengo el elemneto overlay
    const overlay = document.getElementById("overlay");
    // Accedo a todas las imagenes que se encuentran dentro de la clase item y a su vez dentro de la clase grid ==> 
    // por cada elemento (forEach) 
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        
        // Evento click de la imagen
        elemento.addEventListener('click', () => {

            // Obtengo la ruta de la imagen 
            const ruta = elemento.getAttribute('src');

            // Obtengo la descripcion de la imagen ==>
            // Accedo al contenedor padre de la imagen (div.item-contenido), accedo al contenedor padre de div.item-contenido (div.item) ==>
            // Obtengo el conjunto de atributos data, y me quedo con data-descripcion
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            // Accedo a la imagen del overlay y establezco su ruta con la ruta de la imagen clickeada
            document.querySelector('#overlay img').src = ruta;

            // Accedo a la descripcion del overlay y establezco su contenido con la descripcion de la imagen clickeada
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;

            // Accedemos al elemento overlay, obtenemos su lista de clases y le agregamos la clase 'activo' ==>
            // Mostramos la imagen
            overlay.classList.add('activo');
        });
    });

    // ######################################################################################################
    // ################################ Evento: click en boton cerrar imagen ################################
    // ######################################################################################################

    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {

        // Elimino la clase .activo al overlay
        overlay.classList.remove('activo');
    });

    // ######################################################################################################
    // ################################ Evento: click en el overlay => cerrar ###############################
    // ######################################################################################################

    overlay.addEventListener('click', (evento) => {

        // Verifico que no haya apretado en la imagen o en la descripcion
        // Obtengo el id del elemento que clickee el usuario y pregunto si es el overlay
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});