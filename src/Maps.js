import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Maps() {
    const [maps, setMaps] = useState()
    const [mapNames, setMapNames] = useState()
    const [pieData, setPieData] = useState({
        labels: [],
        datasets: [{
            data: []
        }]
    })

    // Function to collect data
    const getApiData = async () => {
        const response = await fetch(
            "http://api.helo-system.de/matches",
        ).then((response) => response.json());
        const mapsStatistic = new Map();

        response.forEach(i => mapsStatistic.has(i.map) ? mapsStatistic.set(i.map, mapsStatistic.get(i.map) + 1) : mapsStatistic.set(i.map, 1))
        const mapNames = Array.from(mapsStatistic.keys());
        const mapValues = Array.from(mapsStatistic.values());

        setMapNames(mapNames);
        // update the state
        setMaps(mapsStatistic);

        const data = {
            labels: mapNames,
            datasets: [
                {
                    data: mapValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                }
            ]
        }

        setPieData(data)

    };


    useEffect(() => {
        getApiData();
    }, []);

    return (
        <Pie data={pieData} />
    )
}

export default Maps;