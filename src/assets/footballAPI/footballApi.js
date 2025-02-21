// const currentYear = new Date().toJSON().slice(0,4)  ////No se puede obtener resultados después del 2023 en planes gratuitos

export const getStandings = async(leagueId) =>{
    try {
        const resp = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=2023`, {
            method: "GET",
            headers: {
                "x-apisports-key": import.meta.env.VITE_API_KEY_FOOTBALL_API
            }
        })

        const {response} = await resp.json()

        return response

    } catch (error) {
        throw new Error(error)
    }
}