import {appsettings} from '../settings/appsettings'

//API para llamar a las unidades de reduccion
export async function getReductionUnit() {
    const response = await fetch(`${appsettings.apiUrl}ReductionUnit`);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        return []
    }
}