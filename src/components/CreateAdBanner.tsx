import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
    return (
        <div className='pt-1 mt-8 bg-nwlGradient self-stretch rounded-lg overflow-hidden mobile:w-[80%] mobile:self-center'>
            <div className='bg-[#2A2634] px-8 py-6 mobile:px-4 rounded-lg flex mobile:flex-col justify-between items-center'>
                <div>
                    <strong className='text-2xl mobile:text-xl mobile:mb-4 text-white font-black block'>Não encontrou seu duo?</strong>
                    <span className='mobile:text-xs mobile:mb-4 text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
                </div>

                <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 transition duration-300 text-white rounded flex items-center gap-3'>
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}