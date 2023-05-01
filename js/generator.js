const API_URL = "https://api.openai.com/v1/chat/completions";
let monsterNameGenerated = "";
let monsterDescriptionGenerated = "";
async function generateNameIdea() {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Donne moi un court nom de monstre original ",
        },
      ],
      max_tokens: 3,
      top_p: 1,
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });
  const data = await response.json();
  monsterNameGenerated = data.choices[0].message.content;
  return data.choices[0].message.content;
}

async function generateDescriptionIdea(name) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Donne moi une tres courte description drôle pour un monstre nommé " +
            name +
            " n'inclant pas son nom",
        },
      ],
      max_tokens: 30,
      top_p: 1,
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });
  const data = await response.json();
  monsterDescriptionGenerated = data.choices[0].message.content;
  return data.choices[0].message.content;
}

async function generateMonster() {
  await generateNameIdea()
    .then((nameIdea) => {
      return nameIdea;
    })
    .catch(console.error);
  await generateDescriptionIdea(monsterNameGenerated)
    .then((descIdea) => console.log(`${descIdea}`))
    .catch(console.error);
}
