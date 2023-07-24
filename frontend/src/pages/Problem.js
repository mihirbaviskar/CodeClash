import Description from "../components/Description";
import Editor from "../components/Editor";

const Home = () => {
    return(
        <div className="flex-container">
            <div className="flex-item">
                <Description/>
            </div>
            <div className="flex-item">
                <Editor/>
            </div>
        </div>
    );
}
export default Home;