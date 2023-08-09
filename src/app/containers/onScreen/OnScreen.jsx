import { genresFilter, cinemasFilter, dateFilter } from '@/services/movieFilters'
import React, { useEffect} from 'react'
import { signal } from "@preact/signals-react";
import { onScreenFilteredData } from '@/services/onScreenFilteredData';
import OnScreenCard from '@/app/components/onScreenCard/OnScreenCard';


export const onScreenData = signal([]);


const filterData = async () => {
    let url = 'shedules';

    if (cinemasFilter.value != undefined) {
        url = url + `?cinemasId=${cinemasFilter.value}`
    }
    if (dateFilter.value != undefined) {
        url != 'shedules' ? url = url + '&' : url = url + '?';
        url = url + `daymonth=${dateFilter.value}`

    }
    url != 'shedules' ? url = url + '&_expand=movies' : url = url + '?_expand=movies&active=true';

    console.log("la url es", url)
    let temp = await onScreenFilteredData(url, genresFilter.value);


    onScreenData.value = temp;


}

const OnScreen = () => {

    useEffect(() => {
        filterData();

    }, [genresFilter.value, cinemasFilter.value, dateFilter.value])

    return (
        <div className='onScreenContainer'>
            {onScreenData.value != undefined ? (
                onScreenData.value.map(movie => <OnScreenCard key={movie.id} card={movie} />)
            ) : <p>Loading</p>}
        </div>
    )
}

export default OnScreen
