import { api } from "@/lib/axios";
import { createPoolService } from "@/services/pools/createPoolsService"
import {InferGetStaticPropsType } from 'next'
import Home from "@/views/home"


export default function makeHomeFactory({ 
    guessesCount,
    poolCount,
    usersCount
}:InferGetStaticPropsType<typeof getStaticProps>){
    return (
        <Home 
            createPool={createPoolService}
            guessesCount={guessesCount}
            poolCount={poolCount}
            usersCount={usersCount}
        />
    )
}

export const getStaticProps = async () => {
    const [
        poolCountResponse,
        guessesCountResponse,
        usersCountResponse
    ] = await Promise.all([
        api.get('/pools/count'),
        api.get('/guesses/count'),
        api.get('/users/count')
    ]);

    return {
        props: {
            poolCount: poolCountResponse.data.count,
            guessesCount: guessesCountResponse.data.count,
            usersCount: usersCountResponse.data.count
        },
        revalidate: 10,
    }
}