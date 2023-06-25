const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: "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",
});


const openai = new OpenAIApi(configuration);

export const rewriteText = async (text: String) => {
  const response = await openai.createChatCompletion({
    model: "gpt-4-0314",
    messages: [{role: "user", content: `Estoy usando un convertidor de imagenes a texto (teseract), y me ha generado el texto un poco raro me lo podrías rescribir (SOLO QUIERO QUE LO RESCRIBAS no quiero ni traducciones ni otras cosas):\n${text}`}],
  });
  
  return response.data.choices[0].message.content;
};

export const answerQuestion = async (text: String) => {
  const response = await openai.createChatCompletion({
    model: "gpt-4-0314",
    messages: [{role: "user", content: `Te voy a pasar una pregunta, quizas este un poco mal formulada porque la lee de un escaner de texto pero quiero que intentes responderla brevemente:\n${text}`}],
  });
  return response.data.choices[0].message.content;
};

//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