import { GoogleGenerativeAI } from "@google/generative-ai";
import { ObtenerEstaciones } from "./funciones";
import pdfToText from "react-pdftotext";

const genAI = new GoogleGenerativeAI("AIzaSyBysod8t2m9m_S-nFjUKhTS6hQpg89M51g");

const historyUser = [];
let textoPdf = "";
let estaciones = [];

export const cargarEstacionesOVSAIBot = async () => {
  await ObtenerEstaciones()
    .then((res) => {
      if (res.success) {
        estaciones = res;
      } else {
        estaciones = [];
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// Leer documento pdf, función

export const readDocumentRemote = async (pdf_url) => {
  const file = await fetch(pdf_url)
    .then((res) => res.blob())
    .catch((error) => console.error(error));

  pdfToText(file)
    .then((text) => (textoPdf = `Este es el boletin de OVSAI: ${text}`))
    .catch((error) => console.error("Failed to extract text from pdf"));
};

// ---

/* const parts = [
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
]; */

const functionsTextOvsai = [
  {
    text: "Eres OVSAIBot un asistente entrenado para proporcionar información sobre el proyecto OVSAI, liderado en la ciudad de Pasto. Debes proporcionar información sobre estaciones, volcanes y boletines si te los proporcionan.",
  },
  {
    text:
      "Si te piden que muestres las estaciones, muestra lo siguiente: " +
      [...estaciones.map((estacion) => estacion.nombre)],
  },
  {
    text: `    
    Nota importante: esto son estilos!!. Y solo debes mostrar lo siguiente en adelante:
    Si te piden cambiar a otro estilo, pregunta a cual de las siguientes estilos quiere cambiar:
      - Básico
      - Híbrido
      - Outdoor
      - Calles
      - Relieve
      - Temperatura
      - Clima
      - Satélite (Sin leyendas)

      Ahora, el usuario solo puede elegir una capa. Si desea elegir más dile que no se puede.
      En el caso de que el usuario elija una, debes responder la siguiente estructura, si eligio por ejemplo el de satélite:
      Debe ser requeridamente de esta forma el objeto: {"basic": false, "hybrid": false, "outdoor": false, "satellite": true, "streets": false, "winter": false, "temperature": false, "weather": false}
      Y al final de ese objeto, separalo por un - guión, y agrega el texto: change:layer
    `,
  },
  {
    text: "No puedes responder sobre otros temas que no sean sobre OVSAI",
  },
  {
    text: "No te puedes inventar ninguna información, todo debes buscarlo aquí",
  },
  {
    text: "Si te piden responder sobre alguna información que el usuario te haya proporcionado, como un boletin, un texto o algo similar. Debes responder las preguntas que te hace"
  }
];

export const cargarBoletin = () => {
  //if (textoPdf.trim().length == 0) {
  readDocumentRemote("boletines/Boletin_volcanes_sur_jun_2024.pdf")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  //}
};

export async function runOVSAIBot(
  answer = "Hola",
  dataTrain = [],
  boletin = false
) {
  const activarPdf = () => {
    console.log("Pdf activado");

    historyUser.push({
      text: `input: ${answer}: ${textoPdf}`,
    });
  };

  if (boletin) {
    activarPdf();
    console.log(historyUser);
  }

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
          text: "Eres un asistente virtual experto en OVSAI. Puedes proporcionar información sobre estaciones, sensores y responder preguntas relacionadas con OVSAI. Tus respuestas deben ser concisas y fáciles de entender. También puedes leer pdf si te lo piden",
        },
      ],
    },
  });

  /*     generationConfig: {
      responseMimeType: "application/json"
    } */

  const generationConfig = {
    temperature: 1.25,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  let result = await model
    .startChat({
      history: [
        {
          role: "user",
          parts: [...dataTrain, ...functionsTextOvsai, ...historyUser],
        },
      ],
      generationConfig: generationConfig,
    })
    .sendMessage(answer);

  // ...dataTrain

  const response = result.response;
  const text = response.text();

  if (text) {
    historyUser.push({
      text: "output: " + text,
    });
  }

  console.log(text);

  /* if (text.match(/crear:estacion/)) {
    const repla = text
      .replace(/`/gi, "")
      .replace(/json/g, "")
      .replace(/crear:estacion/g, "");
    const estacion = crearEstacion(repla);
    textoFuncion = estacion;
  } */

  /* if (text.toLowerCase().match(/mostrar:estaciones/)) {
    textoFuncion = `${[
      ...(await ObtenerEstaciones().then((res) => res.map((e) => e.nombre))),
    ]}`;
    estaciones = await ObtenerEstaciones();
  } */

  if (text.toLowerCase().match(/change:layer/)) {
    textoFuncion = `La capa se ha cambiado correctamente`;
  }

  return textoFuncion != null ? textoFuncion : text;
}
