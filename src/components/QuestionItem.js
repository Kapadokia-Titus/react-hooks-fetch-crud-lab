import React,{ useState} from "react";

function QuestionItem({ question,onDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [questions, setQuestions] = useState(question)
  const [updatedIndex, setUpdatedIndex] = useState(correctIndex)

  const options = answers?.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


 

  function handleOnChange(e){
    //get the correct Answer
    const key = e.target.id; 

    //update it to state
    setUpdatedIndex(correctIndex)
    // push it to api
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH", 
      headers:{
        "Content-Type":"application/json"
      }, 
      body:JSON.stringify({"correctIndex": correctIndex})
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data)
    })
  }

  const handleDelete=()=>{
    onDelete(id)
  }
  
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={updatedIndex} onChange={handleOnChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
