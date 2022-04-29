import './Related.css';

const Related = () => {
    
    const mock_data = ['worldwide shipping', 'under 50$', 'kitten', 'plastic plugs', 'pucker shoes']
    return (
        <div className="related">
            Related
            <ul>
                {mock_data.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default Related;