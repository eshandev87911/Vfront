import { useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const arr = [
  {
    task: "Work to do",
    isComp: true,
  },
  {
    task: "Gym to go",
    isComp: false,
  },
  {
    task: "sleeping 8 hrs",
    isComp: false,
  },
  {
    task: "study 10hrs",
    isComp: true,
  },
  {
    task: "study 10hrs",
    isComp: false,
  },
  {
    task: "gaming 10hrs",
    isComp: true,
  },
];

function Speech() {
  const [g, setg] = useState(arr);
  function add(item) {
    console.log(item);
    const h = { task: item, isComp: false };
    setg((item) => [...item, h]);
  }

  const commands = [
    {
      command: ["add *"],
      callback: (item) => add(item),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  return (
    <div style={{ color: "black" }}>
      {g.map((item, i) => (
        <Item item={item} key={i} />
      ))}
      <p>Transcript:{transcript}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
    </div>
  );
}

function Item({ item }) {
  return <h1>{item.task}</h1>;
}

export default Speech;
