import { api } from "@/lib/axios";
import { createPollService } from "@/services/polls/createPoolsService"
import {InferGetStaticPropsType } from 'next'
import Home from "@/views/home"


export default function makeHomeFactory({ 
    guessesCount,
    pollCount,
    usersCount
}:InferGetStaticPropsType<typeof getStaticProps>){
    return (
        <Home 
            createPoll={createPollService}
            guessesCount={guessesCount}
            pollCount={pollCount}
            usersCount={usersCount}
        />
    )
}

export const getStaticProps = async () => {
    const [
        pollCountResponse,
        guessesCountResponse,
        usersCountResponse
    ] = await Promise.all([
        api.get('/polls/count'),
        api.get('/guesses/count'),
        api.get('/users/count')
    ]);

    return {
        props: {
            pollCount: pollCountResponse.data.count,
            guessesCount: guessesCountResponse.data.count,
            usersCount: usersCountResponse.data.count
        },
        revalidate: 10,
    }
}