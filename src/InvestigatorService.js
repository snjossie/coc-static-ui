import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URI;

export async function signupUser(key) { 
    return await axios.post(
        `${baseUrl}/User/signup`,
        { key }
    )
}

export async function getInvestigator(id) {
    return await axios.get(
        `${baseUrl}/Investigators/${id}`
    );
}

export async function getInvestigatorList() { 
    return await axios.get(
        `${baseUrl}/Investigators`
    );
}

export async function createInvestigator(investigator) {
    return await axios.post(
        `${baseUrl}/Investigators`,
        investigator
    );
}

export async function updateInvestigator(investigator){ 
    return await axios.put(
        `${baseUrl}/Investigators`,
        investigator
    );
}

export async function getBlankInvestigator() { 
    return await axios.get(
        `${baseUrl}/Investigators/blank`
    );
}
