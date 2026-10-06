import type { Dictionary } from "./types";

export const es: Dictionary = {
  meta: {
    title: "Nevada Energy Advisors | Consulta solar gratuita",
    description:
      "¿Se siente atrapado con un contrato solar? ¿Pagos muy altos, o le vendieron algo distinto a lo que le dijeron? Pida una consulta gratuita. Le damos una mirada honesta a sus opciones y pasos claros. Cada caso es distinto.",
    keywords: [
      "ayuda con contrato solar",
      "alivio de pagos solares",
      "consulta solar gratuita",
      "revisión de arrendamiento solar",
    ],
  },
  header: {
    cta: "Consulta gratuita",
    langToggleLabel: "English",
    langToggleAria: "Switch to English",
  },
  hero: {
    badge: "Consulta gratuita",
    title: "¿Se siente atrapado con un contrato solar?",
    subtitle:
      "¿Paga más de lo que le prometieron? ¿La venta no coincidió con lo que le dijeron? Obtenga respuestas directas sobre su contrato y un plan claro para lo que sigue.",
    bullets: [
      "Sin costo y sin presión",
      "Respuestas directas sobre su contrato",
      "Un camino más claro desde aquí",
    ],
    questionsPrefix: "¿Preguntas? Llame al",
    orEmail: "o escriba a",
    formTitle: "Pida una consulta gratuita",
    formSubtitle: "Comparta unos datos y nos pondremos en contacto.",
  },
  form: {
    fullName: "Nombre",
    phone: "Teléfono",
    email: "Correo electrónico",
    zip: "Código postal",
    solarInstaller: "Instalador solar",
    optional: "(opcional)",
    message: "Mensaje breve",
    solarInstallerPlaceholder: "Nombre de la empresa o instalador",
    phonePlaceholder: "(702) 313-3073",
    zipPlaceholder: "12345",
    messagePlaceholder: "Describa brevemente su situación...",
    submit: "Pedir una consulta gratuita",
    submitting: "Enviando...",
    consent:
      "Al enviar, acepta que podamos contactarlo sobre una consulta gratuita. No venderemos su información. Esto no es asesoría legal y cada caso es distinto, así que no podemos prometer cancelación, reembolso ni ningún resultado específico.",
    successTitle: "Gracias",
    successBody:
      "Recibimos su solicitud. Alguien podría llamarlo o escribirle sobre una consulta gratuita. Si corresponde, podemos conectarlo con especialistas para revisar sus opciones con más detalle.",
    submitAnother: "Enviar otra solicitud",
    errors: {
      fullName: "Ingrese su nombre.",
      phone: "Ingrese un número de teléfono válido.",
      email: "Ingrese un correo electrónico válido.",
      zip: "Ingrese un código postal válido.",
      message: "El mensaje debe tener 500 caracteres o menos.",
      generic: "Algo salió mal. Inténtelo de nuevo.",
      network: "No se pudo enviar ahora. Inténtelo de nuevo en breve.",
    },
  },
  problem: {
    title: "Por qué nos llaman",
    subtitle:
      "Los contratos solares se vuelven confusos y caros muy rápido. Usted merece respuestas directas sobre su situación.",
    items: [
      {
        title: "Pagos que no dejan de subir",
        body: "Su pago solar es más alto de lo que planeó.",
      },
      {
        title: "Le vendieron promesas que no se cumplieron",
        body: "El ahorro, los incentivos o los términos que le prometieron no coinciden con lo que recibió.",
      },
      {
        title: "Atrapado en un contrato que no entiende",
        body: "Los documentos de arrendamiento, préstamo y PPA son difíciles de leer.",
      },
    ],
  },
  process: {
    title: "Cómo funciona",
    subtitle:
      "Cuatro pasos. Sin costo. Sin presión.",
    steps: [
      {
        step: "1",
        title: "Envíe su información",
        body: "Complete el formulario breve con sus datos de contacto y su instalador solar.",
      },
      {
        step: "2",
        title: "Consulta gratuita",
        body: "Nos comunicamos con usted, conocemos su situación y respondemos sus preguntas. Sin presión.",
      },
      {
        step: "3",
        title: "Revisión de especialista",
        body: "Cuando su caso lo requiere, lo conectamos con especialistas que lo revisan a fondo.",
      },
      {
        step: "4",
        title: "Pasos claros",
        body: "Recibe una explicación clara de sus opciones y de qué hacer después.",
      },
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    subtitle: "Respuestas directas. No es asesoría legal.",
    items: [
      {
        q: "¿Qué ocurre después de enviar el formulario?",
        a: "Lo contactamos, le hacemos algunas preguntas sobre su contrato y le explicamos el siguiente paso. Si su caso necesita un especialista, lo conectamos.",
      },
      {
        q: "¿La consulta es realmente gratis?",
        a: "Sí. No cuesta nada y no tiene ninguna obligación después.",
      },
      {
        q: "¿Qué información debo tener lista?",
        a: "El tipo de contrato (arrendamiento, préstamo, PPA o propio), su pago mensual y cualquier documento que quiera compartir. ¿No lo tiene todo? Contáctenos de todos modos.",
      },
      {
        q: "¿Quién me contactará?",
        a: "Un miembro del equipo de Nevada Energy Advisors, por teléfono o correo, con los datos que nos dé. Cuando tiene sentido, lo conectamos con especialistas para una revisión más detallada.",
      },
    ],
  },
  finalCta: {
    title: "¿Listo para obtener respuestas directas?",
    body: "Cuéntenos sobre su contrato. Revisamos lo que comparta, le explicamos en qué punto está y le damos pasos claros. Cuando tiene sentido, lo conectamos con especialistas.",
    bullets: [
      "Comparta unos datos — le damos seguimiento",
      "Podemos conectarlo con especialistas cuando haga falta",
      "Cada caso es distinto",
    ],
    formTitle: "Pida una consulta gratuita",
    formSubtitle: "El mismo formulario de arriba — use el que le resulte más fácil.",
  },
  quiz: {
    skipToSite: "Ir a nuestro sitio",
    badge: "Verifique su elegibilidad",
    title: "¿Listo para salir de su contrato solar?",
    stepOf: "Paso {current} de {total}",
    back: "Atrás",
    next: "Siguiente",
    questions: {
      wantCancel: {
        q: "¿Tiene un sistema solar que quiere cancelar?",
        options: { yes: "Sí", no: "No" },
      },
      misled: {
        q: "¿Le mintieron o lo engañaron de alguna forma durante la venta del sistema solar?",
        options: { yes: "Sí", no: "No" },
      },
      paymentStructure: {
        q: "¿Cómo está estructurado su pago solar?",
        options: {
          lease: "Arrendamiento solar (lease)",
          loan: "Préstamo solar (financiamiento)",
          ppa: "Contrato de compra de energía (PPA)",
        },
      },
      salesStart: {
        q: "¿Cómo empezó la venta del sistema solar?",
        options: {
          doorToDoor: "Un vendedor de puerta en puerta",
          onlineAd: "Vi un anuncio en internet",
          coldCall: "Me llamaron sin haberlo pedido",
          other: "Otro",
        },
      },
      company: {
        q: "Compañía solar",
        placeholder: "Seleccione una opción",
        searchPlaceholder: "Buscar…",
        noResults: "No hay resultados. Elija “Otro” abajo.",
        otherOption: "Otro",
        otherLabel: "Nombre de la compañía",
      },
      payment: {
        q: "Pago mensual",
        options: {
          under200: "Menos de $200",
          "201to500": "$201 a $500",
          over500: "Más de $500",
        },
      },
      contact: {
        q: "Ya casi — ¿dónde podemos contactarlo?",
        subtitle: "Nos comunicaremos con usted sobre su consulta gratuita.",
        firstName: "Nombre",
        lastName: "Apellido",
        bestTime: "¿Cuál es el mejor momento para contactarlo?",
        bestTimeOptions: { morning: "Mañana", afternoon: "Tarde", evening: "Noche" },
      },
    },
    submit: "Pedir mi consulta gratuita",
    thankYouTitle:
      "Gracias — nos comunicaremos con usted sobre su consulta gratuita.",
    thankYouBody:
      "Alguien podría llamarlo o escribirle pronto. Cada caso es distinto.",
    learnMore: "Conozca más sobre nosotros",
    everyCase: "Cada caso es distinto.",
  },
  footer: {
    tagline: "Consultas gratuitas para personas atrapadas con contratos solares",
    disclaimer:
      "Después de enviar, podríamos comunicarnos con usted sobre una consulta gratuita. Cuando tenga sentido, también podemos conectarlo con especialistas. No venderemos su información. Esto no es asesoría legal, y no podemos prometer ningún resultado, como cancelación, alivio o reembolso. Nevada Energy Advisors es una empresa privada. No somos un programa estatal ni gubernamental, y no estamos afiliados a NV Energy ni a ninguna empresa de servicios públicos.",
    rights: "Todos los derechos reservados.",
  },
};
