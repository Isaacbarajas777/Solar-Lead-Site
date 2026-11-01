import type { LegalDoc } from "./LegalPage";
import { LEGAL_EMAIL } from "./LegalPage";

const PHONE = "(702) 313-3073";

export const privacyEn: LegalDoc = {
  title: "Privacy Policy",
  effective: "Effective date: November 1, 2026",
  intro:
    "This policy explains what Nevada Energy Advisors (\"we\", \"us\"), based in Las Vegas, Nevada, collects on nevadaenergyadvisors.com, why, and the choices you have. We don't sell your personal information.",
  sections: [
    {
      h: "What we collect",
      p: ["When you fill out our questionnaire, we collect what you give us:"],
      li: [
        "Your name, phone number, and email address",
        "Your ZIP code, if you provide it",
        "Your solar company or installer",
        "Your answers (for example, your payment type, monthly payment range, how the sale started, and the best time to reach you)",
        "Your language (English or Spanish)",
      ],
    },
    {
      h: "Why we collect it",
      p: [
        "We use your information to contact you about your request and your solar contract options, to answer your questions, and to keep basic records of our conversations. We also use it to keep the form safe from spam and abuse.",
      ],
    },
    {
      h: "Who we share it with",
      li: [
        "Service providers that run our site and email, such as our website host (Vercel) and our email provider. They may only use it to provide their service to us.",
        "Specialists or partners who can help with your request, only if you ask us to connect you.",
        "Authorities, if the law requires it.",
      ],
      p: ["We don't sell your personal information, and we don't share it for cross-context behavioral advertising without your consent."],
    },
    {
      h: "Cookies, analytics, and advertising pixels",
      li: [
        "Site statistics: we use Vercel Web Analytics to count page visits. It runs on our own domain, does not use cookies, and does not identify you personally. It runs for every visitor.",
        "Advertising pixels: we may use the Meta (Facebook) Pixel to measure our ads. It loads only after you click Accept on our cookie banner. If you click Reject or don't choose, it does not load.",
        "We save your cookie choice in your browser. You can change it any time with the \"Cookie settings\" link at the bottom of every page.",
      ],
    },
    {
      h: "Your California privacy rights",
      p: [
        "If you live in California, the CCPA/CPRA gives you the right to know what personal information we have about you, to delete it, to correct it, and to opt out of its sale or sharing. We don't sell it. You can also limit use of sensitive information (we don't collect it on purpose). We won't treat you differently for using these rights.",
      ],
    },
    {
      h: "Your Nevada privacy rights",
      p: [
        "Under Nevada law (NRS 603A), you can ask us not to sell your covered information. We don't sell it, but you can still send a request and we will record it.",
      ],
    },
    {
      h: "How long we keep it",
      p: [
        "We keep your information while we are helping you and for up to 3 years after our last contact, unless the law requires longer or you ask us to delete it sooner.",
      ],
    },
    {
      h: "Security",
      p: [
        "We use reasonable safeguards, like encrypted connections (HTTPS) and limited access. No system is perfectly secure.",
      ],
    },
    {
      h: "Children",
      p: ["This site is for adults. We don't knowingly collect information from children under 13. If you think a child sent us information, contact us and we will delete it."],
    },
    {
      h: "How to contact us or use your rights",
      p: [
        `Email ${LEGAL_EMAIL} or call ${PHONE}. Tell us what you want (know, delete, correct, or opt out). We may ask you to confirm your identity, and we will answer within 45 days.`,
        "We may update this policy. The effective date above shows the latest version.",
      ],
    },
  ],
};

export const privacyEs: LegalDoc = {
  title: "Política de privacidad",
  effective: "Fecha de vigencia: 1 de noviembre de 2026",
  intro:
    "Esta política explica qué información recopila Nevada Energy Advisors (\"nosotros\"), con sede en Las Vegas, Nevada, en nevadaenergyadvisors.com, para qué la usamos y qué opciones tiene usted. No vendemos su información personal.",
  sections: [
    {
      h: "Qué información recopilamos",
      p: ["Cuando usted llena nuestro cuestionario, recopilamos lo que nos da:"],
      li: [
        "Su nombre, número de teléfono y correo electrónico",
        "Su código postal, si lo proporciona",
        "Su compañía o instalador solar",
        "Sus respuestas (por ejemplo, el tipo de pago, el rango de su pago mensual, cómo empezó la venta y el mejor horario para contactarlo)",
        "Su idioma (inglés o español)",
      ],
    },
    {
      h: "Para qué la usamos",
      p: [
        "Usamos su información para comunicarnos con usted sobre su solicitud y las opciones de su contrato solar, responder sus preguntas y llevar un registro básico de nuestras conversaciones. También la usamos para proteger el formulario contra spam y abuso.",
      ],
    },
    {
      h: "Con quién la compartimos",
      li: [
        "Proveedores de servicios que operan nuestro sitio y correo, como nuestro proveedor de alojamiento web (Vercel) y nuestro proveedor de correo electrónico. Solo pueden usarla para prestarnos su servicio.",
        "Especialistas o socios que pueden ayudar con su solicitud, solo si usted nos pide que lo conectemos.",
        "Autoridades, si la ley lo exige.",
      ],
      p: ["No vendemos su información personal, y no la compartimos para publicidad basada en su comportamiento sin su consentimiento."],
    },
    {
      h: "Cookies, estadísticas y píxeles de publicidad",
      li: [
        "Estadísticas del sitio: usamos Vercel Web Analytics para contar visitas. Funciona en nuestro propio dominio, no usa cookies y no lo identifica personalmente. Funciona para todos los visitantes.",
        "Píxeles de publicidad: podemos usar el píxel de Meta (Facebook) para medir nuestros anuncios. Solo se carga después de que usted hace clic en Aceptar en nuestro aviso de cookies. Si hace clic en Rechazar o no elige, no se carga.",
        "Guardamos su elección en su navegador. Puede cambiarla en cualquier momento con el enlace \"Configuración de cookies\" al final de cada página.",
      ],
    },
    {
      h: "Sus derechos de privacidad en California",
      p: [
        "Si vive en California, la CCPA/CPRA le da derecho a saber qué información personal tenemos sobre usted, a eliminarla, a corregirla y a excluirse de su venta o intercambio. Nosotros no la vendemos. También puede limitar el uso de información sensible (no la recopilamos a propósito). No lo trataremos de forma diferente por usar estos derechos.",
      ],
    },
    {
      h: "Sus derechos de privacidad en Nevada",
      p: [
        "Según la ley de Nevada (NRS 603A), usted puede pedirnos que no vendamos su información cubierta. No la vendemos, pero puede enviar su solicitud y la registraremos.",
      ],
    },
    {
      h: "Cuánto tiempo la guardamos",
      p: [
        "Guardamos su información mientras lo ayudamos y hasta 3 años después de nuestro último contacto, salvo que la ley exija más tiempo o que usted nos pida eliminarla antes.",
      ],
    },
    {
      h: "Seguridad",
      p: ["Usamos medidas de protección razonables, como conexiones cifradas (HTTPS) y acceso limitado. Ningún sistema es totalmente seguro."],
    },
    {
      h: "Menores de edad",
      p: ["Este sitio es para adultos. No recopilamos a sabiendas información de menores de 13 años. Si cree que un menor nos envió información, contáctenos y la eliminaremos."],
    },
    {
      h: "Cómo contactarnos o ejercer sus derechos",
      p: [
        `Escriba a ${LEGAL_EMAIL} o llame al ${PHONE}. Díganos qué desea (saber, eliminar, corregir o excluirse). Podemos pedirle que confirme su identidad, y le responderemos en un plazo de 45 días.`,
        "Podemos actualizar esta política. La fecha de vigencia de arriba indica la versión más reciente.",
      ],
    },
  ],
};

export const termsEn: LegalDoc = {
  title: "Terms of Use",
  effective: "Effective date: November 1, 2026",
  intro:
    "These terms apply to your use of nevadaenergyadvisors.com, run by Nevada Energy Advisors in Las Vegas, Nevada. By using the site, you agree to them.",
  sections: [
    {
      h: "Information only",
      p: [
        "Everything on this site and in our consultations is general information. It is not legal, financial, or tax advice. For advice about your specific contract, talk to a licensed attorney or financial professional.",
      ],
    },
    {
      h: "No guarantee of any outcome",
      p: [
        "Every case is different. We do not promise or guarantee any result, including cancellation of a contract, lower payments, a refund, or any savings.",
      ],
    },
    {
      h: "Who we are not",
      p: [
        "Nevada Energy Advisors is a private company. We are not a government agency or program, and we are not affiliated with NV Energy, any utility, or any of the solar companies or installers named on this site. Company names are used only so you can tell us who you worked with.",
      ],
    },
    {
      h: "Your information",
      p: ["How we handle what you send us is explained in our Privacy Policy."],
    },
    {
      h: "Using the site",
      p: ["Please give accurate information and don't misuse the site (for example, sending spam or trying to break it)."],
    },
    {
      h: "Limitation of liability",
      p: [
        "The site is provided \"as is.\" To the fullest extent the law allows, Nevada Energy Advisors is not liable for any indirect, incidental, or consequential damages, or for decisions you make based on information from this site or our consultations.",
      ],
    },
    {
      h: "Governing law",
      p: ["These terms are governed by the laws of the State of Nevada. Any dispute will be handled in the state or federal courts in Clark County, Nevada."],
    },
    {
      h: "Contact",
      p: [`Questions? Email ${LEGAL_EMAIL} or call ${PHONE}. We may update these terms; the effective date shows the latest version.`],
    },
  ],
};

export const termsEs: LegalDoc = {
  title: "Términos de uso",
  effective: "Fecha de vigencia: 1 de noviembre de 2026",
  intro:
    "Estos términos aplican a su uso de nevadaenergyadvisors.com, operado por Nevada Energy Advisors en Las Vegas, Nevada. Al usar el sitio, usted los acepta.",
  sections: [
    {
      h: "Solo información",
      p: [
        "Todo lo que aparece en este sitio y en nuestras consultas es información general. No es asesoría legal, financiera ni fiscal. Para recibir asesoría sobre su contrato específico, hable con un abogado o un profesional financiero con licencia.",
      ],
    },
    {
      h: "Sin garantía de resultados",
      p: [
        "Cada caso es diferente. No prometemos ni garantizamos ningún resultado, incluida la cancelación de un contrato, pagos más bajos, un reembolso o ahorros.",
      ],
    },
    {
      h: "Quiénes no somos",
      p: [
        "Nevada Energy Advisors es una empresa privada. No somos una agencia ni un programa del gobierno, y no estamos afiliados a NV Energy, a ninguna empresa de servicios públicos ni a las compañías o instaladores solares mencionados en este sitio. Los nombres de las compañías se usan solo para que usted nos diga con quién trabajó.",
      ],
    },
    {
      h: "Su información",
      p: ["Cómo manejamos lo que usted nos envía se explica en nuestra Política de privacidad."],
    },
    {
      h: "Uso del sitio",
      p: ["Por favor, proporcione información correcta y no haga mal uso del sitio (por ejemplo, enviar spam o intentar dañarlo)."],
    },
    {
      h: "Limitación de responsabilidad",
      p: [
        "El sitio se ofrece \"tal cual\". En la medida máxima que permita la ley, Nevada Energy Advisors no es responsable de daños indirectos, incidentales o consecuentes, ni de las decisiones que usted tome con base en la información de este sitio o de nuestras consultas.",
      ],
    },
    {
      h: "Ley aplicable",
      p: ["Estos términos se rigen por las leyes del estado de Nevada. Cualquier disputa se resolverá en los tribunales estatales o federales del condado de Clark, Nevada."],
    },
    {
      h: "Contacto",
      p: [`¿Preguntas? Escriba a ${LEGAL_EMAIL} o llame al ${PHONE}. Podemos actualizar estos términos; la fecha de vigencia indica la versión más reciente.`],
    },
  ],
};
