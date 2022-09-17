import './styles/main.css';
import logoImg from './assets/logo-nwl-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

function App() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data);
        })
    }, [])

    return (
        <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20 mobile:justify-center'>
            <img src={logoImg} alt="" />

            <h1 className='text-6xl mobile:text-2xl text-white font-black mt-20 mobile:mt-4 mobile:mb-4'>
                Seu <span className='text-transparent bg-nwlGradient bg-clip-text'>duo</span> está aqui.
            </h1>

            <div className='grid grid-cols-6 gap-6 mt-16 mobile:flex mobile:flex-col mobile:mt-4'>
                {games.map(game => {
                    return (
                        <GameBanner
                            key={game.id}
                            bannerUrl={game.bannerUrl}
                            title={game.title}
                            adsCount={game._count.ads} />
                    )
                })}
            </div>

            <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModal />
            </Dialog.Root>

        </div>
    )
}

export default App