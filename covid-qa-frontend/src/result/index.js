import Parser from 'html-react-parser';

const SearchResult = ({searchResult}) => {

    const contextWithHighlight = () => {
        const context = searchResult.context;
        if (!context) {
            return "No context available";
        }

        return context.substring(0, searchResult.offsets_in_context.start)
        + "<mark>" + context.substring(searchResult.offsets_in_context.start, searchResult.offsets_in_context.end) + "</mark>"
        + context.substring(searchResult.offsets_in_context.end, context.length)
    }
    return (
        <div>
            {searchResult.searched && !searchResult.answer &&
                <h3>
                    No answer available for your question. Try another questions!
                </h3>
            }

            {searchResult.searched && searchResult.answer &&
                <div>
                    <div className='d-flex'>
                        <h4 className="answer-result" style={{marginTop: "unset", marginBottom: "unset"}}>
                            Answer:&nbsp;
                        </h4>
                        <p>{searchResult.answer}</p>
                    </div>

                    <div className='d-flex' style={{marginTop: 20}}>
                        <h4 className="context-result" style={{marginTop: "unset", marginBottom: "unset"}}>
                            Context:
                        </h4>
                        <p>{Parser(contextWithHighlight())}</p>
                    </div>

                    {/*<div className='d-flex' style={{marginTop: 20}}>*/}
                    {/*    <h4 className="context-result" style={{marginTop: "unset", marginBottom: "unset"}}>*/}
                    {/*        Score:&nbsp;&nbsp;&nbsp;&nbsp;*/}
                    {/*    </h4>*/}
                    {/*    <p>{searchResult.score}</p>*/}
                    {/*</div>*/}

                </div>
            }
        </div>
    )
}
export default SearchResult;