import Description from "../components/Description";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";

const Problem = ({difficulty}) => {
    const [problem, setProblem] = useState({
        _id:"",
        title:"",
        diff:"",
        desc:"",
        examples:[],
        starter_code:""
    });
    useEffect(() => {
        const fetchProblem = async () => {
            const response = await fetch('/api/problems/random/' + difficulty);
            const json = await response.json()
            if(response.ok){
                console.log("Json");
                console.log(json);
                console.log(json._id);
                setProblem(json);
            }
            else{
                console.log("Error in use Effect");
            }
        }
        fetchProblem();
    },[]);
    return(
        <div className="flex-container">
            <div className="flex-item left" id="description">
                <Description title={problem.title} diff={problem.diff} desc={problem.desc} examples={problem.examples}/>
            </div>
            <div className="flex-item right">
                <Editor _id={problem._id} starter_code={problem.starter_code}/>
            </div>
        </div>
    );
}
export default Problem;