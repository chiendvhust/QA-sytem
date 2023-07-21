const About = () => {

    return (
        <div style={{marginBottom: 20}}>
            <div className="card">
                <div className="d-flex">
                    <img className="card-icon" src="https://image.ibb.co/cFV8mR/monitoring.png" alt="monitoring"/>
                    <h3 className="card-title">What System does</h3>
                </div>
                <p className="card-text">Collect metrics on visibility, monitor Droplet performance and receive
                    alerts when problems arise in your infrastructure–at no additional cost.</p>
            </div>

            <div className="card">
                <div className="d-flex">
                    <img className="card-icon" src="https://image.ibb.co/cFV8mR/monitoring.png" alt="monitoring"/>
                    <h3 className="card-title">About Algorithm</h3>
                </div>
                <p className="card-text">Collect metrics on visibility, monitor Droplet performance and receive
                    alerts when problems arise in your infrastructure–at no additional cost.</p>
            </div>

        </div>
    )
}
export default About;