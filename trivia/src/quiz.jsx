import axios from 'axios'
import {useState, useEffect} from 'react'


export function Card({ selectedCat, categoryId, setSelectedCat, question}) {
const [questions, setQuestions] = useState([])
useEffect(() => {
    const cardUrl = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
    axios.get(cardUrl).then((res) => {
        console.log(res.data)
        setQuestions(res.data.results[0])
    })
}, [categoryId])
    return(
        <>
        <h2>{selectedCat}</h2>
        <h2>Quiz</h2>
        <div>
            
                <p>{question}</p>
        </div>
        
        </>
    )
}


