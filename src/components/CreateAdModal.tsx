import { useEffect, useState, FormEvent } from 'react';
import { CaretDown, Check, GameController } from 'phosphor-react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Input } from './Form/Input';
import axios from 'axios';

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [gameName, setGameName] = useState<string>();
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data);
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData)

        if (gameName === "" || data.yearsPlaying === "" || data.discord === "" || data.weekDays === "" || data.hourStart === "" || data.hourEnd === "" || useVoiceChannel === false) {
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${gameName}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert('Anúncio publicado com sucesso!');
        } catch (err) {
            console.log(err);
            alert('Erro ao publicar o anúncio!');
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 mobile:px-4 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] mobile:w-[347px] mobile:h-[500px] mobile:flex mobile:flex-col shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                    <div className="mobile:overflow-scroll mobile:h-[300px]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="game" className="font-semibold">Qual o game?</label>
                            <Select.Root
                                onValueChange={setGameName}
                            >
                                <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 flex items-center justify-between">
                                    <Select.Value placeholder="Selecione o game que deseja jogar" />
                                    <Select.Icon>
                                        <CaretDown className="w-4 h-4 text-white" />
                                    </Select.Icon>
                                </Select.Trigger>

                                <Select.Portal>
                                    <Select.Content>
                                        <Select.Viewport className="rounded">

                                            {games.map(game => {
                                                return (
                                                    <Select.Item
                                                        key={game.id}
                                                        id="game"
                                                        value={game.id}
                                                        className="bg-zinc-900 py-3 px-4 text-sm text-white cursor-pointer flex items-center"
                                                    >
                                                        <Select.ItemIndicator>
                                                            <Check className="w-4 h-4 mr-2 text-emerald-400" />
                                                        </Select.ItemIndicator>
                                                        <Select.ItemText>{game.title}</Select.ItemText>
                                                    </Select.Item>
                                                )
                                            })}

                                            <Select.Separator />
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                            <Input name="name" id="name" type="text" placeholder="Como te chamam dentro do game?" />
                        </div>

                        <div className="grid grid-cols-2 gap-6 mobile:flex mobile:flex-col">
                            <div className="flex flex-col gap-2 mt-4">
                                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                                <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <label htmlFor="discord">Qual o seu Discord?</label>
                                <Input name="discord" id="discord" type="text" placeholder="Usuario#000" />
                            </div>
                        </div>

                        <div className="flex mobile:flex-col gap-6">
                            <div className="flex flex-col gap-2 mt-4">
                                <label htmlFor="weekDays">Quando costuma jogar?</label>

                                <ToggleGroup.Root
                                    type="multiple"
                                    className="grid grid-cols-4 gap-2"
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <ToggleGroup.Item
                                        value="0"
                                        title="Domingo"
                                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        D
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="1"
                                        title="Segunda"
                                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="2"
                                        title="Terça"
                                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        T
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="3"
                                        title="Quarta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="4"
                                        title="Quinta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="5"
                                        title="Sexta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        value="6"
                                        title="Sábado"
                                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>

                            <div className="flex flex-col gap-2 flex-1 mt-4">
                                <label htmlFor="hourStart">Qual horário do dia?</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                                    <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                                </div>
                            </div>
                        </div>

                        <label className="flex gap-2 mt-4 text-sm items-center">
                            <Checkbox.Root
                                checked={useVoiceChannel}
                                onCheckedChange={(checked) => {
                                    if (checked === true) {
                                        setUseVoiceChannel(true);
                                    } else {
                                        setUseVoiceChannel(false);
                                    }
                                }}
                                className="w-6 h-6 rounded bg-zinc-900 p-1">
                                <Checkbox.Indicator>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Costumo me conectar ao chat de voz
                        </label>
                    </div>
                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition duration-300">
                            Cancelar
                        </Dialog.Close>
                        <button
                            type="submit"
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition duration-300"
                        >
                            <GameController className="w-6 h-6" />
                            Encontrar Duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}