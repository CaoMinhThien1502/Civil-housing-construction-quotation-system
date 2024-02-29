import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function Combobuildingdetail() {
    const {id} = useParams();
    const [comboData, setComboData] = useState(null);
    console.log('Combo Building ID:', id);
    useEffect(() => {
        axios.get(`http://localhost:8080/combobuilding/combo/getbyid?comboBuildingId=${id}`)
            .then(response => {
                setComboData(response.data);
            })
            .catch(error => {
                console.error('Error fetching combo data:', error);
            });
    }, [id]);
    console.log(comboData)
    return(
        <div>
        {id}</div>
    )
} 