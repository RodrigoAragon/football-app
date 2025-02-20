// const currentYear = new Date().toJSON().slice(0,4)  ////No se puede obtener resultados después del 2023 en planes gratuitos

export const getStandings = async(leagueId) =>{
    try {
        const resp = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=2023`, {
            method: "GET",
            headers: {
                "x-apisports-key": "25c33c919d38a77bdd9d7480d8b7a2a5"
            }
        })

        const {response} = await resp.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

export const getLeague = async (leagueId) =>{
    try {
        const resp = await fetch(`https://v3.football.api-sports.io/leagues?league=${leagueId}`, {
            method: "GET",
            headers: {
                "x-apisports-key": "25c33c919d38a77bdd9d7480d8b7a2a5"
            }
        })

        const {response} = await resp.json()

        return response;

    } catch (error) {
        console.log(error)
    }
}