import {useState} from "react";
import logo from '../logo.svg';
import SearchResult from "../result";
import {Circles} from "react-loader-spinner";
import About from "../about";

const Home = () => {
    const [landing, setLanding] = useState(true);
    const [searching, setSearching] = useState(false);
    const [searchKey, setSearchKey] = useState("");
    const [resultSearch, setResultSearch] = useState({searched: false});

    const mockRespWithAnswer = {
        "answer": "accompanying staff would be wearing cumbersome personal protective equipment, cumbersome personal protective equipment (PPE)",
        "context": "Inter-hospital transfer may be required for extracorporeal membrane oxygenation (ECMO) if patients with COVID-19 develop severe acute respiratory distress syndrome within hospitals with only basic ventilation facilities. During episodes of patient transport outside of isolation, potential breaches of infection control can occur. At the same time, when COVID-19 patients turn ill during transport, their management is exceptionally challenging as accompanying staff would be wearing cumbersome personal protective equipment (PPE) [3] .\n\nMitigating the spread of COVID-19 is a national priority in Singapore [4] , and part of this effort involves planning and conducting safe patient transport for suspected or confirmed cases. HCWs who handle the transport of COVID-19 patients must consider the following principles (see Table 1 ): firstly, early recognition of the deteriorating patient; secondly, HCW safety; thirdly, bystander safety; fourthly, contingency plans for medical emergencies during transport; fifthly, post-transport decontamination. ",
        "offsets_in_context": {"end": 530, "start": 448},
        "score": 6.916369438171387
    }

    const mockRespWithoutAnswer = {
        "answer": "",
        "context": null,
        "offsets_in_context": {"end": 0, "start": 0},
        "score": 28.470508575439453
    }

    const search = async () => {
        setSearching(true);
        console.log('Call api with question', searchKey, process.env.REACT_APP_API_BASE_URL);

        const res = await fetch(process.env.REACT_APP_API_BASE_URL + "/qa", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    question: searchKey
                }
            )
        }).then(res => res.json());

        // const res = mockRespWithAnswer;
        res.searched = true;
        setResultSearch(res);
        setSearching(false);
    }

    return (
        <div className="home">
            <header className="home-header">
                <img src={logo} className="home-logo" alt="logo"/>
                <h1 className="home-title">Welcome to Covid Q&A Recommendation System</h1>
            </header>
            {landing &&
                <div className='home-main'>
                    <About/>
                    <button className='btn btn-primary try-button'
                            onClick={() => setLanding(false)}>Try now
                    </button>
                </div>
            }
            {!landing &&
                <div className="home-main">
                   <div className="input-div">
                       <input placeholder={"Enter your question to find answers"} className="search-input"
                              onChange={event => setSearchKey(event.target.value)}
                              onKeyDown={(event) => {
                                  if (event.key === 'Enter') {
                                      search()
                                  }
                              }}
                       />
                       <svg onClick={search}
                            className="feather feather-search" fill="none" height="24" stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"
                            xmlns="http://www.w3.org/2000/svg">
                           <circle cx="11" cy="11" r="8"/>
                           <line x1="21" x2="16.65" y1="21" y2="16.65"/>
                       </svg>
                   </div>

                    {searching &&
                        <Circles
                            height="40"
                            width="40"
                            color="#2596be"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass="circles-loading"
                            visible={true}
                        />
                    }
                    {!searching && <SearchResult searchResult={resultSearch}/>
                    }
                </div>
            }
        </div>
    )
}
export default Home;