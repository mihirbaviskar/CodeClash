const Description = ({title, diff, desc, examples, constraints}) => {
    const formattedDesc = desc.replace(/\n/g, "<br />");
    return(
        <div className="description-box">
            <h3 className="problem-title">{title}</h3>
            <p className={`diff-${diff}`}>{diff}</p>
            <p className="problem-desc" dangerouslySetInnerHTML={{ __html: formattedDesc }}></p>
            {examples.map((example, index) => {
                return(
                <div key={index}>
                    <p>Example {index+1}:</p>
                    <pre className="example">{example}</pre>
                </div>
                )
            })}
            
            {constraints.length!==0 && <p>Constraints:</p>}
            <ul className="constraint-list">
                {constraints && constraints.map((constraint, index) => {
                    return(
                        <li key={index}><code>{constraint}</code></li>
                    );
                })}
            </ul>
        </div>
    );
}
export default Description;