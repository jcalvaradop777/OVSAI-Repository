import { GoogleGenerativeAI } from "@google/generative-ai";
import { ObtenerEstaciones } from "./funciones";

let estaciones = [];

function obtenerFechaHoraActual() {
  // Crea un nuevo objeto Date para obtener la fecha y hora actuales
  const ahora = new Date();

  // Extrae los componentes de la fecha y hora
  const dia = ahora.getDate();
  const mes = ahora.getMonth() + 1; // Los meses en JavaScript comienzan en 0
  const año = ahora.getFullYear();
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Formatea la fecha y hora como una cadena
  const fechaHora = `${dia} de ${
    meses[mes - 1]
  } de ${año} a las ${horas}:${minutos} UTC `;

  return fechaHora;
}
/* 
function obtenerEstaciones() {
  return estaciones;
} */

function crearEstacion(data) {
  const objeto = JSON.parse(data);
  estaciones.push({
    nombre_estacion: objeto.nombre_estacion,
    id_estacion: objeto.id_estacion,
    trazas: objeto.trazas,
  });

  console.log(estaciones);

  return "La estación ha sido creada";
}

const genAI = new GoogleGenerativeAI("AIzaSyBysod8t2m9m_S-nFjUKhTS6hQpg89M51g");

const parts = [
  { text: "Tu eres OVSAIBot, tu asistente en OVSAI" },
  {
    text: "Si te preguntan que puedes hacer, responde: Proporcionar información sobre OVSAI, Proporcionar información de las estaciones, Responder preguntas sobre las estaciones y sensores",
  },
  {
    text:
      "Cuando te pregunten la fecha, hora o el tiempo actual, responde: La fecha actua es: " +
      obtenerFechaHoraActual(),
  },
  {
    text: "Si te preguntan sobre otros temas diferentes, por ejemplo: Sobre celebridades, responde: Solo puedo responderte, sobre OVSAI",
  },
  {
    text:
      "Si te piden las estaciones o una lista responde lo siguiente: mostrar:estaciones. Además puedes usar los siguientes datos, según lo que te pregunte el usuario " +
      estaciones,
  },
  {
    text:
      "Si te piden buscar una estación pide su ID o nombre y buscala en los siguientes datos: " +
      estaciones,
  },
  {
    text: "Cuando te pregunte sobre crear una estación, debes mostrar de salida los datos en formato json: requeridamente el nombre de estación en el objeto debe ser: nombre_estacion, el id estacion: id_estacion y el número de trazas o trazas: trazas. Los campos requeridos son nombre de estación, id de estación y el número de trazas. No debes crear una estación, si el usuario no te da esos datos. Devuelve solo el objeto creado si el usuario acato las ordenes, además agrega un espacio al final y agrega: crear:estacion. En caso contrario le dirás los datos que hacen falta, pero debes comprobarlo. Si el usuario confirma que ya dio los datos, pero en el historial no están asi, debes reiterarle que debe dartelos",
  },
  {
    text: "Si tienes información en los mensajes sobre los temas que pregunta el usuario, responde si mas los datos que te acuerdas sobre lo que te pregunta. En caso contrario no",
  },
  {
    text: "Si te preguntan como crear una estación, debes responder con nombre de estación, id de estación y número de trazas. Requeridamente muestra una lista de las cosas que debe llenar el usuario",
  },
  {
    text: "Si no sabes que responder, solo di que no entiendes",
  },
];

const historyUser = [];

export async function runOVSAIBot(answer = "Hola", dataTrain = []) {
  let textoFuncion = null;

  if (answer.trim().length > 0) {
    historyUser.push({
      text: "input: " + answer,
    });
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: {
      parts: [
        {
          text: "Eres un asistente virtual experto en OVSAI. Puedes proporcionar información sobre estaciones, sensores y responder preguntas relacionadas con OVSAI. Tus respuestas deben ser concisas y fáciles de entender.",
        },
      ],
    },
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  let result = await model
    .startChat({
      history: [{ role: "user", parts: [...dataTrain, ...historyUser] }],
      generationConfig: generationConfig,
    })
    .sendMessage(answer);

  const response = result.response;
  const text = response.text();

  if (text) {
    historyUser.push({
      text: "output: " + text,
    });
  }

  console.log(text);

  if (text.match(/crear:estacion/)) {
    const repla = text
      .replace(/`/gi, "")
      .replace(/json/g, "")
      .replace(/crear:estacion/g, "");
    const estacion = crearEstacion(repla);
    textoFuncion = estacion;
  }

  if (text.toLowerCase().match(/mostrar:estaciones/)) {
    textoFuncion = `${[
      ...(await ObtenerEstaciones().then((res) => res.map((e) => e.nombre))),
    ]}`;
    estaciones = await ObtenerEstaciones();
  }

  return textoFuncion != null ? textoFuncion : text;
}
