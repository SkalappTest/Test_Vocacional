// =============================
// Sección de Términos y Condiciones
// =============================

let termsAccepted = false;
// Manejar Términos y Condiciones Popup
// Mostrar la ventana emergente de términos y condiciones
document.getElementById('terms-btn').onclick = function () {
    const termsPopup = document.getElementById('terms-popup');
    termsPopup.hidden = false; // Mostrar el popup
};

// Ocultar el Popup al hacer clic en cerrar o aceptar
function closePopup() {
    const termsPopup = document.getElementById('terms-popup');
    termsPopup.hidden = true; // Ocultar el popup
}

document.querySelector('.close-popup').onclick = closePopup; // Botón de cerrar
document.getElementById('accept-terms-btn').onclick = closePopup; // Botón de aceptar

// Mostrar más o menos en los términos y condiciones
document.getElementById('dots').onclick = function () {
    const dots = document.getElementById('dots');
    const more = document.getElementById('more');

    if (more.style.display === "none") {
        more.style.display = "inline"; // Mostrar el contenido completo
        dots.style.display = "none"; // Ocultar puntos suspensivos
    } else {
        more.style.display = "none"; // Ocultar el contenido completo
        dots.style.display = "inline"; // Mostrar puntos suspensivos
    }
};

// Función para mostrar la ventana emergente de términos y condiciones
function showTermsPopup(onAccept) {
    console.log("showTermsPopup: Iniciando ventana emergente.");
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <p><strong>Términos y Condiciones</strong><br>
            Aquí puedes incluir los términos y condiciones relevantes para tu sitio web.</p>
            <button class="accept-popup">Aceptar</button>
        </div>
    `;

    document.body.appendChild(popup);

    document.querySelector('.close-popup').onclick = function () {
        console.log("showTermsPopup: Cerrando ventana sin aceptar.");
        popup.remove();
    };

    document.querySelector('.accept-popup').onclick = function () {
        termsAccepted = true;
        console.log("showTermsPopup: Términos aceptados. Ejecutando onAccept...");
        popup.remove();
        if (typeof onAccept === 'function') {
            onAccept();
        } else {
            console.error("onAccept no es una función válida.");
        }
    };
}

// =============================
// Sección del Formulario
// =============================

function showForm() {
    const formContainer = document.getElementById('data-form-container');
    console.log("Mostrando el formulario...");
    formContainer.hidden = false; // Quitar atributo hidden
    formContainer.scrollIntoView({ behavior: 'smooth' }); // Centrar en pantalla
}

function hideButtons() {
    const buttonsContainer = document.querySelector('.buttons-container');
    if (buttonsContainer) {
        buttonsContainer.style.display = 'none'; // Ocultar botones principales
        console.log("hideButtons: Botones principales ocultados.");
    } else {
        console.error("hideButtons: No se encontró el contenedor de botones.");
    }
}

function validateForm() {
    const form = document.getElementById('data-form');
    if (form.checkValidity()) {
        console.log("Formulario válido.");
        return true;
    } else {
        form.reportValidity(); // Mostrar errores visuales
        console.error("Formulario inválido. Por favor, completa todos los campos.");
        return false;
    }
}

function getFormData() {
    const names = document.getElementById('names').value.trim();
    const lastnames = document.getElementById('lastnames').value.trim();
    const document_type = document.getElementById('document-type').value.trim();
    const document_number = document.getElementById('document-number').value.trim();
    const institution = document.getElementById('institution').value.trim();
    const email = document.getElementById('email').value.trim();
    const study_level = document.getElementById('study-level').value.trim();
    const city = document.getElementById('city').value.trim();
    const age = document.getElementById('age').value.trim();
    // Devuelve los datos en un objeto
    return {
        Nombres: names,
        Apellidos: lastnames,
        Tipo_Documento: document_type,
        Numero_Documento: document_number,
        Institution: institution,
        Correo: email,
        Nivel_Estudio: study_level,
        Ciudad: city,
        Edad: age
    };
}

function saveFormToExcel() {
    const formData = getFormData(); // Obtener los datos del formulario

    // Crear un array de objetos para representar las filas de Excel
    const data = [
        { "Campo": "Nombres", "Valor": formData.Nombres },
        { "Campo": "Apellidos", "Valor": formData.Apellidos },
        { "Campo": "Tipo de Documento", "Valor": formData.Tipo_Documento },
        { "Campo": "Numero de Documento", "Valor": formData.Numero_Documento },
        { "Campo": "Institution", "Valor": formData.Institution },
        { "Campo": "Correo", "Valor": formData.Correo },
        { "Campo": "Nivel de studio", "Valor": formData.Nivel_Estudio },
        { "Campo": "Ciudad", "Valor": formData.Ciudad },
        { "Campo": "Edad", "Valor": formData.Edad }
    ];

    // Convertir los datos en una hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Crear el libro de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Formulario");

    // Descargar el archivo Excel
    XLSX.writeFile(workbook, "Formulario.xlsx");
}

document.getElementById('data-form').onsubmit = function (event) {
    event.preventDefault(); // Evitar que se recargue la página
    saveFormToExcel(); // Guardar el formulario en Excel
    console.log("Formulario guardado en Excel.");
};

// =============================
// Lógica de los Test
// =============================

const test1Questions = [
    {
        question: "¿Qué actividad prefieres realizar en tu tiempo libre?",
        options: [
            "A: Organizar eventos y trabajar en equipo para alcanzar metas.",
            "B: Resolver problemas y encontrar soluciones prácticas con tecnología.",
            "C: Leer, escribir o estar al tanto de lo que pasa en el mundo a través de los medios de comunicación.",
            "D: Realizar tareas creativas y artísticas, como dibujar, diseñar o producir contenido visual."
        ]
    },
    {
        question: "¿Cómo te enfrentas a un desafío importante?",
        options: [
            "A: Con una estrategia clara y asegurándome de que todo esté bien organizado.",
            "B: Analizo el problema de manera lógica y busco la mejor solución técnica posible.",
            "C: Intento comunicarme con otras personas para obtener diferentes perspectivas y resolver el problema.",
            "D: Busco soluciones creativas y me concentro en hacer que el proceso sea visualmente atractivo."
        ]
    },
    {
        question: "¿Cómo te sientes respecto al trabajo en equipo?",
        options: [
            "A: Me gusta coordinar al grupo y asegurarme de que todos trabajen juntos para cumplir con los objetivos.",
            "B: Prefiero tomar la iniciativa en proyectos relacionados con tecnología o procesos que impliquen cálculos.",
            "C: Disfruto colaborar, especialmente cuando hay oportunidad de presentar ideas o proyectos de manera creativa.",
            "D: Me siento cómodo trabajando en equipo y me encanta aportar ideas que inspiren a los demás."
        ]
    },
    {
        question: "¿Qué te atrae más cuando consideras una posible carrera?",
        options: [
            "A: Tener la capacidad de liderar y gestionar equipos, procesos o empresas.",
            "B: Resolver problemas utilizando tecnología y ser parte de la evolución digital.",
            "C: Comunicarme con otras personas y estar involucrado en el análisis y la creación de contenido.",
            "D: Ser parte de la creatividad, la innovación y el diseño de productos visuales o artísticos."
        ]
    },
    {
        question: "¿Qué materia disfrutas más en la escuela?",
        options: [
            "A: Economía, Matemáticas, o temas relacionados con la gestión y administración.",
            "B: Ciencias de la Computación, Tecnología o materias que impliquen programación.",
            "C: Lenguaje, Literatura o clases relacionadas con medios de comunicación.",
            "D: Arte, Diseño o cualquier actividad que implique creatividad visual."
        ]
    },
    {
        question: "Si pudieras cambiar el mundo, ¿cómo lo harías?",
        options: [
            "A: Trabajando en mejorar los sistemas y procesos que ayudan a las organizaciones a ser más eficientes.",
            "B: Creando nuevas tecnologías que mejoren la vida cotidiana de las personas.",
            "C: Comunicando de manera efectiva a las personas sobre temas importantes y creando conciencia social.",
            "D: A través de la creación de proyectos innovadores y diseños que atraigan visualmente a la gente."
        ]
    },
    {
        question: "¿Cómo te gustaría que fuera tu lugar de trabajo?",
        options: [
            "A: Un entorno estructurado donde pueda coordinar proyectos y liderar equipos de trabajo.",
            "B: Un lugar donde pueda trabajar con tecnología avanzada y resolver problemas técnicos.",
            "C: Un ambiente dinámico y creativo, donde pueda trabajar con personas y crear contenido interesante.",
            "D: Un espacio donde pueda estar rodeado de herramientas de diseño y creatividad, desarrollando nuevos proyectos visuales."
        ]
    },
    {
        question: "¿Qué te hace sentir más realizado?",
        options: [
            "A: Conseguir un proyecto exitoso mediante la organización y la toma de decisiones estratégicas.",
            "B: Resolver un problema complejo usando tecnología o programación.",
            "C: Comunicar una idea importante de manera clara y efectiva para impactar a las personas.",
            "D: Crear algo único y visualmente atractivo que sea apreciado por otros."
        ]
    },
    {
        question: "¿Cómo te describirías en un grupo de trabajo?",
        options: [
            "A: Soy quien organiza y distribuye las tareas, asegurándome de que todos estén alineados con los objetivos.",
            "B: Prefiero ser quien encuentra soluciones técnicas a los problemas y da ideas innovadoras.",
            "C: Me gusta ser el mediador, aportando ideas y ayudando a otros a comunicar sus pensamientos.",
            "D: Soy el que aporta ideas creativas y se encarga de la parte visual o estética del proyecto."
        ]
    },
    {
        question: " Si tuvieras que tomar una decisión importante, ¿cómo lo harías?",
        options: [
            "A: Analizando los pros y los contras y tomando en cuenta las implicaciones a largo plazo.",
            "B: Evaluando las opciones de manera lógica y buscando la solución más eficiente y tecnológica.",
            "C: Consultando con otros para escuchar diversas perspectivas antes de tomar una decisión.",
            "D: Pensando en cómo la decisión impactará en el aspecto creativo o visual del proyecto."
        ]
    },
    {
        question: " ¿Qué valoras más en tu vida profesional?",
        options: [
            "A: La posibilidad de tener un puesto de liderazgo donde pueda dirigir proyectos y equipos.",
            "B: La oportunidad de resolver problemas técnicos mediante el uso de nuevas tecnologías.",
            "C: La capacidad de comunicar ideas y crear contenido que influencie a la sociedad.",
            "D: La libertad para ser creativo y generar nuevas ideas en proyectos visuales y artísticos."
        ]
    },
    {
        question: " ¿Cómo te gustaría que fuera tu día a día en una profesión?",
        options: [
            "A: Planificando y gestionando actividades de manera estructurada para alcanzar objetivos claros.",
            "B: Trabajando en tareas que me permitan usar tecnología avanzada y solucionar problemas prácticos.",
            "C: Interactuando con otras personas, generando ideas y compartiendo información de manera efectiva.",
            "D: Desarrollando proyectos visuales, con la posibilidad de expresarme artísticamente y crear algo nuevo."
        ]
    },
    {
        question: " ¿Qué tipo de proyectos te gustaría desarrollar?",
        options: [
            "A: Proyectos organizacionales que impliquen administración de recursos, personal y estrategias.",
            "B: Proyectos tecnológicos que impliquen el uso de sistemas informáticos o ingeniería.",
            "C: Proyectos comunicacionales que busquen influir en la opinión pública o promover mensajes importantes.",
            "D: Proyectos de diseño o producción de contenido visual que sean innovadores y atractivos."
        ]
    },
    {
        question: " ¿Cuál de estas afirmaciones te representa más?",
        options: [
            "A: Disfruto liderando equipos, delegando tareas y alcanzando metas de manera eficiente.",
            "B: Me apasiona resolver problemas a través de la tecnología y la innovación.",
            "C: Me encanta contar historias y compartir información con otros, buscando la mejor forma de comunicarlas.",
            "D: Mi pasión es el diseño y la creación visual, siempre en busca de nuevas formas de expresión artística."
        ]
    },
    {
        question: " En una situación de estrés o alta presión, ¿cómo te comportas?",
        options: [
            "A: Mantengo la calma y me aseguro de que el equipo esté organizado y enfocado en la solución.",
            "B: Me concentro en la tarea y busco aplicar soluciones prácticas de forma rápida y eficiente.",
            "C: Trato de mantener la comunicación fluida con el equipo, para asegurarnos de que todos estemos alineados.",
            "D: Intento pensar en soluciones creativas y nuevas formas de abordar el problema, sin perder la calma."
        ]
    },
    {
        question: " ¿Qué tipo de impacto te gustaría tener en la sociedad?",
        options: [
            "A: Mejorar los procesos de gestión y administración en diversas áreas, optimizando recursos y tiempos.",
            "B: Contribuir al desarrollo tecnológico y científico que ayude a resolver problemas globales.",
            "C: Influir en la forma en que las personas se comunican e interactúan, generando conciencia social.",
            "D: Aportar con soluciones creativas e innovadoras que impacten el mundo visualmente."
        ]
    },
    {
        question: " Si tuvieras que presentar un proyecto ante una audiencia, ¿qué preferirías hacer?",
        options: [
            "A: Presentar los datos y resultados de manera clara y organizada, demostrando la efectividad de las decisiones.",
            "B: Mostrar cómo una solución tecnológica puede cambiar la manera en que se realiza un proceso.",
            "C: Comunicar una idea, historia o propuesta que conecte emocionalmente con la audiencia.",
            "D: Crear una presentación visualmente impactante, con un diseño atractivo que llame la atención."
        ]
    },
    {
        question: " ¿Qué tipo de entorno laboral prefieres?",
        options: [
            "A: Un ambiente estructurado, donde pueda gestionar proyectos y coordinar equipos.",
            "B: Un lugar donde pueda resolver problemas tecnológicos y trabajar en innovación constante.",
            "C: Un ambiente dinámico, donde pueda intercambiar ideas y colaborar en la creación de contenido.",
            "D: Un entorno creativo y flexible, donde pueda desarrollar proyectos visuales y artísticos."
        ]
    },
    {
        question: " Si tuvieras que diseñar un proyecto desde cero, ¿cómo lo harías?",
        options: [
            "A: Empezaría por organizar cada fase del proyecto y asegurarme de que todo se desarrolle según un plan estratégico.",
            "B: Me enfocaría en encontrar la tecnología adecuada y las herramientas necesarias para implementarlo.",
            "C: Buscaría ideas innovadoras que puedan tener un impacto social y definiría un plan de comunicación claro.",
            "D: Me concentraría en desarrollar un concepto visual único que sea atractivo y funcional a la vez."
        ]
    },
    {
        question: " ¿Cuál de las siguientes afirmaciones describe mejor tus habilidades interpersonales?",
        options: [
            "A: Me encanta coordinar y liderar equipos de trabajo, motivando a los demás a alcanzar objetivos.",
            "B: Prefiero trabajar en solitario y enfocarme en tareas técnicas y de resolución de problemas.",
            "C: Disfruto comunicando mis ideas y compartiendo conocimientos con los demás, y soy buen oyente.",
            "D: Me resulta fácil colaborar con personas creativas, ya que me gusta compartir ideas visuales y estéticas."
        ]
    },
    {
        question: " ¿Cómo abordas las situaciones de conflicto?",
        options: [
            "A: Busco soluciones prácticas y claras que resuelvan el conflicto de forma eficiente y sin afectar a la productividad.",
            "B: Prefiero analizar los hechos desde un punto de vista técnico y encontrar una solución lógica.",
            "C: Trato de comunicarme de manera abierta para comprender las diferentes perspectivas y llegar a un acuerdo.",
            "D: Trato de calmar la situación con ideas nuevas y creativas, buscando una forma de transformar el conflicto en algo positivo."
        ]
    },
    {
        question: " Si tuvieras que tomar una decisión sobre tu futuro profesional, ¿qué consideraciones tendrías en cuenta?",
        options: [
            "A: La posibilidad de tener estabilidad, un buen salario y desarrollar una carrera a largo plazo.",
            "B: La oportunidad de trabajar con tecnologías avanzadas y tener un impacto directo en la innovación.",
            "C: La capacidad de influir en la sociedad a través de la comunicación o el análisis de temas de interés público.",
            "D: La oportunidad de expresarme de forma creativa y desarrollar proyectos visuales que tengan un impacto en las personas."
        ]
    },
    {
        question: " En un equipo de trabajo, ¿cómo prefieres que se distribuyan las tareas?",
        options: [
            "A: Me gusta que las tareas sean distribuidas de acuerdo a las fortalezas de cada miembro del equipo, de forma clara y eficiente.",
            "B: Prefiero que las tareas sean asignadas según las habilidades técnicas de cada persona, especialmente en áreas de tecnología y resolución de problemas.",
            "C: Prefiero que todos los miembros del equipo tengan libertad para expresar sus ideas y colaborar en el proceso creativo.",
            "D: Prefiero que se enfoque en el diseño y creatividad, permitiendo que cada miembro aporte su estilo único."
        ]
    },
    {
        question: " ¿Qué te motiva más en la escuela?",
        options: [
            "A: Organizar y dirigir proyectos, buscando que todo salga bien y cumpla con los objetivos establecidos.",
            "B: Resolver problemas complejos, especialmente aquellos que implican el uso de la tecnología.",
            "C: Desarrollar proyectos comunicacionales o escribir sobre temas de interés y actualidad.",
            "D: Crear proyectos visuales o artísticos que muestren una parte de tu creatividad."
        ]
    },
    {
        question: " Si tuvieras que definir tu estilo de trabajo, ¿cómo lo describirías?",
        options: [
            "A: Planificado y organizado, me gusta tener un enfoque estructurado para asegurarme de que todo salga como se espera.",
            "B: Lógico y técnico, siempre busco la solución más efectiva y tecnológica al problema que enfrento.",
            "C: Flexible y colaborativo, disfruto de un entorno dinámico donde las ideas fluyen y se comparten con otros.",
            "D: Creativo y autónomo, me gusta trabajar en proyectos donde puedo expresar mi visión de manera libre y artística."
        ]
    },
    {
        question: " ¿Qué papel te gustaría desempeñar en una empresa o proyecto?",
        options: [
            "A: El de líder o coordinador, tomando decisiones y asegurando que todos los recursos y personas estén alineados.",
            "B: El de especialista técnico, encargado de resolver problemas o mejorar sistemas a través de la tecnología.",
            "C: El de comunicador, desarrollando estrategias para transmitir ideas y conectar con las audiencias.",
            "D: El de creador o diseñador, encargado de desarrollar ideas visuales y artísticas que den forma al proyecto."
        ]
    },
    {
        question: " ¿Qué tipo de ambiente laboral prefieres?",
        options: [
            "A: Un entorno profesional, organizado y con estructuras claras de roles y responsabilidades.",
            "B: Un espacio donde pueda trabajar con herramientas tecnológicas avanzadas y constantemente resolver problemas.",
            "C: Un ambiente en el que la creatividad y la comunicación fluya, donde se valoren las opiniones de todos los miembros del equipo.",
            "D: Un entorno abierto, flexible, donde se valore la creatividad, la innovación y la expresión artística."
        ]
    },
    {
        question: " ¿Qué habilidades crees que son más fuertes en ti?",
        options: [
            "A: La organización, la toma de decisiones y la gestión de proyectos.",
            "B: El análisis lógico, la solución de problemas y el manejo de tecnología.",
            "C: La capacidad de comunicarme eficazmente, de escribir y transmitir ideas a otros.",
            "D: La creatividad, el diseño y la habilidad para trabajar con elementos visuales."
        ]
    },
    {
        question: " ¿Qué aspecto de la vida profesional consideras más importante?",
        options: [
            "A: Tener la oportunidad de crecer profesionalmente, dirigir proyectos y tomar decisiones importantes.",
            "B: El desafío constante de resolver problemas a través de la tecnología y el uso de nuevas herramientas.",
            "C: La posibilidad de generar cambios en la sociedad a través de la comunicación efectiva.",
            "D: La oportunidad de desarrollar y expresar tu creatividad en diferentes formas de arte y diseño."
        ]
    },
    {
        question: " ¿Cómo prefieres aprender sobre algo nuevo?",
        options: [
            "A: A través de ejemplos prácticos, guías paso a paso y teniendo la oportunidad de aplicar lo aprendido.",
            "B: A través de la investigación y el análisis de datos, buscando siempre soluciones prácticas y basadas en la tecnología.",
            "C: A través de la colaboración y la discusión de ideas con otros, aprendiendo de las experiencias de los demás.",
            "D: A través de la experimentación y la creación, probando nuevas ideas y enfoques de manera creativa."
        ]
    },
    {
        question: " ¿Qué tipo de proyecto te gustaría gestionar?",
        options: [
            "A: Un proyecto en el que pueda coordinar personas y recursos para cumplir con objetivos organizacionales.",
            "B: Un proyecto técnico en el que pueda resolver problemas complejos utilizando tecnología avanzada.",
            "C: Un proyecto en el que pueda crear contenido, realizar investigaciones y comunicar ideas de manera efectiva.",
            "D: Un proyecto creativo, en el que pueda desarrollar y aplicar nuevas ideas visuales y artísticas."
        ]
    },
    {
        question: " ¿Cuál de las siguientes actividades disfrutas más?",
        options: [
            "A: Establecer metas y crear planes para alcanzarlas de manera ordenada.",
            "B: Resolver problemas técnicos, optimizar sistemas y procesos con el uso de herramientas tecnológicas.",
            "C: Escribir artículos, crear contenido o expresar opiniones a través de los medios.",
            "D: Crear diseños, desarrollar productos artísticos y visualizar ideas innovadoras."
        ]
    },
    {
        question: " ¿Cómo prefieres recibir retroalimentación sobre tu trabajo?",
        options: [
            "A: De manera estructurada, con puntos claros sobre lo que hice bien y lo que debo mejorar.",
            "B: A través de un análisis técnico y detallado sobre el proceso y los resultados obtenidos.",
            "C: De manera constructiva, enfocándome en cómo puedo mejorar mi comunicación o enfoque creativo.",
            "D: A través de sugerencias que me ayuden a mejorar la calidad visual y estética de mi trabajo."
        ]
    },
    {
        question: " En tu tiempo libre, ¿qué tipo de actividad prefieres realizar?",
        options: [
            "A: Organizar o participar en actividades de gestión o liderazgo, como eventos o proyectos.",
            "B: Estar trabajando en proyectos tecnológicos, desarrollando nuevos sistemas o aprendiendo sobre innovaciones.",
            "C: Leer, escribir o participar en actividades que impliquen comunicación, intercambio de ideas y aprendizaje.",
            "D: Dibujar, pintar, diseñar o cualquier actividad creativa que me permita expresarme artísticamente."
        ]
    },
    {
        question: " ¿Qué habilidades te gustaría desarrollar en tu vida profesional?",
        options: [
            "A: La capacidad de tomar decisiones efectivas, gestionar equipos y proyectos de manera eficiente.",
            "B: El dominio de tecnologías avanzadas y el manejo de herramientas técnicas para resolver problemas.",
            "C: La habilidad para comunicarme de forma efectiva y transmitir mis ideas de manera clara.",
            "D: El talento para crear y desarrollar conceptos visuales que impacten y sean apreciados."
        ]
    },
    {
        question: " Si tuvieras que emprender un proyecto, ¿cómo te gustaría que fuera?",
        options: [
            "A: Un proyecto que involucre gestión de recursos humanos y financieros para alcanzar metas específicas.",
            "B: Un proyecto en el que pueda integrar nuevas tecnologías y herramientas para mejorar procesos o sistemas.",
            "C: Un proyecto que me permita crear contenido visual, escribir sobre algo que me apasione o comunicar una causa.",
            "D: Un proyecto artístico, creativo, donde pueda explorar nuevas formas de diseño o expresión visual."
        ]
    },
    {
        question: " ¿Qué te resulta más satisfactorio?",
        options: [
            "A: Alcanzar los objetivos de un proyecto mediante una planificación eficiente y una buena organización.",
            "B: Encontrar soluciones a problemas complejos y aplicar mi conocimiento técnico para optimizar procesos.",
            "C: Ver cómo mis ideas o mensajes llegan a otras personas y generan un cambio positivo.",
            "D: Crear algo visualmente atractivo que sea apreciado y tenga un impacto en las personas."
        ]
    },
    {
        question: " Si estuvieras organizando un evento, ¿qué sería lo más importante para ti?",
        options: [
            "A: Tener una planificación meticulosa, asegurándome de que cada detalle esté bajo control.",
            "B: Utilizar tecnología avanzada para organizar y gestionar el evento de manera efectiva.",
            "C: Asegurarme de que el evento tenga un impacto social positivo y que las personas se sientan involucradas.",
            "D: Asegurarme de que el evento sea visualmente atractivo y tenga un diseño innovador que llame la atención."
        ]
    },
    {
        question: " ¿Cuál de las siguientes actividades te parece más desafiante?",
        options: [
            "A: Liderar un equipo y asegurarte de que todos trabajen bien juntos hacia un objetivo común.",
            "B: Resolver un problema complejo utilizando tecnología o herramientas técnicas avanzadas.",
            "C: Presentar un tema o una idea de manera que impacte a una audiencia o grupo de personas.",
            "D: Crear un diseño visual o un proyecto artístico que sea original y llamativo."
        ]
    },
    {
        question: " ¿En qué tipo de ambiente te sentirías más cómodo trabajando?",
        options: [
            "A: En un ambiente estructurado, con tareas claras y metas bien definidas, donde pueda coordinar equipos.",
            "B: En un entorno que implique trabajo con tecnología avanzada y la resolución de problemas técnicos.",
            "C: En un ambiente de colaboración constante, donde se intercambian ideas y se desarrollan proyectos comunicacionales.",
            "D: En un entorno creativo, donde pueda experimentar con nuevas ideas y desarrollarlas de forma libre y artística."
        ]
    },
    {
        question: " Si te dieran la oportunidad de trabajar en una empresa, ¿qué tipo de proyectos te gustaría liderar?",
        options: [
            "A: Proyectos que impliquen optimización de procesos y gestión de recursos para mejorar la eficiencia empresarial.",
            "B: Proyectos tecnológicos que busquen implementar nuevas herramientas, sistemas o software.",
            "C: Proyectos de comunicación y marketing que busquen transmitir un mensaje a un público amplio o específico.",
            "D: Proyectos creativos donde pueda diseñar, innovar y aportar mi estilo artístico a los productos o servicios."
        ]
    },
    {
        question: " Si tuvieras que dar una presentación, ¿cómo te sentirías más cómodo?",
        options: [
            "A: Preparando un discurso claro, con datos estructurados y hechos que respalden mi mensaje.",
            "B: Explicando el uso y la implementación de una nueva tecnología o solución técnica.",
            "C: Hablando con una audiencia sobre un tema que me apasiona, de manera espontánea y auténtica.",
            "D: Mostrando un diseño, video o contenido visual para expresar mi idea de forma impactante y creativa."
        ]
    },
    {
        question: " ¿Cómo prefieres resolver los conflictos dentro de un equipo de trabajo?",
        options: [
            "A: Analizando los hechos de forma objetiva y proponiendo soluciones prácticas que ayuden a resolver la situación.",
            "B: Usando mi capacidad de análisis técnico para entender el problema y encontrar una solución lógica.",
            "C: Escuchando las opiniones de los demás y buscando un enfoque colaborativo para llegar a un acuerdo.",
            "D: Intentando transformar el conflicto en una oportunidad para mejorar el aspecto creativo del trabajo."
        ]
    },
    {
        question: " Si tuvieras que trabajar en un equipo, ¿qué rol te gustaría desempeñar?",
        options: [
            "A: El rol de líder o coordinador, ayudando a los demás a mantenerse enfocados y cumpliendo los plazos establecidos.",
            "B: El rol de experto técnico, aportando mi conocimiento en herramientas y soluciones especializadas.",
            "C: El rol de comunicador, encargándome de las relaciones interpersonales y asegurándome de que todos estén informados y conectados.",
            "D: El rol de creativo, generando ideas innovadoras y visualmente atractivas para el equipo."
        ]
    },
    {
        question: " Si pudieras elegir un entorno de trabajo, ¿cuál de los siguientes preferirías?",
        options: [
            "A: Un entorno estructurado donde se valoren los procesos y el cumplimiento de objetivos bien definidos.",
            "B: Un entorno tecnológico donde se trabajen con las últimas herramientas y tecnologías disponibles.",
            "C: Un entorno colaborativo y flexible donde la comunicación sea fluida y las ideas puedan ser compartidas abiertamente.",
            "D: Un entorno creativo donde se valore la innovación y la expresión artística en todas sus formas."
        ]
    },
    {
        question: " ¿Qué tipo de tareas disfrutas más?",
        options: [
            "A: Organizar, planificar y ejecutar proyectos de manera eficiente para cumplir con los objetivos establecidos.",
            "B: Resolver problemas complejos y aplicar nuevas tecnologías para mejorar procesos o sistemas.",
            "C: Generar ideas, escribir o comunicar algo que impacte a una audiencia y despierte su interés.",
            "D: Diseñar, crear o experimentar con diferentes formas de arte, desde el diseño gráfico hasta el video o la moda."
        ]
    },
    {
        question: " ¿Qué tipo de habilidades te gustaría perfeccionar en el futuro?",
        options: [
            "A: Habilidades de gestión, liderazgo y toma de decisiones en proyectos de gran envergadura.",
            "B: Habilidades técnicas y de programación que me permitan resolver problemas mediante el uso de herramientas digitales.",
            "C: Habilidades de comunicación, persuasión y gestión de relaciones para influir en los demás de manera efectiva.",
            "D: Habilidades artísticas, de diseño y creatividad para desarrollar proyectos visuales que impacten a las personas."
        ]
    },
    {
        question: " ¿Qué es lo que más valoras de un trabajo o proyecto?",
        options: [
            "A: La capacidad de alcanzar objetivos claros, de generar resultados tangibles y medir el éxito.",
            "B: El desafío constante de resolver problemas y la oportunidad de usar tecnología de vanguardia.",
            "C: La oportunidad de comunicarme y conectar con personas, influyendo positivamente en sus opiniones o decisiones.",
            "D: La posibilidad de expresar mi creatividad y desarrollar proyectos innovadores y visualmente atractivos."
        ]
    },
    {
        question: " Si pudieras elegir entre una carrera que involucre mucha interacción social o una más técnica, ¿cuál elegirías?",
        options: [
            "A: Prefiero una carrera que me permita interactuar con diferentes personas y liderar equipos hacia un objetivo común.",
            "B: Prefiero una carrera que implique resolver problemas técnicos y que requiera concentración y habilidades especializadas.",
            "C: Me gustaría una carrera que combine interacción social y la creación de contenido o comunicación.",
            "D: Me atrae una carrera que implique creatividad, pero con un enfoque en proyectos visuales o artísticos."
        ]
    },
    {
        question: " ¿Qué te resulta más desafiante al realizar una tarea?",
        options: [
            "A: Mantener todo organizado, coordinar personas y asegurarme de que todo funcione según lo planeado.",
            "B: Entender los aspectos técnicos y encontrar la solución más eficiente para resolver el problema.",
            "C: Explicar claramente lo que estoy haciendo, ya sea a través de palabras, presentaciones o informes.",
            "D: Desarrollar una idea o concepto creativo que sea único y que logre un impacto visual."
        ]
    },
    {
        question: " ¿Qué tipo de objetivos prefieres alcanzar?",
        options: [
            "A: Objetivos que se centran en la eficiencia y el cumplimiento de metas organizacionales.",
            "B: Objetivos técnicos que implican resolver problemas y mejorar sistemas o procesos.",
            "C: Objetivos que se centran en la creación de contenido, la comunicación efectiva y el trabajo en equipo.",
            "D: Objetivos que se centran en la creación artística y el diseño de experiencias visuales y sensoriales."
        ]
    },
    {
        question: " ¿Si pudieras elegir entre un trabajo autónomo o en equipo, ¿qué elegirías?",
        options: [
            "A: Prefiero trabajar en equipo, ya que me gusta coordinar esfuerzos y lograr objetivos en conjunto.",
            "B: Prefiero trabajar de manera autónoma, resolviendo problemas a través de mi propio conocimiento y habilidades.",
            "C: Me gustaría un equilibrio entre trabajo en equipo y trabajo autónomo, para poder comunicarme y aprender de los demás.",
            "D: Prefiero trabajar de manera autónoma, en proyectos creativos que me permitan expresarme y desarrollar mis ideas."
        ]
    },
];

let currentQuestionIndex = 0;
let selectedTest = null;

function startTest1() {
    console.log("Iniciando Test 1...");
    console.log("selectedTest:", selectedTest, "termsAccepted:", termsAccepted);
    if (selectedTest === "Test 1" && termsAccepted && validateForm()) {
        console.log("Condiciones cumplidas. Renderizando primera pregunta...");
        renderQuestion(test1Questions[currentQuestionIndex]); // Mostrar primera pregunta
    } else {
        console.error("No se cumplen las condiciones para iniciar el Test 1.");
    }
}

function renderQuestion(questionData) {
    console.log("Renderizando pregunta:", questionData.question);

    const testContainer = document.createElement('div');
    testContainer.className = 'test-container';

    // Crear el contenido de la pregunta y las opciones
    testContainer.innerHTML = `
        <h2>${questionData.question}</h2>
        <ul>
            ${questionData.options.map((option, index) => `
                <li><button class="test-option" data-option="${String.fromCharCode(65 + index)}">${option}</button></li>
            `).join('')}
        </ul>
    `;

    // Agregar la pregunta al contenedor principal
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        mainContainer.innerHTML = ''; // Limpiar el contenido previo
        mainContainer.appendChild(testContainer);
    } else {
        console.error("No se encontró el contenedor principal.");
        return;
    }

    // Asignar el evento onclick a las opciones
    document.querySelectorAll('.test-option').forEach(option => {
        option.onclick = function () {
            const selectedOption = this.getAttribute('data-option'); // Obtener el valor de data-option
            console.log(`Opción seleccionada: ${selectedOption}`);
            handleAnswerSelection(selectedOption); // Pasar la opción seleccionada
        };
    });
}

function handleAnswerSelection() {
    currentQuestionIndex++;
    if (currentQuestionIndex < test1Questions.length) {
        console.log("Siguiente pregunta...");
        renderQuestion(test1Questions[currentQuestionIndex]); // Mostrar siguiente pregunta
    } else {
        endTest1(); // Finalizar test
    }
}


// =============================
// Eventos para los botones
// =============================
function handleTest1() {
    selectedTest = 'Test 1'; // Asignar el test seleccionado

    // Mostrar el popup de Términos y Condiciones
    const termsPopup = document.getElementById('terms-popup');
    termsPopup.hidden = false; // Mostrar el popup

    // Configurar el botón "Aceptar" para proceder al test
    document.getElementById('accept-terms-btn').onclick = function () {
        termsAccepted = true; // Confirmar que los términos fueron aceptados
        termsPopup.hidden = true; // Ocultar el popup
        console.log("Términos aceptados. Iniciando Test 1...");

        hideButtons(); // Ocultar botones principales
        showForm(); // Mostrar el formulario
    };

    // Configurar el botón "Cerrar" para cancelar el inicio del test
    document.querySelector('.close-popup').onclick = function () {
        termsPopup.hidden = true; // Ocultar el popup
        console.log("Inicio del test cancelado.");
    };
}



function handleDataSubmission(event, onAccept) {
    event.preventDefault(); // Evitar que se recargue la página

    // Acceder a los valores de los campos
    const names = document.getElementById('names').value.trim();
    const lastnames = document.getElementById('lastnames').value.trim();

    // Validar que ambos campos están completos
    if (names && lastnames) {
        console.log("Datos validados: Nombres y Apellidos están completos.");
        onAccept(); // Ejecutar acción después de validar los datos
    } else {
        console.error("Error: Por favor, completa los nombres y apellidos antes de continuar.");
    }
}

// Agregar el controlador al formulario
document.getElementById('data-form').onsubmit = function (event) {
    handleDataSubmission(event, () => {
        console.log("onAccept: Los datos han sido enviados exitosamente.");

        // Verificar qué test se está ejecutando
        if (selectedTest === 'Test 1') {
            startTest1(); // Iniciar el Test 1
        } else if (selectedTest === 'Test 2') {
            startTest2(); // Iniciar el Test 2
        } else {
            console.error("Error: No se ha seleccionado un test válido.");
        }
    });
};

const answerCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
};

function handleAnswerSelection(option) {
    // Validar que la opción sea válida (A, B, C, D)
    if (!option || !['A', 'B', 'C', 'D'].includes(option)) {
        console.error(`handleAnswerSelection: Opción inválida "${option}".`);
        return;
    }

    // Incrementar el contador para la opción seleccionada
    answerCount[option]++;
    console.log("Contador actualizado:", answerCount);

    // Avanzar a la siguiente pregunta o finalizar el test
    currentQuestionIndex++;
    if (currentQuestionIndex < test1Questions.length) {
        renderQuestion(test1Questions[currentQuestionIndex]); // Mostrar la siguiente pregunta
    } else {
        endTest1(); // Finalizar el test
    }
}

function getResult() {
    // Encontrar la letra con la mayor cantidad de respuestas
    const highestAnswer = Object.keys(answerCount).reduce((a, b) => 
        answerCount[a] > answerCount[b] ? a : b
    );

    // Validar si existe un resultado
    if (!highestAnswer) {
        console.error("getResult: No se pudo determinar una mayoría de respuestas.");
        return null; // En caso de que algo falle
    }

    // Definir los resultados basados en la mayoría
    const results = {
        A: {
            carreras: [
                "Administración de Empresas",
                "Administración Pública",
                "Administración en Servicios de la Salud",
                "Administración Deportiva",
                "Contaduría Pública"
            ],
            perfil: "Líder natural, organizado y estructurado. Prefieres trabajar en un entorno donde puedas tomar decisiones, coordinar equipos y lograr objetivos específicos."
        },
        B: {
            carreras: [
                "Ingeniería de Sistemas",
                "Ingeniería Electrónica",
                "Ingeniería Industrial",
                "Ingeniería en Telecomunicaciones",
                "Ciencias de la Computación"
            ],
            perfil: "Lógico, analítico y técnico. Te apasiona resolver problemas complejos mediante el uso de la tecnología y la innovación."
        },
        C: {
            carreras: [
                "Comunicación Social",
                "Publicidad y Mercadeo",
                "Dirección y Producción de Medios Audiovisuales",
                "Derecho"
            ],
            perfil: "Comunicativo, creativo y empático. Te interesa generar impacto en la sociedad mediante la comunicación efectiva y la creación de contenido que conecte con las personas."
        },
        D: {
            carreras: [
                "Diseño Gráfico",
                "Diseño de Modas",
                "Publicidad y Mercadeo",
                "Dirección y Producción de Medios Audiovisuales",
                "Artes Visuales"
            ],
            perfil: "Creativo, innovador y con una fuerte inclinación hacia las artes. Te apasiona la creación visual y la posibilidad de expresarte de manera única y artística."
        }
    };

    // Validar que la respuesta exista en el objeto de resultados
    const result = results[highestAnswer];
    if (!result) {
        console.error(`getResult: La opción "${highestAnswer}" no tiene un resultado asignado.`);
        return null; // En caso de que no se encuentre un resultado
    }

    return result;
}

function endTest1() {
    const result = getResult(); // Obtener el resultado basado en las respuestas
    if (!result) {
        const mainContainer = document.querySelector('main');
        mainContainer.innerHTML = `
            <h2>Error al calcular el resultado</h2>
            <p>Por favor, asegúrate de responder todas las preguntas correctamente.</p>
            <button onclick="restartTest()">Reiniciar Test</button>
        `;
        console.error("endTest1: No se pudo calcular el resultado final.");
        return;
    }

    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = `
        <h2>Resultados del Test</h2>
        <p><strong>Perfil de Personalidad:</strong> ${result.perfil}</p>
        <p><strong>Carreras Recomendadas:</strong></p>
        <ul>
            ${result.carreras.map(carrera => `<li>${carrera}</li>`).join('')}
        </ul>
        <button onclick="location.reload();">Reiniciar Test</button>
    `;
    console.log("Test finalizado. Resultado mostrado:", result);
}

// Preguntas del Segundo Test
const test2Questions = [
    {'question': '¿Te interesa trabajar con grandes volúmenes de datos y encontrar patrones útiles?'},
    {'question': '¿Te gustaría tomar decisiones empresariales basadas en datos y análisis estadísticos?'},
    {'question': '¿Te sientes cómodo usando herramientas de programación y análisis de datos como Python o R?'},
    {'question': '¿Disfrutas de los desafíos relacionados con la interpretación de datos para predecir resultados futuros?'},
    {'question': '¿Te gustaría aprender a desarrollar algoritmos para mejorar el rendimiento de las empresas mediante el análisis de datos?'},
    {'question': '¿Te apasiona cómo las tecnologías innovadoras pueden cambiar las empresas y la sociedad?'},
    {'question': '¿Te interesa implementar soluciones tecnológicas que mejoren procesos de negocio?'},
    {'question': '¿Te gustaría ser parte de proyectos que transformen empresas a través de la digitalización de procesos?'},
    {'question': '¿Te motiva la idea de transformar organizaciones mediante el uso de herramientas tecnológicas avanzadas?'},
    {'question': '¿Tienes interés en gestionar equipos interdisciplinarios enfocados en la innovación tecnológica?'},
    {'question': '¿Te interesa garantizar que los sistemas tecnológicos en una empresa funcionen correctamente?'},
    {'question': '¿Te gustaría ser responsable de la infraestructura tecnológica de una organización?'},
    {'question': '¿Disfrutas resolver problemas técnicos y ofrecer soluciones en tiempo real?'},
    {'question': '¿Te interesa gestionar equipos que implementen y mantengan sistemas informáticos?'},
    {'question': '¿Te gustaría estar al tanto de las últimas innovaciones tecnológicas para aplicar en una empresa?'},
    {'question': '¿Te apasiona trabajar en proyectos que promuevan la paz y la cohesión social?'},
    {'question': '¿Te gustaría participar en la reconstrucción de comunidades después de un conflicto?'},
    {'question': '¿Te interesa abordar problemas sociales y territoriales en áreas de conflicto?'},
    {'question': '¿Tienes interés en el desarrollo de políticas públicas para la paz y el bienestar de las comunidades?'},
    {'question': '¿Te gustaría trabajar con gobiernos, ONGs o empresas en proyectos de desarrollo territorial y social?'},
    {'question': '¿Te motiva mejorar la competitividad de las empresas mediante la optimización de sus procesos internos?'},
    {'question': '¿Te gustaría gestionar el cambio dentro de una empresa para mejorar su estructura y resultados?'},
    {'question': '¿Tienes habilidades para gestionar equipos multidisciplinarios enfocados en la mejora organizacional?'},
    {'question': '¿Te interesa ayudar a las empresas a adaptarse a nuevas tendencias del mercado?'},
    {'question': '¿Disfrutas analizar la estructura de una empresa y proponer soluciones para su evolución?'},
    {'question': '¿Te apasiona construir y gestionar la imagen de una empresa o producto?'},
    {'question': '¿Te gustaría dirigir campañas para crear lealtad y reconocimiento de marca?'},
    {'question': '¿Te interesa el impacto que tiene la percepción del consumidor sobre el éxito de una marca?'},
    {'question': '¿Te gustaría ser responsable de posicionar una marca en el mercado a nivel global?'},
    {'question': '¿Te interesa el uso de la creatividad y el análisis en el desarrollo de estrategias de marketing de marca?'},
    {'question': '¿Te interesa mejorar la calidad educativa y el rendimiento de los estudiantes?'},
    {'question': '¿Te gustaría gestionar políticas educativas para mejorar las instituciones educativas?'},
    {'question': '¿Tienes interés en implementar nuevas metodologías de enseñanza en instituciones educativas?'},
    {'question': '¿Te gustaría coordinar programas educativos a nivel administrativo y pedagógico?'},
    {'question': '¿Te interesa gestionar equipos educativos para mejorar los procesos de enseñanza-aprendizaje?'},
    {'question': '¿Te gustaría gestionar negocios que operan principalmente en el entorno digital?'},
    {'question': '¿Te interesa desarrollar y ejecutar estrategias digitales para maximizar el crecimiento empresarial?'},
    {'question': '¿Tienes interés en usar herramientas digitales para aumentar las ventas y la visibilidad de un negocio?'},
    {'question': '¿Te gustaría estudiar cómo las empresas pueden adaptarse a las nuevas tecnologías digitales?'},
    {'question': '¿Te interesa aprender sobre el uso de redes sociales, marketing digital y comercio electrónico en los negocios?'},
    {'question': '¿Te gustaría mejorar la productividad de una organización a través del desarrollo de su talento humano?'},
    {'question': '¿Te interesa diseñar e implementar estrategias de formación y capacitación para empleados?'},
    {'question': '¿Te motiva ayudar a las organizaciones a construir una cultura positiva y colaborativa?'},
    {'question': '¿Te gustaría gestionar los procesos de reclutamiento y selección de personal para optimizar el talento de una empresa?'},
    {'question': '¿Te interesa el desarrollo de liderazgo y habilidades personales dentro de las organizaciones?'},
    {'question': '¿Te interesa la planificación a largo plazo para anticipar futuros posibles y tomar decisiones estratégicas?'},
    {'question': '¿Te gustaría desarrollar modelos predictivos para prever cambios en el mercado y la economía?'},
    {'question': '¿Te apasiona estudiar las tendencias globales y cómo pueden afectar a las organizaciones?'},
    {'question': '¿Te interesa trabajar en la creación de estrategias innovadoras que guíen a una empresa hacia el futuro?'},
    {'question': '¿Te gustaría ser parte de un equipo que evalúe y construya escenarios futuros para la toma de decisiones estratégicas?'},
    {'question': '¿Te interesa trabajar en el bienestar y desarrollo de niños y adolescentes?'},
    {'question': '¿Te gustaría diseñar programas educativos y sociales que promuevan el desarrollo integral de los más jóvenes?'},
    {'question': '¿Tienes interés en ayudar a mejorar la salud mental y emocional de niños y adolescentes?'},
    {'question': '¿Te gustaría realizar investigaciones relacionadas con el crecimiento y desarrollo de los menores?'},
    {'question': '¿Te interesa trabajar en plataformas educativas virtuales para apoyar a la infancia y adolescencia?'},
    {'question': '¿Te gustaría gestionar cambios en el sistema educativo para mejorar la enseñanza?'},
    {'question': '¿Te interesa crear métodos educativos innovadores y efectivos?'},
    {'question': '¿Te gustaría ser responsable de la formación y capacitación de otros docentes o profesionales de la educación?'},
    {'question': '¿Te interesa desarrollar políticas y programas educativos a nivel institucional o gubernamental?'},
    {'question': '¿Te gustaría investigar y aplicar nuevas tecnologías en el aula para mejorar el aprendizaje?'},
    {'question': '¿Te interesa trabajar en el diseño de entornos virtuales de aprendizaje innovadores?'},
    {'question': '¿Tienes habilidades para crear contenidos interactivos y plataformas educativas online?'},
    {'question': '¿Te gustaría investigar cómo las tecnologías pueden mejorar la experiencia educativa?'},
    {'question': '¿Te interesa optimizar el uso de herramientas digitales para una educación más accesible y eficiente?'},
    {'question': '¿Te gustaría desarrollar métodos de enseñanza y aprendizaje que aprovechen las plataformas virtuales?'},
    {'question': '¿Te interesa estudiar cómo el cerebro de los niños y adolescentes aprende y se adapta a la educación?'},
    {'question': '¿Te gustaría aplicar la neuropsicología para mejorar los procesos de enseñanza y aprendizaje?'},
    {'question': '¿Tienes interés en el impacto de las tecnologías en el desarrollo cognitivo y emocional de los estudiantes?'},
    {'question': '¿Te gustaría investigar y aplicar estrategias educativas basadas en la neurociencia?'},
    {'question': '¿Te apasiona trabajar en la optimización de los procesos educativos desde una perspectiva neuropsicológica?'},
    {'question': '¿Te interesa gestionar estrategias de marketing utilizando plataformas digitales?'},
    {'question': '¿Tienes habilidades para analizar y crear contenido para redes sociales y sitios web?'},
    {'question': '¿Te gustaría estudiar las tendencias del mercado digital y cómo aplicarlas a empresas y marcas?'},
    {'question': '¿Te apasiona trabajar con campañas publicitarias en entornos digitales?'},
    {'question': '¿Te gustaría analizar datos y métricas para optimizar las estrategias de marketing digital?'},
    {'question': '¿Te gustaría asumir roles de liderazgo para dirigir equipos y organizaciones?'},
    {'question': '¿Tienes interés en gestionar empresas y tomar decisiones estratégicas para su crecimiento?'},
    {'question': '¿Te gustaría estudiar sobre la administración de recursos humanos, financieros y operacionales?'},
    {'question': '¿Te interesa desarrollar habilidades de liderazgo para dirigir organizaciones con visión y eficacia?'},
    {'question': '¿Te gustaría implementar modelos de alta gerencia en empresas tanto físicas como virtuales?'},
    {'question': '¿Te interesa garantizar la seguridad y el bienestar de los empleados en una organización?'},
    {'question': '¿Te gustaría implementar políticas y procedimientos de seguridad laboral?'},
    {'question': '¿Te gustaría formar parte de un equipo que gestione programas de salud en el entorno laboral?'},
    {'question': '¿Tienes interés en evaluar riesgos laborales y proponer estrategias preventivas?'},
    {'question': '¿Te gustaría trabajar en la creación de ambientes laborales más seguros, saludables y productivos?'},
    {'question': '¿Te interesa garantizar la calidad de los servicios de salud en instituciones y organizaciones?'},
    {'question': '¿Te gustaría trabajar en la implementación de normas y estándares de calidad en el sector salud?'},
    {'question': '¿Te gustaría gestionar equipos para mejorar procesos en la atención médica?'},
    {'question': '¿Te interesa desarrollar y supervisar políticas que mejoren la eficiencia y calidad del sistema de salud?'},
    {'question': '¿Tienes interés en realizar auditorías de calidad dentro de las instituciones de salud?'},
    {'question': '¿Te gustaría gestionar las finanzas de una empresa para maximizar su rentabilidad y sostenibilidad?'},
    {'question': '¿Tienes interés en la gestión de recursos financieros y la toma de decisiones económicas?'},
    {'question': '¿Te gustaría aplicar conceptos de contabilidad y finanzas en el entorno empresarial?'},
    {'question': '¿Te interesa analizar los estados financieros y elaborar estrategias para optimizar el rendimiento económico?'},
    {'question': '¿Te gustaría desarrollar modelos de inversión y gestión de riesgos en empresas?'},
    {'question': '¿Te interesa planificar, organizar y ejecutar proyectos de manera eficiente?'},
    {'question': '¿Tienes habilidades para coordinar equipos y cumplir con plazos y presupuestos?'},
    {'question': '¿Te gustaría gestionar proyectos en diversas áreas, como tecnología, salud, o educación?'},
    {'question': '¿Te interesa estudiar metodologías ágiles y otras técnicas de gestión de proyectos?'},
    {'question': '¿Te gustaría ser responsable de la ejecución de proyectos complejos, asegurando su éxito?'},

    // Puedes agregar más preguntas aquí...
];

// Contador para respuestas afirmativas
let positiveAnswers = 0;

// Función para manejar el botón de Test 2 (botón derecho)
function handleTest2() {
    selectedTest = 'Test 2'; // Asignar el test seleccionado

    // Mostrar los Términos y Condiciones
    const termsPopup = document.getElementById('terms-popup');
    termsPopup.hidden = false;

    // Botón Aceptar los Términos
    document.getElementById('accept-terms-btn').onclick = function () {
        termsAccepted = true; // Confirmar que los términos fueron aceptados
        termsPopup.hidden = true; // Ocultar el popup
        console.log("Términos aceptados. Iniciando Test 2...");

        hideButtons(); // Ocultar botones principales
        showForm(); // Mostrar el formulario si aplica

    };

    // Botón Cerrar los Términos
    document.querySelector('.close-popup').onclick = function () {
        termsPopup.hidden = true; // Ocultar el popup
        console.log("Inicio del test cancelado.");
    };
}

// Función para iniciar el Test 2
function startTest2() {
    console.log("Iniciando Test 2...");
    console.log("selectedTest:", selectedTest, "termsAccepted:", termsAccepted);

    if (selectedTest === "Test 2" && termsAccepted && validateForm()) {
        console.log("Condiciones válidas. Renderizando primera pregunta del Test 2...");
        currentQuestionIndex = 0; // Reiniciar índice de preguntas
        renderQuestionTest2(test2Questions[currentQuestionIndex]); // Mostrar la primera pregunta
    } else {
        console.error("No se cumplen las condiciones para iniciar el Test 2.");
    }
}

// Función para renderizar las preguntas del Test 2
function renderQuestionTest2(questionData) {
    console.log("Renderizando pregunta del Test 2:", questionData.question);
    const testContainer = document.createElement('div');
    testContainer.className = 'test-container';

    testContainer.innerHTML = `
        <h2>${questionData.question}</h2>
        <div class="test-options">
            <button class="test-option" data-option="yes">Sí</button>
            <button class="test-option" data-option="no">No</button>
        </div>
    `;

    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = ''; // Limpiar el contenido previo
    mainContainer.appendChild(testContainer);

    document.querySelectorAll('.test-option').forEach(option => {
        option.onclick = function () {
            const selectedOption = this.getAttribute('data-option');
            console.log(`Opción seleccionada del Test 2: ${selectedOption}`);
            handleAnswerSelectionTest2(selectedOption); // Manejar respuesta seleccionada
        };
    });
}

// Función para manejar las respuestas del Test 2
function handleAnswerSelectionTest2(option) {
    if (option === "yes") {
        positiveAnswers++; // Incrementar el contador si la respuesta es afirmativa
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < test2Questions.length) {
        renderQuestionTest2(test2Questions[currentQuestionIndex]); // Mostrar la siguiente pregunta
    } else {
        endTest2(); // Finalizar el Test 2
    }
}

// Función para finalizar el Test 2
function endTest2() {
    let resultMessage = "";

    // Determinar el resultado basado en el rango de respuestas afirmativas
    if (positiveAnswers >= 96 && positiveAnswers <= 100) {
        resultMessage = "Posgrado recomendado: Especialización en Gerencia de Proyectos";
    } else if (positiveAnswers >= 91 && positiveAnswers <= 95) {
        resultMessage = "Posgrado recomendado: EEspecialización en Gerencia Financiera";
    } else if (positiveAnswers >= 86 && positiveAnswers <= 90) {
        resultMessage = "Posgrado recomendado: Especialización en Gerencia de la Calidad en Salud";
    } else if (positiveAnswers >= 81 && positiveAnswers <= 85) {
        resultMessage = "Posgrado recomendado: Especialización en Gerencia de la Seguridad y Salud en el Trabajo Virtual";
    } else if (positiveAnswers >= 76 && positiveAnswers <= 80) {
        resultMessage = "Posgrado recomendado: Especialización en Alta Gerencia Virtual.";
    } else if (positiveAnswers >= 71 && positiveAnswers <= 75) {
        resultMessage = "Posgrado recomendado: Especialización en Marketing Digital Virtual";
    } else if (positiveAnswers >= 66 && positiveAnswers <= 70) {
        resultMessage = "Posgrado recomendado: Especialización en Neuropsicología de la Educación Virtual";
    } else if (positiveAnswers >= 61 && positiveAnswers <= 65) {
        resultMessage = "Posgrado recomendado: Maestría en Ambientes Digitales para la Educación Virtual";
    } else if (positiveAnswers >= 56 && positiveAnswers <= 60) {
        resultMessage = "Posgrado recomendado: Maestría en Educación";
    } else if (positiveAnswers >= 51 && positiveAnswers <= 55) {
        resultMessage = "Posgrado recomendado: Especialización en Desarrollo Integral de la Infancia y Adolescencia Virtual";
    } else if (positiveAnswers >= 46 && positiveAnswers <= 50) {
        resultMessage = "Posgrado recomendado: Prospectiva Estratégica.";
    } else if (positiveAnswers >= 41 && positiveAnswers <= 45) {
        resultMessage = "Posgrado recomendado: Especialización en Desarrollo Organizacional y Gestión del Talento Humano.";
    } else if (positiveAnswers >= 36 && positiveAnswers <= 40) {
        resultMessage = "Posgrado recomendado: Especialización en Gestión de Negocios Digitales.";
    } else if (positiveAnswers >= 31 && positiveAnswers <= 35) {
        resultMessage = "Posgrado recomendado: Especialización en Gerencia Educativa.";
    } else if (positiveAnswers >= 26 && positiveAnswers <= 30) {
        resultMessage = "Posgrado recomendado: Especialización en Gerencia.";
    } else if (positiveAnswers >= 21 && positiveAnswers <= 25) {
        resultMessage = "Posgrado recomendado: Escuela de Transformación Empresarial.";
    } else if (positiveAnswers >= 16 && positiveAnswers <= 20) {
        resultMessage = "Posgrado recomendado: Especialización en Paz y Desarrollo Territorial.";
    } else if (positiveAnswers >= 11 && positiveAnswers <= 15) {
        resultMessage = "Posgrado recomendado: Especialización en Gestión de Tecnologías de la Información.";
    } else if (positiveAnswers >= 6 && positiveAnswers <= 10) {
        resultMessage = "Posgrado recomendado: Especialización en Transformación Digital.";
    } else if (positiveAnswers >= 1 && positiveAnswers <= 5) {
        resultMessage = "Posgrado recomendado: Especialización en Analítica de Datos.";
    } else {
        resultMessage = "No se obtuvo un resultado claro. Por favor, responde más preguntas.";
    }

    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = `
        <h2>Resultados del Test 2</h2>
        <p>${resultMessage}</p>
        <button onclick="location.reload();">Reiniciar Test</button>
    `;
    console.log("Test 2 finalizado. Resultado:", resultMessage);
}

function showTerms(testName) {
    const termsPopup = document.getElementById('terms-popup');
    termsPopup.hidden = false; // Mostrar el popup

    // Botón Aceptar los Términos
    document.getElementById('accept-terms-btn').onclick = function () {
        termsAccepted = true; // Confirmar que los términos fueron aceptados
        termsPopup.hidden = true; // Ocultar el popup
        console.log(`Términos aceptados para ${testName}. Iniciando el test...`);

        if (testName === 'test1') {
            handleTest1(); // Llamar a la función del Test 1
        } else if (testName === 'test2') {
            handleTest2(); // Llamar a la función del Test 2
        }
    };

    // Botón Cerrar los Términos
    document.querySelector('.close-popup').onclick = function () {
        termsPopup.hidden = true; // Ocultar el popup
        console.log(`Inicio del ${testName} cancelado.`);
    };
}


document.querySelector('.left-button').onclick = handleTest1;
document.querySelector('.right-button').onclick = handleTest2;
