    import {appsettings} from '../settings/appsettings'

    //API para llamar a las unidades de reduccion
    export async function getReductionUnit() {
        const response = await fetch(`${appsettings.apiUrl}ReductionUnit`, {
        method: 'GET',
        credentials: 'include', 
        mode: 'cors', // Agregar esto
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' // Agregar esto
        }
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            return []
        }
    }